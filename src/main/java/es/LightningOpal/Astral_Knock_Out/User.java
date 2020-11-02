package es.LightningOpal.Astral_Knock_Out;

import org.springframework.web.socket.WebSocketSession;

public class User {
	private int userId;
	private WebSocketSession session;
	private String user_name;
	private int character_selected;
	private boolean user_searching;
	private boolean user_ready;
	
	private float elo;
	private int wins;
	private int loses;
	private int currency;

	public User() {
		this.character_selected = -1;
		this.elo = 100;
		this.currency = 0;
	}
	
	public User(int userId, WebSocketSession session) {
		this.userId = userId;
		this.session = session;
		this.character_selected = -1;
		// Leer datos de usuario? (elo, currency)
	}
		
	/*public User(int userId, WebSocketSession session, String user_name, int character_selected, boolean user_searching,
			boolean user_ready, float elo, int currency) {
		this.userId = userId;
		this.session = session;
		this.user_name = user_name;
		this.character_selected = character_selected;
		this.user_searching = user_searching;
		this.user_ready = user_ready;
		this.elo = elo;
		this.currency = currency;
	}*/


	public int getUserId() {
		return userId;
	}


	public void setUserId(int userId) {
		this.userId = userId;
	}

	
	public WebSocketSession getSession() {
		return session;
	}

	public void setSession(WebSocketSession session) {
		this.session = session;
	}

	public String getUser_name() {
		return user_name;
	}
	
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	
	public int getCharacter_selected() {
		return character_selected;
	}
	
	public void setCharacter_selected(int character_selected) {
		this.character_selected = character_selected;
	}

	public boolean isUser_searching() {
		return user_searching;
	}
	
	public void setUser_searching(boolean user_searching) {
		this.user_searching = user_searching;
	}
	
	public boolean isUser_ready() {
		return user_ready;
	}

	public void setUser_ready(boolean user_ready) {
		this.user_ready = user_ready;
	}
	
	public float getElo() {
		return elo;
	}
	
	public void setElo(float elo) {
		this.elo = elo;
	}
	
	public int getCurrency() {
		return currency;
	}
	
	public void setCurrency(int currency) {
		this.currency = currency;
	}
	
	@Override
	public String toString() {
		return "Player [user_name=" + user_name + ", character_selected=" +
				character_selected + ", user_ready=" + user_ready +
				", elo=" + elo + ", currency=" + currency + "]";
	}
}
