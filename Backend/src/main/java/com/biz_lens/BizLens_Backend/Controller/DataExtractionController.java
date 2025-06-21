package com.biz_lens.BizLens_Backend.Controller;

import com.biz_lens.BizLens_Backend.Entity.ExtractedText;
import com.biz_lens.BizLens_Backend.Service.DataExtractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/extract")
public class DataExtractionController {

    @Autowired
    private DataExtractionService dataExtractionService;

    @PostMapping
    public ResponseEntity<ExtractedText> extractAndSaveText(@RequestParam("fileId") Long fileId,
                                                            @RequestParam("filePath") String filePathString) throws IOException {
        ExtractedText extractedText = dataExtractionService.extractAndSaveText(fileId, filePathString);
        return ResponseEntity.ok(extractedText);
    }
}
