import {saveToLocalStorage, getLocalStorage, removeFromLocalStorage} from "./localStorage.js";

//Ids

let digimonImg = document.getElementById("digimonImg");
let digimonName = document.getElementById("digimonName");
let digimonStatus = document.getElementById("digimonStatus");
let favoriteBtn = document.getElementById("favoriteBtn");
let digimonInput = document.getElementById("digimonInput");

let digimon = "";



const digimonApi = async (digimon) => {
    const promise = await fetch("https://digimon-api.vercel.app/api/digimon/name/" + digimon);

    const data = await promise.json()

    // console.log(data)
    return data;
}

digimonInput.addEventListener('keydown', async (event) => {
    //on enter I want this function to run
    if(event.key === "Enter"){
        digimon = await digimonApi(event.target.value);
        console.log(digimon)
        digimonImg.src = digimon[0].img;
        digimonName.textContent = digimon[0].name;
        digimonStatus.textContent = digimon[0].level;
    }
});

favoriteBtn.addEventListener('click', async () => {
    saveToLocalStorage(digimon[0].name);
});