package es.LightningOpal.Astral_Knock_Out;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WebsocketHandler extends TextWebSocketHandler {

	private ObjectMapper mapper = new ObjectMapper();
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println("Message received: " + message.getPayload());
	
		JsonNode node = mapper.readTree(message.getPayload());
		String name = node.get("name").asText();
		String content = node.get("message").asText();

		ObjectNode responseNode = mapper.createObjectNode();
		responseNode.put("name", "server");
		responseNode.put("user", name);
		responseNode.put("message", content);
		
		System.out.println("Message sent: " + responseNode.toString());
		session.sendMessage(new TextMessage(responseNode.toString()));
	}
}
