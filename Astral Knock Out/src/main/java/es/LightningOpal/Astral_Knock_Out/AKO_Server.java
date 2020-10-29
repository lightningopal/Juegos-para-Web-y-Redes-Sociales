package es.LightningOpal.Astral_Knock_Out;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.text.SimpleDateFormat;
import java.util.Calendar;

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
	public static String timeLog = new SimpleDateFormat("dd-MM-yyyy_HH-mm-ss").format(Calendar.getInstance().getTime());
	public static File logFile;

	public static void main(String[] args) {
		SpringApplication.run(AKO_Server.class, args);

		try {
			// Write on the log .txt file.
			logFile = new File("src/main/resources/logs/log_" + timeLog + ".txt");

			logWriter = new BufferedWriter(new FileWriter(logFile));
			String openTime = new SimpleDateFormat("HH:mm:ss").format(Calendar.getInstance().getTime());
			logWriter.write(openTime + " - Server opened\n");
			logWriter.close();

			// Read all users from the userLogin file.
			File loginFile = new File("src/main/resources/data/userLogin.txt");
			BufferedReader br = new BufferedReader(new FileReader(loginFile));

			String[] splitStringInfo;
			String st;
			while ((st = br.readLine()) != null) {
				splitStringInfo = st.split(":");
				UsersController.loginInfo.put(splitStringInfo[0], splitStringInfo[1]);
			}
			br.close();

			// Read all users from the userLogin file.
			File usersFile = new File("src/main/resources/data/usersData.txt");
			br = new BufferedReader(new FileReader(usersFile));

			while ((st = br.readLine()) != null) {
				splitStringInfo = st.split(":");
				
				/*User userToAdd = new User(Integer.parseInt(splitStringInfo[0]), splitStringInfo[1], Integer.parseInt(splitStringInfo[2]),
						Boolean.parseBoolean(splitStringInfo[3]), Boolean.parseBoolean(splitStringInfo[4]), Float.parseFloat(splitStringInfo[5]), Integer.parseInt(splitStringInfo[6]));
				UsersController.allUsers.put(userToAdd.getUser_name(), userToAdd);*/
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
