package com.biz_lens.BizLens_Backend.Controller;

import com.biz_lens.BizLens_Backend.Entity.FileMetadata;
import com.biz_lens.BizLens_Backend.Service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/files")
public class FileController {

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/upload")
    public ResponseEntity<FileMetadata> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        FileMetadata metadata = fileStorageService.storeFile(file);
        return ResponseEntity.ok(metadata);
    }
}
