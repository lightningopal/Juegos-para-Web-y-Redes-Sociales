package es.LightningOpal.Astral_Knock_Out;

//import java.util.concurrent.atomic.AtomicInteger;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WebsocketHandler extends TextWebSocketHandler {

	private static final boolean DEBUG_MODE = true;
	// private SpacewarGame game = SpacewarGame.INSTANCE;
	private static final String USER_ATTRIBUTE = "USER";
	private ObjectMapper mapper = new ObjectMapper();
	// private AtomicInteger projectileId = new AtomicInteger(0);

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		User user = new User(session);
		session.getAttributes().put(USER_ATTRIBUTE, user);

		ObjectNode msg = mapper.createObjectNode();
		msg.put("event", "JOIN");
		msg.put("id", user.getUserId());
		user.getSession().sendMessage(new TextMessage(msg.toString()));
		if (DEBUG_MODE) {
			System.out.println("Connected user with session " + user.getSession().getId() + ".");
		}

		// LogFile Try-Catch
		try
		{
			AKO_Server.logWriter = new BufferedWriter(new FileWriter(AKO_Server.logFile, true));
			String time = new SimpleDateFormat("HH:mm:ss").format(Calendar.getInstance().getTime());
			AKO_Server.logWriter.write(time + " - Conected user with session " + user.getSession().getId() + ".\n");
			AKO_Server.logWriter.close();
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}

		// game.addPlayer(player);
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		try {
			JsonNode node = mapper.readTree(message.getPayload());
			ObjectNode msg = mapper.createObjectNode();
			User user = (User) session.getAttributes().get(USER_ATTRIBUTE);

			String name, password;

			if (DEBUG_MODE) {
				System.out.println(node.get("event").asText());
			}

			switch (node.get("event").asText()) {
				case "JOIN":
					msg.put("event", "JOIN");
					msg.put("id", user.getUserId());
					// msg.put("shipType", player.getShipType());
					user.getSession().sendMessage(new TextMessage(msg.toString()));
					break;
				case "LOG_IN":
					name = node.get("name").asText();
					password = node.get("password").asText();

					// Check if it's correct
					if (UsersController.loginInfo.containsKey(name)) {
						if (UsersController.loginInfo.get(name).equals(password.hashCode())) {
							if (UsersController.CheckUserConnected(name)) {
								// Si el usuario ya está conectado
								msg.put("event", "ERROR");
								msg.put("message", "User already playing");
								user.getSession().sendMessage(new TextMessage(msg.toString()));
								if (DEBUG_MODE) {
									System.out.println("Usuario ya conectado");
								}
							} else {
								// Pasa el login
								User mUser = UsersController.ConnectNewUser(name);
								msg.put("event", "AUTENTICATION_SUCCESS");
								msg.put("user_name", name);
								msg.put("id", mUser.getUserId());
								mUser.setSession(session);
								mUser.getPlayer_selected().setSession(session);
								session.getAttributes().put(USER_ATTRIBUTE, mUser);
								mUser.getSession().sendMessage(new TextMessage(msg.toString()));
								if (DEBUG_MODE) {
									System.out.println("Usuario conectado: " + name);
								}
							}
						} else {
							// La contraseña es incorrecta
							msg.put("event", "ERROR");
							msg.put("message", "Wrong password");
							user.getSession().sendMessage(new TextMessage(msg.toString()));
							if (DEBUG_MODE) {
								System.out.println("Contraseña incorrecta");
							}
						}
					} else {
						// El usuario no existe
						msg.put("event", "ERROR");
						msg.put("message", "Wrong user name");
						user.getSession().sendMessage(new TextMessage(msg.toString()));
						if (DEBUG_MODE) {
							System.out.println("El usuario no existe");
						}
					}
					break;
				case "SIGN_UP":
					name = node.get("name").asText();
					password = node.get("password").asText();

					// Check if already exists
					boolean userAlreadyExists = false;

					for(String username : UsersController.loginInfo.keySet()){
						if (name.equalsIgnoreCase(username))
						{
							userAlreadyExists = true;
							break;
						}
					}

					if (userAlreadyExists) {
						// El usuario YA EXISTE
						msg.put("event", "ERROR");
						msg.put("message", "User name already exists");
						user.getSession().sendMessage(new TextMessage(msg.toString()));
						if (DEBUG_MODE) {
							System.out.println("Ya existe un usuario con ese nombre");
						}
					} else {
						// Se crea el usuario y se le deja pasar
						UsersController.RegisterNewUser(name, password);
						User mUser = UsersController.ConnectNewUser(name);
						mUser.setSession(session);
						session.getAttributes().put(USER_ATTRIBUTE, mUser);
						msg.put("event", "AUTENTICATION_SUCCESS");
						msg.put("user_name", name);
						msg.put("id", mUser.getUserId());
						mUser.getSession().sendMessage(new TextMessage(msg.toString()));
						if (DEBUG_MODE) {
							System.out.println("Nuevo usuario: " + name);
						}
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
				/*
				 * case "JOIN ROOM": msg.put("event", "NEW ROOM"); msg.put("room", "GLOBAL");
				 * user.getSession().sendMessage(new TextMessage(msg.toString())); break;
				 */
				case "UPDATE_GAME_STATE":
					/*
					 * player.loadMovement(node.path("movement").get("thrust").asBoolean(),
					 * node.path("movement").get("brake").asBoolean(),
					 * node.path("movement").get("rotLeft").asBoolean(),
					 * node.path("movement").get("rotRight").asBoolean()); if
					 * (node.path("bullet").asBoolean()) { Projectile projectile = new
					 * Projectile(player, this.projectileId.incrementAndGet());
					 * game.addProjectile(projectile.getId(), projectile); }
					 */
					break;
					case "CREATE_SPACE_GYM":
					name = node.get("name").asText();
					//user.setPlayer_selected(player_selected);
					GamesManager.INSTANCE.startSpaceGym(user.getPlayer_selected());

					msg.put("event", "CREATED_SPACE_GYM");
					user.getSession().sendMessage(new TextMessage(msg.toString()));
					if (DEBUG_MODE) {
						System.out.println("Space Gym: " + name);
					}

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
	public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
		User user = (User) session.getAttributes().get(USER_ATTRIBUTE);

		// LogFile Try-Catch
		try
		{
			AKO_Server.logWriter = new BufferedWriter(new FileWriter(AKO_Server.logFile, true));
			String time = new SimpleDateFormat("HH:mm:ss").format(Calendar.getInstance().getTime());
			if (user.getUser_name() != "")
			{
				AKO_Server.logWriter.write(time + " - Player disconnected: " + user.getUser_name() + ".\n");
			}
			else
			{
				AKO_Server.logWriter.write(time + " - Disconnected user with session " + user.getSession().getId() + ".\n");
			}
			AKO_Server.logWriter.close();
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		
		UsersController.DisconnectUser(user.getUser_name());
		if (DEBUG_MODE){
			System.out.println("Usuario desconectado: " + user.getUser_name());
			System.out.println(user);
		}
	}
}
