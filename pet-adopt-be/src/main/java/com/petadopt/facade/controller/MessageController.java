package com.petadopt.facade.controller;

import java.util.List;

import com.petadopt.facade.model.MessageModel;
import com.petadopt.service.MessageModelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/messages")
@CrossOrigin("*")
public class MessageController {

    private final MessageModelService messageModelService;

    public MessageController(MessageModelService messageModelService) {
        this.messageModelService = messageModelService;
    }

    @PostMapping
    public void postMessage(@RequestBody MessageModel messageModel) {
        messageModelService.addMessage(messageModel);
    }

    @GetMapping
    public ResponseEntity<List<MessageModel>> getMessages() {
        List<MessageModel> messages = messageModelService.getMessages();

        return ResponseEntity.ok(messages);
    }

}
