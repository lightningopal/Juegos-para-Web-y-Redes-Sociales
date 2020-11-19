package es.LightningOpal.Astral_Knock_Out.Skills;

import es.LightningOpal.Astral_Knock_Out.*;

public class RogueSkill extends Skill {

    private double damage;
    private int id;

    private long startTime;
    private boolean hasStarted;

    public RogueSkill(Player caster, Player target, long duration, boolean collidePlaforms, double speed, double damage,
            int id) {
        super(caster, target, duration, 15, 6.50, collidePlaforms);
        this.setMoveSpeed(speed);
        this.damage = damage;
        this.id = id;
        this.hasStarted = false;
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
    public void activate() {
        this.startTime = System.currentTimeMillis();
        this.isActive = true;
    }

    @Override
    public void disable() {
        super.disable();
        this.setVelY(0);
        this.hasStarted = false;
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
        // Causar daño
        return hp - this.damage;
    }

    public void start() {
        super.activate();
        this.hasStarted = true;
        this.setPosX(caster.getPosX());
        this.setPosY(caster.getPosY() + 15);
        this.setVelY(0);
        if (this.IsFlipped()) {
            this.setVelX(-this.getMoveSpeed());
        } else {
            this.setVelX(this.getMoveSpeed());
        }
        this.setAccelY(0.3);
    }

    @Override
    public void calculatePhysics() {
        if (startTime + (id * 100) <= System.currentTimeMillis() && !this.hasStarted) {
            start();
        }
        this.incVelocity(0, this.getAccelY());
        this.applyVelocity2Position();
        if (this.getPosX() > 2020 || this.getPosX() < -100){
            disable();
        }
    }

}
