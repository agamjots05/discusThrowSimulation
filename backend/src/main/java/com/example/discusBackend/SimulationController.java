package com.example.discusBackend;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class SimulationController {
    private ThrowService throwService;

    public SimulationController(){
        this.throwService = new ThrowService();
    }

    @PostMapping("/simulate")
    public List<Point> getSimulation(@RequestBody ThrowRequest request){
        return this.throwService.findDistance(request.getAngle(), request.getVelocity());
    }
}
