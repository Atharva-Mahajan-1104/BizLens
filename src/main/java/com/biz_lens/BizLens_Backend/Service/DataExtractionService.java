package com.biz_lens.BizLens_Backend.Service;

import com.biz_lens.BizLens_Backend.Entity.ExtractedText;
import com.biz_lens.BizLens_Backend.Repository.ExtractedTextRepository;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Service
public class DataExtractionService {

    @Autowired
    private ExtractedTextRepository extractedTextRepository;

    private static final int TEXT_MAX_LENGTH = 65535; // Use a large enough length for TEXT

    public ExtractedText extractAndSaveText(Long fileId, String filePathString) throws IOException {
        Path filePath = Paths.get(filePathString);
        String fileType = Files.probeContentType(filePath);
        String extractedText;

        // Log file type detection
        System.out.println("File type detected: " + fileType);

        // Additional check for CSV files
        if (filePath.toString().endsWith(".csv")) {
            fileType = "text/csv";
        }

        switch (fileType) {
            case "application/pdf":
                extractedText = extractPDF(filePath);
                break;
            case "application/vnd.ms-excel":
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                extractedText = extractExcel(filePath);
                break;
            case "text/csv":
                extractedText = extractCSV(filePath);
                break;
            default:
                throw new IllegalArgumentException("Unsupported file type");
        }

        // Log extracted text length
        System.out.println("Extracted text length: " + extractedText.length());

        // Truncate text if it exceeds the maximum length
        if (extractedText.length() > TEXT_MAX_LENGTH) {
            extractedText = extractedText.substring(0, TEXT_MAX_LENGTH);
            System.out.println("Truncated extracted text to: " + TEXT_MAX_LENGTH + " characters.");
        }

        // Save the extracted text to the database
        ExtractedText textEntity = new ExtractedText();
        textEntity.setFileId(fileId);
        textEntity.setText(extractedText);
        textEntity.setExtractedDate(LocalDateTime.now());

        ExtractedText savedEntity = extractedTextRepository.save(textEntity);

        // Log successful saving
        System.out.println("Successfully saved extracted text for file ID: " + fileId);

        return savedEntity;
    }

    private String extractPDF(Path filePath) throws IOException {
        System.out.println("Extracting PDF content from: " + filePath);
        try (PDDocument document = PDDocument.load(Files.newInputStream(filePath))) {
            PDFTextStripper pdfStripper = new PDFTextStripper();
            String text = pdfStripper.getText(document);
            System.out.println("Extracted PDF content length: " + text.length());
            return text;
        }
    }

    private String extractExcel(Path filePath) throws IOException {
        System.out.println("Extracting Excel content from: " + filePath);
        try (Workbook workbook = WorkbookFactory.create(Files.newInputStream(filePath))) {
            Sheet sheet = workbook.getSheetAt(0);
            StringBuilder data = new StringBuilder();
            for (Row row : sheet) {
                for (Cell cell : row) {
                    data.append(cell.toString()).append(" ");
                }
                data.append("\n");
            }
            String text = data.toString();
            System.out.println("Extracted Excel content length: " + text.length());
            return text;
        }
    }

    private String extractCSV(Path filePath) throws IOException {
        System.out.println("Extracting CSV content from: " + filePath);
        try (BufferedReader br = Files.newBufferedReader(filePath)) {
            String text = br.lines().collect(Collectors.joining("\n"));
            System.out.println("Extracted CSV content length: " + text.length());
            return text;
        }
    }
}
