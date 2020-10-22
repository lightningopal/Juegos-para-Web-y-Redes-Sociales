package es.LightningOpal.Astral_Knock_Out;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;

import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class AKO_Server implements WebSocketConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(AKO_Server.class, args);
	}
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(echoHandler(), "/echo")
			.setAllowedOrigins("*");
	}
	
	@Bean
	public WebsocketHandler echoHandler() {
		return new WebsocketHandler();
	}

}
