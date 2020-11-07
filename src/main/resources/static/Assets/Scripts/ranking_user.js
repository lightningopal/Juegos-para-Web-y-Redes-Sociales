// Clase RankingUser, para guardas los datos de un usuario en el ranking
class RankingUser{
    // Constructor de la clase
    constructor(userName, winsCount, losesCount, points){
        this.userName = userName;
        this.winsCount = winsCount;
        this.losesCount = losesCount;
        this.points = points;
    }

    RankingUser()
    {
        this.userName = "";
        this.winsCount = 0;
        this.losesCount = 0;
        this.points = 0;
    }
}