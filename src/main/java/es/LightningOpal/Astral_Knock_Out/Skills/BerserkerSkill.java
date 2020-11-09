package es.LightningOpal.Astral_Knock_Out.Skills;

import es.LightningOpal.Astral_Knock_Out.*;

public class BerserkerSkill extends Skill{

    private double speed;
    private double damage;

    public BerserkerSkill(PhysicsObject target, double duration, double speed, double damage){
        super(target, duration);
        this.speed = speed;
        this.damage = damage;
    }

    public double getSpeed() {
        return speed;
    }
    public void setSpeed(double speed) {
        this.speed = speed;
    }

    public double getDamage() {
        return damage;
    }
    public void setDamage(double damage) {
        this.damage = damage;
    }

    @Override
    public void activate(){
        // Activar habilidad
        System.out.println("Habilidad de Berserker");
    }
}
