package com.biz_lens.BizLens_Backend.Repository;

import com.biz_lens.BizLens_Backend.Entity.FileMetadata;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileMetadataRepository extends JpaRepository<FileMetadata,Long> {
}
