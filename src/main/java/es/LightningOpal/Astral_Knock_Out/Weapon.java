package es.LightningOpal.Astral_Knock_Out;

import es.LightningOpal.Astral_Knock_Out.Skills.*;

import java.util.Queue;
import java.util.Timer;
import java.util.TimerTask;

public class Weapon {
    private long attackRatio;
    private long attackDelay;
    private long lastAttack;

    private Queue<Skill> attacks;
    private int groupSize;

    public Weapon() {
        this.lastAttack = System.currentTimeMillis();
    }

    public Weapon(Queue<Skill> attacks, int groupSize, long attackRatio, long attackDelay) {
        this.attacks = attacks;
        this.groupSize = groupSize;
        this.attackRatio = attackRatio;
        this.attackDelay = attackDelay;
        this.lastAttack = System.currentTimeMillis();
    }

    public long getAttackRatio() {
        return attackRatio;
    }

    public void setAttackRatio(long attackRatio) {
        this.attackRatio = attackRatio;
    }

    public long getAttackDelay() {
        return attackDelay;
    }

    public void setAttackDelay(long attackDelay) {
        this.attackDelay = attackDelay;
    }

    public int getGroupSize() {
        return groupSize;
    }

    public void setGroupSize(int groupSize) {
        this.groupSize = groupSize;
    }

    public long getLastAttack() {
        return lastAttack;
    }

    public void setLastAttack(long lastAttack) {
        this.lastAttack = lastAttack;
    }

    public boolean attack() {
        boolean canAttack = false;
        if (attacks != null)
        {
            long currentTime = System.currentTimeMillis();

            // Si ha pasado el tiempo suficiente, ataca
            if (lastAttack + attackRatio <= currentTime)
            {
                canAttack = true;
                lastAttack = currentTime;

                try {
                    new Timer().schedule(new TimerTask() {
                        @Override
                        public void run() {
                            spawnAttack();
                        }
                    }, this.attackDelay);
                } catch (Exception e) {
                    System.out.println("NO PUEDE INICIAR TIMER PARA DELAY DE ATAQUE [Ratio:" +
                    attackRatio + " - Delay: " + attackDelay + "], Ataque instantaneo");
                    spawnAttack();
                }
            }
        }
        return canAttack;
    }

    public void spawnAttack(){
        for (int i = 0; i < this.groupSize; i++){
            Skill attack = this.attacks.poll();
            try {
                attack.activate();
            } catch (Exception e) {
                //TODO: handle exception
            }
            this.attacks.add(attack);
        }
    }
}
