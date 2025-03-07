



document.getElementById("inloggen").onclick = function() {
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;

    console.log(password, username)


    //Joellizzy's account
    if (username == "Joellizzy") {
        fetch("profiles.json")
        .then(response => response.json())
        .then(data => {
            correct_password = data.Joellizzy.password;
            if (correct_password === password) {
                console.log("Correct password")
                localStorage.setItem('profile', username)

            } else {
                console.log("wrong password")
            }
        })
        .catch(error => console.error("Error loading JSON:", error));

        //mechmanner
    } else if (username == "Mechmanner") {
        fetch("profiles.json")
        .then(response => response.json())
        .then(data => {
            correct_password = data.Mechmanner.password;
            if (correct_password === password) {
                console.log("Correct password")
                localStorage.setItem('profile', username)
            } else {
                console.log("wrong password")
            }
        })
        .catch(error => console.error("Error loading JSON:", error));

        //nijnt
    } else if (username == "Nijnt") {
        fetch("profiles.json")
        .then(response => response.json())
        .then(data => {
            correct_password = data.Nijnt.password;
            if (correct_password === password) {
                console.log("Correct password")
                localStorage.setItem('profile', username)
            } else {
                console.log("wrong password")
            }
        })
        .catch(error => console.error("Error loading JSON:", error));
    
        //joa04
    } else if (username == "Joa04") {
        fetch("profiles.json")
        .then(response => response.json())
        .then(data => {
            correct_password = data.Joa04.password;
            if (correct_password === password) {
                console.log("Correct password")
                localStorage.setItem('profile', username)
            } else {
                console.log("wrong password")
            }
        })
        .catch(error => console.error("Error loading JSON:", error));
   
        //_atheron_
    } else if (username == "_atheron_") {
        fetch("profiles.json")
        .then(response => response.json())
        .then(data => {
            correct_password = data._atheron_.password;
            if (correct_password === password) {
                console.log("Correct password")
                localStorage.setItem('profile', username)
            } else {
                console.log("wrong password")
            }
        })
        .catch(error => console.error("Error loading JSON:", error));
    } else if (username === "uitloggen") {
        localStorage.removeItem('username')
        console.log("removed current profile from your history")
        
    } else {
        console.log("No one found with that name, L")
    }

        
    

}
