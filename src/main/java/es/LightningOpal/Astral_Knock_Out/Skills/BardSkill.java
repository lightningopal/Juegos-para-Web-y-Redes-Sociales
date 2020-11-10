package es.LightningOpal.Astral_Knock_Out.Skills;

import es.LightningOpal.Astral_Knock_Out.*;
import java.util.Timer;
import java.util.TimerTask;

public class BardSkill extends Skill {

    private double damage;

    private long elapsedTime;
    private long startTime;

    public BardSkill(PhysicsObject caster, PhysicsObject target, long duration, boolean collidePlaforms, double speed, double damage) {
        super(caster, target, duration, 10, 15, collidePlaforms);
        this.setMoveSpeed(speed);
        this.damage = damage;
    }

    public double getDamage() {
        return damage;
    }
    public void setDamage(double damage) {
        this.damage = damage;
    }

    @Override
    public void activate() {
        super.activate();
        // Activar habilidad
        this.setPosX(caster.getPosX());
        this.setPosY(caster.getPosY());
        this.isActive = true;
        stopTimer.cancel();
        stopTimer.purge();
        stopTimer = new Timer();
        stopTimer.schedule(new TimerTask() {
            @Override
            public void run() {
                disable();
            }
        }, duration);
        startTime = System.currentTimeMillis();
        System.out.println("Habilidad de Bardo");
    }

    @Override
    public void disable() {
        super.disable();
        this.isActive = false;
        this.elapsedTime = 0;
        this.startTime = 0;
    }

    @Override
    public void impact() {
        super.impact();
        this.elapsedTime = 0;
        this.startTime = 0;
        // Causa daño al enemigo
    }

    @Override
    public void calculatePhysics() {
        elapsedTime = System.currentTimeMillis() - startTime;
        double remainingTime = duration - elapsedTime;
        double directionX = target.getPosX() - this.getPosX();
        double directionY = target.getPosY() - this.getPosY();
        double module = Math.sqrt(Math.pow(directionX, 2) + Math.pow(directionY, 2));

        directionX = directionX / module;
        directionY = directionY / module;

        this.setVelX(directionX * this.getMoveSpeed() * (remainingTime / duration));
        this.setVelY(directionY * this.getMoveSpeed() * (remainingTime / duration));
        
		this.applyVelocity2Position();
    }
}
