function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function fetchVisitorCount() {
    return fetch('https://your-backend-server.com/api/visitor-count')
        .then(response => response.json())
        .then(data => data.count);
}

function incrementVisitorCount() {
    return fetch('https://your-backend-server.com/api/increment-visitor-count', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => data.count);
}

document.addEventListener('DOMContentLoaded', async function() {
    let visitorId = getCookie('visitorId');
    let visitorCount;
    
    if (!visitorId) {
        // Set a unique cookie for the new visitor
        visitorId = Math.random().toString(36).substr(2, 9);
        setCookie('visitorId', visitorId, 365);
        
        // Increment the visitor count
        visitorCount = await incrementVisitorCount();
    } else {
        // Fetch the current visitor count
        visitorCount = await fetchVisitorCount();
    }
    
    // Update the visitor count on the page
    document.getElementById('visitor-count').innerText = visitorCount;
});
