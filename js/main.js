
// ------------------------------------- //
// ------------- Header ---------------- //
// ------------------------------------- //

//scroll fluide

$(document).ready(function() {
		$(".js-scrollTo").on("click", function() { // Au clic sur un élément
			let section = $(this).attr("href"); // Section cible
			let speed = 750; // Durée de l'animation (en ms)
			$("html, body").animate( { scrollTop: $(section).offset().top }, speed ); // le défilement s'opère
			return;
		});
	});



// Menu burger
function myFunction(x) {   // changer l'affichage du bouton
  x.classList.toggle("change");  
}

$("#burgerMenu").on("click", () => { // afficher / masquer le menu
   $("#burgerNav").toggle();
});


// ------------------------------------- //
// -------------Diaporama -------------- //
// ------------------------------------- //

// Instanciation du Diaporama
let Slider = new Diaporama("imagesCarousel",[
        "img/pic1.jpg",
        "img/pic2.jpg",
        "img/pic3.jpg",
        "img/pic4.jpg",
        "img/pic5.jpg"
        ]);


// ------------------------------------- //
// ---------------- Map ---------------- //
// ------------------------------------- //

// Instanciation de la Map

let biclooMap = new Map("biclooMap",[47.2172500, -1.5533600],"https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png");


// ------------------------------------- //
// -------------- Station -------------- //
// ------------------------------------- //


// Instanciation de l'objet Stations

let biclooStations = new Stations("https://api.jcdecaux.com/vls/v1/stations", "Nantes", "ddcc1734e8c4df93e09e6924487d563bce7edc81", biclooMap);

// ------------------------------------- //
// ------------ Reservation ------------ //
// ------------------------------------- //


// Instanciation de l'objet Reservation

let reservation = new Reservation("https://api.jcdecaux.com/vls/v1/stations", "Nantes", "ddcc1734e8c4df93e09e6924487d563bce7edc81", biclooStations)


// ------------------------------------- //
// --------- Gestion du Storage -------- //
// ------------------------------------- //

//Sauvegarde du prénom et nom
$("#first_name" ).keyup( function() {
 localStorage.setItem("LSfirstName", $("#first_name" ).val());
});


if (localStorage.getItem("LSfirstName")){
     document.getElementById("first_name").value = localStorage.getItem("LSfirstName"); 
    //pour $("#first_name" ).val() ne marche pas a la place de document.getElementById("first_name").value
}



$("#last_name" ).keyup( function() {
 localStorage.setItem("LSlastName", $("#last_name").val());
});


if (localStorage.getItem("LSlastName") ){
     document.getElementById("last_name").value = localStorage.getItem("LSlastName"); 
    //pour $("#first_name" ).val() ne marche pas a la place de document.getElementById("first_name").value
}



// ------------------------------------- //
// --------- timer -------- //
// ------------------------------------- //

////var timeInMinutes = 1;
////var currentTime = Date.parse(new Date());
//////var deadline = new Date(currentTime + timeInMinutes*60*1000);
//
//// if there's a cookie with the name myClock, use that value as the deadline
//if(sessionStorage.getItem("clock")){
//  // get deadline value from cookie
//  var deadline = sessionStorage.getItem("clock");
//}
//
//// otherwise, set a deadline 10 minutes from now and 
//// save it in a cookie with that name
//else{
//  // create deadline 10 minutes from now
//  var timeInMinutes = 1;
//  var currentTime = Date.parse(new Date());
//  var deadline = new Date(currentTime + timeInMinutes*60*1000);
//
//  // store deadline in cookie for future reference
//  sessionStorage.setItem("clock", deadline);
//}
//
//
//
//function getTimeRemaining(endtime){
//  var t = Date.parse(endtime) - Date.parse(new Date());
//  var seconds = Math.floor( (t/1000) % 60 );
//  var minutes = Math.floor( (t/1000/60) % 60 );
//  return {
//    'total': t,
//    'minutes': minutes,
//    'seconds': seconds
//  };
//}
//
//
//function initializeClock(id, endtime){
//  var clock = document.getElementById(id);
//  var timeinterval = setInterval(function(){
//    var t = getTimeRemaining(endtime);
//    clock.innerHTML = ('0' + t.minutes).slice(-2) +  ':' + ('0' + t.seconds).slice(-2)
//    if(t.total<=0){
//      clearInterval(timeinterval);
//      document.getElementById("resaTimer").innerHTML = "";
//      document.getElementById("resaTimerText").innerHTML = "Votre réservation a expiré.";   
//    }
//  },1000);
//}
//
//
//
////Actions quand on clique sur le bouton Réserver    
//                document.getElementById("reservationBtn").addEventListener("click", function(){
//                    initializeClock('resaTimer', deadline);}
//                                                                           
//                                                                           )
////Actions quand on clique sur le bouton Annuler
//                    $(".cancelBtn").on( "click", function(){
//                        
//}
//                                                                           
//                                                                           )
