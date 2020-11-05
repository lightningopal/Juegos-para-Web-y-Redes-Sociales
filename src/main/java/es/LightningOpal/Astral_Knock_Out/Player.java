package es.LightningOpal.Astral_Knock_Out;

import org.springframework.web.socket.WebSocketSession;

public class Player extends PhysicsObject{
    private int playerId;
    private WebSocketSession session;
    private String playerType;
    private float colliderWidth;
    private float colliderHeight;
    private float moveSpeed;
    private float jumpForce;
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

    public Player(int id, String type, int x, int y, int mSpeed, int jForce, int hp){
        playerId = id;
        playerType = type;
        this.setPosX(x);
        this.setPosY(y);
        switch(type){
            case "bard":
                colliderWidth = 0;
                colliderHeight = 0;
                break;
            case "berserker":
                colliderWidth = 10;
                colliderHeight = 10;
                break;
            case "wizard":
                colliderWidth = 20;
                colliderHeight = 20;
                break;
            case "rogue":
                colliderWidth = 30;
                colliderHeight = 30;
                break;
            default:
                break;
        }
        moveSpeed = mSpeed;
        jumpForce = jForce;
        numJumps = 2;
        maxHP = hp;
        currentHP = hp;
    }

    public int getPlayerId(){ return playerId; }
    public void setPlayerId(int id){ playerId = id; }

    public WebSocketSession getSession() {return session;}
	public void setSession(WebSocketSession session) {this.session = session;}

    public String getPlayerType(){ return playerType; }
    public void setPlayerType(String type){ playerType = type; }

    public float getColliderW(){ return colliderWidth; }
    public void setColliderW(float cW){ colliderWidth = cW; }

    public float getColliderH(){ return colliderHeight; }
    public void setColliderH(float cH){ colliderHeight = cH; }

    public float getMoveSpeed(){ return moveSpeed; }
    public void setMoveSpeed(float mS){ moveSpeed = mS; }

    public float getJumpForce(){ return jumpForce; }
    public void setJumpForce(float jF){ jumpForce = jF; }

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
    @Override
    public String toString(){
        return "[id="+playerId+", type="+playerType+", x="+getPosX()+", y="+getPosY()+"]";
    }
}
