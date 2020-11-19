package es.LightningOpal.Astral_Knock_Out.Skills;

import es.LightningOpal.Astral_Knock_Out.*;

public class BardSkill extends Skill {

    private double damage;

    private long startTime;

    public BardSkill(Player caster, Player target, long duration, boolean collidePlaforms, double speed, double damage) {
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
        this.setPosY(caster.getPosY() - 50);
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
        // Causa daño al enemigo
        return hp - this.damage;
        
    }

    @Override
    public void calculatePhysics() {
        double remainingTime = duration - (System.currentTimeMillis() - startTime);
        if (remainingTime <= 0){
            disable();
            return;
        }
        double directionX = (target.getPosX()+target.getVelX()) - this.getPosX();
        double directionY = (target.getPosY()+target.getVelY()) - this.getPosY();
        double module = Math.sqrt(Math.pow(directionX, 2) + Math.pow(directionY, 2));

        directionX = directionX / module;
        directionY = directionY / module;

        this.setVelX(directionX * this.getMoveSpeed() * (remainingTime / duration));
        this.setVelY(directionY * this.getMoveSpeed() * (remainingTime / duration));
        
		this.applyVelocity2Position();
    }
}
