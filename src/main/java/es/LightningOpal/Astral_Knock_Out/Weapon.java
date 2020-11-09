package es.LightningOpal.Astral_Knock_Out;

import es.LightningOpal.Astral_Knock_Out.Skills.*;

import java.util.Timer;
import java.util.TimerTask;

public class Weapon {
    private long attackRatio;
    private boolean canAttack;
    private Timer coolDownTimer;

    private Skill attack;

    public Weapon(){
        this.canAttack = false;
    }

    public Weapon(Skill attack, long attackRatio){
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

    public Skill getAttack() {
        return attack;
    }

    public void setAttack(Skill attack) {
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
        this.attack.activate();
    }

    public void coolDown(){
        this.canAttack = true;
    }
}
