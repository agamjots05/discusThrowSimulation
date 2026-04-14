import type { Point } from "./physics.types";           

export class Renderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private margin: number;

    constructor(canvasId: string){
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.margin = 60;
        this.resize();
    }

    public resize(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    public clear(): void{
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    }
    /* TODO: 
     Need to create some form of x and y-axis showing the units that were traveled throughout the throw
    
    */
    private createAxis(scale: number, maxX: number, maxY: number) {
        const chartBottom = this.canvas.height - this.margin;
        const chartLeft = this.margin;
        const tickSize = 5;

        this.ctx.strokeStyle = "Grey";
        this.ctx.lineWidth = 2;
        this.ctx.fillStyle = "Black";
        this.ctx.font = "14px Arial";

        // --- X-AXIS ---
        this.ctx.beginPath();
        this.ctx.moveTo(chartLeft, chartBottom);
        this.ctx.lineTo(chartLeft + (maxX * scale), chartBottom);
        this.ctx.stroke();

        const stepX = maxX / 5;
        for (let i = 0; i <= maxX; i += stepX) {
            const x = chartLeft + (i * scale);
            this.ctx.beginPath();
            this.ctx.moveTo(x, chartBottom);
            this.ctx.lineTo(x, chartBottom + tickSize); // Tick goes DOWN
            this.ctx.stroke();

            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "top"; // Aligns text below the point
            this.ctx.fillText(`${Math.round(i)}m`, x, chartBottom + tickSize + 2);
        }

        this.ctx.beginPath();
        this.ctx.moveTo(chartLeft, chartBottom - (maxY * scale));
        this.ctx.lineTo(chartLeft, chartBottom);
        this.ctx.stroke();

        const stepY = maxY / 5;
        for (let i = 0; i <= maxY; i += stepY) {
        const y = chartBottom - (i * scale);
        this.ctx.beginPath();
        this.ctx.moveTo(chartLeft, y);
        this.ctx.lineTo(chartLeft - tickSize, y); // Tick goes LEFT
        this.ctx.stroke();

        this.ctx.textAlign = "right"; // Aligns text to the left of the axis
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(`${Math.round(i)}m`, chartLeft - tickSize - 5, y);
        }
    }

    public drawTrajectory(points: Point[], maxX: number, maxY: number) {
        this.clear();
        if (points.length === 0) return;

        // Adjusting padding slightly so the graph doesn't hit the very edges
        const padding = 0.8; 
        const scale = Math.min(
            ((this.canvas.width - this.margin * 2) * padding) / maxX,
            ((this.canvas.height - this.margin * 2) * padding) / maxY
        );

        this.createAxis(scale, maxX, maxY);

        this.ctx.beginPath();
        this.ctx.strokeStyle = "Blue";
        this.ctx.lineWidth = 3;

        const chartBottom = this.canvas.height - this.margin;
        const chartLeft = this.margin;

        points.forEach((point, index) => {
            const xPos = chartLeft + (point.x * scale);
            const yPos = chartBottom - (point.y * scale); // Subtract from our new "floor"

            if (index === 0) {
                this.ctx.moveTo(xPos, yPos);
            } else {
                this.ctx.lineTo(xPos, yPos);
            }
        });

        this.ctx.stroke();
    }
    
}
