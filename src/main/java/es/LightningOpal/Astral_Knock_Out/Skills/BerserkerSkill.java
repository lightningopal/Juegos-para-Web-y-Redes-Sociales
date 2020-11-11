package es.LightningOpal.Astral_Knock_Out.Skills;

import es.LightningOpal.Astral_Knock_Out.*;

import java.util.Timer;
import java.util.TimerTask;

public class BerserkerSkill extends Skill{

    private double damage;

    private long elapsedTime;
    private long startTime;

    public BerserkerSkill(Player caster, Player target, long duration, boolean collidePlaforms, double speed, double damage){
        super(caster, target, duration, 45, 45, collidePlaforms);
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
    public void activate(){
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
        System.out.println("Habilidad de Berserker");
    }

    @Override
    public void disable() {
        super.disable();
        this.isActive = false;
        this.elapsedTime = 0;
        this.startTime = 0;
    }

    @Override
    public double impact() {
        super.impact();
        this.isActive = false;
        this.elapsedTime = 0;
        this.startTime = 0;
        // Causa daño al enemigo
        return target.damage(this.damage);
    }

    @Override
    public double impact(double hp) {
        super.impact();
        this.isActive = false;
        this.elapsedTime = 0;
        this.startTime = 0;
        // Causar daño
        return hp - this.damage;
    }

    @Override
    public void calculatePhysics(){
        elapsedTime = System.currentTimeMillis() - startTime;
        double remainingTime = duration - elapsedTime;
        if (this.IsFlipped()){
            this.setVelX(-this.getMoveSpeed() * (remainingTime / duration) * (remainingTime / duration));
        }else{
            this.setVelX(this.getMoveSpeed() * (remainingTime / duration) * (remainingTime / duration));
        }
        this.applyVelocity2Position();
    }
}
