package com.biz_lens.BizLens_Backend.Controller;

import com.biz_lens.BizLens_Backend.Service.FileAnalysisService;
import com.biz_lens.BizLens_Backend.Service.VisualizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/file-analysis")
public class FileAnalysisController {

    @Autowired
    private FileAnalysisService fileAnalysisService;

    @Autowired
    private VisualizationService visualizationService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> analyzeFile(@RequestBody Map<String, Object> requestBody) throws IOException {
        Long fileId = ((Number) requestBody.get("fileId")).longValue();
        String filePathString = (String) requestBody.get("filePath");
        Map<String, Object> insights = fileAnalysisService.analyzeFile(fileId, filePathString);
        return ResponseEntity.ok(insights);
    }

    @PostMapping("/insights")
    public ResponseEntity<Map<String, Object>> analyzeAndVisualizeFile(@RequestBody Map<String, Object> requestBody) throws IOException {
        Long fileId = ((Number) requestBody.get("fileId")).longValue();
        String filePathString = (String) requestBody.get("filePath");
        // Step 1: Analyze the file to get insights
        Map<String, Object> insights = fileAnalysisService.analyzeFile(fileId, filePathString);

        // Step 2: Prepare visualization data from insights
        Map<String, Object> visualizationData = visualizationService.prepareVisualizationData(insights);

        // Return visualization data
        return ResponseEntity.ok(visualizationData);
    }
}
