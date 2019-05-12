// ------------------------------------- //
// ------------- Carousel -------------- //
// ------------------------------------- //

// Carousel objet instantiation
let Slider = new Carousel("imagesCarousel",[
        "img/pic1.jpg",
        "img/pic2.jpg",
        "img/pic3.jpg",
        "img/pic4.jpg",
        "img/pic5.jpg"
        ],
        [
        "Bicloo - Réservez votre vélo à Nantes !",
        "Naviguez sur la carte et choisissez une station",
        "Vérifiez le nombre de vélos disponibles",
        "Réservez, signez...",
        "Roulez !"
        ]
        );



// ------------------------------------- //
// ---------------- Map ---------------- //
// ------------------------------------- //

// Map objet instantiation

let biclooMap = new Map("biclooMap",[47.2172500, -1.5533600],"https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png");



// ------------------------------------- //
// -------------- Stations ------------- //
// ------------------------------------- //

// Stations objet instantiation 

let biclooStations = new Stations("https://api.jcdecaux.com/vls/v1/stations", "Nantes", "ddcc1734e8c4df93e09e6924487d563bce7edc81", biclooMap);



// ------------------------------------- //
// ------------ Reservation ------------ //
// ------------------------------------- //

// Reservation objet instantiation

let reservation = new Reservation("https://api.jcdecaux.com/vls/v1/stations", "Nantes", "ddcc1734e8c4df93e09e6924487d563bce7edc81", biclooStations)



// ------------------------------------- //
// --------------- Canvas -------------- //
// ------------------------------------- //

// Canvas objet instantiation

let myCanvas = new Canvas(); 
myCanvas.init();


// ------------------------------------- //
// --------------- Timer --------------- //
// ------------------------------------- //


// Timer object istantiation

let timer = new Timer("resaTimer", 1200); 




// ------------------------------------- //
// --------- Webstorage Manager -------- //
// ------------------------------------- //

//First Name & Last Name storage
$("#first_name" ).keyup( function() {
 localStorage.setItem("LSfirstName", $("#first_name" ).val());
});

if (localStorage.getItem("LSfirstName")){
     document.getElementById("first_name").value = localStorage.getItem("LSfirstName"); 
}

$("#last_name" ).keyup( function() {
 localStorage.setItem("LSlastName", $("#last_name").val());
});


if (localStorage.getItem("LSlastName") ){
     document.getElementById("last_name").value = localStorage.getItem("LSlastName"); 
}


//If there is already a reservation stored in sessionStorage
if (sessionStorage.getItem("SSstationName") && 
    sessionStorage.getItem("SSavailableBike") &&
    localStorage.getItem("LSfirstName") &&
    localStorage.getItem("LSlastName") &&
    sessionStorage.getItem("SStimer")){  

    //Timer keeps going o from its last known value
    timer.counter = sessionStorage.getItem("SStimer");
    document.getElementById("resaTimer").innerHTML =  timer.remainingTime;
    timer.startTimer();

    //Recovering reversation information from sessionStorage in "My reservation" section
    document.getElementById("resaName").innerHTML = "";
    document.getElementById("resaName").innerHTML = "Bonjour " + localStorage.getItem("LSfirstName").toUpperCase().bold() + " " + localStorage.getItem("LSlastName").toUpperCase().bold();
    document.getElementById("resaStation").innerHTML = "";
    document.getElementById("resaStation").innerHTML = "Vous avez une réservation en cours à la station " + sessionStorage.getItem("SSstationName").bold();
    document.getElementById("resaTimerText").innerHTML = "";
    document.getElementById("resaTimerText").innerHTML = "Votre réservation expirera dans&nbsp;";
    $(".footerBtn").css("display", "block");       
}




// ------------------------------------- //
// ------- Modal Box Legal Notice ------ //
// ------------------------------------- //

const modal = document.getElementById("myModal");
const btn = document.getElementById("legalNotice");
const span = document.getElementsByClassName("close")[0];

btn.addEventListener("click", function(){
  modal.style.display = "block";
});

span.addEventListener("click", function() {
  modal.style.display = "none";
});

window.addEventListener("click", function() {
  if (event.target == modal) {
    modal.style.display = "none";
  }
})



// ------------------------------------- //
// -------------- Others --------------- //
// ------------------------------------- //

//Smooth Scroling
$(document).ready(function() {
    $(".js-scrollTo").on("click", function() {
        let section = $(this).attr("href");
        let speed = 750;
        $("html").animate( { scrollTop: $(section).offset().top }, speed );
        return ;
    });
});



// Burger menu
$("#burgerMenu").on("click", () => { 
    $("#burgerNav").toggle();
    $(".bar1, .bar2, .bar3").toggleClass("change");
});
