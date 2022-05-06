/**
 * 2C = Two of Clubs (Treboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

let deck = [];

const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador=0,
        puntosComputadora=0;


//  Referencias

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');


const puntosJ = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const imgCartas = document.getElementsByClassName("carta");

//  Esta función crea una nueva baraja

const crearDeck = () => {
    
    for(let i = 2; i<=10;i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (const tipo of tipos) {
        for (const esp of especiales) {
            deck.push(esp + tipo)
        }
    }
    //console.log(deck);
    
    deck = _.shuffle(deck);
    
}

crearDeck();

//  Esta función me permite elejir una carta

const pedirCarta = () => {
    if (deck.length === 0){
        throw "No hay cartas en el deck"

    }
    let carta = deck.pop();
    
    return carta;

}

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length -1);
    return  (isNaN(valor)) ?
                (valor ==='A') ? 11 : 10
                : valor * 1;


    // let puntos = 0;
    // if (isNaN(valor)) {
    //     puntos= (valor ==='A') ? 11 : 10;
    // }
    // else{
    //     puntos = valor * 1;
    // }


}

//  Turno Computadora

const turnoComputadora = (puntosMinimos) => {

    do{
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta(carta);
    console.log({carta}, puntosComputadora);
    puntosJ[1].innerText = puntosComputadora;
    
    const imgCarta = document.createElement('img');
    //<!-- <img  class="carta" src="assets/cartas/10H.png" > -->
    imgCarta.src= `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');

    divCartasComputadora.append(imgCarta);
    
    if (puntosMinimos > 21) {
        
        break;
    }


    } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout(() => {
        if (puntosComputadora===puntosMinimos) {
            alert('Nadie Gana');
        }
        else if (puntosMinimos > 21) {
            alert('Computadora Gana');
        } 
        else if (puntosComputadora > 21) { 
            alert('Jugador Gana');
        }
        else {
            alert('Computadora Gana')
        }
    }, 50 );
   
    
}


//  Eventos

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    console.log({carta}, puntosJugador);
    puntosJ[0].innerText = puntosJugador;
    
    const imgCarta = document.createElement('img');
    //<!-- <img  class="carta" src="assets/cartas/10H.png" > -->
    imgCarta.src= `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');

    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
       
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
        
    }
    else if ( puntosJugador === 21){
        
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
        
    }


});

// Detener Juego
btnDetener.addEventListener('click', () =>{

    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);


});

// Reiniciar Juego

btnNuevo.addEventListener('click', () =>{

    btnPedir.disabled = false;
    btnDetener.disabled = false;
    deck = [];
    crearDeck();
    puntosComputadora = 0;
    puntosJugador     = 0;
    puntosJ[0].innerText = puntosJugador;
    puntosJ[1].innerText = puntosJugador;
    //divCartasJugador.remove();
    divCartasComputadora.innerText = '';
    divCartasJugador.innerText='';

});






//pedirCarta();


