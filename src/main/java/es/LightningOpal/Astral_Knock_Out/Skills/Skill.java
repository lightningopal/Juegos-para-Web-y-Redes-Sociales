package es.LightningOpal.Astral_Knock_Out.Skills;

import es.LightningOpal.Astral_Knock_Out.*;

public class Skill extends PhysicsObject{
    protected PhysicsObject target;
    protected double duration;
    protected boolean isActive;
    protected double facingAngle;

    public Skill(PhysicsObject target, double duration, double hW, double hH){
        this.target = target;
        this.duration = duration;
        this.isActive = false;

        this.setHalfWidth(hW);
        this.setHalfHeight(hH);
    }

    public PhysicsObject getTarget() {
        return target;
    }
    public void setTarget(PhysicsObject target) {
        this.target = target;
    }

    public double getDuration() {
        return duration;
    }
    public void setDuration(double duration) {
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
        // Implementado en los hijos
    }

    public void impact(){
        // Implementado en los hijos
    }

}
