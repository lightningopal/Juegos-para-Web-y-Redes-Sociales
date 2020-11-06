package es.LightningOpal.Astral_Knock_Out;

public class PhysicsObject {
	private int collisionFactor; // sobra, está para que no de error
	private double posX, posY, velX, velY, accelX, accelY, halfWidth, halfHeight, jumpForce, moveSpeed;
	private boolean isFlipped, onFloor, isStatic;

	public double getPosX() {
		return this.posX;
	}

	public void setPosX(double x) {
		this.posX = x;
	}

	public double getPosY() {
		return this.posY;
	}

	public void setPosY(double y) {
		this.posY = y;
	}

	public boolean IsFlipped() {
		return this.isFlipped;
	}

	public void SetFlipped(boolean flipped) {
		this.isFlipped = flipped;
	}

	public boolean IsOnFloor() {
		return this.onFloor;
	}

	public void SetOnFloor(boolean onFloor) {
		this.onFloor = onFloor;
	}

	public boolean IsStatic() {
		return this.isStatic;
	}

	public void SetStatic(boolean static_) {
		this.isStatic = static_;
	}

	public void setPosition(double x, double y) {
		this.posX = x;
		this.posY = y;
	}

	public void setVelocity(double x, double y) {
		this.velX = x;
		this.velY = y;
	}

	public void setAcceleration(double x, double y) {
		this.accelX = x;
		this.accelY = y;
	}

	public void incVelocity(double velX, double velY) {
		this.velX += velX;
		this.velY += velY;
	}

	public void multVelocity(double delta) {
		this.velX *= delta;
		this.velY *= delta;
	}

	public void applyVelocity2Position() {
		this.posX += this.velX;
		this.posY += this.velY;
	}

	public double getAccelX() {
		return accelX;
	}

	public void setAccelX(double accelX) {
		this.accelX = accelX;
	}

	public double getAccelY() {
		return accelY;
	}

	public void setAccelY(double accelY) {
		this.accelY = accelY;
	}

	public double getHalfWidth() {
		return halfWidth;
	}

	public void setHalfWidth(double halfWidth) {
		this.halfWidth = halfWidth;
	}

	public double getHalfHeight() {
		return halfHeight;
	}

	public void setHalfHeight(double halfHeight) {
		this.halfHeight = halfHeight;
	}

	public double getJumpForce() {
		return jumpForce;
	}

	public void setJumpForce(double jumpForce) {
		this.jumpForce = jumpForce;
	}

	public double getMoveSpeed() {
		return moveSpeed;
	}

	public void setMoveSpeed(double moveSpeed) {
		this.moveSpeed = moveSpeed;
	}

	public int getCollisionFactor() {
		return collisionFactor;
	}

	public void setCollisionFactor(int radius) {
		this.collisionFactor = radius;
	}

	public void calculateMovement(){
		// posX = this.getPosX() - this.getMoveSpeed();
		this.velX += this.accelX;
		this.posX += this.velX;
	}

	// Handle collision (HAY QUE CAMBIARLO)
	public boolean intersect(PhysicsObject other) {
		int maxRadiusToCollide = this.collisionFactor + other.getCollisionFactor();
		double x = this.posX - other.getPosX();
		double y = this.posY - other.getPosY();
		return (maxRadiusToCollide > (Math.pow(x, 2) + Math.pow(y, 2)));
	}
}
