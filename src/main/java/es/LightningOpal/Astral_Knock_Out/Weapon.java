package es.LightningOpal.Astral_Knock_Out;

import es.LightningOpal.Astral_Knock_Out.Skills.*;

import java.util.Timer;
import java.util.TimerTask;
import java.util.Queue;

public class Weapon {
    private long attackRatio;
    private boolean canAttack;
    private Timer coolDownTimer;

    private Queue<Skill> attacks;
    private int groupSize;

    public Weapon() {
        this.canAttack = false;
    }

    public Weapon(Queue<Skill> attacks, int groupSize, long attackRatio) {
        this.attacks = attacks;
        this.groupSize = groupSize;
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

    public int getGroupSize() {
        return groupSize;
    }

    public void setGroupSize(int groupSize) {
        this.groupSize = groupSize;
    }

    public boolean attack(boolean flipped) {
        boolean attacks = this.canAttack;
        // Coger proyectiles del pool y activarlos
        if (this.canAttack) {
            this.canAttack = false;
            this.coolDownTimer.schedule(new TimerTask() {
                @Override
                public void run() {
                    coolDown();
                }
            }, this.attackRatio);
            for (int i = 0; i < this.groupSize; i++){
                Skill attack = this.attacks.poll();
                attack.SetFlipped(flipped);
                attack.activate();
                this.attacks.add(attack);
            }
        }
        return attacks;
    }

    public void coolDown() {
        this.canAttack = true;
    }
}
