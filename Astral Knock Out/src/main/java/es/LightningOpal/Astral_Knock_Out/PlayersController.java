package es.LightningOpal.Astral_Knock_Out;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class PlayersController {
	// Writter for add users.
	private static BufferedWriter playerWritter = null;

	// Map to save the login info on the server memory.
	public static Map<String, String> loginInfo = new ConcurrentHashMap<>();

	// Map to save ALL USERS on the server memory.
	public static Map<String, PlayerData> allUsers = new ConcurrentHashMap<>();

	// Map to save the players on the server memory.
	private static Map<String, Integer> connectedPlayers = new ConcurrentHashMap<>();

	// Method to add a new user to the connected ones
	public static void ConnectNewUser(String playerName) {
		// If exists, add it to connected players. If it doesn't, create the user.
		if (allUsers.containsKey(playerName)) {
			// Add it to the map of connected players.
			connectedPlayers.put(playerName, allUsers.get(playerName).getId());
		} else {
			// Create a new PlayerData and establish its id and name.
			PlayerData newPlayer = new PlayerData();
			newPlayer.setId(allUsers.size());
			newPlayer.setPlayer_name(playerName);

			// Add it to the allUsers map and file data.
			allUsers.put(playerName, newPlayer);

			try {
				playerWritter = new BufferedWriter(
						new FileWriter(new File("src/main/resources/data/usersData.txt"), true));
				playerWritter.write(newPlayer.getId() + ":" + newPlayer.getPlayer_name() + ":"
						+ newPlayer.getCharacter_selection() + ":" + newPlayer.isPlayer_searching() + ":"
						+ newPlayer.isPlayer_ready() + ":" + newPlayer.getElo() + ":" + newPlayer.getCurrency() + "\n");
				playerWritter.close();
			} catch (Exception e) {
				e.printStackTrace();
			}

			// Add itto the map of connected players.
			connectedPlayers.put(playerName, allUsers.get(playerName).getId());
		}
	}

	// Method to add a new user to the connected ones
	public static void DisconnectUser(String playerName) {
		connectedPlayers.remove(playerName);
	}
}
