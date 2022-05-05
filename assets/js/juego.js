/**
 * 2C = Two of Clubs (Treboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

let deck = [];

const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

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
    console.log(deck);
}

crearDeck();

//  Esta función me permite elejir una carta

const pedirCarta = () => {

    console.log(carta);
    return carta;




}