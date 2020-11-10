package es.LightningOpal.Astral_Knock_Out.Skills;

import es.LightningOpal.Astral_Knock_Out.*;

public class RogueSkill extends Skill{

    private double damage;
    private int id;

    public RogueSkill(PhysicsObject caster, PhysicsObject target, long duration, double speed, double damage, int id){
        super(caster, target, duration, 15, 6.50);
        this.setMoveSpeed(speed);
        this.damage = damage;
        this.id = id;
    }

    public double getDamage() {
        return damage;
    }
    public void setDamage(double damage) {
        this.damage = damage;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public void activate(){
        super.activate();
        // Activar habilidad
        System.out.println("Habilidad de Pícara");
    }

    @Override
    public void calculatePhysics(){

    }
    
}
