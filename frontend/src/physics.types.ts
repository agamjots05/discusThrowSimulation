export interface Point {
    x: number;
    y: number;
    isInc: boolean;
}

export interface PhysicsRequest {
    velocity: number;
    angle: number;

    mass: number;
    windSpeed: number;

}
export interface PhysicsResponse {
    points: Point[];
    maxX: number;
    maxY: number;
    
}
