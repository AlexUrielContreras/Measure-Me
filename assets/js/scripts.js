const STRING_EMPTY = '';
const UNDERSCORE = '_'
const SPACE = ' ';
const COLON = ': ' ;
const SLASH = '/'
const OPEN_PAREN = '(';
const HYPHEN = '-';
const PLUS_SIGN = "+ ";
const HTML_NEXTLINE = "</br>"; 
const HTML_BULLET = "&bull; ";
const HTML_DSPACE = "&nbsp;&nbsp;"; 
const APP_ID = '90242961' ;
const API_KEY = '9460d3016254646a35748a9dcc6faa0a';
const CVTR_APP_ID = 'UnitMercuryKT' ;
const CVTR_API_KEY = 'D7gd6C9kSNGjkMd1G3HqIVcF3UPmMaOv0qlqA7YpGLvsFaOa';

let searchRecord = [];
let searchClick = 0;

const SERVER_NUMBER = "<strong>Yield: </strong>";
const CUISINE_TYPE = "<strong>Cuisine type: </strong>";
const INGREDIENT_DESC = "<strong>Ingredients: </strong>";
const NUTRIENT_INFO = "<strong>Nutrient Infomation: </strong>";
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

const utype = {
  OZ: 1,
  CUP: 2,
  TABLESPOON: 3,
  TEASPOON: 4,
  LBS: 5
}

//----------------------------------------RECIPE-KT-------------------------------------------/
function hideUnitBox(){
  $("#unit_box").hide();
}

function showUnitBox(){
  $("#unit_box").show(1000);
}
//--------------------------//

function hideRecipeBox(){
  $("#recipe_box").hide();
}

function showRecipeBox(displayResult){
  if(displayResult){
    $("#recipe_box").show(1000);
    createEntityClickEventHandler(); 
    showUnitBox(); 
  }
  else{
    $("#recipe_box").empty();
    $("#recipe_box").html("An error has occured. Please try again later.")
    hideUnitBox();
    $("#recipe_box").show(1000);

  }
  
}

function createEntityClickEventHandler(){
  var ingredientNode = document.querySelector("div[class='ingredient_list']");
  ingredientNode.addEventListener("click", ingredientButtonHandler);
}

function createLinesOfQuantitySpecification(lineNumber){
  for ( var i = 0; i < lineNumber; i++){

    var ingredient = $("<button>")
      ingredient.addClass("quantity_line");
      ingredient.html(HTML_BULLET + HTML_DSPACE + food_data.hits[j].recipe.ingredientLines[i]); 
      ingredientNode.append(ingredient);

//     var uniqueBtn = document.createElement("button");
//     uniqueBtn.className = "quantity_line";
//     uniqueBtn.setAttribute("id", i + "_" + askawayId);
//     uniqueBtn.textContent = (i + 1) + ITEM_ORDER_PERIOD + SPACE + quizDataObj.choices[i];
//     uniqueBtn.setAttribute("data-task-id", askawayId);   
// 
//     if ((quizDataObj.correctAnsNumber) == (i + 1)){
//        uniqueBtn.setAttribute("data-ans-value", TRUE); 
//     }
//     else{
//        uniqueBtn.setAttribute("data-ans-value", FALSE);
//     }
// 
//     if(needExpandBeyondMedWidth){
//        uniqueBtn.style.width = CHOICE_WIDTH_PASS_MIDLEN;
//     }
// 
//     if(smallWidthSuffices){
//        uniqueBtn.style.width = CHOICE_WIDTH_PASS_SML_LEN;
//     }
// 
//     actionContainerEl.appendChild(uniqueBtn);
 }  
}



// Create elements and populate them with data returned from an recipe api fetch
function displayRecipeHits(food_data){
  console.log(food_data);
  displayResult = true;
  // -- clear old content

  // -- remove old img before append current image
  if ($("#target_recipe").has("img")){
    $("#target_recipe").empty();
    }

  // if ($("#target_recipe").has("span[class='recipe-box'")){
  // $("#target_recipe").empty();
  // }

  if(food_data.hits.length >=5 ){
    // -- display up to 5 recipes
    displayResult = displayRecipeGroup(food_data, 5);
  }
  else
  {
    displayResult = displayRecipeGroup(food_data, parseInt(food_data.hits.length));
  }
  showRecipeBox(displayResult);
  // showRecipeBox(displayResult);
  // showUnitBox();
  // createEntityClickEventHandler();
}

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
      var ingredient_desc = $("<div>");
      var nutrient_info = $("<div>");

      recipe_search_term.text(recipeNameForHeader)
                        .addClass("center-align");
      serve_number.html(SERVER_NUMBER + food_data.hits[j].recipe.yield);
      cuisine_type.html(CUISINE_TYPE + food_data.hits[j].recipe.cuisineType);  

      // //     var ingredientNode = $("<ul>")
      // //     for (var i = 0; i < food_data.hits[j].recipe.ingredientLines.length ; i++)
      // //     {
      // // 
      // //       var ingredient = $("<li>")
      // //       ingredient.html(HTML_BULLET + HTML_DSPACE + food_data.hits[j].recipe.ingredientLines[i]); 
      // //       ingredientNode.append(ingredient);
      // //     }

      var ingredientNode = $("<div>")  
      ingredientNode.attr("ing_list_data_id", "ing_list_data_" + j);
      ingredientNode.addClass("ingredient_list");
      for ( var i = 0; i < food_data.hits[j].recipe.ingredientLines.length; i++){
        var ingredient = $("<button>")
        ingredient.addClass("quantity_line");
        ingredient.attr("ing_item_id", "ing_item_" + i);
        ingredient.val(food_data.hits[j].recipe.ingredientLines[i]); 
        ingredient.html(PLUS_SIGN + HTML_DSPACE + food_data.hits[j].recipe.ingredientLines[i]); 
        ingredient.attr("title", "Click to convert this unit measurement to metric - if applicable");
        ingredientNode.append(ingredient);
      }
    
      //createLinesOfQuantitySpecification(food_data.hits[j].recipe.ingredientLines.length)
      // ingredient_desc.attr("ing_list_data_id", "ing_list_data_" + j);
      // ingredient_desc.addClass("ingredient_list");
      ingredient_desc.html(INGREDIENT_DESC);
      ingredient_desc.append(ingredientNode);

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
                        // .append(ingredient_desc)
                        .append(recipe_direction)
                        .append(nutrient_info);
    } // end for loop
    return success;
}

function scanCup(ingData){
  var lineDesc = {
    original : ingData,
    preceedingNum: STRING_EMPTY,
    num: STRING_EMPTY,
    unit: STRING_EMPTY,
    desc: STRING_EMPTY,
    type: utype.CUP,
    apirequest: STRING_EMPTY
  }
   
  for( var i = 0; i < commonRecipeUnits.cup.length; i++ )
  {
    alert("i'm in for loop cup")
    alert(ingData)
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
        type: utype.CUP,
        apirequest: "https://neutrinoapi.net/convert?to-type=Liter&user-id=" + CVTR_APP_ID + "&api-key=" + CVTR_API_KEY + "&from-type=Ounce&from-value="  
      }
      console.log(lineDesc);
      return lineDesc;
    }
    else{
       // next group
       return scanOunce(ingData);
    }
  }
   
}

function scanOunce(ingData)
{
  var lineDesc = {
    original : ingData,
    preceedingNum: STRING_EMPTY,
    num: STRING_EMPTY,
    unit: STRING_EMPTY,
    desc: STRING_EMPTY,
    type: utype.OZ,
    apirequest: STRING_EMPTY
  }
  for( var i = 0; i < commonRecipeUnits.ounce.length; i++ )
  {
    var finalNum = STRING_EMPTY;
    alert("i'm in for loop ounce")
    found = ingData.indexOf(commonRecipeUnits.ounce[i]);
    if(found != -1)
    {
      alert("i'm Found in loop ounce")
      var arr = ingData.split(commonRecipeUnits.ounce[i]);
      console.log(arr);
      console.log(arr[0]);
      var isParenthesis = arr[0].indexOf(OPEN_PAREN);
      console.log(isParenthesis);
      if (isParenthesis != -1)
      {
        alert("i'm Found in loop ounce - parenthesis")
        var vicinityParenthesis = arr[0].split(OPEN_PAREN);
        alert(vicinityParenthesis[0])
        var vicinityRight = vicinityParenthesis[vicinityParenthesis.length - 1];
        console.log(vicinityRight)
        var vicinityHyphen = (vicinityRight.includes(HYPHEN)) ? vicinityRight.split(HYPHEN) : null;
        // console.log(vicinityHyphen)
        if(vicinityHyphen != null) {
          alert(parseInt(vicinityHyphen[0]) / 16);
          lineDesc = {
            original : ingData,
            preceedingNum: vicinityParenthesis[0] + OPEN_PAREN,
            num: parseInt(vicinityHyphen[0]) / 16,
            unit: commonRecipeUnits.ounce[i],
            desc: arr[arr.length - 1].trim(),
            type: utype.OZ, 
            apirequest: "https://neutrinoapi.net/convert?to-type=Liter&user-id=" + CVTR_APP_ID + "&api-key=" + CVTR_API_KEY + "&from-type=Pint&from-value="  
          }
          console.log(lineDesc);
        }

      }
      else{
          // -- no parenthesis
          lineDesc = {
            original : ingData,
            preceedingNum: STRING_EMPTY,
            num: parseInt( arr[0].trim())/16,
            unit: commonRecipeUnits.ounce[i],
            desc: arr[arr.length - 1].trim(),
            type: utype.OZ, 
            apirequest: "https://neutrinoapi.net/convert?to-type=Liter&user-id=" + CVTR_APP_ID + "&api-key=" + CVTR_API_KEY + "&from-type=Pint&from-value="  
          }
          console.log(lineDesc);
      }
      return lineDesc;
    }
    else{
      var cont = true;
    }
  }
}



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
      getUnitEntityConvertedPerAPI(unitEntityHit);
    }
    else{
      console.log("Null encountered");
    }
   
   
  } 
}

var getUnitEntityConvertedPerAPI = function(lineDesc){
  alert("ready to be converted");
  var apiUnitUrl = lineDesc.apirequest + lineDesc.num;
  
   
    // // fetch(apiUnitUrl
    // //   
    // //  ).then(function(unit_response) 
    // //  {
    // //   if(unit_response.ok)
    // //   {
    // //       unit_response.json().then(function(unit_data)
    // //       {
    // //       console.log(unit_data);
    // //       // -- action
    // //       displayConvertedEntity(unit_data, lineDesc);
    // //       
    // //   });
    // //   }
    // //   else
    // //   {
    // //       console.log("Error: Recipe Data Not Found"); // status 400
    // //   }
    // //       
    // // })  
    // // .catch(function(error){
    // //     console.log("An error has occured: " + error);
    // // }); // it ends here

    displayConvertedEntity("", lineDesc);

}

// Display ingredient line before and after being convert on pick/click
function displayConvertedEntity(unit_data, lineDesc){
  displayResult = true;
  alert("type is: " + lineDesc.type);
  var lineDescTextAfter = STRING_EMPTY;
  var afterQuestionMark = lineDesc.apirequest.split("=");
  var toUnitQueryString = afterQuestionMark[1].split("&");
  var toUnit = toUnitQueryString[0];
  alert("to unit: " + toUnit)

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
      alert("case 1");
      break;
    case 2:
    case 3:
    case 4:
    case 5:
      alert ("case 2 to 5")
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

var getRecipeEntity = function(recipephrase)
{
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
      
  fetch(apiFoodUrl).then(function(food_response) 
  {
    // console.log(food_response); // 404 still display node Response, but headers ok property is false
    if(food_response.ok)
    {
        food_response.json().then(function(food_data)
        {
        // console.log(food_data);
        // -- action
        result = displayRecipeHits(food_data);
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
hideRecipeBox();
hideUnitBox();
 


