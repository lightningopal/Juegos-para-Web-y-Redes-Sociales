package es.LightningOpal.Astral_Knock_Out;

/// Imports
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

// Clase UsersController, que se encarga de los usuarios
public class UsersController {
	/// Variables
	//// Writters
	// Writter para añadir usarios
	private static BufferedWriter userWritter = null;

	// Writter para añadir la información del login
	private static BufferedWriter loginWritter = null;

	//// Mapas
	// Mapa para guardar la información del login en la memoria del server
	public static Map<String, Integer> loginInfo = new ConcurrentHashMap<>();

	// Mapa para guardar la información de TODOS los usuarios en la memoria del
	// server
	public static Map<String, User> allUsers = new ConcurrentHashMap<>();

	// Mapa para guardar la información de los usuarios conectados en la memoria del
	// server
	private static Map<String, Integer> connectedUsers = new ConcurrentHashMap<>();

	/// CONCURRENCIA
	private static Lock writterLock = new ReentrantLock();

	/// Métodos
	// Método ConnectUser, que conecta un usuario al servidor
	public static User ConnectUser(String userName) {
		// Se obtiene el usuario del mapa de usuarios
		User thisUser = allUsers.get(userName);

		// Se añade el usuario al mapa de conectados
		connectedUsers.put(userName, thisUser.getUserId());

		// Intenta escribir en el archivo de log
		try {
			AKO_Server.logWriter = new BufferedWriter(new FileWriter(AKO_Server.logFile, true));
			String time = new SimpleDateFormat("HH:mm:ss").format(Calendar.getInstance().getTime());
			AKO_Server.logWriter.write(time + " - Player connected: " + userName + ".\n");
			AKO_Server.logWriter.close();
		} catch (Exception e) {
			// Si falla, muestra el error
			e.printStackTrace();
		}

		// Lo añade al mapa de usuarios conectados
		connectedUsers.put(userName, thisUser.getUserId());

		// Devuelve el usuario
		return thisUser;
	}

	// Método ConnectNewUser, que conecta un nuevo usuario al servidor
	public static void ConnectNewUser(User thisUser) {
		// Obtiene el nombre del usuario
		String userName = thisUser.getUser_name();

		// Se añade el usuario al mapa de usuarios
		allUsers.put(userName, thisUser);

		// Intenta escribir la información del nuevo usuario en el archivo de datos 'usersData.txt'
		try {
			// Cerramos el cierre de escritura mientras escribimos
			writterLock.lock();

			userWritter = new BufferedWriter(new FileWriter(new File("src/main/resources/data/usersData.txt"), true));

			String characters_available = "[0,1,2,3]";
			String skins_available = "[{0},{0},{0},{0}}]";

			userWritter.write(thisUser.getUserId() + ":" + thisUser.getUser_name() + ":" + characters_available + ":"
					+ skins_available + ":" + thisUser.getElo() + ":" + thisUser.getWins() + ":" + thisUser.getLoses()
					+ ":" + thisUser.getCurrency() + ":" + thisUser.getMusicVol() + ":" + thisUser.getSfxVol() + "\n");

			userWritter.close();
			
			// Liberamos el cierre de escritura
			writterLock.unlock();
		} catch (Exception e) {
			// Si falla, muestra el error
			e.printStackTrace();
		}

		// Lo añade al mapa de usuarios conectados
		connectedUsers.put(userName, allUsers.get(userName).getUserId());
	}

	// Método DisconnectUser, que desconecta a un jugador del servidor
	public static void DisconnectUser(String userName) {
		// Si está conectado, lo desconecta
		if (connectedUsers.containsKey(userName))
			connectedUsers.remove(userName);
	}

	// Método CheckUserConected, que comprueba si un usuario está conectado al
	// servidor
	public static boolean CheckUserConnected(String userName) {
		return connectedUsers.containsKey(userName);
	}

	// Método RegisterNewUser, que registra a un nuevo usuario
	public static User RegisterNewUser(String name, String password) {
		// Encripta la contraseña y añade la información de inicio de sesión al mapa de
		// login
		int hashedPassword = password.hashCode();
		loginInfo.put(name, hashedPassword);

		// Intenta escribir en el archivo de login
		try {
			loginWritter = new BufferedWriter(new FileWriter(new File("src/main/resources/data/usersLogin.txt"), true));
			loginWritter.write(name + ":" + hashedPassword + "\n");
			loginWritter.close();
		} catch (Exception e) {
			// Si falla, muestra el error
			e.printStackTrace();
		}

		// Intenta escribir en el archivo de log
		try {
			AKO_Server.logWriter = new BufferedWriter(new FileWriter(AKO_Server.logFile, true));
			String time = new SimpleDateFormat("HH:mm:ss").format(Calendar.getInstance().getTime());
			AKO_Server.logWriter.write(time + " - Player registered: " + name + ".\n");
			AKO_Server.logWriter.close();
		} catch (Exception e) {
			// Si falla, muestra el error
			e.printStackTrace();
		}

		// Crea el nuevo usuario y asigna su id y nombre
		User newUser = new User();
		newUser.setUserId(allUsers.size());
		newUser.setUser_name(name);

		// Devuelve el usuario
		return newUser;
	}

	// Método getRankingData, que devuelve los datos del ranking de jugadores
	public static RankingUser[] getRankingData(User thisUser) {
		// Creamos el array de datos del ranking de 11 posiciones (10 jugadores + el propio jugador)
		RankingUser[] ranking = new RankingUser[11];

		// Definimos una variable que controle quien tiene mejor elo y el nombre del jugador
		float maxElo;
		String userName;

		// Definimos una variable que controle el numero de usuarios ya en el ranking
		int usersInRanking = 0;

		// Recorremos los usuarios para saber quienes tienen más elo
		for (int i = 0; i < ranking.length - 1; i++)
		{
			// Reseteamos la variable que controla el elo máximo y el nombre del jugador
			maxElo = 0;
			userName = "";

			// En cada iteración comprobamos por cada usuario quien tiene más elo
			for (User user : allUsers.values()) {
				// Si el elo del usuario supera al máximo actual
				if (user.getElo() > maxElo)
				{
					// Comprobamos que el usuario no esté ya en el ranking
					boolean alreadyOnRanking = false;

					for (int j = 0; j < usersInRanking; j++)
					{
						if (user.getUser_name().equals(ranking[j].getUserName()))
						{
							alreadyOnRanking = true;
							break;
						}
					}

					// Si no está en el ranking
					if (!alreadyOnRanking)
					{
						// Actualizar el elo máximo y el nombre de usuario de quien lo tiene
						maxElo = user.getElo();
						userName = user.getUser_name();
					}
				}
			}

			// Escribimos en el ranking los valores del jugador
			if (userName != "")
			{
				int wins = allUsers.get(userName).getWins();
				int loses = allUsers.get(userName).getLoses();
				int points = Math.round(allUsers.get(userName).getElo());
				ranking[i] = new RankingUser(userName, wins, loses, points);

			// Aumentamos el número de usuarios en el ranking
			usersInRanking++;
			}
			else
			{
				for (int x = i; x < ranking.length - 1; x++)
				{
					ranking[x] = new RankingUser();
				}
				break;
			}
		}

		// En la última posición, escribimos los valores del jugador que solicita el ranking
		int wins = thisUser.getWins();
		int loses = thisUser.getLoses();
		int points = Math.round(thisUser.getElo());
		String thisUserName = thisUser.getUser_name();
		ranking[10] = new RankingUser(thisUserName, wins, loses, points);

		// Devolvemos el ranking
		return ranking;
	}

	// Método writeUsersData, que escribe TODOS LOS DATOS DE LOS USUARIOS en el archivo 'usersData.txt'
	public static void writeUsersData()
	{
		// Intenta escribir la información de los usuarios en el archivo de datos 'usersData.txt'
		try {
			// Cerramos el cierre de escritura mientras escribimos
			writterLock.lock();

			userWritter = new BufferedWriter(new FileWriter(new File("src/main/resources/data/usersData.txt")));

			// Definimos variables que usaremos luego
			String characters_available; // Ejemplo: [0,1,2,3]
			String skins_available; // Ejemplo: [{0-2-3},{},{2},{1-3}]

			// Por cada usuario, escribimos sus datos en el archivo
			for (User thisUser : allUsers.values()) {

				// Personajes
				characters_available = "[";

				// Por cada personaje, añadirlo a la string
				for (Integer characterID : thisUser.getCharacters_available()) {
					characters_available += characterID + ",";
				}

				// Borrar la última ',' y añadir el cierre ']'
				characters_available = characters_available.substring(0, characters_available.length() - 1);
				characters_available += "]";

				//System.out.println("Datos:" + thisUser.getSkins_available().get(0).toString());
				// Aspectos
				skins_available = "[";

				// Por cada personaje, añadir los cierres
				for (Integer characterID : thisUser.getCharacters_available()) {
					skins_available += "{";
					// Por cada aspecto, añadirlo a la string
					for (Integer skinID: thisUser.getSkins_available().get(characterID))
					{
						skins_available += skinID + "-";
					}
					// Borrar el último '-' y añadir el cierre '}' y el carácter ','
					skins_available = skins_available.substring(0, skins_available.length() - 1);
					skins_available += "},";
				}

				// Borrar el último ',' y añadir el cierre ']'
				skins_available = skins_available.substring(0, skins_available.length() - 1);
				skins_available += "]";	

				userWritter.write(thisUser.getUserId() + ":" + thisUser.getUser_name() + ":" + characters_available + ":"
					+ skins_available + ":" + thisUser.getElo() + ":" + thisUser.getWins() + ":" + thisUser.getLoses()
					+ ":" + thisUser.getCurrency() + ":" + thisUser.getMusicVol() + ":" + thisUser.getSfxVol() + "\n");
			}
			userWritter.close();

			// Liberamos el cierre de escritura
			writterLock.unlock();

			System.out.println("Datos del servidor guardados.");

		} catch (Exception e) {
			// Si falla, muestra el error
			e.printStackTrace();
		}

		// Intenta escribir en el archivo de log
		try {
			AKO_Server.logWriter = new BufferedWriter(new FileWriter(AKO_Server.logFile, true));
			String time = new SimpleDateFormat("HH:mm:ss").format(Calendar.getInstance().getTime());
			AKO_Server.logWriter.write(time + " - Users data saved.\n");
			AKO_Server.logWriter.close();
		} catch (Exception e) {
			// Si falla, muestra el error
			e.printStackTrace();
		}
	}
}
