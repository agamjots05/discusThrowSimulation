import { sendSimulationData } from "./api";
import type { PhysicsResponse } from "./physics.types";
import { Renderer } from "./render";

const form = document.getElementById("formId")!;
const velInput = document.getElementById("velId") as HTMLInputElement;
const angInput = document.getElementById("angId") as HTMLInputElement;



form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const v = parseFloat(velInput.value);
    const a = parseFloat(angInput.value);

    try {
        const throwObject: PhysicsResponse =  await sendSimulationData(v,a);
        const render = new Renderer("canvasId");

        render.drawTrajectory(throwObject.points, throwObject.maxX, throwObject.maxY);

    } catch(error) {
        console.log(error);
    }

})



