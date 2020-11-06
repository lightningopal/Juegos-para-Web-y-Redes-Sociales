package es.LightningOpal.Astral_Knock_Out;

import org.springframework.web.socket.WebSocketSession;

public class Player extends PhysicsObject{
    private int playerId;
    private WebSocketSession session;
    private String playerType;
    private int skill;
    private int numJumps;
    private int maxHP;
    private int currentHP;

    // Físicas
    private boolean movingLeft;
    private boolean movingRight;
    private boolean falling;

    public Player(){
        playerId = -1;
        numJumps = 2;
    }

    public Player(int id){
        playerId = id;
        numJumps = 2;
    }

    public Player(WebSocketSession session, int id, String type, int skill, int x, int y/*, int mSpeed, int jForce, int hp*/){
        this.session = session;
        playerId = id;
        playerType = type;
        this.skill = skill;
        this.setPosX(x);
        this.setPosY(y);
        switch(type){
            case "bard":
                this.setHalfHeight(0);
                this.setHalfWidth(0);
                this.setMoveSpeed(1);
                this.setJumpForce(1);
                this.setMaxHP(100);
                break;
            case "berserker":
                this.setHalfHeight(10);
                this.setHalfWidth(10);
                this.setMoveSpeed(1);
                this.setJumpForce(1);
                this.setMaxHP(100);
                break;
            case "wizard":
                this.setHalfHeight(20);
                this.setHalfWidth(20);
                this.setMoveSpeed(1);
                this.setJumpForce(1);
                this.setMaxHP(100);
                break;
            case "rogue":
                this.setHalfHeight(30);
                this.setHalfWidth(30);
                this.setMoveSpeed(1);
                this.setJumpForce(1);
                this.setMaxHP(100);
                break;
            default:
                break;
        }
        numJumps = 2;
        currentHP = maxHP;
    }

    public int getPlayerId(){ return playerId; }
    public void setPlayerId(int id){ playerId = id; }

    public WebSocketSession getSession() {return session;}
	public void setSession(WebSocketSession session) {this.session = session;}

    public String getPlayerType(){ return playerType; }
    public void setPlayerType(String type){ playerType = type; }

    public int getSkill() {return skill;}
    public void setSkill(int skill) {this.skill = skill;}

    public int getNumJumps(){ return numJumps; }
    public void setNumJumps(int nJ){ numJumps = nJ; }

    public int getMaxHP(){ return maxHP; }
    public void setMaxHP(int mHP){ maxHP = mHP; }

    // Físicas
    public boolean isMovingLeft(){ return movingLeft; }
    public void setMovingLeft(boolean mL) { movingLeft = mL; }

    public boolean isMovingRight(){ return movingRight; }
    public void setMovingRight(boolean mR) { movingRight = mR; }

    public boolean isFalling(){ return falling; }
    public void setFalling(boolean f) { falling = f; }

    public int damage (int dmg) { return currentHP -= dmg; }

    // Generales
    public void updatePlayerValues(boolean movingLeft_, boolean movingRight_, boolean falling_)
    {
        movingLeft = movingLeft_;
        movingRight = movingRight_;
        falling = falling_;
    }

    public void calculatePhysics()
    {
        if (movingLeft)
        {
            SetFlipped(true);
            this.setAccelX(-this.getMoveSpeed());
        }
        if (movingRight)
        {
            SetFlipped(false);
            this.setAccelX(this.getMoveSpeed());
        }
        calculateMovement();
    }



    @Override
    public String toString(){
        return "[id="+playerId+", type="+playerType+", x="+getPosX()+", y="+getPosY()+"]";
    }
}
