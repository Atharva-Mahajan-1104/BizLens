package com.biz_lens.BizLens_Backend.Controller;

import com.biz_lens.BizLens_Backend.Service.CleaningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clean")
public class CleaningController {

    @Autowired
    private CleaningService cleaningService;

    @PostMapping
    public ResponseEntity<List<String>> cleanText(@RequestBody String extractedText) {
        List<String> cleanedText = cleaningService.cleanAndFormatText(extractedText);
        return ResponseEntity.ok(cleanedText);
    }
}
