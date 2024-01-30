import {saveToLocalStorage, getLocalStorage, removeFromLocalStorage} from "./localStorage.js";

//Ids

let digimonImg = document.getElementById("digimonImg");
let digimonName = document.getElementById("digimonName");
let digimonStatus = document.getElementById("digimonStatus");
let favoriteBtn = document.getElementById("favoriteBtn");
let digimonInput = document.getElementById("digimonInput");
let getFavoritesBtn = document.getElementById("getFavoritesBtn");
let getFavoritesDiv = document.getElementById("getFavoritesDiv");

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

getFavoritesBtn.addEventListener('click', async () => {
    // this retrieves our data from local storage and stores it into favorites variable
    let favorites = getLocalStorage();

    // clears getFavoritesDiv so the array display will not constanly repeat
    getFavoritesDiv.textContent = "";
    // map through each element in our array
    favorites.map(digiName => {
        // Creating a p tag dynamically

        let p = document.createElement('p');
        // Setting text Content  to digiName

        p.textContent = digiName;
        // className replaces all classes with our new classes

        p.className = "text-lg font-medium text-gray-900 dark:text-white";
        let button = document.createElement('button');

        button.type = "button";
        button.textContent = "X"
        // classList allows us to be a little more concise it doesnt replace all classes.
        button.classList.add(
            "text-gray-400",
            "bg-transparent",
            "hover:bg-gray-200",
            "hover:text-gray-900",
            "rounded-lg",
            "text-sm",
            "w-8",
            "h-8",
            "justify-end",
            "dark:hover:bg-gray-600",
            "dark:hover:text-white"
            );

            // Creating an addEventListener for our button which removes digname from our favorites
            button.addEventListener('click', () => {
                removeFromLocalStorage(digiName);
                p.remove();
            });

        // appending our button to our p-tag
        p.append(button);
        //appending our p-tag to our get favorites div
        getFavoritesDiv.append(p);
    })
});