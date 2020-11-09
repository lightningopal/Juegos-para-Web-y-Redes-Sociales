package es.LightningOpal.Astral_Knock_Out.Skills;

import es.LightningOpal.Astral_Knock_Out.*;

public class RogueSkill extends Skill{

    private double speed;
    private double damage;
    private int id;

    public RogueSkill(PhysicsObject target, double duration, double speed, double damage, int id){
        super(target, duration, 15, 6.50);
        this.speed = speed;
        this.damage = damage;
        this.id = id;
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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public void activate(){
        // Activar habilidad
        System.out.println("Habilidad de Pícara");
    }
    
}
