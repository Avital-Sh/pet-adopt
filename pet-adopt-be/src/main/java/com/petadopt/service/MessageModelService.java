package com.petadopt.service;

import java.util.List;

import com.petadopt.facade.model.MessageModel;
import com.petadopt.persistance.entity.MessageEntity;
import com.petadopt.persistance.repository.MessageRepository;
import org.springframework.stereotype.Service;

@Service
public class MessageModelService {

    private final MessageRepository messageRepository;

    public MessageModelService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public void addMessage(MessageModel messageModel) {
        MessageEntity messageEntity =
            MessageEntity.builder()
                .message(messageModel.getMessage())
                .author(messageModel.getAuthor())
                .build();

        messageRepository.save(messageEntity);

    }

    public List<MessageModel> getMessages() {
        List<MessageEntity> messageEntities = messageRepository.findAll();
        return messageEntities.stream().map(messageEntity -> MessageModel
                .builder()
                .message(messageEntity.getMessage())
                .postedTime(messageEntity.getPostedTime())
                .author(messageEntity.getAuthor())
                .build())
            .toList();

    }
}
