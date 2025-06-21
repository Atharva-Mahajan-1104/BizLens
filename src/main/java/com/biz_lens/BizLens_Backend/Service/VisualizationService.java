package com.biz_lens.BizLens_Backend.Service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@Service
public class VisualizationService {

    public Map<String, Object> prepareVisualizationData(Map<String, Object> insights) {
        // Format the most sold items for visualization
        List<Map<String, Object>> mostSoldItems = ((List<Map.Entry<String, Double>>) insights.get("mostSoldItems"))
                .stream()
                .map(entry -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("item", entry.getKey());
                    map.put("quantity", entry.getValue());
                    return map;
                })
                .collect(Collectors.toList());

        // Format the least sold items for visualization
        List<Map<String, Object>> leastSoldItems = ((List<Map.Entry<String, Double>>) insights.get("leastSoldItems"))
                .stream()
                .map(entry -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("item", entry.getKey());
                    map.put("quantity", entry.getValue());
                    return map;
                })
                .collect(Collectors.toList());

        // Format the top customers for visualization
        List<Map<String, Object>> topCustomers = ((List<Map.Entry<String, Double>>) insights.get("topCustomers"))
                .stream()
                .map(entry -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("customer", entry.getKey());
                    map.put("totalSpent", entry.getValue());
                    return map;
                })
                .collect(Collectors.toList());

        // Total revenue remains the same
        Double totalRevenue = (Double) insights.get("totalRevenue");

        // Prepare the formatted data
        Map<String, Object> visualizationData = new HashMap<>();
        visualizationData.put("mostSoldItems", mostSoldItems);
        visualizationData.put("leastSoldItems", leastSoldItems);
        visualizationData.put("topCustomers", topCustomers);
        visualizationData.put("totalRevenue", totalRevenue);

        return visualizationData;
    }
}
