package com.socket.e2e.Controller;

import com.socket.e2e.DTO.ChatMessage;
import com.socket.e2e.Service.ChatRoomService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin(origins = "*")
public class ChatController {

    @Autowired private SimpMessagingTemplate messagingTemplate;
    @Autowired private ChatRoomService chatRoomService;

    Logger logger = LoggerFactory.getLogger(ChatController.class);

    @MessageMapping("/chat")
    public void processMessage(@Payload ChatMessage chatMessage) {
        var chatId = chatRoomService
                .getChatId(chatMessage.getSenderId(), chatMessage.getRecipientId(), true);
        chatMessage.setChatId(chatId.get());

        ChatMessage recievedMessage = new ChatMessage();
        recievedMessage.setId(chatMessage.getId());
        recievedMessage.setSenderId(chatMessage.getSenderId());
        recievedMessage.setSenderName(chatMessage.getSenderName());
        recievedMessage.setContent(chatMessage.getContent());
        logger.info(chatMessage.getSenderName() + " sent '"+ chatMessage.getContent() +"' to " + chatMessage.getRecipientName());
        messagingTemplate.convertAndSendToUser( chatMessage.getRecipientId(),"/queue/messages", recievedMessage );
    }
}
