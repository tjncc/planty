package plantorganizer.controller;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.security.Principal;
import java.util.Map;

@Controller
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @PostMapping(value="/sendMessageRest")
    public ResponseEntity<?> sendMessage(@RequestBody Map<String, String> message) {
        if (message.containsKey("message")) {
            if (message.containsKey("toId") && message.get("toId") != null && !message.get("toId").equals("")) {
                this.simpMessagingTemplate.convertAndSend("/socket-publisher/" + message.get("toId"), message);
                this.simpMessagingTemplate.convertAndSend("/socket-publisher/" + message.get("fromId"), message);
            } else {
                this.simpMessagingTemplate.convertAndSend("/socket-publisher", message);
            }
            return new ResponseEntity<>(message, new HttpHeaders(), HttpStatus.OK);
        }

        return new ResponseEntity<>(new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }


    @MessageMapping("/send/message")
    public Map<String, String> broadcastNotification(Principal principal, String message) {
        Map<String, String> messageConverted = parseMessage(message);

        if (messageConverted != null) {
            if (messageConverted.containsKey("toId") && messageConverted.get("toId") != null
                    && !messageConverted.get("toId").equals("")) {
                this.simpMessagingTemplate.convertAndSend("/socket-publisher/" + messageConverted.get("toId"),
                        messageConverted);
                this.simpMessagingTemplate.convertAndSend("/socket-publisher/" + messageConverted.get("fromId"),
                        messageConverted);
            } else {
                this.simpMessagingTemplate.convertAndSend("/socket-publisher", messageConverted);
            }
        }

        return messageConverted;
    }

    @SuppressWarnings("unchecked")
    private Map<String, String> parseMessage(String message) {
        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> retVal;

        try {
            retVal = mapper.readValue(message, Map.class); // parsiranje JSON stringa
        } catch (IOException e) {
            retVal = null;
        }

        return retVal;
    }
}
