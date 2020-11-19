package es.LightningOpal.Astral_Knock_Out.Skills;

import es.LightningOpal.Astral_Knock_Out.*;

import java.util.Timer;
import java.util.TimerTask;

public class WizardSkill extends Skill{

    private double damage;
    private int id;

    private long startTime;

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
        this.setPosY(caster.getPosY()-40);
        if (this.IsFlipped()){
            this.setVelX(-this.getMoveSpeed());
        }else{
            this.setVelX(this.getMoveSpeed());
        }

        switch(this.id){
            case 1:
            if (this.IsFlipped()){
                this.setVelY(this.getMoveSpeed() * 0.3);
            }else{
                this.setVelY(this.getMoveSpeed() * -0.3);
            }
            this.facingAngle = -25;
            break;
            case 2:
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
        this.startTime = System.currentTimeMillis();
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
        remainingTime = remainingTime / duration; // Va de 1 a 0
        if (this.id == 1){
            if (this.IsFlipped()){
                this.setVelY(lerp(this.getMoveSpeed() * -0.7, this.getMoveSpeed() * 0.7, remainingTime));
                this.facingAngle = lerp(25, -25, remainingTime);
            }else{
                this.setVelY(lerp(this.getMoveSpeed() * 0.7, this.getMoveSpeed() * -0.7, remainingTime));
                this.facingAngle = lerp(25, -25, remainingTime);
            }
        }else if (this.id == 2){
            if (this.IsFlipped()){
                this.setVelY(lerp(this.getMoveSpeed() * 0.7, this.getMoveSpeed() * -0.7, remainingTime));
                this.facingAngle = lerp(-25, 25, remainingTime);
            }else{
                this.setVelY(lerp(this.getMoveSpeed() * -0.7, this.getMoveSpeed() * 0.7, remainingTime));
                this.facingAngle = lerp(-25, 25, remainingTime);
            }
        }
        this.applyVelocity2Position();
    }

    public double lerp(double a, double b, double f)
    {
        return a + f * (b - a);
    }
}