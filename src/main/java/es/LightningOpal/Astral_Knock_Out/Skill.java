package es.LightningOpal.Astral_Knock_Out;

public class Skill {
    protected Player target;
    protected double duration;
    protected boolean isActive;

    public Skill(Player target, double duration){
        this.target = target;
        this.duration = duration;
        this.isActive = false;
    }

    public Player getTarget() {
        return target;
    }
    public void setTarget(Player target) {
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
    
    public void activate(){
        // Implementado en los hijos
    }
}
