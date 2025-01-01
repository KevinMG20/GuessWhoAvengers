import characters from './Personajes.js';
import questions from './Preguntas.js';

const startButton = document.querySelector('.start-button');
const startScreen = document.querySelector('.start-screen');
const gameModeScreen = document.querySelector('.gamemodes-container');
const animationContainer = document.querySelector('.animation-container');

const gameBoardScreen = document.querySelector('.game-board');


const characterSelector = document.querySelector('.character-selector');
const characterSelectorList = document.querySelector('.character-list');
const characterSelectorCards = document.querySelectorAll('.character-card');

let selectedGamemode = 0;
let selectedCharacterID = 0;
let botSelectedCharacterID = 0;

//#region Animations
let countdownAnimation = bodymovin.loadAnimation({
    container: document.getElementById('animation container'),
    path: './Recursos/CountDown.json',
    render: 'svg',
    loop: false,
    autoplay: false,
    name: 'CountDown Animation'
});

let trophyAnimation = bodymovin.loadAnimation({
    container: document.getElementById('trophy-container'),
    path: './Recursos/Victory Trophy.json',
    render: 'svg',
    loop: false,
    autoplay: false,
    name: 'Trophy Animation'
});

let confettiAnimation = bodymovin.loadAnimation({
    container: document.getElementById('confetti-container'),
    path: './Recursos/Confetti.json',
    render: 'svg',
    loop: false,
    autoplay: false,
    name: 'Confetti Animation'
});

let foxyDefeatAnimation = bodymovin.loadAnimation({
    container: document.getElementById('foxy-container'),
    path: './Recursos/Sad Fox.json',
    render: 'svg',
    loop: true,
    autoplay: false,
    name: 'Fox Defeat Animation'
});

let bananaDefeatAnimation = bodymovin.loadAnimation({
    container: document.getElementById('banana-container'),
    path: './Recursos/Angry Banana.json',
    render: 'svg',
    loop: true,
    autoplay: false,
    name: 'Banana Defeat Animation'
});

let alienDefeatAnimation = bodymovin.loadAnimation({
    container: document.getElementById('alien-container'),
    path: './Recursos/Angry Alien.json',
    render: 'svg',
    loop: true,
    autoplay: false,
    name: 'Alien Defeat Animation'
});

const defeatAnimationContainer = document.querySelector('.defeat-animation');
function playDefeatAnimation() {
    defeatAnimationContainer.style.display = 'flex';

    const animationTextTitle = defeatAnimationContainer.querySelector('.info.title');
    const animationTextMessage = defeatAnimationContainer.querySelector('.info.message');

    animationContainer.style.opacity = '0';
    animationContainer.style.display = 'flex';

    const foxyContainer = document.getElementById('foxy-container');
    const bananaContainer = document.getElementById('banana-container');
    const alienContainer = document.getElementById('alien-container');

    // Animacion entrante
    setTimeout(() => {
        animationContainer.classList.remove('hidden');
        animationContainer.style.opacity = '1';

        // Generar un valor aleatorio del 0 al 2 para elegir una de las 3 animacion de derrota
        const randomAnimation = Math.floor(Math.random() * 3);
        console.log(randomAnimation);

        switch (randomAnimation) {
            case 0:
                foxyContainer.style.display = 'flex';
                bananaContainer.style.display = 'none';
                alienContainer.style.display = 'none';
                break;
            case 1:
                bananaContainer.style.display = 'flex';
                foxyContainer.style.display = 'none';
                alienContainer.style.display = 'none';
                break;
            case 2:
                alienContainer.style.display = 'flex';
                foxyContainer.style.display = 'none';
                bananaContainer.style.display = 'none';
                break;
        }

        setTimeout(() => {
            switch (randomAnimation) {
                case 0:
                    foxyDefeatAnimation.play();
                    break;
                case 1:
                    bananaDefeatAnimation.play();
                    break;
                case 2:
                    alienDefeatAnimation.play();
                    break;
            }
            animationTextTitle.style.opacity = '1';
            animationTextMessage.style.opacity = '1';
        }, 500);
    }, 500);

    // Animacion saliente
    setTimeout(() => {
        animationContainer.classList.add('hidden');
        animationContainer.style.opacity = '0';

        setTimeout(() => {
            defeatAnimationContainer.style.display = 'none';
            //Remover por completo el contenedor de la animacion
            animationContainer.style.display = 'none'
        }, 500);
    }, 5000);
}

const winAnimationContainer = document.querySelector('.win-animation');
function playVictoryAnimation() {
    winAnimationContainer.style.display = 'flex';

    const animationText = winAnimationContainer.querySelector('.info');

    animationContainer.style.opacity = '0';
    animationContainer.style.display = 'flex';

    // Animacion entrante
    setTimeout(() => {
        animationContainer.classList.remove('hidden');
        animationContainer.style.opacity = '1';
        confettiAnimation.play();
        setTimeout(() => {
            trophyAnimation.play();
            animationText.style.opacity = '1';
        }, 500);
    }, 500);

    // Animacion saliente
    setTimeout(() => {
        animationContainer.classList.add('hidden');
        animationContainer.style.opacity = '0';

        setTimeout(() => {
            winAnimationContainer.style.display = 'none';
            //Remover por completo el contenedor de la animacion
            animationContainer.style.display = 'none'
            confettiAnimation.goToAndStop(0, true);
            trophyAnimation.goToAndStop(0, true);
        }, 500);
    }, 5000);
}

//#endregion


//#region Character Selector

createCharacterSelector();

function createCharacterSelector() {
    // Generate HTML from the array
    characters.forEach(character => {
        // Create the card div
        const card = document.createElement('div');
        card.className = 'character-card';

        // Create the image element
        const img = document.createElement('img');
        img.src = character.imagen;
        img.alt = character.nombre;
        img.className = 'character-image';

        // Create the name element
        const name = document.createElement('h2');
        name.className = 'character-name';
        name.textContent = character.nombre;

        // Create the button element
        const button = document.createElement('button');
        button.className = 'select-button';
        button.textContent = 'Seleccionar';

        // Add click event to the button
        button.addEventListener('click', () => {
            console.log(`ID del personaje: ${character.id}`);
            selectedCharacterID = character.id;

            startGame();
        });

        // Append elements to the card
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(button);

        // Append card to the container
        characterSelectorList.appendChild(card);
    });
}

function showCharacterSelector() {
    // Desparece las tarjetas
    gameModeScreen.classList.add('hidden');
    gameModeScreen.style.opacity = '0';
    gameModeScreen.style.transform = 'scale(0.8)';

    characterSelector.style.display = 'flex'; // Oculta completamente el selector de modo de juego

    // Muestra el selector de personaje de la animación del modo de juego
    setTimeout(() => {
        gameModeScreen.style.display = 'none'; // Oculta completamente el selector de modo de juego

        // Aparece las tarjetas
        characterSelector.classList.remove('hidden');
        characterSelector.style.opacity = '1';
        characterSelector.style.transform = 'scale(1)';
    }, 500); // Sincronizado con la duración de la animación del botón
}

function hideCharacterSelector() {
    // Desparece el selector de personajes
    characterSelector.classList.add('hidden');
    characterSelector.style.opacity = '0';
    characterSelector.style.transform = 'scale(0.8)';
}

//#endregion

startButton.addEventListener("click", (event) => {
    // Desaparece la pantalla de inicio
    startScreen.style.opacity = '0';
    startScreen.style.transform = 'scale(0.8)';

    // No se muestra porque tiene opacity 0
    gameModeScreen.style.display = 'flex';

    // Muestra las tarjetas de modo de juego después de la animación del botón
    setTimeout(() => {
        startScreen.style.display = 'none'; // Oculta completamente el botón

        // Aparece las tarjetas
        gameModeScreen.classList.remove('hidden');
        gameModeScreen.style.opacity = '1';
        gameModeScreen.style.transform = 'scale(1)';

    }, 500); // Sincronizado con la duración de la animación del botón
});

//#region GameMode

gameModeScreen.addEventListener('click', (event) => {
    const clickedElement = event.target;
    console.log("Target " + event.target);

    // Asegúrate de que sea uno de los elementos deseados
    /*  if (clickedElement.classList.contains('gamemode-card')) { */
    console.log('Se hizo clic en:', clickedElement.id);
    switch (clickedElement.id) {
        case "gamemode1": case "gamemode1 img": case "gamemode1 h1":
            selectedGamemode = 1;
            startGame();
            break;
        case "gamemode2": case "gamemode2 img": case "gamemode2 h1":
            selectedGamemode = 2;
            showCharacterSelector();
            break;
        case "gamemode3": case "gamemode3 img": case "gamemode3 h1":
            selectedGamemode = 3;
            showCharacterSelector();
            break;
    }
    console.log('GameMode: ', selectedGamemode);
    /*  } */
});

function hideGameModeSelector() {
    // Desparece el selector de modos de juego
    gameModeScreen.classList.add('hidden');
    gameModeScreen.style.opacity = '0';
    gameModeScreen.style.transform = 'scale(0.8)';
}

//#endregion

//#region GameBoard

// Mostrar el tablero de juego segun el modo seleccionado
function startGame() {
    gameBoardScreen.style.display = 'flex';
    switch (selectedGamemode) {
        case 1:
            hideGameModeSelector();
            prepareForGuess();
            showGameBoardEntrance(true, "GameMode Selector");
            setTimeout(() => {
                showAlert('success', '¡Adelante! Puedes hacer las preguntas que quieras o intentar adivinar. Tienes 3 intentos 8)');
            }, 8000); // 8000 segundos con animacion de countdown - 1500 sin
            break;

        case 2:
            hideCharacterSelector();
            prepareForFull();
            showGameBoardEntrance(true, "Character Selector");
            setTimeout(() => {
                showAlert('success', '¡Es tu turno! Puedes hacer una pregunta por turno o intentar adivinar. Tienes 3 intentos 8)');
            }, 8000); // 8000 segundos con animacion de countdown - 1500 sin

            setTimeout(() => {
                showAlert('info', '¡No olvides presionar el botón de listo cuando hayas terminado tu turno! :D');
            }, 13000); // 13000 segundos con animacion de countdown - 6500 sin
            break;
        case 3:
            hideCharacterSelector();
            prepareForGuessMe();
            showGameBoardEntrance(true, "Character Selector");
            setTimeout(() => {
                // Empezar a preguntar
                realizarPregunta();
            }, 8000); //2000 sin animacion de countdown - 8000 con
            break;
    }
}

function showGameBoardEntrance(showAnimation, origin) {
    if (showAnimation) {
        // Cargar con animacion
        animationContainer.style.opacity = '0';
        animationContainer.style.display = 'flex';

        setTimeout(() => {
            if (origin === "GameMode Selector") gameModeScreen.style.display = 'none';

            characterSelector.style.display = 'none';

            animationContainer.classList.remove('hidden');
            animationContainer.style.opacity = '1';
            countdownAnimation.play();

            setTimeout(() => {
                // Mostrar el tablero
                gameBoardScreen.classList.remove('hidden');
                gameBoardScreen.style.opacity = '1';
                gameBoardScreen.style.transform = 'scale(1)';

                // Ocultar el contenedor de la animacion
                animationContainer.classList.add('hidden');
                animationContainer.style.opacity = '0';

                setTimeout(() => {
                    //Remover por completo el contenedor de la animacion
                    animationContainer.style.display = 'none'
                }, 500);

                countdownAnimation.goToAndStop(0, true);
            }, 6250);
        }, 500);
    } else {
        // Cargar sin animacion
        setTimeout(() => {
            if (origin === "GameMode Selector") gameModeScreen.style.display = 'none';

            characterSelector.style.display = 'none';

            gameBoardScreen.classList.remove('hidden');
            gameBoardScreen.style.opacity = '1';
            gameBoardScreen.style.transform = 'scale(1)';
        }, 500);
    }



}

// Contenedor de personajes
const charactersContainer = document.querySelector('.characters');

// Renderizar las tarjetas de personajes
characters.forEach(character => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <div class="flip-card">
        <div class="flip-card-inner">
            <div class="flip-card-front">
                <img src=${character.imagen} alt="${character.nombre}">
            </div>
            <div class="flip-card-back">
                <img src="./Recursos/descartado3.png" class="selection-image">
            </div>
        </div>
    </div>                            
      <h2>${character.nombre}</h2>
      <div class="actions">
        <button class="select">
            <span class="material-symbols-outlined">task_alt</span>
        </button>
        <button class="discard">
            <span class="material-symbols-outlined">cancel</span>
        </button>
      </div>
    `;

    // Manejo de eventos de los botones
    card.querySelector('.discard').addEventListener('click', () => {
        const id = character.id;
        /* console.log(`ID de personaje descartado: ${id}`) */

        if (selectedGamemode === 2) {
            if (currentTurn !== "Player") {
                if (fullGameFinished) {
                    showAlert('info', 'No le veo el punto a seguir aquí cuando ya se acabó el juego.')
                } else {
                    showAlert('warning', '¡Espera a tu turno!');
                }
                return;
            }
        }

        // Se descartó al personaje seleccionado por el bot
        if (!guessMeFinished) {
            if (id === botSelectedCharacterID) {
                // Reproducir la animacion de derrota
                setTimeout(() => {
                    const animationTextMessage = defeatAnimationContainer.querySelector('.info.message');
                    animationTextMessage.textContent = "Has descartado al personaje del Bot"
                    playDefeatAnimation();
                    showSelectedCharacter();
                    guessMeFinished = true;
                }, 300);
            } else {
                // Busca el elemento interno que se voltea
                const innerCard = card.querySelector('.flip-card-inner');
                // Alterna la clase 'flipped'
                innerCard.classList.add('flipped');
                // Marcarlo en el preview
                descartarUnSoloPersonaje(id);
            }
        } else {
            showAlert('danger', 'Se supone que la partida ya terminó. ¿Por qué sigues aquí?');
        }
    });

    card.querySelector('.select').addEventListener('click', () => {
        const id = character.id;

        if (selectedGamemode === 2) {
            if (currentTurn !== "Player") {
                if (fullGameFinished) {
                    showAlert('info', 'No sé por qué sigues aquí.. ¡El juego terminó!')
                } else {
                    showAlert('warning', '¡Espera a tu turno!');
                }

                return;
            }
        }

        card.classList.add('selected');

        if (!guessMeFinished) {
            // El personaje elegido coincide con el del bot
            if (id === botSelectedCharacterID) {
                const animationTextMessage = winAnimationContainer.querySelector('.info.message');
                animationTextMessage.textContent = "¡Has adivinado el personaje!";
                // Reproducir la animacion de derrota
                playVictoryAnimation();
                showSelectedCharacter();

                fullGameFinished = true;
                guessMeFinished = true;

            } else {
                // Quitarle una vida al jugador
                intentosRestantes--;
                if (intentosRestantes === 0) {
                    const animationTextMessage = defeatAnimationContainer.querySelector('.info.message');
                    animationTextMessage.textContent = "No lograste adivinar en 3 intentos :("
                    playDefeatAnimation();
                    showSelectedCharacter();
                    guessMeFinished = true;

                    setTimeout(() => {
                        card.classList.remove('selected');
                    }, 1500);

                } else {
                    showAlert('danger', `Ups! Ese no era. Te quedan ${intentosRestantes} intentos :3`);
                    setTimeout(() => {
                        card.classList.remove('selected');
                    }, 1500);
                }
            }
        } else {
            showAlert('warning', '¿Exactamente qué esperas conseguir haciendo eso?');
        }
    });

    charactersContainer.appendChild(card);
});

// Mostrar al personaje elegido por el bot una vez que se adivina o terminan los intentos
function showSelectedCharacter() {
    const selectedCharacter = document.querySelector('.bot-selection .selected-character');

    setTimeout(() => {
        const image = selectedCharacter.querySelector('.selection-image');
        image.src = characters[botSelectedCharacterID].imagen;

        const name = selectedCharacter.querySelector('h3');
        name.textContent = characters[botSelectedCharacterID].nombre;
    }, 1000);
}

const playerReadyButton = document.querySelector('.player-selection .btn-ready');
playerReadyButton.addEventListener('click', handleTurn);

const botButton = document.querySelector('.bot-selection .btn-ready');
function handleTurn() {
    if (fullGameFinished) {
        return;
    }

    if (currentTurn === "Player") { // Pasar el turno al bot
        botTurnQuestionsLeft = 1;

        playerReadyButton.classList.remove('active');
        playerReadyButton.classList.add('waiting');
        playerReadyButton.innerHTML = '<i class="fa fa-pause-circle"></i>Esperando...';

        botButton.classList.remove('waiting');
        botButton.classList.add('active');
        botButton.innerHTML = '<i class="fa fa-check-circle"></i>Listo';

        currentTurn = "Bot";

        setTimeout(() => {
            realizarPregunta();
        }, 1000);
    } else { // Pasar el turno al player
        turnQuestionsLeft = 1;

        botButton.classList.remove('active');
        botButton.classList.add('waiting');
        botButton.innerHTML = '<i class="fa fa-pause-circle"></i>Esperando...';

        playerReadyButton.classList.remove('waiting');
        playerReadyButton.classList.add('active');
        playerReadyButton.innerHTML = '<i class="fa fa-check-circle"></i>Listo';
        currentTurn = "Player";
    }
}


//#endregion

//#region Adivinar

let guessMeFinished = false;

function prepareForGuess() {
    console.log("Preparando para Guess");
    // Lo primero es preparar el tablero
    // Las tarjetas SI deben mostrar los botones de accion
    const cardsActionButtons = document.querySelectorAll('.characters .card .actions');
    cardsActionButtons.forEach(buttonBar => {
        /* buttonBar.parentNode.removeChild(buttonBar); */
        buttonBar.style.display = 'flex';
    });

    // Luego hay que preparar las herramientas
    createBotSelection();

    // Solo se debe mostrar al jugador en la seccion de jugadores
    const playerSelection = document.querySelector('.player-selection');
    playerSelection.style.display = 'none';

    // Ponerlo visible en caso de que estuviera oculto
    const botSelection = document.querySelector('.bot-selection');
    botSelection.style.display = 'flex';

    // Ajustar tamano de los contenedores
    const selectionsContainer = document.querySelector('.tool-container.players');
    selectionsContainer.style.width = "86%";

    const botSelectionCard = document.querySelector('.bot-selection .card');
    botSelectionCard.style.width = "50%";

    // No se debe mostrar el boton de pasar turno en la seleccion del jugador
    const playerButtonReady = document.querySelector('.bot-selection .btn-ready');
    playerButtonReady.style.display = 'none';

    // Si se debe mostrar el banco de preguntas puesto que el jugador es quien pregunta
    const questionsBank = document.querySelector('.questions-bank');
    questionsBank.style.display = 'flex';

    // Resetear las tarjetas descartadas
    const flippedCards = document.querySelectorAll('.flipped');
    flippedCards.forEach((card) => {
        card.classList.remove('flipped');
    });

    // Resetear las tarjetas seleccionadas
    const selectedCards = document.querySelectorAll('.card.selected');
    selectedCards.forEach((card) => {
        card.classList.remove('selected');
    });

    // Resetear las preguntas seleccionadas
    const selectedQuestions = document.querySelectorAll('.question.selected');
    selectedQuestions.forEach((question) => {
        question.style.background = 'white';
        question.classList.remove('selected');
    });

    // Generar al personaje seleccionado de forma aleatoria
    botSelectedCharacterID = Math.floor(Math.random() * 28);
    console.log("ID del personaje seleccionado por el bot: " + botSelectedCharacterID)
    console.log("Nombre del personaje: " + characters[botSelectedCharacterID].nombre)

    // Resetear variables
    guessMeFinished = false;
    intentosRestantes = 3;
    enDialogoPostJuego = false;
}

//#endregion

//#region Completo

// Estado del juego
let turnQuestionsLeft = 1;
let botTurnQuestionsLeft = 1;
let currentTurn = "Player";
let fullGameFinished = false;

// Preparar el tablero para el juego completo
function prepareForFull() {
    console.log("Preparando para Full");
    // Lo primero es preparar el tablero
    // Las tarjetas SI deben mostrar los botones de accion
    const cardsActionButtons = document.querySelectorAll('.characters .card .actions');
    cardsActionButtons.forEach(buttonBar => {
        buttonBar.style.display = 'flex';
    });

    // Luego hay que preparar las herramientas
    createPlayerSelection();
    createBotSelection();

    // Se debe mostrar al jugador y al bot en la seccion de jugadores
    const playerSelection = document.querySelector('.player-selection');
    playerSelection.style.display = 'flex';

    const botSelection = document.querySelector('.bot-selection');
    botSelection.style.display = 'flex';

    // Ajustar tamano de los contenedores
    const selectionsContainer = document.querySelector('.tool-container.players');
    selectionsContainer.style.width = "86%";

    const playerSelectionCard = document.querySelector('.player-selection .card');
    playerSelectionCard.style.width = "100%";

    const botSelectionCard = document.querySelector('.bot-selection .card');
    botSelectionCard.style.width = "100%";

    // Se debe mostrar los botones de ready
    const playerButtonReady = document.querySelector('.player-selection .btn-ready');
    playerButtonReady.style.display = 'flex';

    const botButtonReady = document.querySelector('.bot-selection .btn-ready');
    botButtonReady.style.display = 'flex';

    // Si se debe mostrar el banco de preguntas
    const questionsBank = document.querySelector('.questions-bank');
    questionsBank.style.display = 'flex';

    // Resetear las tarjetas descartadas
    const flippedCards = document.querySelectorAll('.flipped');
    flippedCards.forEach((card) => {
        card.classList.remove('flipped');
    });

    // Resetear las tarjetas seleccionadas
    const selectedCards = document.querySelectorAll('.card.selected');
    selectedCards.forEach((card) => {
        card.classList.remove('selected');
    });

    // Resetear las preguntas seleccionadas
    const selectedQuestions = document.querySelectorAll('.question.selected');
    selectedQuestions.forEach((question) => {
        question.style.background = 'white';
        question.classList.remove('selected');
    });

    // Preparar el cuadro de pregunta
    btnSi.textContent = "Si";
    btnNo.textContent = "No";
    btnNo.style.display = 'inline';

    // Resetear los arrays usados
    filteredCharacters = [...characters];
    remainingQuestions = [...questions];
    pasoActual = 0;

    // Generar al personaje seleccionado de forma aleatoria
    botSelectedCharacterID = Math.floor(Math.random() * 28);
    console.log("ID del personaje seleccionado por el bot: " + botSelectedCharacterID)
    console.log("Nombre del personaje: " + characters[botSelectedCharacterID].nombre)

    // Resetear variables
    intentosRestantes = 3;
    turnQuestionsLeft = 1;
    botTurnQuestionsLeft = 1;
    currentTurn = "Player";
    enDialogoPostJuego = false;
    fullGameFinished = false;
    guessMeFinished = false;

    // Reiniciar los botones de turno
    playerReadyButton.classList.add('active');
    playerReadyButton.classList.remove('waiting');
    playerReadyButton.innerHTML = '<i class="fa fa-check-circle"></i>Listo';

    botButton.classList.add('waiting');
    botButton.classList.remove('active');
    botButton.innerHTML = '<i class="fa fa-pause-circle"></i>Esperando...';

}

//#endregion

//#region Adiviname

// Estado del juego
let filteredCharacters = [...characters];
let remainingQuestions = [...questions];
let discardedCharacters;
let pasoActual = 0;
let enDialogoPostJuego = false;

// Referencias al DOM (igual que antes)
const preguntaTexto = document.getElementById("texto-pregunta");
const message = document.getElementById("message");
const btnSi = document.getElementById("btn-si");
const btnNo = document.getElementById("btn-no");
const characterIcon = document.getElementById("character-icon");

// Descartar personajes
function descartarPersonajes() {
    const gameboardCharacterCards = document.querySelectorAll('.characters-board .characters .card');
    discardedCharacters.forEach((character) => {
        // Busca el elemento interno que se voltea
        const innerCard = gameboardCharacterCards[character.id].querySelector('.flip-card-inner');
        // Alterna la clase 'flipped'
        innerCard.classList.add('flipped');
    });

    // Llamar al método para marcar personajes descartados en el tablero
    const idsDescartados = discardedCharacters.map(character => character.id); // Extraer IDs
    marcarPersonajesDescartados(idsDescartados); // Cambiar color en el tablero
}

// Filtrar preguntas que pueden ser respondidas con "sí" para al menos un personaje y "no" para al menos uno
function obtenerPreguntasRelevantes() {
    const preguntasRelevantes = [];

    questions.forEach((pregunta) => {
        const atributo = pregunta.atributo;
        // Verificar las respuestas de todos los personajes a este atributo
        const respuestas = filteredCharacters.map(personaje => personaje.atributos[atributo]);

        // Si todos los personajes tienen la misma respuesta, la pregunta es omitida
        const respuestasUnicas = new Set(respuestas);

        // Si las respuestas son diversas (al menos "sí" para uno y "no" para otro), la pregunta es relevante
        if (respuestasUnicas.size > 1) {
            preguntasRelevantes.push(pregunta);
        }
    });

    return preguntasRelevantes;
}

// Realizar una pregunta
function realizarPregunta() {
    mostrarDialog();

    if (enDialogoPostJuego) {
        /* console.log("Realizando pregunta pero enPost.. saliendo") */
        return;
    }

    if (selectedGamemode === 2) {
        if (currentTurn === "Bot" && botTurnQuestionsLeft === 0) {
            console.log("Bot turn and questions left: " + botTurnQuestionsLeft);
            return;
        }
    }

    if (filteredCharacters.length === 1) {
        message.textContent = "¡El Bot ha adivinado tu personaje!"
        preguntaTexto.textContent = `¡El personaje es: ${filteredCharacters[0].nombre}!`;
        characterIcon.style.display = 'flex';
        characterIcon.src = filteredCharacters[0].imagen;
        btnSi.textContent = "¡Correcto!";
        btnNo.textContent = "¡Incorrecto!";

        enDialogoPostJuego = true;

        console.log("Adivinando");
        return;
    }
    message.textContent = "Bot quiere hacerte una pregunta sobre tu personaje"
    btnSi.textContent = "Si";
    btnNo.textContent = "No";
    characterIcon.style.display = 'none';

    if (pasoActual === 0) {
        preguntaTexto.textContent = "¿Aceptar?";
    } else {
        /* console.log("Realizando pregunta"); */
        const preguntasFiltradas = obtenerPreguntasRelevantes(); // Filtrar preguntas según los personajes restantes
        if (preguntasFiltradas.length > 0) {
            const randomIndex = Math.floor(Math.random() * preguntasFiltradas.length);
            const pregunta = preguntasFiltradas[randomIndex];
            remainingQuestions = remainingQuestions.filter(p => p !== pregunta); // Eliminar la pregunta seleccionada
            preguntaTexto.textContent = pregunta.texto;

            if (selectedGamemode === 2) {
                if (currentTurn === "Bot") {
                    turnQuestionsLeft--;
                }
            }

        } else {
            preguntaTexto.textContent = "No hay más preguntas posibles.";
            btnSi.style.display = "none";
            btnNo.style.display = "none";
        }
    }
}

const questionDialog = document.querySelector('.question-screen');
const questionBox = document.querySelector('.question-box');
let dialogIsOpen = false;

function mostrarDialog() {
    if (dialogIsOpen) return;
    questionDialog.style.display = 'flex';
    setTimeout(() => {
        questionDialog.style.opacity = '1';
    }, 50);

    questionBox.style.opacity = '1';
    questionBox.style.transform = 'scale(1)';

    dialogIsOpen = true;

    /* console.log("Mostrando dialog"); */
}

function ocultarDialog() {
    questionDialog.style.opacity = '0';

    questionBox.style.opacity = '0';
    questionBox.style.transform = 'scale(0.8)';

    setTimeout(() => {
        questionDialog.style.display = 'none';
        dialogIsOpen = false;
    }, 550);

    /* console.log("Cerrando dialog"); */
}

// Manejar respuesta del usuario
function handleAnswer(respuesta) {
    if (pasoActual === 0) {
        if (!respuesta) {
            showAlert('danger', '¿Cómo quieres jugar si no aceptas la pregunta?');
            return; // Si no está listo para jugar, no hace nada
        }
    } else {
        const preguntaActual = questions.find((p) => p.texto === preguntaTexto.textContent);
        if (preguntaActual) {
            const atributo = preguntaActual.atributo;

            const originalCharacters = [...filteredCharacters]; // Copia del array original

            // Filtrar los personajes que cumplen la condición
            filteredCharacters = filteredCharacters.filter((personaje) =>
                respuesta ? personaje.atributos[atributo] : !personaje.atributos[atributo]
            );

            // Obtener los personajes descartados
            discardedCharacters = originalCharacters.filter(
                (personaje) => !filteredCharacters.includes(personaje)
            );

            if (selectedGamemode === 2) {
                const idsDescartados = discardedCharacters.map(character => character.id); // Extraer IDs
                setTimeout(() => {
                    marcarPersonajesDescartados(idsDescartados); // Cambiar color en el tablero
                }, 500);
            }
        }

        handlePostGameDialog(respuesta);
    }
    pasoActual++;


    if (pasoActual === 1 || enDialogoPostJuego) { // Sin la espera
        console.log("Preguntando sin animacion: enDialogoPostJuego: " + enDialogoPostJuego);
        realizarPregunta();
    } else if (selectedGamemode !== 2 && currentTurn !== "Bot" && botTurnQuestionsLeft < 1) { // Con un retraso
        setTimeout(() => {
            realizarPregunta();
        }, 2500);
        setTimeout(() => {
            descartarPersonajes();
        }, 500);
    } else {
        setTimeout(() => {
            handleTurn();
        }, 1000);
    }
}

function handlePostGameDialog(respuesta) {
    // Entrar al dialogo post juego o lanzar una nueva pregunta
    if (enDialogoPostJuego) {
        console.log("En dialogo post juego");
        message.textContent = "El Bot dice:"
        if (respuesta) { // Se presionó boton ¡Correcto!
            console.log("Btn Correcto");
            if (btnSi.textContent === "Salir") {
                ocultarDialog();
                return;
            }

            if (filteredCharacters[0].id === selectedCharacterID) {
                // El bot adivinó y le dijiste que era correcto
                preguntaTexto.textContent = `¡Bien Jugado!`;

                const animationTextMessage = defeatAnimationContainer.querySelector('.info.message');
                animationTextMessage.textContent = "El Bot ha adivinado tu personaje"
                playDefeatAnimation();

                if (selectedGamemode === 2) {
                    fullGameFinished = true;


                    showSelectedCharacter();

                    /* setTimeout(() => {
                        handleTurn();
                    }, 1000); */
                }

            } else {
                // El bot NO adivinó y le dijiste que era correcto
                preguntaTexto.textContent = `¿Me estás dejando ganar? :3`;

                const animationTextMessage = winAnimationContainer.querySelector('.info.message');
                animationTextMessage.textContent = "¡El Bot no logró adivinar!";
                playVictoryAnimation();

                if (selectedGamemode === 2) {
                    fullGameFinished = true;


                    showSelectedCharacter();

                    /* setTimeout(() => {
                        handleTurn();
                    }, 1000); */
                }
            }
        } else { // Se presionó boton ¡Incorrecto!
            console.log("Btn Incorrecto");
            if (filteredCharacters[0].id === selectedCharacterID) {
                // El bot adivinó y le dijiste que era incorrecto
                preguntaTexto.textContent = `¿A caso me estás haciendo trampa?`;

                const animationTextMessage = defeatAnimationContainer.querySelector('.info.message');
                animationTextMessage.textContent = "El Bot ha adivinado tu personaje"
                playDefeatAnimation();

                if (selectedGamemode === 2) {
                    fullGameFinished = true;

                    showSelectedCharacter();

                    /* setTimeout(() => {
                        handleTurn();
                    }, 1000); */
                }
            } else {
                // El bot NO adivinó y le dijiste que era incorrecto
                preguntaTexto.textContent = `¡Tú ganas! =(`;

                const animationTextMessage = winAnimationContainer.querySelector('.info.message');
                animationTextMessage.textContent = "¡El Bot no logró adivinar!";
                playVictoryAnimation();

                if (selectedGamemode === 2) {
                    fullGameFinished = true;

                    showSelectedCharacter();

                    /* setTimeout(() => {
                        handleTurn();
                    }, 1000); */
                }
            }
        }

        characterIcon.style.display = 'none';
        btnSi.textContent = "Salir";
        btnNo.style.display = "none";
        console.log("Fin del dialogo post juego");
    } else {
        console.log("No en dialogo post juego");
        ocultarDialog();
    }
}

// Event Listeners
btnSi.addEventListener("click", () => handleAnswer(true));
btnNo.addEventListener("click", () => handleAnswer(false));

function prepareForGuessMe() {
    console.log("Preparando para Guess Me");
    // Lo primero es preparar el tablero
    // Las tarjetas no deben mostrar los botones de accion
    const cardsActionButtons = document.querySelectorAll('.characters .card .actions');
    cardsActionButtons.forEach(buttonBar => {
        /* buttonBar.parentNode.removeChild(buttonBar); */
        buttonBar.style.display = 'none';
    });

    // Luego hay que preparar las herramientas
    createPlayerSelection();

    // Solo se debe mostrar al jugador en la seccion de jugadores
    const botSelection = document.querySelector('.bot-selection');
    botSelection.style.display = 'none';

    // Ponerlo visible en caso de que estuviera oculto
    const playerSelection = document.querySelector('.player-selection');
    playerSelection.style.display = 'flex';

    // Ajustar tamano de los contenedores
    /*const playerSelection = document.querySelector('.player-selection .card');
     playerSelection.style.width = "50%"; */

    const selectionsContainer = document.querySelector('.tool-container.players');
    selectionsContainer.style.width = "50%";

    // No se debe mostrar el boton de pasar turno en la seleccion del jugador
    const playerButtonReady = document.querySelector('.player-selection .btn-ready');
    playerButtonReady.style.display = 'none';

    // No se debe mostrar el banco de preguntas puesto que el bot es quien pregunta
    const questionsBank = document.querySelector('.questions-bank');
    questionsBank.style.display = 'none';

    // Preparar el cuadro de pregunta
    btnSi.textContent = "Si";
    btnNo.textContent = "No";
    btnNo.style.display = 'inline';

    // Resetear los arrays usados
    filteredCharacters = [...characters];
    remainingQuestions = [...questions];
    pasoActual = 0;
    enDialogoPostJuego = false;

    // Resetea las variables
    currentTurn = "Player";
    botTurnQuestionsLeft = 0;
    guessMeFinished = false;

    // Resetear las tarjetas descartadas
    const flippedCards = document.querySelectorAll('.flipped');
    flippedCards.forEach((card) => {
        card.classList.remove('flipped');
    });
}

function createPlayerSelection() {
    const previousSelectedCharacter = document.querySelector('.player-selection .selected-character')
    if (previousSelectedCharacter) { // Si la tarjeta del jugador ya tiene un personaje cargado
        // Hay que eliminarlo para cargar el nuevo
        previousSelectedCharacter.parentNode.removeChild(previousSelectedCharacter);
    }
    else { // Si a la tarjeta del jugador no se le ha cargado un personaje 
        // Quiere decir que tampoco tiene un preview cargado
        generatePreview("player"); // Generar el preview solo una vez
    }

    const selectedCharacter = document.createElement('div');
    selectedCharacter.classList.add('selected-character');
    selectedCharacter.innerHTML = `
        <img src=${characters[selectedCharacterID].imagen} class="selection-image">
        <h3>${characters[selectedCharacterID].nombre}</h3>   
    `;

    // Reiniciar el preview
    reiniciarGameboardPreview();

    // Encontrar la tarjeta del jugador y cargarle la seleccion en el lugar correcto
    const selectionCard = document.querySelector('.player-selection .card');
    selectionCard.insertBefore(selectedCharacter, selectionCard.childNodes[4]);

    /* document.querySelector('.player-selection .card').appendChild(selection); */
}

function createBotSelection() {
    const previousSelectedCharacter = document.querySelector('.bot-selection .selected-character')
    if (previousSelectedCharacter) { // Si la tarjeta del jugador ya tiene un personaje cargado
        // Hay que eliminarlo para cargar el nuevo
        previousSelectedCharacter.parentNode.removeChild(previousSelectedCharacter);
    }
    else { // Si a la tarjeta del jugador no se le ha cargado un personaje 
        // Quiere decir que tampoco tiene un preview cargado
        generatePreview("bot"); // Generar el preview solo una vez
    }

    const selectedCharacter = document.createElement('div');
    selectedCharacter.classList.add('selected-character');
    selectedCharacter.innerHTML = `
        <img src="./Recursos/desconocido2.png" class="selection-image">
        <h3>???</h3>   
    `;

    // Reiniciar el preview
    reiniciarGameboardPreview();

    // Encontrar la tarjeta del jugador y cargarle la seleccion en el lugar correcto
    const selectionCard = document.querySelector('.bot-selection .card');
    selectionCard.insertBefore(selectedCharacter, selectionCard.childNodes[4]);
}

function generatePreview(target) {
    const gameboardPreview = document.createElement('div');
    gameboardPreview.classList.add('gameboard-preview');

    for (let x = 0; x < 28; x++) {
        const cell = document.createElement('div');
        cell.classList.add('gameboard-cell');
        gameboardPreview.appendChild(cell);
    }

    if (target === "bot") {
        // Encontrar la tarjeta del jugador y cargarle la seleccion en el lugar correcto
        const selectionCard = document.querySelector('.bot-selection .card');
        selectionCard.insertBefore(gameboardPreview, selectionCard.childNodes[5]);

        /* document.querySelector('.bot-selection .card').appendChild(gameboardPreview); */
    } else {
        // Encontrar la tarjeta del jugador y cargarle la seleccion en el lugar correcto
        const selectionCard = document.querySelector('.player-selection .card');
        selectionCard.insertBefore(gameboardPreview, selectionCard.childNodes[5]);
        /* document.querySelector('.player-selection .card').appendChild(gameboardPreview); */
    }

}

//#endregion

// #region Botones de Accion

// Mostrar la pantalla de inicio
const homeButton = document.querySelector('.home-button');
homeButton.addEventListener('click', (event) => {
    gameBoardScreen.style.opacity = '0';
    gameBoardScreen.style.transform = 'scale(0.8)';

    startScreen.style.display = 'flex';

    setTimeout(() => {
        gameBoardScreen.style.display = 'none';

        startScreen.style.opacity = '1';
        startScreen.style.transform = 'scale(1)';
    }, 500);
});

// Mostrar la pantalla de modos de juego
const backButton = document.querySelector('.back-button');
backButton.addEventListener('click', (event) => {
    characterSelector.classList.add('hidden');
    characterSelector.style.opacity = '0';
    characterSelector.style.transform = 'scale(0.8)';

    setTimeout(() => {
        characterSelector.style.display = 'none';
        gameModeScreen.style.display = 'flex';
    }, 500);

    setTimeout(() => {
        gameModeScreen.classList.remove('hidden');
        gameModeScreen.style.opacity = '1';
        gameModeScreen.style.transform = 'scale(1)';
    }, 600);
});


// Mostrar la pantalla de modos de juego
const menuButton = document.querySelector('.menu-button');
menuButton.addEventListener('click', (event) => {
    gameBoardScreen.style.opacity = '0';
    gameBoardScreen.style.transform = 'scale(0.8)';

    setTimeout(() => {
        gameBoardScreen.style.display = 'none';
        gameModeScreen.style.display = 'flex';
    }, 500);

    setTimeout(() => {
        gameModeScreen.classList.remove('hidden');
        gameModeScreen.style.opacity = '1';
        gameModeScreen.style.transform = 'scale(1)';
    }, 600);
});

// #endregion

//#region Alerts
function showAlert(type, message, duration = 7000) {
    let icon = '';
    switch (type) {
        case 'success': icon = '<i class="bi bi-check-circle-fill"></i>'; break;
        case 'danger': icon = '<i class="bi bi-exclamation-triangle-fill"></i>'; break;
        case 'warning': icon = '<i class="bi bi-exclamation-circle-fill"></i>'; break;
        case 'info': icon = '<i class="bi bi-info-circle-fill"></i>'; break;
        default: icon = '<i class="bi bi-bell-fill"></i>';
    }

    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible showing custom-radius d-flex align-items-center`;
    alert.role = 'alert';
    alert.innerHTML = `
        ${icon} <span class="ms-2">${message}</span>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    const container = document.getElementById('alert-container');
    container.appendChild(alert);

    alert.offsetHeight;
    requestAnimationFrame(() => {
        alert.classList.add('showing');
        alert.classList.add('show');
    });

    setTimeout(() => {
        alert.classList.remove('show');
        alert.classList.add('hiding');
        setTimeout(() => alert.remove(), 300);
    }, duration);
}

//#endregion

//#region Questions

// Estado del juego
let intentosRestantes = 3;

const questionContainer = document.querySelector('.question-container');
let indexPregunta = 0;
questions.forEach(question => {
    const questionElement = document.createElement('p');
    questionElement.classList.add('question');
    questionElement.id = indexPregunta;
    questionElement.textContent = question.texto;
    questionElement.addEventListener("click", () => {
        handleQuestion(questionElement.id);
    });
    questionContainer.appendChild(questionElement);
    indexPregunta++;
});

const questionsList = document.querySelectorAll('.question');
let infoWasShown = false;
function handleQuestion(id) {
    /* console.log(`Question ID: ${id}`); */
    const indexPregunta = id;
    if (indexPregunta === "") return;

    if (!infoWasShown) {
        showAlert('info', 'Descarta a los personajes según las respuestas que recibas: Verde para sí, Rojo para no.');
        infoWasShown = true;
    }

    if (selectedGamemode === 2) {
        if (currentTurn === "Player") {
            // Si ya no hay preguntas restantes este turno
            if (turnQuestionsLeft === 0) {
                if (fullGameFinished) {
                    showAlert('info', 'No sé por qué sigues aquí.. ¡El juego terminó!')
                } else {
                    showAlert('info', '¡Solo se puede hacer una pregunta por turno!')
                }
                return;
            }
            // Decrease the left questions and make the cuestion
            turnQuestionsLeft--;
        } else {
            if (fullGameFinished) {
                showAlert('info', 'Ejem.. ¡El juego ya se acabó!')
            } else {
                showAlert('warning', '¡Espera a tu turno!')
            }
            return;
        }
    }

    const preguntaSeleccionada = questions[indexPregunta];
    const atributo = preguntaSeleccionada.atributo;
    const esVerdadero = characters[botSelectedCharacterID].atributos[atributo];

    if (esVerdadero) { // Cambia color a verde
        questionsList[indexPregunta].style.background = 'rgba(46, 161, 46, 0.5)';
    } else { // Cambia color a rojo
        questionsList[indexPregunta].style.background = 'rgba(221, 74, 74, 0.5)';
    }
    // Cambiarla a selected para resetearla con mas facilidad
    questionsList[indexPregunta].classList.add('selected');
}

//#endregion



//#region Preview

// Método para marcar personajes descartados en el tablero
function marcarPersonajesDescartados(idsDescartados) {
    let cells = [0, 1];

    console.log("SelectedGamemode: " + selectedGamemode);
    if (selectedGamemode === 3) {
        // Obtiene todas las celdas del tablero del jugador
        cells = document.querySelectorAll('.player-selection .gameboard-preview .gameboard-cell');
    } else {
        // Obtiene todas las celdas del tablero del bot
        cells = document.querySelectorAll('.bot-selection .gameboard-preview .gameboard-cell');
    }

    // Itera sobre cada ID de personaje descartado
    idsDescartados.forEach(id => {
        // Asegúrate de que el ID sea válido dentro del rango de celdas
        if (id >= 0 && id < cells.length) {
            // Cambia el color de fondo añadiendo la clase 'discarded'
            cells[id].classList.add('discarded');
        } else {
            console.warn(`El ID ${id} está fuera de rango.`);
        }
    });
}

// Método para marcar personajes descartados en el tablero
function descartarUnSoloPersonaje(id) {
    if (selectedGamemode === 1) {//Guess
        // Obtiene todas las celdas del tablero del bot
        const cells = document.querySelectorAll('.bot-selection .gameboard-preview .gameboard-cell');
        cells[id].classList.add('discarded');
    } else if (selectedGamemode === 2) {//Full
        // Obtiene todas las celdas del tablero del jugador
        const cells = document.querySelectorAll('.player-selection .gameboard-preview .gameboard-cell');
        cells[id].classList.add('discarded');
    }
}

// Método para poner todas las celdas en verde
function reiniciarGameboardPreview() {
    const cells = document.querySelectorAll('.gameboard-preview .gameboard-cell.discarded');

    console.log("Limpiando el preview");

    // Itera sobre cada celda y cambia su color de fondo a verde
    cells.forEach(cell => {
        /* cell.style.background = 'green'; // Establece el fondo a verde */
        cell.classList.remove('discarded');
    });
}


//#endregion