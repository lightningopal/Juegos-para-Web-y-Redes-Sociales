package es.LightningOpal.Astral_Knock_Out;

import java.util.Timer;
import java.util.TimerTask;

public class Weapon {
    private long attackRatio;
    private boolean canAttack;
    private Timer coolDownTimer;

    private int attack;

    public Weapon(int attack, long attackRatio){
        this.attack = attack;
        this.attackRatio = attackRatio;
        this.coolDownTimer = new Timer();
        this.canAttack = true;
    }

    public long getAttackRatio() {
        return attackRatio;
    }

    public void setAttackRatio(long attackRatio) {
        this.attackRatio = attackRatio;
    }

    public boolean CanAttack() {
        return canAttack;
    }

    public void setCanAttack(boolean canAttack) {
        this.canAttack = canAttack;
    }

    public int getAttack() {
        return attack;
    }

    public void setAttack(int attack) {
        this.attack = attack;
    }

    public void attack(){
        // Coger proyectiles del pool y activarlos
        this.canAttack = false;
        this.coolDownTimer.schedule(new TimerTask(){
            @Override
            public void run() {
                coolDown();
            }
        }, this.attackRatio);
    }

    public void coolDown(){
        this.canAttack = true;
    }
}
