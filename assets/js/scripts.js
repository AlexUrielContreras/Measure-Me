const STRING_EMPTY = '';
const UNDERSCORE = '_'
const SPACE = ' ';
const COLON = ': ' ;
const SLASH = '/'
const OPEN_PAREN = '(';
const HYPHEN = '-';
const PLUS_SIGN = "+ ";
const TIMESTAMP = '@ ' ;
const HTML_NEXTLINE = "</br>"; 
const HTML_BULLET = "&bull; ";
const HTML_DSPACE = "&nbsp;&nbsp;"; 
const APP_ID = '90242961' ;
const API_KEY = '9460d3016254646a35748a9dcc6faa0a';
const CVTR_APP_ID = 'UnitMercuryKT' ;
const CVTR_API_KEY = '54WxdnbwWSE2TmuOexQ8bMyNbl1gBBc1wl3AhuRlVt9W9mlw';
const ENG2METRIC_CVRT_INST = 'Click to convert unit measurement on this line to Metric - if applicable';
const METRIC2ENG_CVRT_INST = 'Click to convert unit measurement on this line to Imperial - if applicable';
var DEFAULT_CUISINE = 'American';

let searchRecord = [];
let searchClick = 0;
const PRETEXT_HISTORY = "Searched on: "
const SERVER_NUMBER = "<strong>Yield: </strong>";
const CUISINE_TYPE = "<strong>Cuisine type: </strong>";
const MEAL_TYPE = "<strong>Meal type: </strong>";
const DISH_TYPE = "<strong>Dish type: </strong>";
const INGREDIENT_DESC = "<strong>Ingredients: </strong>";
const NUTRIENT_INFO = "<strong>Nutrients Information: </strong>";
const DIRECTION_INFO = "Directions";
const SOURCE_INFO = "Source:"
const METRIC = " - Metric";
const IMPERIAL = "- Imperial";

const commonRecipeUnits = {
  cup: ["cups", "cup"],
  ounce: ["ounce", "ounces", "oz"],
  bigspoon: ["tablespoons","tablespoon", "tbsp.", "tbsp"],
  smallspoon: ["teaspoons", "teaspoon", "tsp.", "tsp"],
  pound: ["pounds", "pound", "lb." , "lb"],
  inch: ["inches", "inch"]
}

const commonKitchenUnits = {
  OZ: 1,
  CUP: 2,
  TABLESPOON: 3,
  TEASPOON: 4,
  LBS: 5
}

var recipeSearchFormEl = document.querySelector("#recipe_form");
var recipeInputEl = document.querySelector("#search-form");

//----------------------------------------RECIPE-KT-------------------------------------------/
function renderLandingPage(){
  hideRecipeBox();
  hideUnitBox();
  hideMessageBox();
  $("#search-form").focus()
  renderItemSearchHistory()
}

function hideHistoryController(){
  $("#history_controller").hide();  
}

function showHistoryController(){
  $("#history_controller").show();  
}

function hideUnitBox(){
  $("#unit_box").hide();
}

function showUnitBox(){
  $("#unit_box").height(900);
  $("#unit_box").show(900);
  
}

function hideRecipeBox(){
  $("#recipe_box").hide();
  // removeModalTrigger();
}

function showRecipeBox(displayResult){
  if(displayResult){
    hideMessageBox();
    $("#recipe_box").height(900);
    $("#recipe_box").show(900);
    // removeModalTrigger();
    // createEntityClickEventHandler(); 
    showUnitBox(); 
  }
  else{
    
    $("#message_box").html("Invalid input or an error has occured. Please try again.")
    showMessageBox();
    hideUnitBox();
    // removeModalTrigger();
  }
  
}

function hideMessageBox(){
  $("#message_box").hide();
  // removeModalTrigger();
}

function showMessageBox(){
  $("#message_box").height(100);
  $("#message_box").show(1200);  
  // removeModalTrigger();
}

function showNoRecordResult()
{   
  $("#message_box").html("No recipe is found at this time. <br> Please check your spelling or try other search option(s).")
  hideUnitBox();
  hideRecipeBox();
  showMessageBox();  
  // removeModalTrigger();
}


// utility function - to create a list of single (bullet) 
function createLinesOfQuantitySpecification(lineNumber){
  for ( var i = 0; i < lineNumber; i++){
    var ingredient = $("<button>")
      ingredient.addClass("quantity_line");
      ingredient.html(HTML_BULLET + HTML_DSPACE + food_data.hits[j].recipe.ingredientLines[i]); 
      ingredientNode.append(ingredient);

 }  
}

// Create elements and populate them with data returned from an recipe api fetch
function displayRecipeHits(food_data, searchByClicking){
  console.log(food_data);
  displayResult = true; // set initial condition to detect when it becomes false
  // -- clear old content
  if ($("#target_recipe").has("img")){
    $("#target_recipe").empty();
    }

    $("#target_converting_line").empty();
    var h3El = $("<h3>").addClass("content-title center-align")
             .text("Unit Conversion");
             $("#target_converting_line").append(h3El);
   
  if(food_data != null)
  {
    if(food_data.count != 0){
      var numSearch = searchByClicking.searchID.toString().split(UNDERSCORE);
      if (numSearch % 3 == 0){
        var itemHistory = $("<p>").addClass("history_alt")
        .attr("title", PRETEXT_HISTORY + searchByClicking.searchDateTime.format('dddd, MMMM Do YYYY') + SPACE + TIMESTAMP + searchByClicking.searchDateTime.format('LTS'))
        .text((searchByClicking.searchTerm));
      }
      else{
        var itemHistory = $("<p>").addClass("history")
        .attr("title", PRETEXT_HISTORY + searchByClicking.searchDateTime.format('dddd, MMMM Do YYYY') + SPACE + TIMESTAMP + searchByClicking.searchDateTime.format('LTS'))
        .text((searchByClicking.searchTerm));
      }
      $("#recently").append(itemHistory);  

      // alert("no record in set");
      if(food_data.hits.length >=5 ){
        // -- display up to 5 recipes
        displayResult = displayRecipeGroup(food_data, 5);
        // createEntityClickEventHandler(); 
        if($("#recipe_box").is(":visible")){hideRecipeBox(1000);}
        showRecipeBox(displayResult);
      }
      else
      {
        displayResult = displayRecipeGroup(food_data, parseInt(food_data.hits.length));
        // createEntityClickEventHandler(); 
        if($("#recipe_box").is(":visible")){hideRecipeBox(1000);}
        showRecipeBox(displayResult);
      }
    }
    else{
      showNoRecordResult()
    }
  }
  
}

// The heart of api server utilizing as the data got fetched succesfully from edamam and ready to be renderred dynamically here:
function displayRecipeGroup(food_data, recipeResultSize)
{
  success = true;
  for (var j = 0; j < recipeResultSize ; j++)
    {
      var recipeNameForHeader = (food_data.hits[j].recipe.label) ? food_data.hits[j].recipe.label : STRING_EMPTY;
      if (!recipeNameForHeader) {success = false; return success;}
      var recipe_search_term = $("<h3>");

      var serve_number = $("<p>");
      var cuisine_type = $("<p>");
      var meal_type = $("<p>");
      var dish_type = $("<p>");

      var ingredient_desc = $("<div>");
      var nutrient_info = $("<div>");

      recipe_search_term.text(recipeNameForHeader)
                        .addClass("center-align");
      serve_number.html(SERVER_NUMBER + food_data.hits[j].recipe.yield);
      cuisine_type.html(CUISINE_TYPE + food_data.hits[j].recipe.cuisineType); 
      meal_type.html(MEAL_TYPE + food_data.hits[j].recipe.mealType); 
      dish_type.html(DISH_TYPE + food_data.hits[j].recipe.dishType);   

      var ingredientNode = $("<div>")  
      ingredientNode.attr("ing_list_data_id", "ing_list_data_" + j); // just in case
      ingredientNode.addClass("ingredient_list");
      for ( var i = 0; i < food_data.hits[j].recipe.ingredientLines.length; i++){
        var ingredient = $("<button>")
        ingredient.addClass("quantity_line");
        ingredient.attr("ing_item_id", "ing_item_" + i); // just in case
        ingredient.val(food_data.hits[j].recipe.ingredientLines[i]); 
        ingredient.html(PLUS_SIGN + HTML_DSPACE + food_data.hits[j].recipe.ingredientLines[i]); 
        ingredient.attr("title", ENG2METRIC_CVRT_INST);
        ingredientNode.append(ingredient);
      }
     
      ingredient_desc.html(INGREDIENT_DESC);
      ingredient_desc.append(ingredientNode);

      //----------------------START OF RECIPE DIRECTION --------------------------------

      var recipe_direction = $("<div>");
      var howtoRedirect = $("<a>")
      howtoRedirect.addClass("waves-effect waves-light btn  blue-grey lighten-3");
      howtoRedirect.attr("href", food_data.hits[j].recipe.url);
      howtoRedirect.attr("target", "_blank");
      howtoRedirect.text(DIRECTION_INFO);

      var recipeSource = $("<a>")  
      // recipeSource.text(SOURCE_INFO);
      recipeSource.html(HTML_DSPACE + SOURCE_INFO + SPACE + food_data.hits[j].recipe.source);
      
      recipe_direction.append(howtoRedirect);
      recipe_direction.append(recipeSource);
          
      var recipeSpanImage = $("<img>")
      recipeSpanImage.attr("src", food_data.hits[j].recipe.images.SMALL.url)
      recipeSpanImage.attr("title",  recipeNameForHeader)
      recipeSpanImage.attr("alt", recipeNameForHeader);
     
      var h3El = $("<h3>")
      h3El.addClass("center-align")
          .append(recipeSpanImage);
       
      //--------------------------------------- END OF RECIPE RENDERING ----------------------------------------

      var calorie = $("<button>");
      calorie.addClass("quanity_line_nutrient");
      calorie.attr("title", METRIC2ENG_CVRT_INST);
      calorie.html(PLUS_SIGN + HTML_DSPACE + "<strong>" + food_data.hits[j].recipe.totalNutrients.ENERC_KCAL.label +"</strong>" + COLON
        + SPACE + (food_data.hits[j].recipe.totalNutrients.ENERC_KCAL.quantity).toFixed(2)   
        + SPACE + food_data.hits[j].recipe.totalNutrients.ENERC_KCAL.unit);
        calorie.val(food_data.hits[j].recipe.totalNutrients.ENERC_KCAL.label + COLON
        + SPACE + (food_data.hits[j].recipe.totalNutrients.ENERC_KCAL.quantity).toFixed(2)   
        + SPACE + food_data.hits[j].recipe.totalNutrients.ENERC_KCAL.unit);        

      var fat = $("<button>");
      fat.addClass("quanity_line_nutrient");
      fat.attr("title", METRIC2ENG_CVRT_INST);
      fat.html(PLUS_SIGN + HTML_DSPACE + "<strong>" + food_data.hits[j].recipe.totalNutrients.FAT.label +"</strong>" + COLON
        + SPACE +  (food_data.hits[j].recipe.totalNutrients.FAT.quantity).toFixed(2) 
        + SPACE + food_data.hits[j].recipe.totalNutrients.FAT.unit); 
      fat.val(food_data.hits[j].recipe.totalNutrients.FAT.label + COLON
        + SPACE + (food_data.hits[j].recipe.totalNutrients.FAT.quantity).toFixed(2) 
        + SPACE + food_data.hits[j].recipe.totalNutrients.FAT.unit);      
        
      var carb = $("<button>");
      carb.attr("title", METRIC2ENG_CVRT_INST);
      carb.addClass("quanity_line_nutrient");
      carb.html(PLUS_SIGN + HTML_DSPACE + "<strong>" + food_data.hits[j].recipe.totalNutrients.CHOCDF.label +"</strong>" + COLON
        + SPACE + (food_data.hits[j].recipe.totalNutrients.CHOCDF.quantity).toFixed(2)
        + SPACE + food_data.hits[j].recipe.totalNutrients.CHOCDF.unit); 
      carb.val(food_data.hits[j].recipe.totalNutrients.CHOCDF.label + COLON
        + SPACE + (food_data.hits[j].recipe.totalNutrients.CHOCDF.quantity).toFixed(2)
        + SPACE + food_data.hits[j].recipe.totalNutrients.CHOCDF.unit);   
        
      var sugar = $("<button>");
      sugar.addClass("quanity_line_nutrient");
      sugar.attr("title", METRIC2ENG_CVRT_INST);
      sugar.html(PLUS_SIGN + HTML_DSPACE + "<strong>" + food_data.hits[j].recipe.totalNutrients.SUGAR.label +"</strong>" + COLON
      + SPACE + (food_data.hits[j].recipe.totalNutrients.SUGAR.quantity).toFixed(2)
      + SPACE + food_data.hits[j].recipe.totalNutrients.SUGAR.unit);  
      sugar.val(food_data.hits[j].recipe.totalNutrients.SUGAR.label + COLON
      + SPACE + (food_data.hits[j].recipe.totalNutrients.SUGAR.quantity).toFixed(2)
      + SPACE + food_data.hits[j].recipe.totalNutrients.SUGAR.unit);  


      var cholesterol = $("<button>");
      cholesterol.addClass("quanity_line_nutrient");
      cholesterol.attr("title", METRIC2ENG_CVRT_INST);
      cholesterol.html(PLUS_SIGN + HTML_DSPACE + "<strong>" + food_data.hits[j].recipe.totalNutrients.CHOLE.label +"</strong>" + COLON
      + SPACE + (food_data.hits[j].recipe.totalNutrients.CHOLE.quantity).toFixed(2)
      + SPACE + food_data.hits[j].recipe.totalNutrients.CHOLE.unit);  
      cholesterol.val(food_data.hits[j].recipe.totalNutrients.CHOLE.label + COLON
      + SPACE + (food_data.hits[j].recipe.totalNutrients.CHOLE.quantity).toFixed(2)
      + SPACE + food_data.hits[j].recipe.totalNutrients.CHOLE.unit);  

      var potassium = $("<button>");
      potassium.addClass("quanity_line_nutrient");
      potassium.attr("title", METRIC2ENG_CVRT_INST);
      potassium.html(PLUS_SIGN + HTML_DSPACE + "<strong>" + food_data.hits[j].recipe.totalNutrients.K.label +"</strong>" + COLON
      + SPACE + (food_data.hits[j].recipe.totalNutrients.K.quantity).toFixed(2)
      + SPACE + food_data.hits[j].recipe.totalNutrients.K.unit);  
      potassium.val(food_data.hits[j].recipe.totalNutrients.K.label + COLON
      + SPACE + (food_data.hits[j].recipe.totalNutrients.K.quantity).toFixed(2)
      + SPACE + food_data.hits[j].recipe.totalNutrients.K.unit);  

      var zinc = $("<button>");
      zinc.addClass("quanity_line_nutrient");
      zinc.attr("title", METRIC2ENG_CVRT_INST);
      zinc.html(PLUS_SIGN + HTML_DSPACE + "<strong>" + food_data.hits[j].recipe.totalNutrients.ZN.label +"</strong>" + COLON
      + SPACE + (food_data.hits[j].recipe.totalNutrients.ZN.quantity).toFixed(2)
      + SPACE + food_data.hits[j].recipe.totalNutrients.ZN.unit); 
      zinc.val(food_data.hits[j].recipe.totalNutrients.ZN.label + COLON
      + SPACE + (food_data.hits[j].recipe.totalNutrients.ZN.quantity).toFixed(2)
      + SPACE + food_data.hits[j].recipe.totalNutrients.ZN.unit);   

      var vitaminA = $("<button>");
      vitaminA.addClass("quanity_line_nutrient");
      vitaminA.attr("title", METRIC2ENG_CVRT_INST);
      vitaminA.html(PLUS_SIGN + HTML_DSPACE + "<strong>" + food_data.hits[j].recipe.totalNutrients.VITA_RAE.label +"</strong>" + COLON
      + SPACE + (food_data.hits[j].recipe.totalNutrients.VITA_RAE.quantity).toFixed(2)
      + SPACE + food_data.hits[j].recipe.totalNutrients.VITA_RAE.unit);  
      vitaminA.val(food_data.hits[j].recipe.totalNutrients.VITA_RAE.label + COLON
      + SPACE + (food_data.hits[j].recipe.totalNutrients.VITA_RAE.quantity).toFixed(2)
      + SPACE + food_data.hits[j].recipe.totalNutrients.VITA_RAE.unit);  

      var vitaminC = $("<button>");
      vitaminC.addClass("quanity_line_nutrient");
      vitaminC.attr("title", METRIC2ENG_CVRT_INST);
      vitaminC.html(PLUS_SIGN + HTML_DSPACE + "<strong>" + food_data.hits[j].recipe.totalNutrients.VITC.label +"</strong>" + COLON
      + SPACE + (food_data.hits[j].recipe.totalNutrients.VITC.quantity).toFixed(2)
      + SPACE + food_data.hits[j].recipe.totalNutrients.VITC.unit);  
      vitaminC.val(food_data.hits[j].recipe.totalNutrients.VITC.label + COLON
      + SPACE + (food_data.hits[j].recipe.totalNutrients.VITC.quantity).toFixed(2)
      + SPACE + food_data.hits[j].recipe.totalNutrients.VITC.unit);  

      var vitamineD = $("<button>");
      vitamineD.addClass("quanity_line_nutrient");
      vitamineD.attr("title", METRIC2ENG_CVRT_INST);
      vitamineD.html(PLUS_SIGN + HTML_DSPACE + "<strong>" + food_data.hits[j].recipe.totalNutrients.VITD.label +"</strong>" + COLON
      + SPACE + (food_data.hits[j].recipe.totalNutrients.VITD.quantity).toFixed(2)
      + SPACE + food_data.hits[j].recipe.totalNutrients.VITD.unit);  
      vitamineD.val(food_data.hits[j].recipe.totalNutrients.VITD.label + COLON
      + SPACE + (food_data.hits[j].recipe.totalNutrients.VITD.quantity).toFixed(2)
      + SPACE + food_data.hits[j].recipe.totalNutrients.VITD.unit);  

      var vitamineE = $("<button>");
      vitamineE.addClass("quanity_line_nutrient");
      vitamineE.attr("title", METRIC2ENG_CVRT_INST);
      vitamineE.html(PLUS_SIGN + HTML_DSPACE + "<strong>" + food_data.hits[j].recipe.totalNutrients.TOCPHA.label +"</strong>" + COLON
      + SPACE + (food_data.hits[j].recipe.totalNutrients.TOCPHA.quantity).toFixed(2)
      + SPACE + food_data.hits[j].recipe.totalNutrients.TOCPHA.unit);  
      vitamineE.val(food_data.hits[j].recipe.totalNutrients.TOCPHA.label + COLON
      + SPACE + (food_data.hits[j].recipe.totalNutrients.TOCPHA.quantity).toFixed(2)
      + SPACE + food_data.hits[j].recipe.totalNutrients.TOCPHA.unit);  

      var fiber = $("<button>");
      fiber.addClass("quanity_line_nutrient");
      fiber.attr("title", METRIC2ENG_CVRT_INST);
      fiber.html(PLUS_SIGN + HTML_DSPACE + "<strong>" + food_data.hits[j].recipe.totalNutrients.FIBTG.label +"</strong>" + COLON
      + SPACE + (food_data.hits[j].recipe.totalNutrients.FIBTG.quantity).toFixed(2)
      + SPACE + food_data.hits[j].recipe.totalNutrients.FIBTG.unit); 
      fiber.val(food_data.hits[j].recipe.totalNutrients.FIBTG.label + COLON
      + SPACE + (food_data.hits[j].recipe.totalNutrients.FIBTG.quantity).toFixed(2)
      + SPACE + food_data.hits[j].recipe.totalNutrients.FIBTG.unit); 

      var protein = $("<button>");
      protein.addClass("quanity_line_nutrient");
      protein.attr("title", METRIC2ENG_CVRT_INST);
      protein.html(PLUS_SIGN + HTML_DSPACE + "<strong>" + food_data.hits[j].recipe.totalNutrients.PROCNT.label +"</strong>" + COLON
      + SPACE + (food_data.hits[j].recipe.totalNutrients.PROCNT.quantity).toFixed(2)
      + SPACE + food_data.hits[j].recipe.totalNutrients.PROCNT.unit); 
      protein.val(food_data.hits[j].recipe.totalNutrients.PROCNT.label + COLON
      + SPACE + (food_data.hits[j].recipe.totalNutrients.PROCNT.quantity).toFixed(2)
      + SPACE + food_data.hits[j].recipe.totalNutrients.PROCNT.unit); 

      var nutrientNode = $("<div>");
      nutrientNode.addClass("nutrient_list"); 
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
                        .append(meal_type)
                        .append(dish_type)
                        .append(ingredient_desc)
                        .append(recipe_direction)
                        .append(nutrient_info);
    } // end for loop -------------------------------------------------
    // -- short way to create click-event handler for each ingredient "button" rendered as description line
    $("button[class='quantity_line']").on( "click", function() {
      $(this).css("background-color", "#f2f2f2")
      var ingData = $(this).val()
      getScannedForImperialUnitConvertable(ingData)
      // alert(ingData);
    });

    $("button[class='quantity_line']").mouseover( "click", function() {
      $(this).attr("title", ENG2METRIC_CVRT_INST);
       
    });

     // -- short way to create click-event handler for each nutrient "button"
    $("button[class='quanity_line_nutrient']").on("click", function() {
      $(this).css("background-color", "#f2f2f2")
      var nutriData = $(this).val()
      getScannedForMetricConvertable(nutriData);     

    });    

    $("button[class='quanity_line_nutrient']").mouseover("click", function() {
      $(this).attr("title", METRIC2ENG_CVRT_INST);      
    });
       
    return success;
}

// Deals with the nutrient lines extracting the numeric data and perspective unit
function getScannedForMetricConvertable(nutriData){
  let portionLabel = nutriData.split(COLON)[0].trim();
  let portionNoneLabel = nutriData.split(COLON)[1].trim();
  quantity = portionNoneLabel.split(SPACE);
 
  var lineNutrient = {
    original : nutriData,
    preceedingNum: portionLabel,
    num:  quantity[0].trim(),
    unit: quantity[1].trim(),
    desc: STRING_EMPTY,
    apirequest:  "https://neutrinoapi.net/convert?to-type=Ounce&user-id=" + CVTR_APP_ID + "&api-key=" + CVTR_API_KEY + "&from-type=Gram&from-value="
  } 

  // // ready to be fetched to get the converted data from server API site but it does not let us do it
  // // so we might as well display it in a certain form as if the API is running
  displayConvertedEntityNutrient(lineNutrient);
   
};

// In Use to keep the Unit Conversion box populated with before and after in regard to what is to be converted 
function displayConvertedEntityNutrient(lineNutrient){
  var lineDescTextAfter = STRING_EMPTY;
  var afterQuestionMark = lineNutrient.apirequest.split("=");
  var toUnitQueryString = afterQuestionMark[1].split("&");
  var toUnit = toUnitQueryString[0];

  // For illustration purpose only - micro gram is not accurate - only gram to ounce is
  lineDescTextAfter =  ((lineNutrient.num)/28.34952).toFixed(2) + SPACE + toUnit; // we're using arithmetic computing since server Api is down

  var nutrient_desc_english = $("<div>");
  nutrient_desc_english.html(NUTRIENT_INFO + IMPERIAL);
  var nutrient_desc_metric = $("<div>");
  nutrient_desc_metric.html(NUTRIENT_INFO + METRIC);

  var nutrientNodeBefore = $("<div>")  
  // nutrientNodeBefore.addClass("quanity_line_nutrient");

  var nutrient = $("<button>")
  nutrient.addClass("quantity_line");
  nutrient.val(lineNutrient.original); 
  nutrient.html(PLUS_SIGN + HTML_DSPACE + lineNutrient.original); 
 
  nutrientNodeBefore.append(nutrient);  
  nutrient_desc_metric.append(nutrientNodeBefore);

  var nutrientNodeAfter = $("<div>")  
  // nutrientNodeAfter.addClass("quanity_line_nutrient");

  var nutrientAfter = $("<button>")
  nutrientAfter.addClass("quantity_line");
  nutrientAfter.val(lineNutrient.preceedingNum + lineDescTextAfter); 
  nutrientAfter.html(PLUS_SIGN + HTML_DSPACE + "<strong>" + lineNutrient.preceedingNum + "</strong>" + COLON + SPACE + lineDescTextAfter); 
  nutrientAfter.css("color", "#28a191");
  nutrientNodeAfter.append(nutrientAfter);
  
  nutrient_desc_english.html(INGREDIENT_DESC + "- Imperial");
  nutrient_desc_english.append(nutrientNodeAfter); 
  

  $("#target_converting_line").append(nutrient_desc_metric); 
  $("#target_converting_line").append(nutrient_desc_english);
  
}

// Looks at ingredient raw data
function getScannedForImperialUnitConvertable(ingData){
  // -- we could call scanCup(), scanOunce(), etc here but the server API didn't suport fetching from code behind
  // so we just render the raw data at the unit conversion box as if it's been treat. We modify when time allows
  var lineDesc = {
    original : ingData,
    preceedingNum: STRING_EMPTY,
    num: STRING_EMPTY,
    unit: STRING_EMPTY,
    desc: STRING_EMPTY,
    type: commonKitchenUnits.CUP,
    apirequest: "https://neutrinoapi.net/convert?to-type=Liter&user-id=" + CVTR_APP_ID + "&api-key=" + CVTR_API_KEY + "&from-type=Pint&from-value="
  }
 
  // // ready to be fetched to get the converted data from server API site but it does not let us do it
  // // so we might as well display it in a certain form as if the API is running
  displayConvertedEntityIngredient(lineDesc);
   
};

function displayConvertedEntityIngredient(lineDesc){
  var lineDescTextAfter = STRING_EMPTY;
  var afterQuestionMark = lineDesc.apirequest.split("=");
  var toUnitQueryString = afterQuestionMark[1].split("&");
  var toUnit = toUnitQueryString[0];

  // // Put all the chuck from server API data from which we would have extracted and converted and put them back here
  lineDescTextAfter = lineDesc.preceedingNum + "[0.18]" + SPACE + toUnit + SPACE + lineDesc.desc;

  // But just going to copy the raw data over for Right Box illustratin purpose
  lineDescTextAfter = lineDesc.original;

  var ingredient_desc_english = $("<div>");
  ingredient_desc_english.html(INGREDIENT_DESC + IMPERIAL);
  var ingredient_desc_metric = $("<div>");
  ingredient_desc_metric.html(INGREDIENT_DESC + METRIC);

  var ingredientNodeBefore = $("<div>")  
  ingredientNodeBefore.addClass("ingredient_list");

  var ingredient = $("<button>")
  ingredient.addClass("quantity_line");
  ingredient.val(lineDesc.original); 
  ingredient.html(PLUS_SIGN + HTML_DSPACE + lineDesc.original); 
  
  ingredientNodeBefore.append(ingredient);  
  ingredient_desc_english.append(ingredientNodeBefore);

  var ingredientNodeAfter = $("<div>")  
  ingredientNodeAfter.addClass("ingredient_list");

  var ingredientAfter = $("<button>")
  ingredientAfter.addClass("quantity_line");
  ingredientAfter.val(lineDescTextAfter); 
  ingredientAfter.css("color", "#61b4da;")
  ingredientAfter.html(PLUS_SIGN + HTML_DSPACE + "[ " + lineDescTextAfter + " ]"); 
  ingredientNodeAfter.append(ingredientAfter);
  
  ingredient_desc_metric.html(INGREDIENT_DESC + "- Metric");
  ingredient_desc_metric.append(ingredientNodeAfter);  
  $("#target_converting_line").append(ingredient_desc_english); //display at Right box
  $("#target_converting_line").append(ingredient_desc_metric);

}

//-------------------------------------Scan unit in desc for dynamic conversion ----------------------
// (1) scan of whole cups
function scanCup(ingData){
  var lineDesc = {
    original : ingData,
    preceedingNum: STRING_EMPTY,
    num: STRING_EMPTY,
    unit: STRING_EMPTY,
    desc: STRING_EMPTY,
    type: commonKitchenUnits.CUP,
    apirequest: STRING_EMPTY
  }
   
  for( var i = 0; i < commonRecipeUnits.cup.length; i++ )
  {
    // alert("i'm in for loop cup")
    // alert(ingData)
    found = ingData.indexOf(commonRecipeUnits.cup[i]);
    console.log(found);
    if(found != -1)
    {
      var arr = ingData.split(commonRecipeUnits.cup[i]);
      console.log(arr);
      lineDesc = {
        original : ingData,
        preceedingNum: STRING_EMPTY,
        num: parseInt(arr[0].trim())*2,
        unit: commonRecipeUnits.cup[i],
        desc: arr[arr.length - 1].trim(),
        type: commonKitchenUnits.CUP,
        apirequest: "https://neutrinoapi.net/convert?to-type=Liter&user-id=" + CVTR_APP_ID + "&api-key=" + CVTR_API_KEY + "&from-type=Ounce&from-value="  
      }
      console.log(lineDesc);
      return lineDesc;
    }
    else{
       // next group
       lineDesc = null;
    }
  }
  return lineDesc;
}

//(3) Scan for table-spoon
function scanTablespoon(ingData)
{
  var found = false;
  var lineDesc = {
    original : ingData,
    preceedingNum: STRING_EMPTY,
    num: STRING_EMPTY,
    unit: STRING_EMPTY,
    desc: STRING_EMPTY,
    type: commonKitchenUnits.TABLESPOON,
    apirequest: STRING_EMPTY
  }
  for( var i = 0; i < commonRecipeUnits.bigspoon.length; i++ )
  {
    // alert("i'm in for table-spoon loop")
    found = ingData.indexOf(commonRecipeUnits.bigspoon[i]);
    if(found != -1)
    {
      // alert("i'm Found in loop bigspoon")
      var arr = ingData.split(commonRecipeUnits.bigspoon[i]);
      console.log(arr);
      console.log(arr[0]);
      var existedSlash = arr[0].indexOf(SLASH);
      console.log(existedSlash);
      if (existedSlash != -1)
      {
        var arrLeft = arr(0);
        if(arr(0).length <= 3)
        {
          if(arrLeft.includes(SLASH))
          {
            var vicinitySlashes = arr[0].split(SLASH);
            // alert("ratio is: " + vicinitySlashes[0])
            lineDesc = {
              original : ingData,
              preceedingNum: STRING_EMPTY,
              num: (parseInt(vicinitySlashes[0]) / parseInt(vicinitySlashes[1]))/2,
              unit: commonRecipeUnits.ounce[i],
              desc: arr[arr.length - 1].trim(),
              type: commonKitchenUnits.TABLESPOON,
              apirequest: "https://neutrinoapi.net/convert?to-type=Liter&user-id=" + CVTR_APP_ID + "&api-key=" + CVTR_API_KEY + "&from-type=Ounce&from-value="  
            }
            return lineDesc;
          }
          
        }
        else // whole number plus fraction
        {
           if(arrLeft.includes(SPACE))
           {
              numericArry = arrLeft.split(SPACE);
              lineDesc = {
              original : ingData,
              preceedingNum: STRING_EMPTY,
              num: parseInt( numericArry[0]) + (parseInt(numericArry[1]) / parseInt(numericArry[2]))/2,
              unit: commonRecipeUnits.ounce[i],
              desc: arr[arr.length - 1].trim(),
              type: commonKitchenUnits.TABLESPOON,
              apirequest: "https://neutrinoapi.net/convert?to-type=Liter&user-id=" + CVTR_APP_ID + "&api-key=" + CVTR_API_KEY + "&from-type=Ounce&from-value="  
              }
            }
            return lineDesc;
        }

      } 
      else // if no slash found, we have whole number
      {
        lineDesc = {
        original : ingData,
        preceedingNum: STRING_EMPTY,
        num: parseInt(arr[0])/2,
        unit: commonRecipeUnits.ounce[i],
        desc: arr[arr.length - 1].trim(),
        type: commonKitchenUnits.TABLESPOON,
        apirequest: "https://neutrinoapi.net/convert?to-type=Liter&user-id=" + CVTR_APP_ID + "&api-key=" + CVTR_API_KEY + "&from-type=Ounce&from-value="  
        }
        return lineDesc;
      }
    }
    else // no match at all
    {
      lineDesc = null;
    }

  } // end for
  return lineDesc;
}  

// (2) Scan for Ounce
function scanOunce(ingData)
{
  var lineDesc = {
    original : ingData,
    preceedingNum: STRING_EMPTY,
    num: STRING_EMPTY,
    unit: STRING_EMPTY,
    desc: STRING_EMPTY,
    type: commonKitchenUnits.OZ,
    apirequest: STRING_EMPTY
  }
  for( var i = 0; i < commonRecipeUnits.ounce.length; i++ )
  {
    var finalNum = STRING_EMPTY;
    // alert("i'm in for loop ounce")
    found = ingData.indexOf(commonRecipeUnits.ounce[i]);
    if(found != -1)
    {
      // alert("i'm Found in loop ounce")
      var arr = ingData.split(commonRecipeUnits.ounce[i]);
      console.log(arr);
      console.log(arr[0]);
      var isParenthesis = arr[0].indexOf(OPEN_PAREN);
      console.log(isParenthesis);
      if (isParenthesis != -1)
      {
        // alert("i'm Found in loop ounce - parenthesis")
        var vicinityParenthesis = arr[0].split(OPEN_PAREN);
        // alert(vicinityParenthesis[0])
        var vicinityRight = vicinityParenthesis[vicinityParenthesis.length - 1];
        console.log(vicinityRight)
        var vicinityHyphen = (vicinityRight.includes(HYPHEN)) ? vicinityRight.split(HYPHEN) : null;
        // console.log(vicinityHyphen)
        if(vicinityHyphen != null) {
          // alert(parseInt(vicinityHyphen[0]) / 16);
          lineDesc = {
            original : ingData,
            preceedingNum: vicinityParenthesis[0] + OPEN_PAREN,
            num: parseInt(vicinityHyphen[0]) / 16,
            unit: commonRecipeUnits.ounce[i],
            desc: arr[arr.length - 1].trim(),
            type: commonKitchenUnits.OZ, 
            apirequest: "https://neutrinoapi.net/convert?to-type=Liter&user-id=" + CVTR_APP_ID + "&api-key=" + CVTR_API_KEY + "&from-type=Pint&from-value="  
          }
          console.log(lineDesc);
          return lineDesc;
        }

      }
      else
      {
          // -- no parenthesis
          lineDesc = {
            original : ingData,
            preceedingNum: STRING_EMPTY,
            num: parseInt( arr[0].trim())/16,
            unit: commonRecipeUnits.ounce[i],
            desc: arr[arr.length - 1].trim(),
            type: commonKitchenUnits.OZ, 
            apirequest: "https://neutrinoapi.net/convert?to-type=Liter&user-id=" + CVTR_APP_ID + "&api-key=" + CVTR_API_KEY + "&from-type=Pint&from-value="  
          }
          console.log(lineDesc);
      }
      
    } 
    else // if not found
    {
      lineDesc = null;
    }
  }
  return lineDesc;
}

// This handles event when the ingredient line is clicked to get target unit converted
// No longer in use - there's shorter way
var ingredientButtonHandler = function(event) {
  var lineDesc = {
    num: STRING_EMPTY,
    unit: STRING_EMPTY,
    desc: STRING_EMPTY,
    type: STRING_EMPTY,
    apirequest: STRING_EMPTY
  }
  var targetEl = event.target;
 
  if (targetEl.matches(".quantity_line")) 
  {  
    // var found = false;
    var unitcase = 0;
    targetUnit = 0;
    
    var ingData = targetEl.getAttribute("value").toLowerCase();
    
    var unitEntityHit = scanCup(ingData);
    console.log("My result is: " )
    console.log( unitEntityHit)

    if(unitEntityHit != null)
    {
      // alert("CUP FOUND!")
      getUnitEntityConvertedPerAPI(unitEntityHit);
    }
    else{
      unitEntityHit = scanOunce(ingData);
      if(unitEntityHit != null)
      {
        // alert("OUNCE FOUND!")
        getUnitEntityConvertedPerAPI(unitEntityHit);
      }
      else
      {
        unitEntityHit = scanTablespoon(ingData);
        if(unitEntityHit != null)
        {
          // alert("TABLESPOON FOUND!")
          getUnitEntityConvertedPerAPI(unitEntityHit);
        }
      }
    }
  } // end if
}

// No longer in use becuase of API's Cors Policy
var getUnitEntityConvertedPerAPI = function(lineDesc){
  // alert("ready to be converted");
  var apiUnitUrl = lineDesc.apirequest + lineDesc.num;
  // clear old unit converter content
  if ($("#target_converting_line").has("<button>")){
    $("#target_converting_line").empty();
    }
   
    fetch(apiUnitUrl
      
     ).then(function(unit_response) 
     {
      if(unit_response.ok)
      {
          unit_response.json().then(function(unit_data)
          {
          console.log(unit_data);
          // -- action
          displayConvertedEntity(unit_data, lineDesc);
          
      });
      }
      else
      {
          console.log("Error: Recipe Data Not Found"); // status 400
      }
          
    })  
    .catch(function(error){
        console.log("An error has occured: " + error);
    }); // it ends here

    displayConvertedEntity("", lineDesc);

}

//------------------------------------End of unit scanning for server API unit-converting------------------------------

// Display ingredient line before and after being convert on mouse-click
// Useful in obj property datastructure but no longer active
function displayConvertedEntity(unit_data, lineDesc){
  displayResult = true;
  // alert("type is: " + lineDesc.type);
  var lineDescTextAfter = STRING_EMPTY;
  var afterQuestionMark = lineDesc.apirequest.split("=");
  var toUnitQueryString = afterQuestionMark[1].split("&");
  var toUnit = toUnitQueryString[0];
  // alert("to unit: " + toUnit)

  // -- clear old content
  if ($("#target_converting_line").has("button")){
  $("#target_converting_line").empty();
  }

  var ingredient_desc_english = $("<div>");
  ingredient_desc_english.html(INGREDIENT_DESC + IMPERIAL);
  var ingredient_desc_metric = $("<div>");
  ingredient_desc_metric.html(INGREDIENT_DESC + METRIC);
  console.log(lineDesc.type)
  switch(lineDesc.type){
    case 1:
      // // lineDescTextAfter = lineDesc.preceedingNum + unit_data.result + SPACE + HYPHEN + SPACE + toUnit + lineDesc.desc;
      lineDescTextAfter = lineDesc.preceedingNum + "0.18" + SPACE + toUnit + SPACE + lineDesc.desc;
      // alert("case 1");
      break;
    case 2:
    case 3:
    case 4:
    case 5:
      // alert ("case 2 to 5")
      // // lineDescTextAfter = unit_data.result + toUnit + lineDesc.desc;
      lineDescTextAfter = "0.47" + SPACE + toUnit + SPACE + lineDesc.desc;
      break;
    default:
      toUnit = "mixed";
  }
  // // lineDescTextAfter = lineDesc.preceedingNum + unit_data.result-float + SPACE + unit_data.to-type + lineDesc.desc;
  // lineDescTextAfter = lineDesc.preceedingNum + "0.18" + SPACE + toUnit + lineDesc.desc;

  var ingredientNodeBefore = $("<div>")  
  ingredientNodeBefore.addClass("ingredient_list");


  var ingredient = $("<button>")
  ingredient.addClass("quantity_line");
  ingredient.val(lineDesc.original); 
  ingredient.html(PLUS_SIGN + HTML_DSPACE + lineDesc.original); 
  // ingredient.prop("disabled", true);
  ingredientNodeBefore.append(ingredient);  
  ingredient_desc_english.append(ingredientNodeBefore);

  var ingredientNodeAfter = $("<div>")  
  ingredientNodeAfter.addClass("ingredient_list");

  var ingredientAfter = $("<button>")
  ingredientAfter.addClass("quantity_line");
  ingredientAfter.val(lineDescTextAfter); 
  ingredientAfter.html(PLUS_SIGN + HTML_DSPACE + lineDescTextAfter); 
  ingredientNodeAfter.append(ingredientAfter);
  
  ingredient_desc_metric.html(INGREDIENT_DESC + "- Metric");
  ingredient_desc_metric.append(ingredientNodeAfter);  
  $("#target_converting_line").append(ingredient_desc_english);
  $("#target_converting_line").append(ingredient_desc_metric);


}

// Active with Adaman food data API - called when button search is clicked
var getRecipeEntity = function(recipephrase, searchOptions)
{
  currentLocalStorageSize = localStorage.length;   
  searchClick = (currentLocalStorageSize) ? currentLocalStorageSize : 0;
  // alert("searchClick value per storageLength: " + searchClick);
  searchClick += 1;

  var searchByClicking = {
    searchID: searchClick,
    searchDateTime: moment(),
    searchTerm: recipephrase}

  // local storage implementation
  searchRecord.push(searchByClicking);
  localStorage.setItem(searchByClicking.searchTerm + UNDERSCORE + searchByClicking.searchID, JSON.stringify(searchByClicking));

  var apiFoodUrl = STRING_EMPTY;
  // -- cuisine-type defaults to American
  apiFoodUrl = 'https://api.edamam.com/api/recipes/v2?app_id=' + APP_ID + '&app_key=' + API_KEY 
                  + '&type=public&cuisineType=american&q=' + recipephrase;

  // If someone changes the default cuisine to anything else
  if (searchOptions.cuisineType.toString().toLocaleLowerCase() != DEFAULT_CUISINE.toLocaleLowerCase())
  {
    apiFoodUrl = 'https://api.edamam.com/api/recipes/v2?app_id=' + APP_ID + '&app_key=' + API_KEY 
                   + '&type=public&cuisineType=' + searchOptions.cuisineType
                   + '&mealType=' + searchOptions.mealType 
                   + '&dishType=' + searchOptions.dishType 
                   + '&q=' + recipephrase;   
                  //  alert("all are present");
                  //  alert( searchOptions.cuisineType)
  }
  if (searchOptions.mealType == STRING_EMPTY)
  {
    apiFoodUrl = 'https://api.edamam.com/api/recipes/v2?app_id=' + APP_ID + '&app_key=' + API_KEY 
                  + '&type=public&cuisineType=' + searchOptions.cuisineType
                  + '&dishType=' + searchOptions.dishType 
                  + '&q=' + recipephrase;  
    // alert("Meeallll Type absent");
    // alert( searchOptions.cuisineType)
  } 
  if (searchOptions.dishType  == STRING_EMPTY)
  {
    apiFoodUrl = 'https://api.edamam.com/api/recipes/v2?app_id=' + APP_ID + '&app_key=' + API_KEY 
                  + '&type=public&cuisineType=' + searchOptions.cuisineType
                  + '&mealType=' + searchOptions.mealType 
                  + '&q=' + recipephrase;  
    //  alert("Disshhh-Type absent");              
    //  alert( searchOptions.cuisineType)
  }
  if ((searchOptions.mealType == STRING_EMPTY) && (searchOptions.dishType == STRING_EMPTY))
  {
    apiFoodUrl = 'https://api.edamam.com/api/recipes/v2?app_id=' + APP_ID + '&app_key=' + API_KEY 
                  + '&type=public&cuisineType=' + searchOptions.cuisineType
                  + '&q=' + recipephrase;   
                  // alert("Both Type absent");
                  // alert( searchOptions.cuisineType)
  }
 

  console.log(recipephrase);

  //  -- cuisine-type defaults to American if not specified otherwise:
  
  console.log("Inside getRecipeEntity : " + apiFoodUrl);
      
  fetch(apiFoodUrl).then(function(food_response) 
  {
    // console.log(food_response);  
    if(food_response.ok)
    {
        food_response.json().then(function(food_data)
        {
        // console.log(food_data);
        // -- action
        result = displayRecipeHits(food_data, searchByClicking);
        if(result = null){
          console.log("No recipe hit found or an error has occurred");
        }
        
    });
    }
    else
    {
        console.log("Error: Recipe Data Not Found"); // status 400
    }
        
  })  
  .catch(function(error){
      console.log("An error has occured: " + error);
  }); // it ends here
  
}

// Determines whether to display item history if history exists when page first loads - key/value approach
function renderItemSearchHistory(){
  currentLocalStorageSize = localStorage.length;
  // setHistoryColumnVisibility(currentLocalStorageSize);
  if(currentLocalStorageSize){
     showHistoryController();
     searchRecord.length = 0;
     
     for(var i=0; i < currentLocalStorageSize; i++) {
         // extraction
        let keyalias = localStorage.key(i);
        var itemRowValueOfKey = JSON.parse(localStorage.getItem(keyalias));
        
        var searchByClicking = {
           searchID: itemRowValueOfKey.searchID,
           searchDateTime: moment(itemRowValueOfKey.searchDateTime),
           searchTerm: itemRowValueOfKey.searchTerm }         
        
        searchRecord.push(searchByClicking);
     }

     // // searchRecord.sort(function(a, b){
     // //    return a.searchID - b.searchID;
     // // });

     // sort the data by date using moment.js
     searchRecord.sort(function (momentObjLeft, momentObjRight) {
        return (momentObjLeft.searchDateTime).diff((momentObjRight.searchDateTime))
     });

     console.log(searchRecord); // sorted array asc
     
     // -- remove old children div before append new div of new city 
     if ($("#recently").has("input")){
        $("#recently").empty();
     }
   
     for(var j=0; j < searchRecord.length; j++) {
        
        var searchDate = moment(searchRecord[j].searchDateTime);
        var searchTime = moment(searchRecord[j].searchDateTime);
        if(((j)%3 != 0))
        {
          var itemHistory = $("<p>").addClass("history")
          .attr("title", PRETEXT_HISTORY + searchDate.format('dddd, MMMM Do YYYY') + SPACE + TIMESTAMP + searchTime.format('LTS'))
          .text((searchRecord[j].searchTerm));
           $("#recently").append(itemHistory);
        }
        else{
          var itemHistory = $("<p>").addClass("history_alt")
          .attr("title", PRETEXT_HISTORY + searchDate.format('dddd, MMMM Do YYYY') + SPACE + TIMESTAMP + searchTime.format('LTS'))
          .text((searchRecord[j].searchTerm));
          $("#recently").append(itemHistory);
        }
       
     }

     $("#recently").append(itemHistory);  
     // console.log($("#pole_blue_theme").children())
     // setHistoryColumnVisibility(currentLocalStorageSize);
  }
}

// Handle submission as button is of type submit not type button
var formSubmitHandler = function(event){
  event.preventDefault();
  var recipephrase = recipeInputEl.value.trim();
  var searchOptions = {
    mealType : $("#meal_type").val(),
    dishType : $("#dish_type").val(),
    cuisineType : $("#cuisine_type :selected").text()
  }

  if (recipephrase) {
    $("#btn").removeClass('modal-trigger');        
   
    getRecipeEntity(recipephrase, searchOptions);
    
  } 
  else {
    // Prompt for required input
    $("#btn").addClass("modal-trigger")
             .attr("data-target", "promt_req");
    $('.modal').modal();
    $("#btn").click();
    
  }

}

// Form element wants to make keydown event equivalent to submitting
recipeSearchFormEl.addEventListener("keydown", function (event) {  
   // -- checks if the enter key was the key pressed.
  if (event.key === "Enter") {
    event.preventDefault();
    // -- Trigger the button element with a click
    document.getElementById("btn").click();
  }
});

// Form element wants to listen submit event from button of type submit
recipeSearchFormEl.addEventListener("submit", formSubmitHandler); 

// Testing food API - currently cannot be utilized due to Cors Policy error message
var quickFetchUnit = function()
{
  //  -- cuisine-type defaults to American if not specified otherwise:
  apiFoodUrl = 'https://neutrinoapi.net/convert?to-type=Liter&user-id=UnitMercuryKT&api-key=54WxdnbwWSE2TmuOexQ8bMyNbl1gBBc1wl3AhuRlVt9W9mlw&from-type=Pint&from-value=0.375'
  console.log("Inside getRecipeEntity : " + apiFoodUrl);
      
  fetch(apiFoodUrl).then(function(unit_response) 
  {
    // console.log(unit_response); // 404 still display node Response, but headers ok property is false
    if(unit_response.ok)
    {
        unit_response.json().then(function(unitdata)
        {
        console.log(unitdata);
        // -- action
        // result = displayRecipeHits(unitdata);
        if(result = null){
          console.log("No recipe hit found or an error has occurred");
        }
        
    });
    }
    else
    {
        console.log("Error: Recipe Data Not Found"); // status 400
    }
        
  })  
  .catch(function(error){
      console.log("An error has occured: " + error);
  }); // it ends here

}

renderLandingPage()




