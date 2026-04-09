import { sendSimulationData } from "./api";
import { Renderer } from "./render";

const form = document.getElementById("formId")!;
const velInput = document.getElementById("velId") as HTMLInputElement;
const angInput = document.getElementById("angId") as HTMLInputElement;



form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const v = parseFloat(velInput.value);
    const a = parseFloat(angInput.value);

    try {
        const points = await sendSimulationData(v,a);
        const render = new Renderer("canvasId");

        render.drawTrajectory(points);

    } catch(error) {
        console.log(error);
    }

})



