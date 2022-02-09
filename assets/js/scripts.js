const STRING_EMPTY = '';
const UNDERSCORE = '_'
const SPACE = ' ';
const COLON = ': ' ;
const HTML_NEXTLINE = "</br>"; 
const HTML_BULLET = "&bull; ";
const HTML_DSPACE = "&nbsp;&nbsp;"; 
const APP_ID = '90242961' ;
const API_KEY = '9460d3016254646a35748a9dcc6faa0a';

let searchRecord = [];
let searchClick = 0;

const SERVER_NUMBER = "<strong>Yield: </strong>";
const CUISINE_TYPE = "<strong>Cuisine type: </strong>";
const INGREDIENT_DESC = "<strong>Ingredients: </strong>";
const NUTRIENT_INFO = "<strong>Nutrient Infomation: </strong>";
const DIRECTION_INFO = "Directions";
const SOURCE_INFO = "Source:"
var convert = function () {
  var converterApi =
    "https://akshayanand.herokuapp.com/api/unit/?type=type&from=from&to=to&value=value";

  fetch(converterApi).then(function (response) {
    console.log(response);
  });
};

//----------------------------------------RECIPE-KT-------------------------------------------/
function displayRecipeHits(food_data){
  console.log(food_data);
  
  // -- clear old content
  // -- remove old img before append current image
  if ($("#target_recipe").has("span[class='recipe-box'")){
  $("#target_recipe").empty();
  }

  // -- display up to 3 recipes
  for (var j = 0; j < 3 ; j++)
  {
    var recipeNameForHeader = food_data.hits[j].recipe.label;
    var recipe_search_term = $("<h3>");
    var serve_number = $("<p>");
    var cuisine_type = $("<p>");
    var ingredient_desc = $("<div>");
    var nutrient_info = $("<div>");

    recipe_search_term.text(recipeNameForHeader)
                      .addClass("center-align");
    serve_number.html(SERVER_NUMBER + food_data.hits[j].recipe.yield);
    cuisine_type.html(CUISINE_TYPE + food_data.hits[j].recipe.cuisineType);  

    var ingredientNode = $("<ul>")
    for (var i = 0; i < food_data.hits[j].recipe.ingredientLines.length ; i++)
    {
      var ingredient = $("<li>")
      ingredient.html(HTML_BULLET + HTML_DSPACE + food_data.hits[j].recipe.ingredientLines[i]); 
      ingredientNode.append(ingredient);
    }

    ingredient_desc.html(INGREDIENT_DESC);
    ingredient_desc.append(ingredientNode);

    var recipe_direction = $("<div>");
    var howtoRedirect = $("<a>")
    howtoRedirect.addClass("waves-effect waves-light btn  blue-grey lighten-3");
    howtoRedirect.attr("href", food_data.hits[j].recipe.url);
    howtoRedirect.attr("target", "_blank");
    howtoRedirect.text(DIRECTION_INFO);

    var recipeSource = $("<a>")  
    recipeSource.text(SOURCE_INFO);
    recipeSource.html(SPACE + SOURCE_INFO + SPACE + food_data.hits[j].recipe.source);
    
    recipe_direction.append(howtoRedirect);
    recipe_direction.append(recipeSource);
        
    var recipeSpanImage = $("<img>")
    recipeSpanImage.attr("src", food_data.hits[j].recipe.images.SMALL.url)
    recipeSpanImage.attr("title",  recipeNameForHeader)
    recipeSpanImage.attr("alt", recipeNameForHeader);
    
    var h3El = $("<h3>")
    h3El.addClass("center-align")
        .append(recipeSpanImage);

    var calorie = $("<li>");
    calorie.html(HTML_BULLET + HTML_DSPACE + "<strong>" + food_data.hits[j].recipe.totalNutrients.ENERC_KCAL.label +"</strong>" + COLON
      + SPACE + (food_data.hits[j].recipe.totalNutrients.ENERC_KCAL.quantity).toFixed(2)   
      + SPACE + food_data.hits[j].recipe.totalNutrients.ENERC_KCAL.unit);

    var fat = $("<li>");
    fat.html(HTML_BULLET + HTML_DSPACE + "<strong>" + food_data.hits[j].recipe.totalNutrients.FAT.label +"</strong>" + COLON
      + SPACE +  (food_data.hits[j].recipe.totalNutrients.FAT.quantity).toFixed(2) 
      + SPACE + food_data.hits[j].recipe.totalNutrients.FAT.unit);      
      
    var carb = $("<li>");
    carb.html(HTML_BULLET + HTML_DSPACE + "<strong>" + food_data.hits[j].recipe.totalNutrients.CHOCDF.label +"</strong>" + COLON
      + SPACE + (food_data.hits[j].recipe.totalNutrients.CHOCDF.quantity).toFixed(2)
      + SPACE + food_data.hits[j].recipe.totalNutrients.CHOCDF.unit);  
      
    var sugar = $("<li>");
    sugar.html(HTML_BULLET + HTML_DSPACE + "<strong>" + food_data.hits[j].recipe.totalNutrients.SUGAR.label +"</strong>" + COLON
    + SPACE + (food_data.hits[j].recipe.totalNutrients.SUGAR.quantity).toFixed(2)
    + SPACE + food_data.hits[j].recipe.totalNutrients.SUGAR.unit);  

    var cholesterol = $("<li>");
    cholesterol.html(HTML_BULLET + HTML_DSPACE + "<strong>" + food_data.hits[j].recipe.totalNutrients.CHOLE.label +"</strong>" + COLON
    + SPACE + (food_data.hits[j].recipe.totalNutrients.CHOLE.quantity).toFixed(2)
    + SPACE + food_data.hits[j].recipe.totalNutrients.CHOLE.unit);  

    var potassium = $("<li>");
    potassium.html(HTML_BULLET + HTML_DSPACE + "<strong>" + food_data.hits[j].recipe.totalNutrients.K.label +"</strong>" + COLON
    + SPACE + (food_data.hits[j].recipe.totalNutrients.K.quantity).toFixed(2)
    + SPACE + food_data.hits[j].recipe.totalNutrients.K.unit);  

    var zinc = $("<li>");
    zinc.html(HTML_BULLET + HTML_DSPACE + "<strong>" + food_data.hits[j].recipe.totalNutrients.ZN.label +"</strong>" + COLON
    + SPACE + (food_data.hits[j].recipe.totalNutrients.ZN.quantity).toFixed(2)
    + SPACE + food_data.hits[j].recipe.totalNutrients.ZN.unit);  

    var vitaminA = $("<li>");
    vitaminA.html(HTML_BULLET + HTML_DSPACE + "<strong>" + food_data.hits[j].recipe.totalNutrients.VITA_RAE.label +"</strong>" + COLON
    + SPACE + (food_data.hits[j].recipe.totalNutrients.VITA_RAE.quantity).toFixed(2)
    + SPACE + food_data.hits[j].recipe.totalNutrients.VITA_RAE.unit);  

    var vitaminC = $("<li>");
    vitaminC.html(HTML_BULLET + HTML_DSPACE + "<strong>" + food_data.hits[j].recipe.totalNutrients.VITC.label +"</strong>" + COLON
    + SPACE + (food_data.hits[j].recipe.totalNutrients.VITC.quantity).toFixed(2)
    + SPACE + food_data.hits[j].recipe.totalNutrients.VITC.unit);  

    var vitamineD = $("<li>");
    vitamineD.html(HTML_BULLET + HTML_DSPACE + "<strong>" + food_data.hits[j].recipe.totalNutrients.VITD.label +"</strong>" + COLON
    + SPACE + (food_data.hits[j].recipe.totalNutrients.VITD.quantity).toFixed(2)
    + SPACE + food_data.hits[j].recipe.totalNutrients.VITD.unit);  

    var vitamineE = $("<li>");
    vitamineE.html(HTML_BULLET + HTML_DSPACE + "<strong>" + food_data.hits[j].recipe.totalNutrients.TOCPHA.label +"</strong>" + COLON
    + SPACE + (food_data.hits[j].recipe.totalNutrients.TOCPHA.quantity).toFixed(2)
    + SPACE + food_data.hits[j].recipe.totalNutrients.TOCPHA.unit);  

    var fiber = $("<li>");
    fiber.html(HTML_BULLET + HTML_DSPACE + "<strong>" + food_data.hits[j].recipe.totalNutrients.FIBTG.label +"</strong>" + COLON
    + SPACE + (food_data.hits[j].recipe.totalNutrients.FIBTG.quantity).toFixed(2)
    + SPACE + food_data.hits[j].recipe.totalNutrients.FIBTG.unit); 
    
    var protein = $("<li>");
    protein.html(HTML_BULLET + HTML_DSPACE + "<strong>" + food_data.hits[j].recipe.totalNutrients.PROCNT.label +"</strong>" + COLON
    + SPACE + (food_data.hits[j].recipe.totalNutrients.PROCNT.quantity).toFixed(2)
    + SPACE + food_data.hits[j].recipe.totalNutrients.PROCNT.unit); 

    var nutrientNode = $("<ul>");
    nutrientNode.append(calorie)
                .append(fat)
                .append(carb)
                .append(sugar)
                .append(cholesterol)
                .append(zinc)
                .append(vitaminA)
                .append(vitaminC)
                .append(vitamineD)
                .append(vitamineE)
                .append(fiber)
                .append(protein);

    nutrient_info.html(HTML_NEXTLINE + NUTRIENT_INFO);
    nutrient_info.append(nutrientNode);

    $("#target_recipe").append(h3El)
                      .append(recipe_search_term)
                      .append(serve_number)
                      .append(cuisine_type)
                      .append(ingredient_desc)
                      .append(ingredient_desc)
                      .append(recipe_direction)
                      .append(nutrient_info);
  }

 $("#recipe_box").show(1000);

}

var getRecipeEntity = function(recipephrase){

  // // currentLocalStorageSize = localStorage.length;   
  // // searchClick = (currentLocalStorageSize) ? currentLocalStorageSize : 0;
  // // // alert("searchClick value per storageLength: " + searchClick);
  // // searchClick += 1;
  // // var searchByClicking = {
  // //    searchID: searchClick,
  // //    searchDateTime: moment(),
  // //    searchTerm: recipephrase}
  // //    
  // // // local storage implementation
  // // searchRecord.push(searchByClicking);
  // //  localStorage.setItem(searchByClicking.searchTerm + UNDERSCORE + searchByClicking.searchID, JSON.stringify(searchByClicking));

   console.log(recipephrase);
  //  -- cuisine-type defaults to American if not specified otherwise:
  apiFoodUrl = 'https://api.edamam.com/api/recipes/v2?app_id=' + APP_ID + '&app_key=' + API_KEY + '&type=public&cuisineType=american&q=' + recipephrase;
  console.log("Inside getRecipeEntity : " + apiFoodUrl);
      
  fetch(apiFoodUrl)
    .then(function(food_response) 
    {
          // console.log(food_response); // 404 still display node Response, but headers ok property is false
          if(food_response.ok)
          {
              food_response.json().then(function(food_data)
              {
                // console.log(food_data);
              // -- action
              displayRecipeHits(food_data);
          });
          }
          else
          {
              console.log("Error: Recipe Data Not Found"); // status 400
          }
        
    })// ; remove semicolon bc it's not ended yet
    .catch(function(error){
        console.log("An error has occured: " + error);
    }); // it ends here

  }

var recipeSearchFormEl = document.querySelector("#recipe_form");
var recipeInputEl = document.querySelector("#recipe_phrase");

var formSubmitHandler = function(event){
  event.preventDefault();
  var recipephrase = recipeInputEl.value.trim();

  if (recipephrase) {
     getRecipeEntity(recipephrase);
     recipeInputEl.value = STRING_EMPTY;
  } 
  else {
     alert("Please enter a recipe search-phrase");
  }

}

recipeSearchFormEl.addEventListener("submit", formSubmitHandler);
$("#recipe_box").hide();


