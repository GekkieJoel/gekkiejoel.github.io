let random_chance;
let logo = document.getElementById("gekkies_krant_logo");
let gekkoin_amount = document.getElementById("gekkoin_amount");

//newspaper config stuff
let newest_newspaper = "cheese"

window.onload = function() {
    let random_chance = Math.floor(Math.random() * 10);
    
    if (random_chance === 7) {
        logo.src = "../fotos/logos/gekkis_krant.png";
    } else {
        logo.src = "../fotos/logos/gekkies_krant!.png"
    }


    fetch("navbar/profiles.json")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //document.title = data.Joellizzy.gekkoins;

            gekkoin_amount.textContent = data.Joellizzy.gekkoins;

        })
        .catch(error => console.error("Error loading JSON:", error));

   
}


function openProfile() {
    document.body.style.backgroundColor = "yellow";
    window.location.href = "navbar/profile.html";

}
function openNewNewspaper() {
    console.log("hallo?")
    fetch("/kranten/newspaper_config.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        //document.title = data.Joellizzy.gekkoins;

        newest_newspaper = data.latest_newspaper;

        window.location.href = `kranten/html/${newest_newspaper}.html`;

    })

    .catch(error => console.error("Error loading JSON:", error));
    
}
function openAllNewspapers() {
    window.location.href = "kranten/all_newspapers.html";
}
function openHomepage() {
    window.location.href = "index.html";
}


