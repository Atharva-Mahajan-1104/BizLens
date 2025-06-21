package com.biz_lens.BizLens_Backend.Service;

import com.biz_lens.BizLens_Backend.Entity.Message;
import com.biz_lens.BizLens_Backend.Repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }
}
