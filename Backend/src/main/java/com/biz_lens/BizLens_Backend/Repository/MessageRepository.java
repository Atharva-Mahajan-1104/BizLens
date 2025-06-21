package com.biz_lens.BizLens_Backend.Repository;

import com.biz_lens.BizLens_Backend.Entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
}
