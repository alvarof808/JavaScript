/**
 * 2C = Two of Clubs (Treboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

 const miModulo = ( () =>  {
    // 'use strict'  => hace que javascript se ejecute de manera estricta:: 
    // ejemplo manda error si no declaraste el tipo de variable
    'use strict'

    let deck = [];

    const especiales = ['A', 'J', 'Q', 'K'],
             tipos = ['C', 'D', 'H', 'S'];

    let puntosJugadores = [];

//  Referencias

    const btnDetener = document.querySelector('#btnDetener'),
          btnPedir = document.querySelector('#btnPedir'),
          btnNuevo = document.querySelector('#btnNuevo');


    const divCartasJugadores = document.querySelectorAll('.divCartas'),
    //divCartasJugador = document.querySelector('#jugador-cartas'),
             // divCartasComputadora = document.querySelector('#computadora-cartas');

          puntosJ = document.querySelectorAll('small');

    const imgCartas = document.getElementsByClassName("carta");

    // Esta funcion inicializa el juego
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for(let i =0; i< numJugadores; i++){
            puntosJugadores.push(0);
        }

        console.clear();
        btnPedir.disabled = false;
        btnDetener.disabled = false;
        
        puntosJ.forEach( elem => elem.innerText = 0);
        //puntosJ[0].innerText = 0;
        //puntosJ[1].innerText = 0;
        
        divCartasJugadores.forEach(elem => elem.innerHTML = '');
       // divCartasComputadora.innerText = '';
        //divCartasJugador.innerText='';
        
        
    }

    //  Esta función crea una nueva baraja

    const crearDeck = () => {

        deck = [];
        
            for(let i = 2; i<=10;i++) {
                for (let tipo of tipos) {
                deck.push(i + tipo);
                }
            }

            for (const tipo of tipos) {
                for (const esp of especiales) {
                deck.push(esp + tipo);
                }
            }
        return _.shuffle(deck);
        
    }

    

    //  Esta función me permite elejir una carta

    const pedirCarta = () => {
        if (deck.length === 0){
            throw "No hay cartas en el deck"
        }
        return deck.pop();
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
    /// Turno: 0 = primer jugador y el ultimo sera la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
           
        puntosJ[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];

    }

    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        //<!-- <img  class="carta" src="assets/cartas/10H.png" > -->
        imgCarta.src= `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
      

    }
    const determinarGanador = () =>{

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

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
        }, 100 );

    }

    //  Turno Computadora

    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do{
            const carta = pedirCarta();
            puntosComputadora=  acumularPuntos(carta,puntosJugadores.length - 1 );
            crearCarta(carta, puntosJugadores.length -1);
            // const imgCarta = document.createElement('img');
            // //<!-- <img  class="carta" src="assets/cartas/10H.png" > -->
            // imgCarta.src= `assets/cartas/${carta}.png`;
            // imgCarta.classList.add('carta');
            // divCartasComputadora.append(imgCarta);
        } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

        determinarGanador();
    }


    //  Eventos

    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos( carta, 0);

        crearCarta(carta, 0);
        // puntosJugador = puntosJugador + valorCarta(carta);
        // console.log({carta}, puntosJugador);
        // puntosJ[0].innerText = puntosJugador;
        
        // const imgCarta = document.createElement('img');
        // //<!-- <img  class="carta" src="assets/cartas/10H.png" > -->
        // imgCarta.src= `assets/cartas/${carta}.png`;
        // imgCarta.classList.add('carta');

        //divCartasJugador.append(imgCarta);

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
        turnoComputadora(puntosJugadores[0]);


    });

    // Reiniciar Juego

    btnNuevo.addEventListener('click', () =>{
        
        inicializarJuego();

        

    }); 

    return {
        nuevoJuego: inicializarJuego
    };

})();









//pedirCarta();


