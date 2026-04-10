package com.example.discusBackend;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
public class ThrowService {
    private static final Logger logger = LoggerFactory.getLogger(ThrowService.class);
    public PhysicsResponse findDistance(double angle, double velocity) {
        List<Point> points = new ArrayList<>();
        double newAngle = Math.toRadians(angle);

        final double GRAVITY = 9.81;
        final double TIME_STEP = 0.05;

        //Find x and y components of velocity
        double vX = velocity * Math.cos(newAngle);
        double vY = velocity * Math.sin(newAngle);
        //Find x and y positions at each time step until the discus hits the groundK
        double x = 0;
        double y = 0;
        double t = 0;
        double maxX = 0, maxY = 0;
        int iterations = 0;
        while (y >= 0 ){
            x = vX * t;
            y = (vY*t) - (0.5 * GRAVITY * t * t);

            if (y >= 0){
                System.out.println("Added point to our array");
                System.out.printf("Val of x: %f, val of y: %f\n ", x,y);

                // Setting maxX and maxY values
                if (x > maxX) maxX = x;
                if (y > maxY) maxY = y;
                points.add(new Point(x,y));
            }
            t += TIME_STEP;
            iterations ++;
            if (iterations >= 2000){
                logger.warn("Reached Maximum Number of Iterations");
                break;
            }
        }
        System.out.println("Printing Max X and Max Y Values Below");
        System.out.println(maxX);
        System.out.println(maxY);
        return new PhysicsResponse(points, maxX, maxY);
    }
}
