package es.LightningOpal.Astral_Knock_Out;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class UsersController {
	/// Writters
	// Writter for add users.
	private static BufferedWriter userWritter = null;

	// Writter for add users.
	private static BufferedWriter loginWritter = null;

	/// Maps
	// Map to save the login info on the server memory.
	public static Map<String, Integer> loginInfo = new ConcurrentHashMap<>();

	// Map to save ALL USERS on the server memory.
	public static Map<String, User> allUsers = new ConcurrentHashMap<>();

	// Map to save the players on the server memory.
	private static Map<String, Integer> connectedUsers = new ConcurrentHashMap<>();
	
	/// Methods
	// Method to add a new user to the connected ones
	public static User ConnectNewUser(String userName) {
		// If exists, add it to connected players. If it doesn't, create the user.
		if (allUsers.containsKey(userName)) {
			// Add it to the map of connected players.
			connectedUsers.put(userName, allUsers.get(userName).getUserId());

			// LogFile Try-Catch
			try
			{
				AKO_Server.logWriter = new BufferedWriter(new FileWriter(AKO_Server.logFile, true));
				String time = new SimpleDateFormat("HH:mm:ss").format(Calendar.getInstance().getTime());
				AKO_Server.logWriter.write(time + " - Player connected: " + userName + ".\n");
				AKO_Server.logWriter.close();
			}
			catch (Exception e)
			{
				e.printStackTrace();
			}

			return allUsers.get(userName);
		} else {
			// Create a new PlayerData and establish its id and name.
			User newUser = new User();
			newUser.setUserId(allUsers.size());
			newUser.setUser_name(userName);

			// Add it to the allUsers map and file data.
			allUsers.put(userName, newUser);

			/*this.userId = userId;
			this.user_name = user_name;
			this.characters_available = characters_available;
			this.skins_available = skins_available;
			this.elo = elo;
			this.wins = wins;
			this.loses = loses;
			this.currency = currency;*/

			try {
				// Format characters and skins BY DEFAULT
				String characters_available = "[0,1,2]";
				String skins_available = "[{},{},{},{}}]";

				userWritter = new BufferedWriter(new FileWriter(new File("src/main/resources/data/usersData.txt"), true));

				userWritter.write(newUser.getUserId() + ":" + newUser.getUser_name() + ":" +
				characters_available + ":" + skins_available + ":" + newUser.getElo() + ":" +
				newUser.getWins() + ":" + newUser.getLoses() + ":"+ newUser.getCurrency() + "\n");

				userWritter.close();
			} catch (Exception e) {
				e.printStackTrace();
			}

			// Add it to the map of connected players.
			connectedUsers.put(userName, allUsers.get(userName).getUserId());
			return newUser;
		}
	}

	// Method to add a new user to the connected ones
	public static void DisconnectUser(String userName) {
		if (connectedUsers.containsKey(userName))
			connectedUsers.remove(userName);
	}

	public static boolean CheckUserConnected(String userName){
		return connectedUsers.containsKey(userName);
	}

	public static void RegisterNewUser(String name, String password)
	{
		int hashedPassword = password.hashCode();
		loginInfo.put(name, hashedPassword);

		// UserLogin Try-Catch
		try
		{
			loginWritter = new BufferedWriter(new FileWriter(new File("src/main/resources/data/userLogin.txt"), true));
			loginWritter.write(name + ":" + hashedPassword + "\n");
			loginWritter.close();
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}

		// LogFile Try-Catch
		try
		{
			AKO_Server.logWriter = new BufferedWriter(new FileWriter(AKO_Server.logFile, true));
			String time = new SimpleDateFormat("HH:mm:ss").format(Calendar.getInstance().getTime());
			AKO_Server.logWriter.write(time + " - Player registered: " + name + ".\n");
			AKO_Server.logWriter.close();
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
	}
}
