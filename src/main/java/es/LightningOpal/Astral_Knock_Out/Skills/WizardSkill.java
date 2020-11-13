package es.LightningOpal.Astral_Knock_Out.Skills;

import es.LightningOpal.Astral_Knock_Out.*;

import java.util.Timer;
import java.util.TimerTask;

public class WizardSkill extends Skill{

    private double damage;
    private int id;

    public WizardSkill(Player caster, Player target, long duration, boolean collidePlaforms, double speed, double damage, int id){
        super(caster, target, duration, 25, 6.50, collidePlaforms);
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
        this.setPosX(caster.getPosX());
        this.setPosY(caster.getPosY());
        if (this.IsFlipped()){
            this.setVelX(-this.getMoveSpeed());
        }else{
            this.setVelX(this.getMoveSpeed());
        }

        switch(this.id){
            case 1: // Ángulo hacia arriba
            if (this.IsFlipped()){
                this.setVelY(this.getMoveSpeed() * 0.3);
            }else{
                this.setVelY(this.getMoveSpeed() * -0.3);
            }
            this.facingAngle = -25;
            break;
            case 2: // Ángulo hacia abajo
            if (this.IsFlipped()){
                this.setVelY(this.getMoveSpeed() * -0.3);
            }else{
                this.setVelY(this.getMoveSpeed() * 0.3);
            }
            this.facingAngle = 25;
            break;
            default:
            break;
        }

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
    }

    @Override
    public void disable() {
        super.disable();
        this.isActive = false;
    }

    @Override
    public double impact() {
        super.impact();
        this.isActive = false;
        // Causa daño al enemigo
        return target.damage(this.damage);
    }

    @Override
    public double impact(double hp) {
        super.impact();
        this.isActive = false;
        // Causar daño
        return hp - this.damage;
    }

    @Override
    public void calculatePhysics(){
        this.applyVelocity2Position();
    }
}
