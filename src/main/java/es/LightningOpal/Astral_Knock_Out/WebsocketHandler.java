package es.LightningOpal.Astral_Knock_Out;

/// Imports
//import java.util.concurrent.atomic.AtomicInteger;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import ch.qos.logback.core.joran.conditional.ElseAction;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

// Clase WebsocketHandler, que gestiona los mensajes websocket
public class WebsocketHandler extends TextWebSocketHandler {
	/// Variables
	private static final boolean DEBUG_MODE = true;
	private static final String USER_ATTRIBUTE = "USER";
	private ObjectMapper mapper = new ObjectMapper();

	/// Métodos
	// Método afterConnectionEstablished, que se ejecuta cuando se establece una conexión al servidor
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		// Se crea un usuario para esa sesión
		User user = new User();

		// Se establece su sesión y la del player
		user.setSession(session);
		user.getPlayer_selected().setSession(session);

		// Se añade el usuario al mapa de atributos
		session.getAttributes().put(USER_ATTRIBUTE, user);

		// ObjectNode 'msg', que guarda la información del mensaje a enviar
		ObjectNode msg = mapper.createObjectNode();

		// Se guarda en el ObjectNode 'msg' el evento y la id del usuario
		msg.put("event", "JOIN");
		msg.put("id", user.getUserId());

		// Se envía el mensaje al usuario
		user.getSession().sendMessage(new TextMessage(msg.toString()));

		if (DEBUG_MODE) {
			System.out.println("Connected user with session " + user.getSession().getId() + ".");
		}

		// Se intenta escribir la información en el log
		try
		{
			AKO_Server.logWriter = new BufferedWriter(new FileWriter(AKO_Server.logFile, true));
			String time = new SimpleDateFormat("HH:mm:ss").format(Calendar.getInstance().getTime());
			AKO_Server.logWriter.write(time + " - Conected user with session " + user.getSession().getId() + ".\n");
			AKO_Server.logWriter.close();
		}
		catch (Exception e)
		{
			// Si falla, se muestra el error
			e.printStackTrace();
		}
	}

	// Método handleTextMessage, que controla los mensajes que le llegan al servidor
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		try {
			// Lee la información del mensaje en un JsonNode 'node'
			JsonNode node = mapper.readTree(message.getPayload());

			// Crea un ObjectNode 'msg' para almacenar el mensaje que será enviado posteriormente
			ObjectNode msg = mapper.createObjectNode();

			// Obtiene el usuario que ha enviado el mensaje
			User user = (User) session.getAttributes().get(USER_ATTRIBUTE);

			// Variables nombre y contraseña
			String name, password;

			if (DEBUG_MODE) {
				//System.out.println(node.get("event").asText());
			}

			// Dependiendo del tipo de evento en el mensaje, ejecuta distintas funciones
			switch (node.get("event").asText()) {
				// Cuando un usuario se une al servidor
				case "JOIN":
					// Asignar evento e id de usuario en el ObjectNode 'msg'
					msg.put("event", "JOIN");
					msg.put("id", user.getUserId());

					// Enviar el mensaje
					user.getSession().sendMessage(new TextMessage(msg.toString()));
					break;
				// Cuando un usuario se logea en el servidor
				case "LOG_IN":
					// Obtener nombre y contraseña del usuario
					name = node.get("name").asText();
					password = node.get("password").asText();

					// Si existe el nombre en los datos, comprueba que coincidan
					if (UsersController.loginInfo.containsKey(name)) {
						// Si coinciden los datos, comprueba si el usuario está ya conectado
						if (UsersController.loginInfo.get(name).equals(password.hashCode())) {
							// Si el usuario ya está conectado
							if (UsersController.CheckUserConnected(name)) {
								// Asignar evento y mensaje a enviar en el ObjectNode 'msg'
								msg.put("event", "AUTHENTICATION_ERROR");
								msg.put("message", "User is already connected");

								//Enviar el mensaje
								user.getSession().sendMessage(new TextMessage(msg.toString()));

								if (DEBUG_MODE) {
									System.out.println("Usuario ya conectado");
								}
							// Si el usuario no está conectado, pasa el login
							} else {
								// Se conecta el usuario al servidor
								User thisUser = UsersController.ConnectUser(name);

								// Se establece la sesión en usuario y jugador
								thisUser.setSession(session);
								thisUser.getPlayer_selected().setSession(session);

								// Se añade el usuario al mapa de atributos
								session.getAttributes().put(USER_ATTRIBUTE, thisUser);

								// Asignar evento, nombre de usuario e id en el ObjectNode 'msg'
								msg.put("event", "AUTHENTICATION_SUCCESS");
								msg.put("user_name", name);
								msg.put("id", thisUser.getUserId());

								// Enviar el mensaje
								user.getSession().sendMessage(new TextMessage(msg.toString()));

								if (DEBUG_MODE) {
									System.out.println("Usuario conectado: " + name);
								}
							}
						// Si los datos no coinciden, la contraseña es incorrecta
						} else {
							// Asignar evento y mensaje a enviar en el ObjectNode 'msg'
							msg.put("event", "AUTHENTICATION_ERROR");
							msg.put("message", "Password is incorrect");

							// Enviar el mensaje
							user.getSession().sendMessage(new TextMessage(msg.toString()));

							if (DEBUG_MODE) {
								System.out.println("Contraseña incorrecta");
							}
						}
					// Si el usuario no existe
					} else {
						// Asignar evento y mensaje a enviar en el ObjectNode 'msg'
						msg.put("event", "AUTHENTICATION_ERROR");
						msg.put("message", "User doesn't exist");

						// Enviar el mensaje
						user.getSession().sendMessage(new TextMessage(msg.toString()));

						if (DEBUG_MODE) {
							System.out.println("El usuario no existe");
						}
					}
					break;
				// Cuando un usuario se registra en el servidor
				case "SIGN_UP":
					// Obtener nombre y contraseña del usuario
					name = node.get("name").asText();
					password = node.get("password").asText();

					// Comprobar si ya existe un usuario con ese nombre en el servidor
					boolean userAlreadyExists = false;

					for(String username : UsersController.loginInfo.keySet()){
						if (name.equalsIgnoreCase(username))
						{
							userAlreadyExists = true;
							break;
						}
					}

					// Si el usuario ya existe
					if (userAlreadyExists) {
						// Asignar evento y mensaje a enviar en el ObjectNode 'msg'
						msg.put("event", "AUTHENTICATION_ERROR");
						msg.put("message", "There is already an user with that name");

						// Enviar el mensaje
						user.getSession().sendMessage(new TextMessage(msg.toString()));

						if (DEBUG_MODE) {
							System.out.println("Ya existe un usuario con ese nombre");
						}
					// Si el usuario no existe, se crea
					} else {
						// Se registra al nuevo usuario
						User thisUser = UsersController.RegisterNewUser(name, password);

						// Se conecta el nuevo usuario
						UsersController.ConnectNewUser(thisUser);

						// Se establece la sesión en usuario y jugador
						thisUser.setSession(session);
						thisUser.getPlayer_selected().setSession(session);

						// Se añade el usuario al mapa de atributos
						session.getAttributes().put(USER_ATTRIBUTE, thisUser);

						// Asignar evento, nombre de usuario e id en el ObjectNode 'msg'
						msg.put("event", "AUTHENTICATION_SUCCESS");
						msg.put("user_name", name);
						msg.put("id", user.getUserId());

						// Enviar el mensaje
						user.getSession().sendMessage(new TextMessage(msg.toString()));

						if (DEBUG_MODE) {
							System.out.println("Nuevo usuario: " + name);
						}
					}
					break;
				// Cuando un usuario solicita el ranking
				case "REQUEST_RANKING":
					// Obtenemos los datos del ranking
					RankingUser[] ranking = UsersController.getRankingData(user);

					// Creamos un ArrayNode 'rankingNode' para guardar a los jugadores
					ArrayNode rankingNode = mapper.createArrayNode();

					// Asignamos los datos en el ArrayNode 'rankingNode'
					for (int i = 0; i < ranking.length; i++)
					{
						// Creamos un ObjectNode 'rankingPlayer' para cada jugador
						ObjectNode rankingPlayer = mapper.createObjectNode();

						// Asignamos los datos del ObjectNode 'rankingPlayer' para este jugador
						rankingPlayer.put("name", ranking[i].getUserName());
						rankingPlayer.put("wins", ranking[i].getWinsCount());
						rankingPlayer.put("loses", ranking[i].getLosesCount());
						rankingPlayer.put("points", ranking[i].getPoints());

						// Añadimos el ObjectNode 'rankingPlayer' al ArrayNode 'rankingNode'
						rankingNode.addPOJO(rankingPlayer);
					}

					// Asignar evento y datos en el ObjectNode 'msg'
					msg.put("event", "RANKING_RESULTS");
					msg.putPOJO("ranking", rankingNode);

					// Enviar el mensaje
					user.getSession().sendMessage(new TextMessage(msg.toString()));

					if (DEBUG_MODE) {
						System.out.println("Ranking solicitado: " + user.getUser_name());
					}
					break;
				// Cuando un usuario se conecta, para recibir sus datos
				case "REQUEST_OPTIONS_DATA":
					// Asignar evento y datos en el ObjectNode 'msg'
					msg.put("event", "OPTIONS_RESULTS");
					msg.put("musicVol", user.getMusicVol());
					msg.put("sfxVol", user.getSfxVol());
					msg.put("name", user.getUser_name());
					msg.put("currency", user.getCurrency());

					// Enviar el mensaje
					user.getSession().sendMessage(new TextMessage(msg.toString()));

					if (DEBUG_MODE) {
						System.out.println("Datos de opciones solicitados: " + user.getUser_name());
					}
					break;
				case "UPDATE_VOL":
					// Esta vez no enviaremos mensaje de vuelta, ya que queremos
					// que se actualize directamente en el cliente

					// Obtenemos los datos del mensaje
					String volType = node.get("volType").asText();
					float value = (float)node.get("value").asDouble();

					// Actualizamos el valor
					if (volType.equals("musicVol"))
					{
						user.setMusicVol(value);
					}
					else if (volType.equals("sfxVol"))
					{
						user.setSfxVol(value);
					}
					else
					{
						if (DEBUG_MODE) {
							System.out.println("Tipo de volumen no reconocido: " + volType + " - " + user.getUser_name());
						}
					}

					if (DEBUG_MODE) {
						System.out.println("Actualizado volumen: " + volType + " - " + user.getUser_name());
					}
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
					// Recibir datos de control (movingLeft,movingRight...)
					// Recibir Id de la sala
					// Recibir isVersus para comunicar a SpaceGym_Game o a Tournament_Game
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
					// Cuando se solicita la creación de una partida de "space gym"
					case "CREATE_SPACE_GYM":
					// Se obtienen los atributos elegidos
					String playerType = node.get("playerType").asText();
					int secondarySkill = node.get("skill").asInt();

					// Se asignan los atributos
					user.setPlayer_selected(new Player(user.getSession(), -1, playerType, secondarySkill,
					 SpaceGym_Game.playerPosX, SpaceGym_Game.playerPosY));
					
					// Se crea la partida de space gym
					GamesManager.INSTANCE.startSpaceGym(user.getPlayer_selected());

					// Asignar evento en el ObjectNode 'msg'
					msg.put("event", "CREATED_SPACE_GYM");

					// Enviar el mensaje
					user.getSession().sendMessage(new TextMessage(msg.toString()));

					if (DEBUG_MODE) {
						name = user.getUser_name();
						System.out.println("Space Gym: " + name);
					}
					break;
					// Cuando se reciben los datos del usuario para actualizar el space gym
					case "UPDATE_SPACE_GYM":
						// Se obtiene el jugador del usuario
						Player thisPlayer = user.getPlayer_selected();

						// Se obtiene la información de movimiento del nodo
						boolean movingLeft = node.get("movingLeft").asBoolean();
						boolean movingRight = node.get("movingRight").asBoolean();
						boolean falling = node.get("falling").asBoolean();

						// Se actualizan los valores de información de movimiento del jugador
						thisPlayer.updatePlayerValues(movingLeft, movingRight, falling);
						
					break;
					case "JUMP":
						user.getPlayer_selected().jump();
					break;
					case "FALL":
						user.getPlayer_selected().fall();
					break;
					// En cualquier otro caso
				default:
					break;
			}
		} catch (Exception e) {
			// Si se produce un error, se imprime
			System.err.println("Exception processing message " + message.getPayload());
			e.printStackTrace(System.err);
		}
	}

	// Método afterConnectionClosed, que se ejecuta tras el cierre de una conexión
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
		// Obtiene el usuario de los atributos de sesión
		User user = (User) session.getAttributes().get(USER_ATTRIBUTE);

		// Intenta escribir la información en el archivo de log
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
			// Si falla, se muestra el error
			e.printStackTrace();
		}
		
		// Desconecta al usuario
		UsersController.DisconnectUser(user.getUser_name());

		if (DEBUG_MODE){
			System.out.println("Usuario desconectado: " + user.getUser_name());
		}
	}
}
