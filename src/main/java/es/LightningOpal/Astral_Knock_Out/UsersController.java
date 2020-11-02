package es.LightningOpal.Astral_Knock_Out;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class UsersController {
	// Writter for add users.
	private static BufferedWriter userWritter = null;

	// Map to save the login info on the server memory.
	public static Map<String, String> loginInfo = new ConcurrentHashMap<>();

	// Map to save ALL USERS on the server memory.
	public static Map<String, User> allUsers = new ConcurrentHashMap<>();

	// Map to save the players on the server memory.
	private static Map<String, Integer> connectedUsers = new ConcurrentHashMap<>();
	
	// Method to add a new user to the connected ones
	public static void ConnectNewUser(String userName) {
		// If exists, add it to connected players. If it doesn't, create the user.
		if (allUsers.containsKey(userName)) {
			// Add it to the map of connected players.
			connectedUsers.put(userName, allUsers.get(userName).getUserId());
		} else {
			// Create a new PlayerData and establish its id and name.
			User newUser = new User();
			newUser.setUserId(allUsers.size());
			newUser.setUser_name(userName);

			// Add it to the allUsers map and file data.
			allUsers.put(userName, newUser);

			try {
				userWritter = new BufferedWriter(
						new FileWriter(new File("src/main/resources/data/usersData.txt"), true));
				userWritter.write(newUser.getUserId() + ":" + newUser.getUser_name() + ":"
						+ newUser.getCharacter_selected() + ":" + newUser.isUser_searching() + ":"
						+ newUser.isUser_ready() + ":" + newUser.getElo() + ":" + newUser.getCurrency() + "\n");
				userWritter.close();
			} catch (Exception e) {
				e.printStackTrace();
			}

			// Add it to the map of connected players.
			connectedUsers.put(userName, allUsers.get(userName).getUserId());
		}
	}

	// Method to add a new user to the connected ones
	public static void DisconnectUser(String userName) {
		if (connectedUsers.containsKey(userName))
			connectedUsers.remove(userName);
	}
}
