package es.LightningOpal.Astral_Knock_Out;

// Clase RankingUser, que guarda la información de un usuario que se muestra en el ranking
public class RankingUser {
    /// Variables
    private String userName;
    private int winsCount;
    private int losesCount;
    private int points;

    /// Constructores
    // Constructor vacío de la clase
    public RankingUser()
    {
        this.userName = "";
        this.winsCount = 0;
        this.losesCount = 0;
        this.points = 0;
    }

    // Contructor de la clase
    public RankingUser(String userName, int winsCount, int losesCount, int points) {
        this.userName = userName;
        this.winsCount = winsCount;
        this.losesCount = losesCount;
        this.points = points;
    }

    /// Getters y setters 
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getWinsCount() {
        return winsCount;
    }

    public void setWinsCount(int winsCount) {
        this.winsCount = winsCount;
    }

    public int getLosesCount() {
        return losesCount;
    }

    public void setLosesCount(int losesCount) {
        this.losesCount = losesCount;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    // Método sobrescrito toString, que devuelve una cadena de texto con la información de la clase
    @Override
    public String toString() {
        return "RankingUser [points=" + points + ", losesCount=" + losesCount + ", userName=" + userName + ", winsCount="
                + winsCount + "]";
    }
}
