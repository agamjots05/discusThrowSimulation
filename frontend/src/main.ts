import { sendSimulationData } from "./api";

const form = document.getElementById("formId")!;
const velInput = document.getElementById("velId") as HTMLInputElement;
const angInput = document.getElementById("angId") as HTMLInputElement;



form.addEventListener("submit", (event) => {
    event.preventDefault();
    const v = parseFloat(velInput.value);
    const a = parseFloat(angInput.value);

    sendSimulationData(v, a);

})


