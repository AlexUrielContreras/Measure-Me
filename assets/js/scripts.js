var convert = function () {
  var converterApi =
    "https://akshayanand.herokuapp.com/api/unit/?type=type&from=from&to=to&value=value";

    fetch(converterApi).then(function (responce) {
if (responce.ok) {
    responce.json().then(data) {
        console.log(data);
    }
}
    })
 
};
convert();
