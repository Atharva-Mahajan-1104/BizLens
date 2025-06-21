package com.biz_lens.BizLens_Backend.Service;

import com.biz_lens.BizLens_Backend.Entity.FileMetadata;
import com.biz_lens.BizLens_Backend.Repository.FileMetadataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class FileStorageService {

    @Autowired
    private FileMetadataRepository fileMetadataRepository;

    private final String uploadDir = "uploads";

    private static final Map<String, String> FILE_TYPE_MAP = new HashMap<>();
    static {
        FILE_TYPE_MAP.put("pdf", "pdf_files");
        FILE_TYPE_MAP.put("xls", "excel_files");
        FILE_TYPE_MAP.put("xlsx", "excel_files");
        FILE_TYPE_MAP.put("csv", "csv_files");
    }

    public FileMetadata storeFile(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        Path tempFilePath = Files.createTempFile(null, null);
        Files.copy(file.getInputStream(), tempFilePath, StandardCopyOption.REPLACE_EXISTING);

        String fileType = Files.probeContentType(tempFilePath);
        if (fileType == null) {
            // Additional check using file extension
            fileType = getFileTypeByExtension(fileName);
        }

        String directoryName = FILE_TYPE_MAP.getOrDefault(getFileExtension(fileName), "unknown_files");

        Path finalFilePath = Paths.get(uploadDir, directoryName, fileName); // Use simpler directory names
        Files.createDirectories(finalFilePath.getParent());
        Files.move(tempFilePath, finalFilePath, StandardCopyOption.REPLACE_EXISTING);

        FileMetadata metadata = new FileMetadata();
        metadata.setFileName(fileName);
        metadata.setFileType(fileType);
        metadata.setFilePath(finalFilePath.toString());
        metadata.setUploadDate(LocalDateTime.now());

        return fileMetadataRepository.save(metadata);
    }

    private String getFileTypeByExtension(String fileName) {
        String extension = getFileExtension(fileName);
        return FILE_TYPE_MAP.getOrDefault(extension, "unknown");
    }

    private String getFileExtension(String fileName) {
        int lastIndexOfDot = fileName.lastIndexOf('.');
        if (lastIndexOfDot != -1 && lastIndexOfDot != fileName.length() - 1) {
            return fileName.substring(lastIndexOfDot + 1).toLowerCase();
        }
        return "";
    }
}
