var convert = function () {
  var converterApi =
    "https://akshayanand.herokuapp.com/api/unit/?from=kgms&to=gms&value=1";

  fetch(converterApi).then(function (response) {
    console.log(response);
  });
};
