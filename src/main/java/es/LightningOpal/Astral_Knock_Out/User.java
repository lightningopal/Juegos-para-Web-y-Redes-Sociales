package es.LightningOpal.Astral_Knock_Out;

import java.util.ArrayList;

import org.springframework.web.socket.WebSocketSession;

public class User {
	private int userId;
	private WebSocketSession session;
	private String user_name;
	private Player player_selected;
	private int skill_selected;
	private int difficulty_selected;
	private boolean user_searching;
	private boolean user_ready;
	private int room;
	private ArrayList<Integer> characters_available;
	private ArrayList<ArrayList<Integer>> skins_available;
	private float elo;
	private int wins;
	private int loses;
	private int currency;

	public User() {
		this.user_name = "";
		this.player_selected = new Player();
		this.elo = 100;
		this.currency = 0;
	}
	
	public User(WebSocketSession session) {
		this.session = session;
		this.user_name = "";
		this.player_selected = new Player();
		// Leer datos de usuario? (elo, currency)
	}

	// Para añadir a los datos desde los archivos
	public User(int userId, String user_name, ArrayList<Integer> characters_available,
	ArrayList<ArrayList<Integer>> skins_available, float elo, int wins, int loses, int currency) {
		this.userId = userId;
		this.user_name = user_name;
		this.characters_available = characters_available;
		this.skins_available = skins_available;
		this.elo = elo;
		this.wins = wins;
		this.loses = loses;
		this.currency = currency;
		this.player_selected = new Player();
	}
		
	/*public User(int userId, WebSocketSession session, String user_name, Player player_selected, boolean user_searching,
			boolean user_ready, float elo, int currency) {
		this.userId = userId;
		this.session = session;
		this.user_name = user_name;
		this.player_selected = player_selected;
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
	
	public Player getPlayer_selected() {
		return player_selected;
	}
	
	public void setPlayer_selected(Player player_selected) {
		this.player_selected = player_selected;
	}

	public int getSkill_selected() {
		return skill_selected;
	}
	
	public void setSkill_selected(int skill_selected) {
		this.skill_selected = skill_selected;
	}

	public int getDifficulty_selected() {
		return difficulty_selected;
	}
	
	public void setDifficulty_selected(int difficulty_selected) {
		this.difficulty_selected = difficulty_selected;
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

	public int getRoom() {
		return room;
	}
	
	public void setRoom(int room) {
		this.room = room;
	}

	public ArrayList<Integer> getCharacters_available() {
		return characters_available;
	}

	public void setCharacters_available(ArrayList<Integer> characters_available) {
		this.characters_available = characters_available;
	}

	public ArrayList<ArrayList<Integer>> getSkins_available() {
		return skins_available;
	}

	public void setSkins_available(ArrayList<ArrayList<Integer>> skins_available) {
		this.skins_available = skins_available;
	}
	
	public float getElo() {
		return elo;
	}
	
	public void setElo(float elo) {
		this.elo = elo;
	}

	public int getWins() {
		return wins;
	}
	
	public void setWins(int wins) {
		this.wins = wins;
	}

	public int getLoses() {
		return loses;
	}
	
	public void setLoses(int loses) {
		this.loses = loses;
	}
	
	public int getCurrency() {
		return currency;
	}
	
	public void setCurrency(int currency) {
		this.currency = currency;
	}
	
	@Override
	public String toString() {
		return "User [user_id="+userId+", user_name=" + user_name + ", character_selected=" +
				player_selected.toString() + ", user_ready=" + user_ready +
				", elo=" + elo + ", currency=" + currency + "]";
	}
}
