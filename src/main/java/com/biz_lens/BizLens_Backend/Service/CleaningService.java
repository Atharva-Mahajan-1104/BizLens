package com.biz_lens.BizLens_Backend.Service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CleaningService {

    public List<String> cleanAndFormatText(String extractedText) {
        // Log the original extracted text
        System.out.println("Original extracted text: " + extractedText);

        // Normalize text to lowercase
        extractedText = extractedText.toLowerCase();
        System.out.println("After lowercase normalization: " + extractedText);

        // Remove unwanted special characters while retaining decimal points
        extractedText = extractedText.replaceAll("[^a-z0-9\\s.,]", "");
        System.out.println("After removing unwanted special characters: " + extractedText);

        // Split the extracted text into lines
        String[] lines = extractedText.split("\n");
        System.out.println("After splitting into lines:");
        for (String line : lines) {
            System.out.println("Line: " + line);
        }

        // Define expected headers
        List<String> expectedHeaders = Arrays.asList("item_name", "quantity", "unit_price", "total_price", "customer");
        Map<String, String> headerMapping = createHeaderMapping(lines[0]);

        // Prepare cleaned data in the required format
        List<String> cleanedData = new ArrayList<>();
        for (int i = 1; i < lines.length; i++) {
            String[] values = lines[i].trim().split("\\s+");
            Map<String, String> formattedData = new LinkedHashMap<>();

            for (String expectedHeader : expectedHeaders) {
                String headerInText = headerMapping.getOrDefault(expectedHeader, expectedHeader);
                int index = Arrays.asList(lines[0].split("\\s+")).indexOf(headerInText);
                formattedData.put(expectedHeader, index != -1 && index < values.length ? values[index] : "N/A");
            }

            StringBuilder formattedLine = new StringBuilder();
            for (Map.Entry<String, String> entry : formattedData.entrySet()) {
                formattedLine.append(entry.getKey()).append(":").append(entry.getValue().replaceAll("\\s+", "_")).append(" ");
            }

            cleanedData.add(formattedLine.toString().trim());
        }

        // Log cleaned data for debugging
        cleanedData.forEach(line -> System.out.println("Cleaned line: " + line));

        return cleanedData;
    }

    private Map<String, String> createHeaderMapping(String headerLine) {
        Map<String, String> headerMapping = new HashMap<>();
        String[] headers = headerLine.split("\\s+");
        for (String header : headers) {
            if (header.contains("itemname")) {
                headerMapping.put("item_name", header);
            } else if (header.contains("quantity")) {
                headerMapping.put("quantity", header);
            } else if (header.contains("unitprice")) {
                headerMapping.put("unit_price", header);
            } else if (header.contains("totalprice")) {
                headerMapping.put("total_price", header);
            } else if (header.contains("customer")) {
                headerMapping.put("customer", header);
            }
        }
        return headerMapping;
    }
}
