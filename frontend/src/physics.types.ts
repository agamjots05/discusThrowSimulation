export interface Point {
    x: number;
    y: number;
}

export interface PhysicsRequest {

    velocity: number;
    angle: number;

    // NOTE:This is going to be added later for now above is what main implementation will use
    mass?: number;
}
export interface PhysicsResponse {
    trajectory: Point[];
}
