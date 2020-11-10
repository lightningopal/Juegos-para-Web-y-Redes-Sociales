package es.LightningOpal.Astral_Knock_Out.Skills;

import es.LightningOpal.Astral_Knock_Out.*;

import java.util.Timer;
import java.util.TimerTask;

public class RogueSkill extends Skill{

    private double damage;
    private int id;

    private Timer startTimer;

    public RogueSkill(PhysicsObject caster, PhysicsObject target, long duration, boolean collidePlaforms, double speed, double damage, int id){
        super(caster, target, duration, 15, 6.50, collidePlaforms);
        this.setMoveSpeed(speed);
        this.damage = damage;
        this.id = id;

        startTimer = new Timer();
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
        startTimer.cancel();
        startTimer.purge();
        startTimer = new Timer();
        startTimer.schedule(new TimerTask(){
            @Override
            public void run() {
                start();
            }
        }, this.id * 100);
        
        System.out.println("Habilidad de Pícara");
    }

    @Override
    public void disable() {
        super.disable();
        this.isActive = false;
    }

    public void start(){
        super.activate();
        this.setPosX(caster.getPosX());
        this.setPosY(caster.getPosY());
        this.setVelY(0);
        if (this.IsFlipped()){
            this.setVelX(-this.getMoveSpeed());
        }else{
            this.setVelX(this.getMoveSpeed());
        }
        this.setAccelY(0.3);
        this.isActive = true;
    }

    @Override
    public void calculatePhysics(){
        if (this.isActive){
            this.incVelocity(0, this.getAccelY());
            this.applyVelocity2Position();
        }
    }
    
}
