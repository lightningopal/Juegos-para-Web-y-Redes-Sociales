package es.LightningOpal.Astral_Knock_Out;

// Clase PhysicsObject, que maneja las físicas de un cuerpo
public class PhysicsObject {
	/// Variables
	private int collisionFactor; // sobra, está para que no de error
	private double posX, posY, velX, velY, accelX, accelY, halfWidth, halfHeight, offsetX, offsetY, jumpForce, moveSpeed,
		maxSpeed, groundDrag, airDrag;
	private boolean isFlipped, onFloor, isStatic;
	private final double EPSILON = 0.000005;

	public PhysicsObject(boolean isStatic, double pX, double pY, double hW, double hH, double offX, double offY){
		this.isStatic = isStatic;
		this.posX = pX;
		this.posY = pY;
		this.halfWidth = hW;
		this.halfHeight = hH;
		this.offsetX = offX;
		this.offsetY = offY;
	}

	/// Getters y Setters
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

	public double getOffsetX() {
		return offsetX;
	}

	public void setOffsetX(double offsetX) {
		this.offsetX = offsetX;
	}

	public double getOffsetY() {
		return offsetY;
	}

	public void setOffsetY(double offsetY) {
		this.offsetY = offsetY;
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

	public double getMaxSpeed() {
		return maxSpeed;
	}

	public void setMaxSpeed(double maxSpeed) {
		this.maxSpeed = maxSpeed;
	}

	public double getGroundDrag() {
		return groundDrag;
	}
	public double getAirDrag() {
		return airDrag;
	}

	public void setGroundDrag(double gDrag) {
		this.groundDrag = gDrag;
		this.airDrag = gDrag / 2;
	}

	public int getCollisionFactor() {
		return collisionFactor;
	}

	public void setCollisionFactor(int radius) {
		this.collisionFactor = radius;
	}

	/// Otros métodos
	// Método calculateMovement, que calcula el movimiento del cuerpo
	public void calculateMovement() {
		// Componente X
		this.velX += this.accelX;
		if (this.velX > this.maxSpeed) {
			this.velX = this.maxSpeed;
		} else if (this.velX < -this.maxSpeed) {
			this.velX = -this.maxSpeed;
		}
		if(this.accelX == 0){
			applyDrag();
		}
		
		this.posX += this.velX;

		// Componente Y
		this.velY += this.accelY;
		this.posY += this.velY;
	}

	// Método applyDrag, que aplica fricción al cuerpo
	public void applyDrag() {
		// Se aplica una aceleración contraria a la velocidad si la aceleración es 0
		// hasta frenar al pesonaje
		double currentDrag = this.groundDrag * (Math.abs(velX) / (maxSpeed));
		// Drag aplicado en dirección contraria a la velocidad
		if (this.velX > EPSILON) {
			this.velX -= currentDrag;
		} else if (this.velX < -EPSILON) {
			this.velX += currentDrag;
		} else {
			this.velX = 0;
		}
	}

	// Handle collision
	public boolean intersect(PhysicsObject other) {
		/*
		int maxRadiusToCollide = this.collisionFactor + other.getCollisionFactor();
		double x = this.posX - other.getPosX();
		double y = this.posY - other.getPosY();
		return (maxRadiusToCollide > (Math.pow(x, 2) + Math.pow(y, 2)));
		*/
		// A.hW + b.hW >= /(a.X+a.offX) - (b.X+b.offX)/
		boolean iX = (this.halfWidth + other.getHalfWidth()) >=
			(Math.abs((this.posX+this.offsetX) - (other.getPosX()+other.getOffsetX())));
		// A.hH + b.hH >= /(a.Y+a.offY) - (b.Y+b.offY)/
		boolean iY = (this.halfHeight + other.getHalfHeight()) >= 
			(Math.abs((this.posY+this.offsetY) - (other.getPosY()+other.getOffsetY())));

		return iX && iY;
	}
}
