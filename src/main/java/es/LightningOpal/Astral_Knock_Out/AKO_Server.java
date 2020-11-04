package es.LightningOpal.Astral_Knock_Out;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.ArrayList;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;

import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class AKO_Server implements WebSocketConfigurer {

	// Create a log file
	public static BufferedWriter logWriter = null;
	public static String timeLog = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss").format(Calendar.getInstance().getTime());
	public static File logFile;

	public static void main(String[] args) {
		SpringApplication.run(AKO_Server.class, args);

		try {
			// Write on the log .txt file.
			logFile = new File("src/main/resources/logs/log_" + timeLog + ".txt");

			logWriter = new BufferedWriter(new FileWriter(logFile));
			String openTime = new SimpleDateFormat("HH:mm:ss").format(Calendar.getInstance().getTime());
			logWriter.write(openTime + " - Server opened.\n");
			logWriter.close();

			// Read all users from the userLogin file.
			File loginFile = new File("src/main/resources/data/userLogin.txt");
			BufferedReader br = new BufferedReader(new FileReader(loginFile));

			String[] splitStringInfo;
			String st;
			while ((st = br.readLine()) != null) {
				splitStringInfo = st.split(":");
				UsersController.loginInfo.put(splitStringInfo[0], Integer.parseInt(splitStringInfo[1]));
			}
			br.close();

			// Read all users from the usersData file.
			File usersFile = new File("src/main/resources/data/usersData.txt");
			br = new BufferedReader(new FileReader(usersFile));

			while ((st = br.readLine()) != null) {
				splitStringInfo = st.split(":");
				
				// Add characters and skins from data
				String[] char_av = splitStringInfo[2].split(","); // Ejemplo: [0,1,2,3]
				ArrayList<Integer> characters_available = new ArrayList<Integer>();
				char_av[0] = "" + char_av[0].charAt(1);
				char_av[char_av.length - 1] = "" + char_av[char_av.length - 1].charAt(0);

				for (int i = 0; i < char_av.length; i++)
				{
					characters_available.add(Integer.parseInt(char_av[i]));
				}
				
				String[] skins_av = splitStringInfo[3].split(","); // Ejemplo: [{0-2-3},{},{2},{1-3}]
				ArrayList<ArrayList<Integer>> skins_available = new ArrayList<ArrayList<Integer>>();
				skins_av[0] = skins_av[0].substring(1);
				skins_av[skins_av.length - 1] = skins_av[skins_av.length - 1].substring(0, skins_av[skins_av.length - 1].length() - 2);

				String[] skinsFromCharacter_av;
				ArrayList<Integer> auxList;

				for (int i = 0; i < skins_av.length; i++)
				{
					skinsFromCharacter_av = skins_av[i].split("-"); // Ejemplo: {0-2-3}
					auxList = new ArrayList<Integer>();
					skinsFromCharacter_av[0] = "" + skinsFromCharacter_av[0].charAt(1);
					skinsFromCharacter_av[skinsFromCharacter_av.length - 1] = "" + skinsFromCharacter_av[skinsFromCharacter_av.length - 1].charAt(0);

					for (int j = 0; j < skinsFromCharacter_av.length; j++)
					{
						auxList.add(Integer.parseInt(skinsFromCharacter_av[j]));
					}
					skins_available.add(auxList);
				}

				User userToAdd = new User(Integer.parseInt(splitStringInfo[0]), splitStringInfo[1],
				characters_available, skins_available,
				Float.parseFloat(splitStringInfo[4]), Integer.parseInt(splitStringInfo[5]), 
				Integer.parseInt(splitStringInfo[6]), Integer.parseInt(splitStringInfo[7]));

				UsersController.allUsers.put(splitStringInfo[1], userToAdd);
			}
			br.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(echoHandler(), "/ako").setAllowedOrigins("*");
	}

	@Bean
	public WebsocketHandler echoHandler() {
		return new WebsocketHandler();
	}

}
