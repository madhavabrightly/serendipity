const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", function () {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        darkModeBtn.textContent = "🌙";
    } else {
        darkModeBtn.textContent = "☀️";
    }

});
const quoteBtn = document.getElementById("quoteBtn");
const quoteText = document.getElementById("quoteText");

quoteBtn.addEventListener("click", () => {

    quoteText.textContent = "Loading...";

    fetch("https://dummyjson.com/quotes/random")
        .then(response => response.json())
        .then(data => {

            quoteText.textContent =
            `"${data.quote}" — ${data.author}`;

        })
        .catch(error => {

            console.error(error);
            quoteText.textContent = "Couldn't load quote.";

        });

});