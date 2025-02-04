package es.LightningOpal.Astral_Knock_Out;

/// Imports
import org.springframework.web.socket.WebSocketSession;

// Clase Player, que contiene la información de un jugador
public class Player extends PhysicsObject{
    /// Variables
    private int playerId;
    private WebSocketSession session;
    private String userName;
    private String playerType;
    private int points;
    private float mmr;
    private int room;
    private int skin;
    private int skill;
    private int numJumps;
    private double maxHP;
    private double currentHP;

    private Weapon basicWeapon;
    private Weapon specialWeapon;

    // Físicas
    private boolean movingLeft;
    private boolean movingRight;
    private boolean falling;

    // Constructor vacío de la clase
    public Player(){
        playerId = -1;
        numJumps = 1;
    }

    // Constructor de la clase por id
    public Player(int id){
        playerId = id;
        numJumps = 1;
    }

    // Constructor de la clase por atributos
    public Player(int id, WebSocketSession session, String userName, String type, int points, float mmr, int skill, int x, int y/*, int mSpeed, int jForce, int hp*/){
        playerId = id;
        this.session = session;
        this.userName = userName;
        playerType = type;
        this.points = points;
        this.mmr = mmr;
        this.skill = skill;
        this.setPosX(x);
        this.setPosY(y);
        switch(type){
            case "bard":
                this.setHalfHeight(55);
                this.setHalfWidth(35);
                this.setOffsetX(0);
                this.setOffsetY(22);
                this.setMoveSpeed(2);
                this.setMaxSpeed(16);
                this.setGroundDrag(3);
                this.setJumpForce(24);
                this.setMaxHP(1200);
                this.basicWeapon = new Weapon();
                break;

            case "berserker":
                this.setHalfHeight(60);
                this.setHalfWidth(25);
                this.setOffsetX(0);
                this.setOffsetY(12);
                this.setMoveSpeed(2);
                this.setMaxSpeed(15);
                this.setGroundDrag(4);
                this.setJumpForce(23);
                this.setMaxHP(1800);
                this.basicWeapon = new Weapon();
                break;
                
            case "wizard":
                this.setHalfHeight(62.5);
                this.setHalfWidth(25);
                this.setOffsetX(0);
                this.setOffsetY(12.5);
                this.setMoveSpeed(2);
                this.setMaxSpeed(22);
                this.setGroundDrag(6);
                this.setJumpForce(25);
                this.setMaxHP(1000);
                this.basicWeapon = new Weapon();
                break;
                
            case "rogue":
                this.setHalfHeight(35);
                this.setHalfWidth(31);
                this.setOffsetX(0);
                this.setOffsetY(25);
                this.setMoveSpeed(3);
                this.setMaxSpeed(26);
                this.setGroundDrag(5);
                this.setJumpForce(24);
                this.setMaxHP(800);
                this.basicWeapon = new Weapon();
                break;

            default:
                break;
        }
        switch(this.skill){
            case 1:
                this.specialWeapon = new Weapon();
            break;

            case 2:
                this.specialWeapon = new Weapon();
            break;

            case 3:
                this.specialWeapon = new Weapon();
            break;

            case 4:
                this.specialWeapon = new Weapon();
            break;
            
            default:
            this.specialWeapon = new Weapon();
            break;
        }
        numJumps = 1;
        currentHP = maxHP;
    }

    /// Getters y Setters
    public int getPlayerId(){ return playerId; }
    public void setPlayerId(int id){ playerId = id; }

    public WebSocketSession getSession() {return session;}
    public void setSession(WebSocketSession session) {this.session = session;}
    
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getPlayerType(){ return playerType; }
    public void setPlayerType(String type){ playerType = type; }

    public int getPoints() { return points; }
    public void setPoints(int points) { this.points = points; }

    public float getMMR() { return mmr; }
    public void setMMR(float mmr) { this.mmr = mmr; }

    public int getRoom() { return room; }
    public void setRoom(int room) { this.room = room; }

    public int getSkin() { return skin; }
    public void setSkin(int skin) { this.skin = skin; }

    public int getSkill() {return skill;}
    public void setSkill(int skill) {this.skill = skill;}

    public int getNumJumps(){ return numJumps; }
    public void setNumJumps(int nJ){ numJumps = nJ; }

    public double getMaxHP(){ return maxHP; }
    public void setMaxHP(double mHP){ maxHP = mHP; }

    public double getCurrentHP() { return currentHP; }
    public void setCurrentHP(double currentHP) { this.currentHP = currentHP; }

    public Weapon getBasicWeapon() { return basicWeapon; }
    public void setBasicWeapon(Weapon basicWeapon) { this.basicWeapon = basicWeapon; }

    public Weapon getSpecialWeapon() { return specialWeapon; }
    public void setSpecialWeapon(Weapon specialWeapon) { this.specialWeapon = specialWeapon; }

    // Físicas
    public boolean isMovingLeft(){ return movingLeft; }
    public void setMovingLeft(boolean mL) { movingLeft = mL; }

    public boolean isMovingRight(){ return movingRight; }
    public void setMovingRight(boolean mR) { movingRight = mR; }

    public boolean isFalling(){ return falling; }
    public void setFalling(boolean f) { falling = f; }

    public double damage (double dmg) { return currentHP -= dmg; }

    /// Otros métodos
    // Método updatePlayerValues, que actualiza los valores del jugador
    public void updatePlayerValues(boolean movingLeft_, boolean movingRight_, boolean falling_)
    {
        movingLeft = movingLeft_;
        movingRight = movingRight_;
        falling = falling_;
    }

    public void jump(){
        if (!IsOnFloor() && this.numJumps >= 1){
            this.numJumps--;
            this.setVelY(-this.getJumpForce());
        }else if (IsOnFloor()){
            this.setVelY(-this.getJumpForce());
        }
    }

    public void fall(){
        if (this.getVelY() <= 0){
            this.setVelY(0);
        }
    }

    // Método calculatePhysics, que calcula las físicas del jugador
    public void calculatePhysics()
    {
        if (IsOnFloor()){
            this.numJumps = 1;
        }
        if (movingLeft)
        {
            SetFlipped(true);
            this.setAccelX(-this.getMoveSpeed());
        }else if (movingRight)
        {
            SetFlipped(false);
            this.setAccelX(this.getMoveSpeed());
        }else{
            this.setAccelX(0);
        }

        if (this.getVelY() > -10 && !this.falling){
            this.setAccelY(1);
        }else if (this.isFalling()){
            this.setAccelY(3);
        }else{
            this.setAccelY(0);
        }
        calculateMovement();
    }

    // Método sobrescrito toString, que devuelve una cadena de texto con la información de la clase
    @Override
    public String toString(){
        return "[id="+playerId+", type="+playerType+", x="+getPosX()+", y="+getPosY()+"]";
    }
}
