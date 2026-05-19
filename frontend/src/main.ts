import { sendSimulationData } from "./api";
import type { PhysicsResponse } from "./physics.types";
import { Renderer } from "./render";

const form = document.getElementById("formId")!;
const velSliderInput = document.getElementById("velSlider") as HTMLInputElement;
const velNumberInput = document.getElementById("velNum") as HTMLInputElement;

const angNumberInput = document.getElementById("angNum") as HTMLInputElement;
const angSliderInput = document.getElementById("angSlider") as HTMLInputElement;

const massNumberInput = document.getElementById("massNum") as HTMLInputElement;
const massSliderInput = document.getElementById("massSlider") as HTMLInputElement;

const windSpeedNumberInput = document.getElementById("windNum") as HTMLInputElement;
const windSpeedSliderInput= document.getElementById("windSlider") as HTMLInputElement;

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

angSliderInput.addEventListener("change", () => {
    angNumberInput.value = angSliderInput.value;

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

massSliderInput.addEventListener("change", () => {
    massNumberInput.value = massSliderInput.value;

})

massNumberInput.addEventListener("change", () => {
    const massNum= Number(massNumberInput.value)
    const massNumMax= Number(massNumberInput.max)

    massSliderInput.value = massNumberInput.value;

    if (massNum > massNumMax) {
        console.log("too large mass input");
        massNumberInput.value = massNumberInput.max;
    }


})

windSpeedSliderInput.addEventListener("change", () => {
    windSpeedNumberInput.value = windSpeedSliderInput.value;

})

windSpeedNumberInput.addEventListener("change", () => {
    const windSpeedNum = Number(windSpeedNumberInput.value)
    const windSpeedNumMax= Number(windSpeedNumberInput.max)

    windSpeedSliderInput.value = windSpeedNumberInput.value;

    if (windSpeedNum > windSpeedNumMax) {
        console.log("too large windspeed input");
        windSpeedNumberInput.value = windSpeedNumberInput.max;
    }


})


form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const v = parseFloat(velNumberInput.value);
    const a = parseFloat(angNumberInput.value);
    const wS = parseFloat(windSpeedNumberInput.value);
    const m = parseFloat(massNumberInput.value);

    //When the user first simulates we'll disable till it ends.
    submitButton.disabled = true;
    submitButton.value = "Simulating...";

    try {
        const throwObject: PhysicsResponse = await sendSimulationData(v,a, m,wS);
        const render = new Renderer("canvasId");

        render.drawTrajectory(throwObject.points, throwObject.maxX, throwObject.maxY, () => {
            submitButton.disabled = false;
            submitButton.value = "Simulate";

        });

    } catch(error) {
        console.log(error);
    }


})



