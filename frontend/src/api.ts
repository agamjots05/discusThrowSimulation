import { PhysicsRequest } from "./physics.types";   

export function sendSimulationData(velocity: number, angle: number){

    const request: PhysicsRequest = {
        velocity: velocity,
        angle: angle
    }

    const response = await fetch('http://localhost:8080/api/v1/simulate')
    

    console.log("Entered API Section")
    console.log(velocity);
    console.log(angle);
}




