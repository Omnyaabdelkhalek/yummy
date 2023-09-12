let Navber=document.getElementsByClassName('.navber')
let CloseIcon=document.getElementById('close');
let openNevbar=document.getElementById('open');
let searchpage=document.getElementById("search");
let widthNav=$('.navber').width()
var data=[];
let left=true;
let searchName=document.getElementsByClassName('.Name').value
let searchletter=document.getElementsByClassName('.searchTitle').value
// -------------------------------------------------------------------------------------------
function startNav(){
    if(left){
        $('.nav').css({left:`-${widthNav}`})
        openNevbar.classList.remove('d-none')
        CloseIcon.classList.add('d-none')
        left=false;
    }else{
        $('.nav').animate({left:'0px'},1000)
        left=true;
    }
}
startNav();
$('.open').click(()=>{
    if(left){
        $('.nav').animate({left:`-${widthNav}`},1000)
        left=false;
    }else{
        $('.nav').animate({left:'0px'},1000)
        openNevbar.classList.add('d-none')
        CloseIcon.classList.remove('d-none')
        left=true;
    }
})
$('.close').click(()=>{
    if(left){
        $('.nav').animate({left:`-${widthNav}px`},1000)
        openNevbar.classList.remove('d-none')
        CloseIcon.classList.add('d-none')
        left=false;
    }else{
        $('.nav').animate({left:'0px'},1000)
        left=true;
    }
})
async function start(){
    var response=await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    data=await response.json();
    displayData()
}
start()
async function searchApi(e){
    var response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${e.target.value}`)
     data=await response.json()
    displayData()
    return data.meals;
}
 async function searchApiletter(l){
    var response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${l.target.value}`)
    data=await response.json();
        displayData()
    return data.meals;
}
function displayData(){
    var show = "";
     if(data.meals!==''){  
        for (var i = 0; i < data.meals.length; i++) {
        show += `
        <div onclick="slider(${i})" class="item col-md-3 my-2 position-relative ">
            <img class="w-100 rounded rounded-4 " src="${data.meals[i].strMealThumb}">
           <div class=" layer d-flex align-items-center rounded rounded-4 m-auto">
              <h2>${data.meals[i].strMeal}</h2>
           </div>
           </div>`;
    } }
     document.getElementById("data").innerHTML = show;
    }
    function slider(i){
        $('.home ').html("")
        $('.slider').html("")
        slideimg= `<div class="row w-100  p-5 vh-100 ">
        <div class="col-md-4 ms-5">
        <img class="w-100 rounded rounded-4 " src="${data.meals[i].strMealThumb}">
        <h2 class="ms-5">${data.meals[i].strMeal}</h2>
        </div>
        <div class="col-md-7 py-5 ms-2">
        <h2>Instructions</h2>
            <div class="caption w-100"><p class=" text-xl-start">${data.meals[i].strInstructions}</p></div>
            <div class="area pt-3"><h2>Area:${data.meals[i].strArea}</h2></div>
            <div class="Category"><h2>Category:${data.meals[i].strCategory}</h2></div>
            <div class="Recipe">
            <h2>Recipes:</h2>          
            <div id="recipes"></div>
            <h2>Tags:</h2>
            <a target="_blank" href="${data.meals[i].strSource}"  class="btn btn-success" ">source</a>
            <a href="${data.meals[i].strYoutube}" target="_blank"  class="btn btn-danger">Youtube</a>
            </div>`
        let recipes =``;
            for(let j = 0 ; j < 20;j++) {
                if(data.meals[i][`strIngredient${j}`]) {
                    recipes+=` <span class="bg-info-subtle d-inline-block rounded rounded-2 p-1 my-2 m-1 text-dark" > 
                    ${data.meals[i][`strIngredient${j}`]}${data.meals[i][`strIngredient${j}`]}
                 </span>`
                }
            }
            document.getElementById("slider").innerHTML=slideimg
            document.getElementById('recipes').innerHTML =recipes
}
function search(){
    $('.home ').html('')
    $('.slider').html('')
    startNav();
    searchLayer=`<div class=" text-center pt-5 w-100 h-25 ">
     <input oninput="searchApi(event)" class="Name m-4 p-1 w-25   rounded rounded-2 bg-transparent text-white" type="text" placeholder="search By Name">
     <input oninput="searchApiletter(event)" id="searchTitle" class="Letter m-4 p-1 w-25 rounded rounded-2 bg-transparent text-white " type="text" placeholder="search By First letter">
     </div> `
     document.getElementById("search").innerHTML=searchLayer;
}
