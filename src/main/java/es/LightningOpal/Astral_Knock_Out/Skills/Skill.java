package es.LightningOpal.Astral_Knock_Out.Skills;

import es.LightningOpal.Astral_Knock_Out.*;
import java.util.Timer;

public class Skill extends PhysicsObject{
    protected PhysicsObject caster;
    protected PhysicsObject target;
    protected long duration;
    protected boolean isActive;
    protected double facingAngle;

    protected Timer stopTimer;

    public Skill(PhysicsObject caster, PhysicsObject target, long duration, double hW, double hH){
        this.caster = caster;
        this.target = target;
        this.duration = duration;
        this.isActive = false;

        this.setHalfWidth(hW);
        this.setHalfHeight(hH);

        stopTimer = new Timer();
    }

    public PhysicsObject getCaster() {
        return caster;
    }
    public void setCaster(PhysicsObject caster) {
        this.caster = caster;
    }

    public PhysicsObject getTarget() {
        return target;
    }
    public void setTarget(PhysicsObject target) {
        this.target = target;
    }

    public long getDuration() {
        return duration;
    }
    public void setDuration(long duration) {
        this.duration = duration;
    }

    public boolean isActive() {
        return isActive;
    }
    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }

    public double getFacingAngle() {
        return facingAngle;
    }
    public void setFacingAngle(double facingAngle) {
        this.facingAngle = facingAngle;
    }
    
    public void activate(){
        this.SetFlipped(caster.IsFlipped());
        // Implementado el control en los hijos
    }

    public void disable(){
        // Implementado el control en los hijos
    }

    public void calculatePhysics(){
        // Implementado el control en los hijos
    }

    public void impact(){
        // Implementado en los hijos
    }

}
