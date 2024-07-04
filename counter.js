// Check if 'visitCount' exists in localStorage
if (localStorage.getItem('visitCount')) {
    // If it does, increment the counter
    let count = parseInt(localStorage.getItem('visitCount'), 10);
    count++;
    localStorage.setItem('visitCount', count);
    document.getElementById('visitor-count').innerText = count;
} else {
    // If it doesn't, initialize the counter
    localStorage.setItem('visitCount', 1);
    document.getElementById('visitor-count').innerText = 1;
}
