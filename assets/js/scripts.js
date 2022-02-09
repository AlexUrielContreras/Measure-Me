var apiKey = "uBGwsY4j0LWUoSuGrIAM6CknwEkLZxNT";
var searchForm = document.getElementById("#search-form");

var giphySearch = function (keyword) {
  var url = `https://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${apiKey}&limit=1`;
  fetch(url).then(function (response) {
    if (response.ok) {
      response.json().then((data) => {
        const rUrl = data.data[0].url;
        console.log(rUrl);
      });
    }
  });
};

(function listenOnFormSubmit() {
  searchForm.submit((ev) => {
    ev.preventDefault();
    let;
  });
});
