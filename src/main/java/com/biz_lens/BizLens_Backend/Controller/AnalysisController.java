package com.biz_lens.BizLens_Backend.Controller;

import com.biz_lens.BizLens_Backend.Service.AnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analyze")
public class AnalysisController {

    @Autowired
    private AnalysisService analysisService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> analyzeData(@RequestBody List<String> cleanedTextData) {
        Map<String, Object> insights = analysisService.analyzeData(cleanedTextData);
        return ResponseEntity.ok(insights);
    }
}
