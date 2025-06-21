package com.biz_lens.BizLens_Backend.Service;

import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalysisService {

    public Map<String, Object> analyzeData(List<String> cleanedTextData) {
        // Log the start of the analysis
        System.out.println("Starting analysis on cleaned text data...");

        // Convert the cleaned text data into a structured format
        List<Map<String, String>> structuredData = parseData(cleanedTextData);

        // Log the structured data
        structuredData.forEach(data -> System.out.println("Structured data entry: " + data));

        // Perform analysis
        Map<String, Object> insights = new HashMap<>();
        insights.put("mostSoldItems", getMostSoldItems(structuredData));
        insights.put("leastSoldItems", getLeastSoldItems(structuredData));
        insights.put("topCustomers", getTopCustomers(structuredData));
        insights.put("totalRevenue", getTotalRevenue(structuredData));

        // Log the insights
        System.out.println("Generated insights: " + insights);

        return insights;
    }

    private List<Map<String, String>> parseData(List<String> cleanedTextData) {
        List<Map<String, String>> structuredData = new ArrayList<>();
        for (String text : cleanedTextData) {
            Map<String, String> dataMap = new HashMap<>();
            // Example: Extract fields from the cleaned text
            // Assuming a format like: "item_name:Widget quantity:5 customer:Alice total_price:50.00"
            String[] fields = text.split(" ");
            for (String field : fields) {
                String[] keyValue = field.split(":");
                if (keyValue.length == 2) {
                    dataMap.put(keyValue[0], keyValue[1]);
                }
            }

            // Set default value for missing customer field
            dataMap.putIfAbsent("customer", "unknown_customer");

            // Debugging: Print structured data map
            System.out.println("Parsed data: " + dataMap);

            structuredData.add(dataMap);
        }
        return structuredData;
    }

    private List<Map.Entry<String, Double>> getMostSoldItems(List<Map<String, String>> data) {
        return data.stream()
                .filter(d -> d.get("item_name") != null && d.get("quantity") != null && isNumeric(d.get("quantity")))
                .collect(Collectors.groupingBy(d -> d.get("item_name"), Collectors.summingDouble(d -> Double.parseDouble(d.get("quantity")))))
                .entrySet().stream()
                .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
                .collect(Collectors.toList());
    }

    private List<Map.Entry<String, Double>> getLeastSoldItems(List<Map<String, String>> data) {
        return data.stream()
                .filter(d -> d.get("item_name") != null && d.get("quantity") != null && isNumeric(d.get("quantity")))
                .collect(Collectors.groupingBy(d -> d.get("item_name"), Collectors.summingDouble(d -> Double.parseDouble(d.get("quantity")))))
                .entrySet().stream()
                .sorted(Map.Entry.comparingByValue())
                .collect(Collectors.toList());
    }

    private List<Map.Entry<String, Double>> getTopCustomers(List<Map<String, String>> data) {
        return data.stream()
                .filter(d -> d.get("customer") != null && !d.get("customer").equals("unknown_customer") && d.get("total_price") != null && isNumeric(d.get("total_price")))
                .collect(Collectors.groupingBy(d -> d.get("customer"), Collectors.summingDouble(d -> Double.parseDouble(d.get("total_price")))))
                .entrySet().stream()
                .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
                .collect(Collectors.toList());
    }

    private double getTotalRevenue(List<Map<String, String>> data) {
        return data.stream()
                .filter(d -> {
                    boolean isValid = d.get("total_price") != null && isNumeric(d.get("total_price"));
                    if (!isValid) {
                        System.err.println("Invalid total_price in data: " + d);
                    }
                    return isValid;
                })
                .mapToDouble(d -> {
                    try {
                        return Double.parseDouble(d.get("total_price").trim());
                    } catch (NumberFormatException e) {
                        System.err.println("Error parsing total_price: " + d.get("total_price"));
                        return 0.0;
                    }
                })
                .sum();
    }

    private boolean isNumeric(String str) {
        if (str == null) {
            return false;
        }
        try {
            Double.parseDouble(str.trim());
        } catch (NumberFormatException e) {
            return false;
        }
        return true;
    }
}
