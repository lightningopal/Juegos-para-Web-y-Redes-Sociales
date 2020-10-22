package es.LightningOpal.Astral_Knock_Out;

public class PlayerData {
	private int id;
	private String player_name;
	private int character_selection;
	private boolean player_searching;
	private boolean player_ready;
	
	private float elo;
	private int currency;

	public PlayerData() {
		this.character_selection = -1;
		this.elo = 100;
		this.currency = 0;
	}
	
	public PlayerData(int id_, String player_name_, int character_selection_, boolean player_searching_, boolean player_ready_, float elo_, int currency_) {
		this.id = id_;
		this.player_name = player_name_;
		this.character_selection = character_selection_;
		this.player_searching = player_searching_;
		this.player_ready = player_ready_;
		this.elo = elo_;
		this.currency = currency_;
	}
	
	public int getId() {
		return id;
	}
	
	public void setId(int i) {
		id = i;
	}

	public String getPlayer_name() {
		return player_name;
	}

	public void setPlayer_name(String player_name) {
		this.player_name = player_name;
	}
	
	public int getCharacter_selection() {
		return character_selection;
	}

	public void setCharacter_selection(int character_selection) {
		this.character_selection = character_selection;
	}
	
	public boolean isPlayer_searching() {
		return player_searching;
	}

	public void setPlayer_searching(boolean player_searching) {
		this.player_searching = player_searching;
	}

	public boolean isPlayer_ready() {
		return player_ready;
	}

	public void setPlayer_ready(boolean player_ready) {
		this.player_ready = player_ready;
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
		return "Player [player_name=" + player_name + ", character_selection=" +
				character_selection + ", player_ready=" + player_ready +
				", elo=" + elo + ", currency=" + currency + "]";
	}
}
