import type { PhysicsRequest, Point } from "./physics.types";

export async function sendSimulationData(velocity: number, angle: number): Promise<Point[]>{

    const request: PhysicsRequest = {
        velocity: velocity,
        angle: angle
    }

    const response = await fetch('http://localhost:8080/api/v1/simulate',{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(request)
    })
    const data :Point[] = await response.json();

    return data;
    // console.log("Entered API Section")
    // console.log(velocity);
    // console.log(angle);
}




