package com.example.discusBackend;

public class ThrowRequest {
    private double angle;
    private double velocity;
    private double mass;
    private double windSpeed;

    public double getMass(){
        return this.mass;
    }
    public void setMass(double mass){
        this.mass = mass;
    }
    public double getWindSpeed(){
        return this.windSpeed;
    }
    public void setWindSpeed(double mass){
        this.windSpeed = mass;
    }
    public double getAngle() {
        return this.angle;
    }
    public void setAngle(double angle) {
        this.angle = angle;
    }
    public double getVelocity() {
        return velocity;
    }
    public void setVelocity(double velocity){
        this.velocity = velocity;
    }
}
