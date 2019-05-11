// ------------------------------------- //
// --- Internet Explorer disclaimer ---- //
// ------------------------------------- //


const isIE = window.navigator.msPointerEnabled; // Internet Explorer/Edge ≥ 10
const isIEless = /*@cc_on!@*/false; // Internet Explorer/Edge ≤ 10

if(isIE || isIEless ){
    alert("Votre navigateur n'est pas optimisé pour ce site." +
          "\n" +
          "\n Merci d'utiliser Chrome, FireFox, Opera ou Safari.")
}