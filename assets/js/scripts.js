var apiKey = "uBGwsY4j0LWUoSuGrIAM6CknwEkLZxNT";
var imgGiphy = document.getElementById("giphy-img");
var searchedTerm = document.getElementById("search-form");

var giphySearch = function (keyword) {
  var url = `https://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${apiKey}&limit=1`;

  fetch(url).then(function (response) {
    if (response.ok) {
      response.json().then((data) => {
        const rUrl = data.data[0].images.original.url;
        console.log(data.data[0]);
        imgGiphy.src = rUrl;
      });
    }
  });
};

// Runs when button is pressed OR when user hits enter
function onFormSubmit() {
  var searchVal = searchedTerm.value;
  // Runs giphySearch function
  giphySearch(searchVal);
}
searchedTerm.addEventListener("keydown", function (event) {
  // checks if the enter key was the key pressed.
  if (event.key === "Enter") {
    event.preventDefault();

    // Trigger the button element with a click+

    document.getElementById("btn").click();
  }
});
btn.addEventListener("click", onFormSubmit);
