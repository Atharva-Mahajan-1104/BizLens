package com.biz_lens.BizLens_Backend.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class ExtractedText {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long fileId; // Link to the FileMetadata entity

    @Column(columnDefinition = "LONGTEXT")
    private String text;

    private LocalDateTime extractedDate;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFileId() {
        return fileId;
    }

    public void setFileId(Long fileId) {
        this.fileId = fileId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDateTime getExtractedDate() {
        return extractedDate;
    }

    public void setExtractedDate(LocalDateTime extractedDate) {
        this.extractedDate = extractedDate;
    }
}
