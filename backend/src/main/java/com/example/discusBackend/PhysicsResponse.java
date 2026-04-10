package com.example.discusBackend;

import java.util.List;

public class PhysicsResponse {
    private List<Point> points;
    private double maxX;
    private double maxY;

    public PhysicsResponse(List<Point> points, double maxX, double maxY){
        this.points = points;
        this.maxX = maxX;
        this.maxY = maxY;
    }
    public List<Point> getPoints() { return points; }
    public double getMaxX() { return maxX; }
    public double getMaxY() { return maxY; }


}
