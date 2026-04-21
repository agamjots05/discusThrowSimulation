import { sendSimulationData } from "./api";
import type { PhysicsResponse } from "./physics.types";
import { Renderer } from "./render";

const form = document.getElementById("formId")!;
const velSliderInput = document.getElementById("velSlider") as HTMLInputElement;
const velNumberInput = document.getElementById("velNum") as HTMLInputElement;
const angInput = document.getElementById("angId") as HTMLInputElement;

velSliderInput.addEventListener("change", () =>{
    velNumberInput.value = velSliderInput.value;
})

velNumberInput.addEventListener("change", () => {
    velSliderInput.value = velNumberInput.value;
})

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const v = parseFloat(velNumberInput.value);
    const a = parseFloat(angInput.value);

    try {
        const throwObject: PhysicsResponse = await sendSimulationData(v,a);
        const render = new Renderer("canvasId");

        render.drawTrajectory(throwObject.points, throwObject.maxX, throwObject.maxY);

    } catch(error) {
        console.log(error);
    }

})



