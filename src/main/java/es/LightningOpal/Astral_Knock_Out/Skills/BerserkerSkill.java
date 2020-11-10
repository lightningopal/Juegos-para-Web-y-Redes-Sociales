package es.LightningOpal.Astral_Knock_Out.Skills;

import es.LightningOpal.Astral_Knock_Out.*;

public class BerserkerSkill extends Skill{

    private double damage;

    public BerserkerSkill(PhysicsObject caster, PhysicsObject target, long duration, double speed, double damage){
        super(caster, target, duration, 45, 45);
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
        System.out.println("Habilidad de Berserker");
    }

    @Override
    public void calculatePhysics(){

    }
}
