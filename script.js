// Datos de ejemplo
/* const characters = [
  new Personaje(0, "Iron Man", "./Personajes/ironman.png", true, false, false, false, true, false, true, false, false, true, false, false, false, true, false, false, false, false, true, false, false, false, false, false, false, false),
  new Personaje(0, "Capitán America", "./Personajes/capitan_america.png", true, false, false, false, true, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
  new Personaje(0, "Thor", "./Personajes/thor.png", true, false, false, false, true, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
  new Personaje(0, "Hulk", "./Personajes/hulk.webp", true, false, false, false, true, true, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
  new Personaje(0, "Viuda Negra", "./Personajes/viuda_negra.png", true, false, false, false, true, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
  new Personaje(0, "Hawk Eye", "./Personajes/hawk_eye.jpg", true, false, false, false, true, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
  new Personaje(0, "Visión", "./Personajes/vision.png", true, true, false, false, false, false, false, true, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
  new Personaje(0, "Dr Strange", "./Personajes/dr_strange.jpg", true, false, false, false, false, true, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
  new Personaje(0, "Pantera Negra", "./Personajes/pantera_negra.png", true, false, false, false, true, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
  new Personaje(0, "Ant-Man", "./Personajes/antman.png", true, false, false, false, true, false, true, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
  new Personaje(0, "Star Lord", "./Personajes/starlord.png", true, false, false, false, true, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
  new Personaje(0, "Gamora", "./Personajes/gamora.png", true, true, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false),
  new Personaje(0, "Drax", "./Personajes/drax.jpg", true, true, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false),
  new Personaje(0, "Groot", "./Personajes/groot.jpeg", true, false, false, true, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
  new Personaje(0, "Rocket", "./Personajes/rocket.png", false, true, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
  new Personaje(0, "Mantis", "./Personajes/mantis.png", true, true, false, false, false, false, false, true, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
  new Personaje(0, "Nebula", "./Personajes/nebula.png", true, true, false, false, false, false, false, true, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false),
  new Personaje(0, "Spider Man", "./Personajes/spiderman.jpg", true, false, false, false, true, false, true, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
  new Personaje(0, "War Machine", "./Personajes/war_machine.jpg", true, false, false, false, true, false, true, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
  new Personaje(0, "Falcón", "./Personajes/falcon.jpg", true, false, false, false, true, false, true, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
  new Personaje(0, "Winter Soldier", "./Personajes/bucky_barnes.png", true, false, false, false, true, false, false, false, false, true, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false),
  new Personaje(0, "Nick Furia", "./Personajes/nick_furia.png", true, false, false, false, true, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
  new Personaje(0, "María Hill", "./Personajes/maria_hill.png", true, false, false, false, true, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
  new Personaje(0, "Wong", "./Personajes/wong.png", true, false, false, false, false, true, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
  new Personaje(0, "Okoye", "./Personajes/okoye.png", true, false, false, false, true, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
  new Personaje(0, "Shuri", "./Personajes/shuri.png", true, false, false, false, true, false, true, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
  new Personaje(0, "Ned", "./Personajes/ned.png", true, false, false, false, true, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
  new Personaje(0, "Loki", "./Personajes/loki.png", true, false, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false)
];

// Contenedor de personajes
const charactersContainer = document.querySelector('.characters');

// Renderizar las tarjetas de personajes
characters.forEach(character => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
      <img src="${character.imagen}" alt="${character.nombre}">
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
    card.classList.add('discarded');
    setTimeout(() => card.remove(), 300); // Elimina el elemento después de la animación
  });

  card.querySelector('.select').addEventListener('click', () => {
    card.classList.add('selected');
  });

  charactersContainer.appendChild(card);
});



const homeButton = document.querySelector('.home-button');
const gameBoard = document.querySelector('.game-board');
const startScreen = document.querySelector('.start-screen');

homeButton.addEventListener("click", goHome);
startScreen.style.display = 'none'; // Oculta completamente el botón
function goHome() {

  // Desaparece el botón con una animación
  gameBoard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  gameBoard.style.opacity = '0';
  gameBoard.style.transform = 'scale(0.8)';

  // Muestra las tarjetas de modo de juego después de la animación del botón
  setTimeout(() => {
    gameBoard.style.display = 'none'; // Oculta completamente el botón

    // Aparece las tarjetas
    startScreen.style.display = 'flex'; // Oculta completamente el botón
    startScreen.style.opacity = '1';
    startScreen.style.transform = 'scale(1)';

  }, 500); // Sincronizado con la duración de la animación del botón
} */

let animation = bodymovin.loadAnimation({
  container: document.getElementById('animation container'),
  path: './Recursos/CountDown.json',
  render: 'svg',
  loop: false,
  autoplay: false,
  name: 'CountDown Animation'
});

setTimeout(() => {
  animation.play();
}, 1000);


