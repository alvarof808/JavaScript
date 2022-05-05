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

const puntosJ = document.querySelector('small');

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

//  Eventos

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    console.log({carta}, puntosJugador);
    puntosJ.innerText = puntosJugador;
    return carta;

});




//pedirCarta();

valor = valorCarta(pedirCarta());
