let all_ads;
let ad_space = document.getElementById("ad_img");

window.onload = function() {
fetch("/kranten/ads/ad_config.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);

        all_ads = data.all_ads;

        let random_number = Math.floor(Math.random() * all_ads.length)
        let selectedad = all_ads[random_number];
        console.log(selectedad)

        ad_space.src = `/fotos/ads/${selectedad}.png`;

        console.log(all_ads);
    })

    .catch(error => console.error("Error loading JSON:", error));

}