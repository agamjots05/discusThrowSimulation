package com.example.discusBackend;

public class Point {
    private double x;
    private double y;
    private boolean isInc;
    public Point(double x, double y, boolean isInc) {
        this.x = x;
        this.y = y;
        this.isInc = isInc;
    }

    public double getX(){
        return this.x;
    }
    public double getY(){
        return this.y;
    }
    public boolean getIsInc(){
        return this.isInc;
    }
}
