import type { Point } from "./physics.types";           

export class Renderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(canvasId: string){
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.resize();
    }

    public resize(){
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    public clear(){
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    }

    public drawTrajectory(points: Point[]){
        this.clear();
        if (points.length === 0){
            return;
        }

        this.ctx.beginPath();
        this.ctx.strokeStyle = "Blue";
        this.ctx.lineWidth = 3;
        this.ctx.lineJoin = 'round';
        const scale: number = 20;
        points.forEach((point, index) => {
            const xPos = point.x * scale;
            const yPos = window.innerHeight - point.y * scale;

            if (index === 0){
                this.ctx.moveTo(xPos, yPos);
            }
            else {
                this.ctx.lineTo(xPos,yPos);
            }
        });

        this.ctx.stroke();
    }


    
}
