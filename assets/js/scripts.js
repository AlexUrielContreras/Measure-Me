var apiKey = "uBGwsY4j0LWUoSuGrIAM6CknwEkLZxNT";
var imgGiphy = document.getElementById("giphy-img");

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

function onFormSubmit() {
  let searchedTerm = document.getElementById("search-form").value;

  giphySearch(searchedTerm);
}
giphySearch();

btn.addEventListener("click", onFormSubmit);
