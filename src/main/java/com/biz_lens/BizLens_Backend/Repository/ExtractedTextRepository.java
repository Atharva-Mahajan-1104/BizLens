package com.biz_lens.BizLens_Backend.Repository;

import com.biz_lens.BizLens_Backend.Entity.ExtractedText;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExtractedTextRepository extends JpaRepository<ExtractedText, Long> {
}
