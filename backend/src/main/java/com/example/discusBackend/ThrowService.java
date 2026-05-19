package com.example.discusBackend;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
public class ThrowService {
    private static final Logger logger = LoggerFactory.getLogger(ThrowService.class);
    public PhysicsResponse findDistance(double angle, double velocity, double mass, double headWindSpeed) {
        List<Point> points = new ArrayList<>();
        double newAngle = Math.toRadians(angle);

        final double TIME_STEP = 0.05;

        //Find x and y components of velocity
        double vX = velocity * Math.cos(newAngle);
        double vY = velocity * Math.sin(newAngle);
        //Find x and y positions at each time step until the discus hits the groundK
        double x = 0;
        double y = 0;
        double dt = 0;
        double maxX = 0, maxY = 0;
        boolean isInc = true;
//        int iterations = 0;

        while (y >= 0 ){
            //Our velocity in x-direction will change due to the nature of our headwind, if we have pos head wind assume wind is traveling with the discus therefore increasing the velocity of it
            double relativeVx = vX + headWindSpeed;

            //This will give us the force the discus is experiencing at this time frame in the air
            double dragForceX = 0.5 * PhysicsConfig.AIR_DENSITY * PhysicsConfig.DRAG_COEFFICENT * PhysicsConfig.DISCUS_AREA * (relativeVx * relativeVx) * Math.signum(relativeVx);

            //Get the acceleration from Force eqtn by divding by mass
            //ax = neg drag force since drag is pushing against the disc
            double ax = -dragForceX / mass;
            double ay = -PhysicsConfig.GRAVITY;

            vX += ax * dt;
            vY += ay * dt;

            x += vX * dt;
            y = vY * dt;

            if (y >= 0){
                System.out.println("Added point to our array");
                System.out.printf("Val of x: %f, val of y: %f\n ", x,y);

                // Setting maxX and maxY values
                if (x > maxX) maxX = x;
                if (y > maxY) maxY = y;
                //We're checking whether current y value is smaller than prev y value, if so we can set 'isInc' to false
                if (isInc == true && !points.isEmpty() && y < points.getLast().getY()){
                    isInc = false;
                }
                points.add(new Point(x,y, isInc));
            }
            dt += TIME_STEP;
//            iterations ++;
//            if (iterations >= 2000){
//                logger.warn("Reached Maximum Number of Iterations");
//                break;
//            }
        }
        // Make sure to add final point ending at (0,0) for graph to look complete.
//        points.add(new Point(maxX,0));
//        System.out.println("Printing Max X and Max Y Values Below");
        System.out.println(maxX);
        System.out.println(maxY);
        return new PhysicsResponse(points, maxX, maxY);
    }
}
