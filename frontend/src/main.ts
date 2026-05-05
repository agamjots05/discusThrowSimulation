import { sendSimulationData } from "./api";
import type { PhysicsResponse } from "./physics.types";
import { Renderer } from "./render";

const form = document.getElementById("formId")!;
const velSliderInput = document.getElementById("velSlider") as HTMLInputElement;
const velNumberInput = document.getElementById("velNum") as HTMLInputElement;
const angNumberInput = document.getElementById("angNum") as HTMLInputElement;
const angSliderInput = document.getElementById("angSlider") as HTMLInputElement;
const submitButton = document.querySelector('input[type="submit"]') as HTMLInputElement;

velSliderInput.addEventListener("change", () => {
    velNumberInput.value = velSliderInput.value;
})

velNumberInput.addEventListener("change", () => {
    const velNum = Number(velNumberInput.value)
    const velNumMax = Number(velNumberInput.max)

    velSliderInput.value = velNumberInput.value;

    if (velNum > velNumMax){
        console.log("changed to max velNumInput")
        velNumberInput.value = velNumberInput.max;
    }
})
angNumberInput.addEventListener("change", () => {
    const angNum = Number(angNumberInput.value)
    const angNumMax = Number(angNumberInput.max)

    angSliderInput.value = angNumberInput.value;

    if (angNum > angNumMax) {
        console.log("too large angle input");
        angNumberInput.value = angNumberInput.max;
    }


})
angSliderInput.addEventListener("change", () => {
    angNumberInput.value = angSliderInput.value;

})


form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const v = parseFloat(velNumberInput.value);
    const a = parseFloat(angNumberInput.value);

    //When the user first simulates we'll disable till it ends.
    submitButton.disabled = true;
    submitButton.value = "Simulating...";

    try {
        const throwObject: PhysicsResponse = await sendSimulationData(v,a);
        const render = new Renderer("canvasId");

        render.drawTrajectory(throwObject.points, throwObject.maxX, throwObject.maxY, () => {
            submitButton.disabled = false;
            submitButton.value = "Simulate";

        });

    } catch(error) {
        console.log(error);
    }


})



