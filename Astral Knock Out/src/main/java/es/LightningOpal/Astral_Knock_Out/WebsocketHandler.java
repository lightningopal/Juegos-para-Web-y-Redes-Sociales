package es.LightningOpal.Astral_Knock_Out;

import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WebsocketHandler extends TextWebSocketHandler {
	
	//private SpacewarGame game = SpacewarGame.INSTANCE;
	private static final String USER_ATTRIBUTE = "USER";
	private ObjectMapper mapper = new ObjectMapper();
	private AtomicInteger userId = new AtomicInteger(0);
	//private AtomicInteger projectileId = new AtomicInteger(0);
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception
	{
		User user = new User(userId.incrementAndGet(), session);
		//session.getAttributes().put(USER_ATTRIBUTE, user);
		
		ObjectNode msg = mapper.createObjectNode();
		msg.put("event", "JOIN");
		msg.put("id", user.getUserId());
		user.getSession().sendMessage(new TextMessage(msg.toString()));
		
		System.out.println("Conectado " + user.getUserId());
		//game.addPlayer(player);
		
		//UsersController.ConnectNewUser("playerConnectedName");
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		try {
			JsonNode node = mapper.readTree(message.getPayload());
			ObjectNode msg = mapper.createObjectNode();
			User user = (User) session.getAttributes().get(USER_ATTRIBUTE);
			
			String name, password;

			switch (node.get("event").asText()) {
			case "JOIN":
				msg.put("event", "JOIN");
				msg.put("id", user.getUserId());
				//msg.put("shipType", player.getShipType());
				user.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
			case "LOGIN":
				name = node.get("name").asText();
				password = node.get("password").asText();
				
				// Check if it's correct
				if (UsersController.loginInfo.containsKey(name))
				{
					if (UsersController.loginInfo.get(name) == password)
					{
						// Pasa el login
						UsersController.ConnectNewUser(name);
					}
					else
					{
						// La contraseña es incorrecta
					}
				}
				else
				{
					// El usuario no existe
				}
				break;
			case "SIGN_UP":
				name = node.get("name").asText();
				password = node.get("password").asText();
				
				if (UsersController.loginInfo.containsKey(name))
				{
					// El usuario YA EXISTE
				}
				else
				{
					// Se crea el usuario y se le deja pasar
					UsersController.loginInfo.put(name, password);
					UsersController.ConnectNewUser(name);
				}
				
				break;
			case "REQUEST_RANKING":
				break;
			case "SEARCHING_GAME":
				break;
			case "MATCH_FOUND":
				break;
			case "REMATCH":
				break;
			/*case "JOIN ROOM":
				msg.put("event", "NEW ROOM");
				msg.put("room", "GLOBAL");
				user.getSession().sendMessage(new TextMessage(msg.toString()));
				break;*/
			case "UPDATE_MOVEMENT":
				/*player.loadMovement(node.path("movement").get("thrust").asBoolean(),
						node.path("movement").get("brake").asBoolean(),
						node.path("movement").get("rotLeft").asBoolean(),
						node.path("movement").get("rotRight").asBoolean());
				if (node.path("bullet").asBoolean()) {
					Projectile projectile = new Projectile(player, this.projectileId.incrementAndGet());
					game.addProjectile(projectile.getId(), projectile);
				}*/
				break;
			default:
				break;
			}

		} catch (Exception e) {
			System.err.println("Exception processing message " + message.getPayload());
			e.printStackTrace(System.err);
		}
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception
	{
		UsersController.DisconnectUser("playerDisconnectedName");
	}
}
