package es.LightningOpal.Astral_Knock_Out;

/// Imports
import java.util.ArrayList;

import org.springframework.web.socket.WebSocketSession;

// Clase User, que guarda la información de un usuario
public class User {
	/// Variables
	private int userId;
	private WebSocketSession session;
	private String user_name;
	private Player player_selected;
	private int skill_selected;
	private int difficulty_selected;
	private boolean user_searching;
	private boolean user_ready;
	private ArrayList<Integer> characters_available;
	private ArrayList<ArrayList<Integer>> skins_available;
	private float elo;
	private int wins;
	private int loses;
	private int currency;
	private float musicVol;
	private float sfxVol;

	/// Constructores
	// Constructor por defecto de la clase
	public User() {
		this.user_name = "";
		this.player_selected = new Player();
		this.elo = 1000;
		this.currency = 0;
		this.musicVol = 1.0f;
		this.sfxVol = 1.0f;
	}

	// Constructor de la clase para añadir a los datos desde los archivos
	public User(int userId, String user_name, ArrayList<Integer> characters_available,
	ArrayList<ArrayList<Integer>> skins_available, float elo, int wins, int loses,
	int currency, float musicVol, float sfxVol) {
		this.userId = userId;
		this.user_name = user_name;
		this.characters_available = characters_available;
		this.skins_available = skins_available;
		this.elo = elo;
		this.wins = wins;
		this.loses = loses;
		this.currency = currency;
		this.musicVol = musicVol;
		this.sfxVol = sfxVol;
		this.player_selected = new Player();
	}

	/// Getter y Setters
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

	public float getMusicVol() {
		return musicVol;
	}

	public void setMusicVol(float musicVol) {
		this.musicVol = musicVol;
	}

	public float getSfxVol() {
		return sfxVol;
	}

	public void setSfxVol(float sfxVol) {
		this.sfxVol = sfxVol;
	}
	
	// Método sobrescrito toString, que devuelve una cadena de texto con la información de la clase
	@Override
	public String toString() {
		return "User [user_id="+userId+", user_name=" + user_name + ", character_selected=" +
				player_selected.toString() + ", user_ready=" + user_ready +
				", elo=" + elo + ", currency=" + currency + "]";
	}
}
