package es.LightningOpal.Astral_Knock_Out.Skills;

import es.LightningOpal.Astral_Knock_Out.*;

public class BerserkerSkill extends Skill{

    private double damage;

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
        startTime = System.currentTimeMillis();
        this.isActive = true;
    }

    @Override
    public void disable() {
        super.disable();
        this.startTime = 0;
    }

    @Override
    public double impact() {
        super.impact();
        disable();
        // Causa daño al enemigo
        return target.damage(this.damage);
    }

    @Override
    public double impact(double hp) {
        super.impact();
        disable();
        // Causar daño
        return hp - this.damage;
    }

    @Override
    public void calculatePhysics(){
        double remainingTime = duration - (System.currentTimeMillis() - startTime);
        if (remainingTime <= 0){
            disable();
            return;
        }
        if (this.IsFlipped()){
            this.setVelX(-this.getMoveSpeed() * (remainingTime / duration) * (remainingTime / duration));
        }else{
            this.setVelX(this.getMoveSpeed() * (remainingTime / duration) * (remainingTime / duration));
        }
        this.applyVelocity2Position();
    }
}
