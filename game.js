// Game variables
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const statusElement = document.getElementById("status");

// Game state
let gameState = {
  currentLevel: 1,
  totalLevels: 5,
  gameWon: false,
  collectedItems: [],
  levelStartTime: Date.now(),
  monsters: [], // Array to store active monsters
  showingQuestionModal: false,
  currentQuestion: null,
  questionTimer: null,
  answeredCorrectly: false,
};

// Questions for each level
const levelQuestions = {
  1: {
    title: "God of War",
    subtitle: "KRATOS, FANTASMA DE ESPARTA",
    description:
      "Encuentras 15 CRISTALES DE YGGDRASIL.\nUna tormenta en los NUEVE REINOS te arrebata 9 de ellos.\nEntre las raíces sagradas hallas 4 CRISTALES olvidados.",
    question: "¿CUÁNTOS CRISTALES RETIENES EN TU IRA?",
    options: [
      { text: "A) 6", value: "A" },
      { text: "B) 10", value: "B" },
      { text: "C) 8", value: "C" },
      { text: "D) 12", value: "D" },
    ],
    correctAnswer: "B",
    timeLimit: 15,
    calculation: "15 - 9 + 4 = 10",
  },
  2: {
    title: "Zelda",
    subtitle: "CAMPANA DEL VALLE DE LOS RECUERDOS",
    description:
      "Link carga 7 SEMILLAS KOROK.\nUn Lynel arrebata 2 en el caos de la batalla.\nEl sabio Korok le entrega 5 por su valentía.",
    question: "¿CUÁNTAS SEMILLAS CUSTODIA EL HÉROE AHORA?",
    options: [
      { text: "A) 10", value: "A" },
      { text: "B) 12", value: "B" },
      { text: "C) 9", value: "C" },
      { text: "D) 7", value: "D" },
    ],
    correctAnswer: "A",
    timeLimit: 17,
    calculation: "7 - 2 + 5 = 10",
  },
  3: {
    title: "Elden Ring",
    subtitle: "HIJO DE LA LLAMA",
    description:
      "Tomas 18 FRASCOS DE LÁGRIMA CRIMSONA.\nUn ladrón sombrío te arrebata 7.\nEn un altar oculto encuentras 4 frascos más.",
    question: "¿CUÁNTOS FRASCOS TE QUEDAN?",
    options: [
      { text: "A) 12", value: "A" },
      { text: "B) 15", value: "B" },
      { text: "C) 14", value: "C" },
      { text: "D) 11", value: "D" },
    ],
    correctAnswer: "B",
    timeLimit: 21,
    calculation: "18 - 7 + 4 = 15",
  },
  4: {
    title: "Zelda",
    subtitle: "GUARDIÁN DEL BOSQUE",
    description:
      "Link recolecta 11 FLORES SILVESTRES.\nUna corriente de viento se lleva 3.\nEncuentra 6 nuevas en la orilla del lago.",
    question: "¿CUÁNTAS FLORES LLEVA AHORA?",
    options: [
      { text: "A) 15", value: "A" },
      { text: "B) 13", value: "B" },
      { text: "C) 14", value: "C" },
      { text: "D) 12", value: "D" },
    ],
    correctAnswer: "C",
    timeLimit: 24,
    calculation: "11 - 3 + 6 = 14",
  },
};

// Player object
const player = {
  x: 50,
  y: 50,
  size: 32,
  speed: 4,
  color: "#4CAF50",
};

// Level definitions with tile-based maps
const levels = {
  1: {
    name: "La Búsqueda de la Llave",
    objective: "Encuentra la llave oculta y abre el cofre",
    playerStart: { x: 64, y: 64 },
    map: [
      "WWWWWWWWWWWWWWWWWWWWWWWWW",
      "WGGGGGGGGGGGGGGGGGGGGGGGW",
      "WGWGGWWWWWWWWWWWWWWWWWWWW",
      "WGWGGGGGGGGGGGGGGGGGGGGGW",
      "WGWGGGGGGGGGGGGGGGGGGGGGW",
      "WGWGGWGGGGGGGGGGGGGGGGGGW",
      "WGWGGWGGGGGGGGGGGGGGGGGGW",
      "WGWGGWWWWWWWWWWWWWWWWWWWW",
      "WGGGGGGGGGGGGGGGGGGGGGGGW",
      "WGGGGGGGGGGGGGGGGGWGGGGGW",
      "WGGGGGGGGGGGGGGGGGWGGGGGW",
      "WGGGGGWWWWWGGGGGGGWGGGGGW",
      "WGGGGGWGGGGGGGGGGGWGGGGGW",
      "WGGWWWWGGGWWWWWWWWWGGGGGW",
      "WGGGGGWGGGGGGGGGGGWGGGGGW",
      "WGGGGGWGGGGGGGGGGGWGGGGGW",
      "WGGGGGWGGGGGGGGGGGWGGGGGW",
      "WGGGGGWGGGGGGGGGGGWGGGGGW",
      "WWWWWWWWWWWWWWWWWWWWWWWWW",
    ],
    hiddenObjects: [
      {
        type: "llave",
        x: 704,
        y: 128,
        size: 32,
        hidden: true,
        color: "#FFD700",
        emoji: "🔑",
        found: false,
      },
    ],
    objectives: [
      {
        type: "chest",
        x: 704,
        y: 512,
        size: 32,
        color: "#8B4513",
        emoji: "📦",
        requires: ["llave"],
        completed: false,
      },
    ],
  },

  2: {
    name: "El Coleccionista de Gemas",
    objective: "Encuentra 3 gemas ocultas dispersas por el mapa",
    playerStart: { x: 64, y: 64 },
    map: [
      "WWWWWWWWWWWWWWWWWWWWWWWWW",
      "WGGGGGGGGGGGGGGGGGGGGGGGW",
      "WGGGGGGGGGGGGGGGGGGGGGGGW",
      "WGGGGGGGGGGGWWWWWWWGWGGGW",
      "WGGGGGGGGGGGWGGGGGGGWGGGW",
      "WGGGGGGGGGGGWGGGGGGGWGGGW",
      "WGGGGGWWWWWWWGGGGGGGWGGGW",
      "WGGGGGGGGGGGWGGGGGGGWGGGW",
      "WGGGGGGGGGGGWGGGGGGGWGGGW",
      "WGGGGGGGGGGGWGGGGGGGWGGGW",
      "WGGGGGGGGGGGGGGGGGGGWGGGW",
      "WGGGWWWWWWWWWGGGGGGGWGGGW",
      "WGGGWGGGGGGGWGGGGGGGWGGGW",
      "WGGGWGGGGGGGWGGGGGGGWGGGW",
      "WGGGWGGGGWGGWGGGGGGGWGGGW",
      "WGGGWGGGGWGGWGGGGGGGWGGGW",
      "WGGGWWWWWWGGWGGGWWWWWGGGW",
      "WGGGGGGGGGGGWGGGGGGGGGGGW",
      "WWWWWWWWWWWWWWWWWWWWWWWWW",
    ],
    hiddenObjects: [
      {
        type: "gema",
        x: 672,
        y: 160,
        size: 32,
        hidden: true,
        color: "#FF69B4",
        emoji: "💎",
        found: false,
      },
      {
        type: "gema",
        x: 224,
        y: 448,
        size: 32,
        hidden: true,
        color: "#FF69B4",
        emoji: "💎",
        found: false,
      },
      {
        type: "gema",
        x: 448,
        y: 128,
        size: 32,
        hidden: true,
        color: "#FF69B4",
        emoji: "💎",
        found: false,
      },
    ],
    objectives: [
      {
        type: "portal",
        x: 768,
        y: 544,
        size: 32,
        color: "#9370DB",
        emoji: "🚪",
        requires: ["gema", "gema", "gema"],
        completed: false,
      },
    ],
  },

  3: {
    name: "El Mapa del Tesoro",
    objective:
      "Encuentra la pieza del mapa y luego localiza el tesoro enterrado",
    playerStart: { x: 64, y: 64 },
    map: [
      "WWWWWWWWWWWWWWWWWWWWWWWWW",
      "WGGGGGGWGGGWGGGGGGGWGGGGW",
      "WGGGWGGWGGGWGGGGGGGGGGGGW",
      "WGGGWGGWGGGWGGGGGGGWGGGGW",
      "WGGGWGGWGGGGGGGGGGGWGGGGW",
      "WGGGWGGWWWWWGWWWWWWWGGGGW",
      "WGGGWGGGGGGWGGGGGGGWGGGGW",
      "WGGGWWWWWWWWGGGGGGGWGGGGW",
      "WGGGGGGGGGGWGGGGGGGWGGGGW",
      "WGGGGGGGGWGWGGGGGGGWGGGGW",
      "WGGGGGGGGWGWGGGGGGGWGGGGW",
      "WGGGGGWWWWGWGGGGGGGWGGGGW",
      "WGGGGGWGGGGWGGGGGGGWGGGGW",
      "WGGGWWWGWWWWGGGGGGGWGGGGW",
      "WGGGWGGGWGGGGGGGGGGWGGGGW",
      "WGGGWGGGWGGGGGGGGGGWGGGGW",
      "WGGGWWWWWGGWWWWWWGWWGGGGW",
      "WGGGGGGGGGGWGGGGGGGWGGGGW",
      "WWWWWWWWWWWWWWWWWWWWWWWWW",
    ],
    hiddenObjects: [
      {
        type: "mapa",
        x: 672,
        y: 128,
        size: 32,
        hidden: true,
        color: "#8B4513",
        emoji: "🗺️",
        found: false,
      },
    ],
    objectives: [
      {
        type: "treasure",
        x: 160,
        y: 448,
        size: 32,
        color: "#FFD700",
        emoji: "💎",
        requires: ["mapa"],
        completed: false,
        hidden: true,
      },
    ],
  },

  4: {
    name: "El Jardín Mágico",
    objective:
      "Recolecta las 4 flores mágicas para desbloquear la puerta del jardín. ¡Derrota a los monstruos!",
    playerStart: { x: 64, y: 64 },
    map: [
      "WWWWWWWWWWWWWWWWWWWWWWWWW",
      "WGGGGGGGGGGGGGGGGGGGGGGGW",
      "WGWWWWGGGWGGGGGGGGGGGWGGW",
      "WGGGGWGGGWWWWWWWWWWWWWGGW",
      "WGGGGWGGGGGGWGGGGGGGGWGGW",
      "WGGGGWGGGGGGWGGGGGGGGWGGW",
      "WGGGGWGGGGGGWGGGGGGGGWGGW",
      "WGGGGWWWWWWWWGGGWWWWWWGGW",
      "WGGGGWGGGGGGGGGGGGGGGGGGW",
      "WGGGGWWWWWWWWGGGGGGGGGGGW",
      "WGGGGWGGGGGGGGGGGGGGGGGGW",
      "WGGGGWGGGGGGWGGGGGGGGGGGW",
      "WGGGGWGGGGGGWGGGGGGGGGGGW",
      "WGGGGWWWWWWWWWWWWWWWWWGGW",
      "WGGGGWGGGGGGWGGGGGGGGWGGW",
      "WGGGGGGGGGGGWGGWGGGGGWGGW",
      "WGGWWWWWWWWWWGGWWWWWWWGGW",
      "WGGGGGGGGGGGGGGGGGGGGGGGW",
      "WWWWWWWWWWWWWWWWWWWWWWWWW",
    ],
    hiddenObjects: [
      {
        type: "flor",
        x: 256,
        y: 160,
        size: 32,
        hidden: true,
        color: "#FF69B4",
        emoji: "🌸",
        found: false,
      },
      {
        type: "flor",
        x: 544,
        y: 160,
        size: 32,
        hidden: true,
        color: "#FF69B4",
        emoji: "🌸",
        found: false,
      },
      {
        type: "flor",
        x: 256,
        y: 448,
        size: 32,
        hidden: true,
        color: "#FF69B4",
        emoji: "🌸",
        found: false,
      },
      {
        type: "flor",
        x: 544,
        y: 448,
        size: 32,
        hidden: true,
        color: "#FF69B4",
        emoji: "🌸",
        found: false,
      },
    ],
    objectives: [
      {
        type: "gate",
        x: 768,
        y: 288,
        size: 32,
        color: "#228B22",
        emoji: "🚪",
        requires: ["flor", "flor", "flor", "flor"],
        completed: false,
      },
    ],
    monsters: [
      {
        id: 1,
        x: 320,
        y: 320,
        size: 32,
        type: "goblin",
        health: 1,
        alive: true,
        color: "#8B4513",
        emoji: "👹",
      },
      {
        id: 2,
        x: 480,
        y: 256,
        size: 32,
        type: "skeleton",
        health: 1,
        alive: true,
        color: "#C0C0C0",
        emoji: "💀",
      },
      {
        id: 3,
        x: 640,
        y: 384,
        size: 32,
        type: "orc",
        health: 1,
        alive: true,
        color: "#228B22",
        emoji: "👺",
      },
    ],
  },

  5: {
    name: "El Desafío Final",
    objective:
      "Encuentra el pergamino antiguo y la corona dorada para desbloquear el trono. ¡Derrota a todos los monstruos!",
    playerStart: { x: 64, y: 64 },
    map: [
      "WWWWWWWWWWWWWWWWWWWWWWWWW",
      "WGGGGGGWGGGGGGGGGGGGGGGGW",
      "WGGGGGGWGGGGGGGGGGGGGGGGW",
      "WGGGGGGWGGGWWWWWWWWGWGGGW",
      "WGGGGGGWGGGGGGGGGGWGWGGGW",
      "WGGGGGGWGGGGGGGGGGWGWGGGW",
      "WGGGGGGWGGGGGGGGGGWGWGGGW",
      "WGGGGGGGGGGGGGGGGGWGWGGGW",
      "WGGWWWWWWWWWGGGGGGWGWGGGW",
      "WGGWGGGGGGGWWWWWWWWGWGGGW",
      "WGGWGGGWGGGWGGGGGGWGWGGWW",
      "WGGWGGGWGGGWGWGWGGWGWGGGW",
      "WGGWGGWWWWWWWWWWGGWGGWWGW",
      "WGGWGWWGGGGGGGGWGGWGGGWGW",
      "WGGWGWGGGWGGGGGWGGWWWWWWW",
      "WGGWGWWWWWGGGGGWGGGGGGGGW",
      "WGGGGGGGGGGGGGGWWWWWWWGGW",
      "WGGGGGGGGGGGGGGGGGGGGGGGW",
      "WWWWWWWWWWWWWWWWWWWWWWWWW",
    ],
    hiddenObjects: [
      {
        type: "pergamino",
        x: 160,
        y: 160,
        size: 32,
        hidden: true,
        color: "#DEB887",
        emoji: "📜",
        found: false,
      },
      {
        type: "corona",
        x: 672,
        y: 352,
        size: 32,
        hidden: true,
        color: "#FFD700",
        emoji: "👑",
        found: false,
      },
    ],
    objectives: [
      {
        type: "throne",
        x: 416,
        y: 320,
        size: 32,
        color: "#8B4513",
        emoji: "👑",
        requires: ["pergamino", "corona"],
        completed: false,
      },
    ],
    monsters: [
      {
        id: 1,
        x: 320,
        y: 320,
        size: 32,
        type: "dragon",
        health: 2,
        alive: true,
        color: "#FF4500",
        emoji: "🐉",
      },
      {
        id: 2,
        x: 480,
        y: 256,
        size: 32,
        type: "demon",
        health: 2,
        alive: true,
        color: "#8B0000",
        emoji: "👿",
      },
      {
        id: 3,
        x: 640,
        y: 384,
        size: 32,
        type: "wizard",
        health: 1,
        alive: true,
        color: "#4B0082",
        emoji: "🧙‍♂️",
      },
      {
        id: 4,
        x: 256,
        y: 448,
        size: 32,
        type: "ghost",
        health: 1,
        alive: true,
        color: "#F0F8FF",
        emoji: "👻",
      },
    ],
  },
};

// Input handling
const keys = {};
document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});
document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// Click handling for monsters
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

  // Check if click is on a monster
  for (let monster of gameState.monsters) {
    if (monster.alive) {
      if (
        clickX >= monster.x &&
        clickX <= monster.x + monster.size &&
        clickY >= monster.y &&
        clickY <= monster.y + monster.size
      ) {
        // Check if player is near the monster (within 64 pixels)
        const playerCenterX = player.x + player.size / 2;
        const playerCenterY = player.y + player.size / 2;
        const monsterCenterX = monster.x + monster.size / 2;
        const monsterCenterY = monster.y + monster.size / 2;

        const distance = Math.sqrt(
          Math.pow(playerCenterX - monsterCenterX, 2) +
            Math.pow(playerCenterY - monsterCenterY, 2)
        );

        if (distance <= 64) {
          // Hit the monster
          monster.health--;
          if (monster.health <= 0) {
            monster.alive = false;
            statusElement.textContent = `${monster.emoji} ${monster.type} derrotado!`;
          } else {
            statusElement.textContent = `${monster.emoji} ${monster.type} golpeado! (${monster.health} PV restantes)`;
          }
        } else {
          statusElement.textContent = `¡Necesitas estar más cerca para atacar al ${monster.type}!`;
        }
        break;
      }
    }
  }
});

// Collision detection
function checkCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

function checkWallCollision(newX, newY) {
  const currentLevel = levels[gameState.currentLevel];
  const tileX = Math.floor(newX / Sprites.TILE_SIZE);
  const tileY = Math.floor(newY / Sprites.TILE_SIZE);

  // Check if out of bounds
  if (
    tileX < 0 ||
    tileY < 0 ||
    tileY >= currentLevel.map.length ||
    tileX >= currentLevel.map[0].length
  ) {
    return true;
  }

  // Check if tile is a wall
  const tile = currentLevel.map[tileY][tileX];
  return tile === "W";
}

// Check if player is near hidden objects (reveals them)
function checkNearHiddenObjects() {
  const currentLevel = levels[gameState.currentLevel];
  const playerRect = {
    x: player.x - 32,
    y: player.y - 32,
    width: player.size + 64,
    height: player.size + 64,
  };

  for (let obj of currentLevel.hiddenObjects) {
    if (!obj.found && obj.hidden) {
      const objRect = {
        x: obj.x,
        y: obj.y,
        width: obj.size,
        height: obj.size,
      };
      if (checkCollision(playerRect, objRect)) {
        obj.hidden = false;
      }
    }
  }
}

// Update game logic
function update() {
  if (gameState.gameWon || gameState.showingQuestionModal) return;

  const currentLevel = levels[gameState.currentLevel];

  // Handle player movement
  let newX = player.x;
  let newY = player.y;

  if (keys["ArrowUp"] || keys["w"]) {
    newY -= player.speed;
  }
  if (keys["ArrowDown"] || keys["s"]) {
    newY += player.speed;
  }
  if (keys["ArrowLeft"] || keys["a"]) {
    newX -= player.speed;
  }
  if (keys["ArrowRight"] || keys["d"]) {
    newX += player.speed;
  }

  // Check wall collisions
  if (!checkWallCollision(newX, newY)) {
    player.x = newX;
    player.y = newY;
  }

  // Check for hidden objects near player
  checkNearHiddenObjects();

  // Check object collection
  const playerRect = {
    x: player.x,
    y: player.y,
    width: player.size,
    height: player.size,
  };

  // Check hidden objects
  for (let obj of currentLevel.hiddenObjects) {
    if (!obj.found && !obj.hidden) {
      const objRect = {
        x: obj.x,
        y: obj.y,
        width: obj.size,
        height: obj.size,
      };

      if (checkCollision(playerRect, objRect)) {
        obj.found = true;
        gameState.collectedItems.push(obj.type);
        statusElement.textContent = `${obj.emoji} ${obj.type} recolectado!`;

        // Check if level is complete
        checkLevelComplete();
      }
    }
  }

  // Check objectives
  for (let objective of currentLevel.objectives) {
    if (!objective.completed) {
      const objRect = {
        x: objective.x,
        y: objective.y,
        width: objective.size,
        height: objective.size,
      };

      if (checkCollision(playerRect, objRect)) {
        if (canCompleteObjective(objective)) {
          objective.completed = true;
          if (objective.type === "throne") {
            gameState.gameWon = true;
            statusElement.textContent =
              "🎉 ¡Felicidades! Has completado todos los niveles y ganado el juego! 🎉";
            showGameCompletionModal();
          } else {
            nextLevel();
          }
        } else {
          const currentLevel = levels[gameState.currentLevel];
          let missingRequirements = [];

          // Check for missing hidden objects
          for (let obj of currentLevel.hiddenObjects) {
            if (!obj.found) {
              missingRequirements.push(`${obj.emoji} ${obj.type}`);
            }
          }

          // Check for alive monsters (levels 4 and 5)
          if (gameState.currentLevel >= 4 && currentLevel.monsters) {
            for (let monster of gameState.monsters) {
              if (monster.alive) {
                missingRequirements.push(`${monster.emoji} ${monster.type}`);
              }
            }
          }

          if (missingRequirements.length > 0) {
            statusElement.textContent = `Necesitas recolectar/encontrar: ${missingRequirements.join(
              ", "
            )}`;
          } else {
            statusElement.textContent = `¡Necesitas más objetos para completar este objetivo!`;
          }
        }
      }
    }
  }
}

function canCompleteObjective(objective) {
  const currentLevel = levels[gameState.currentLevel];
  const requiredItems = objective.requires;
  const collectedItems = gameState.collectedItems;

  // Check if all hidden objects have been collected
  for (let obj of currentLevel.hiddenObjects) {
    if (!obj.found) {
      return false;
    }
  }

  // Check if all monsters have been defeated (for levels 4 and 5)
  if (gameState.currentLevel >= 4 && currentLevel.monsters) {
    for (let monster of gameState.monsters) {
      if (monster.alive) {
        return false;
      }
    }
  }

  // Count how many of each required item we need
  const requiredCounts = {};
  for (let required of requiredItems) {
    requiredCounts[required] = (requiredCounts[required] || 0) + 1;
  }

  // Count how many of each item we have collected
  const collectedCounts = {};
  for (let item of collectedItems) {
    collectedCounts[item] = (collectedCounts[item] || 0) + 1;
  }

  // Check if we have enough of each required item
  for (let required in requiredCounts) {
    const requiredCount = requiredCounts[required];
    const collectedCount = collectedCounts[required] || 0;

    if (collectedCount < requiredCount) {
      return false;
    }
  }

  return true;
}

function checkLevelComplete() {
  const currentLevel = levels[gameState.currentLevel];
  const requiredItems = [];

  for (let objective of currentLevel.objectives) {
    requiredItems.push(...objective.requires);
  }

  const uniqueRequired = [...new Set(requiredItems)];
  const collectedItems = gameState.collectedItems;

  let allCollected = true;
  for (let required of uniqueRequired) {
    if (!collectedItems.includes(required)) {
      allCollected = false;
      break;
    }
  }

  if (allCollected) {
    statusElement.textContent =
      "¡Todos los objetos recolectados! Encuentra el objetivo para continuar!";
  }
}

function nextLevel() {
  // Check if there's a question for this level
  if (levelQuestions[gameState.currentLevel]) {
    showQuestionModal(gameState.currentLevel);
  } else {
    // No question for this level, proceed normally
    proceedToNextLevel();
  }
}

function proceedToNextLevel() {
  gameState.currentLevel++;
  gameState.collectedItems = [];
  gameState.levelStartTime = Date.now();

  const currentLevel = levels[gameState.currentLevel];
  player.x = currentLevel.playerStart.x;
  player.y = currentLevel.playerStart.y;

  // Initialize monsters for the new level
  initializeMonsters();

  statusElement.textContent = `Level ${gameState.currentLevel}: ${currentLevel.name} - ${currentLevel.objective}`;
}

function initializeMonsters() {
  const currentLevel = levels[gameState.currentLevel];
  gameState.monsters = [];

  if (currentLevel.monsters) {
    gameState.monsters = [...currentLevel.monsters];
  }
}

// Render game
function render() {
  const currentLevel = levels[gameState.currentLevel];

  // Clear canvas
  ctx.fillStyle = "#87CEEB";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw tile-based map
  drawMap(currentLevel.map);

  // Draw hidden objects (only if not hidden)
  for (let obj of currentLevel.hiddenObjects) {
    if (!obj.found) {
      if (!obj.hidden) {
        drawObject(obj);
      }
    }
  }

  // Draw objectives
  for (let objective of currentLevel.objectives) {
    if (!objective.completed) {
      drawObjective(objective);
    } else {
      // Draw completed objective
      ctx.fillStyle = "#228B22";
      ctx.fillRect(objective.x, objective.y, objective.size, objective.size);
      ctx.fillStyle = "#000";
      ctx.font = "20px Arial";
      ctx.fillText("✅", objective.x + 5, objective.y + 25);
    }
  }

  // Draw monsters (only for levels 4 and 5)
  if (gameState.currentLevel >= 4) {
    for (let monster of gameState.monsters) {
      if (monster.alive) {
        drawMonster(monster);
      }
    }
  }

  // Draw player
  Sprites.drawPlayer(ctx, player.x, player.y);

  // Draw UI
  drawUI();
}

function drawMap(map) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const tile = map[y][x];
      const tileX = x * Sprites.TILE_SIZE;
      const tileY = y * Sprites.TILE_SIZE;

      switch (tile) {
        case "W":
          Sprites.drawWall(ctx, tileX, tileY);
          break;
        case "G":
          Sprites.drawGrass(ctx, tileX, tileY);
          break;
        case "P":
          Sprites.drawPath(ctx, tileX, tileY);
          break;
        case "S":
          Sprites.drawWater(ctx, tileX, tileY);
          break;
        default:
          Sprites.drawGrass(ctx, tileX, tileY);
      }
    }
  }
}

function drawObject(obj) {
  switch (obj.type) {
    case "llave":
      Sprites.drawKey(ctx, obj.x, obj.y);
      break;
    case "gema":
      Sprites.drawGem(ctx, obj.x, obj.y);
      break;
    case "flor":
      Sprites.drawFlower(ctx, obj.x, obj.y);
      break;
    case "pergamino":
      Sprites.drawScroll(ctx, obj.x, obj.y);
      break;
    case "corona":
      Sprites.drawCrown(ctx, obj.x, obj.y);
      break;
    case "mapa":
      Sprites.drawScroll(ctx, obj.x, obj.y);
      break;
  }
}

function drawObjective(objective) {
  switch (objective.type) {
    case "chest":
      Sprites.drawChest(ctx, objective.x, objective.y);
      break;
    case "portal":
      Sprites.drawPortal(ctx, objective.x, objective.y);
      break;
    case "treasure":
      Sprites.drawTreasure(ctx, objective.x, objective.y);
      break;
    case "gate":
      Sprites.drawGate(ctx, objective.x, objective.y);
      break;
    case "throne":
      Sprites.drawThrone(ctx, objective.x, objective.y);
      break;
  }
}

function drawMonster(monster) {
  // Draw monster sprite based on type
  switch (monster.type) {
    case "goblin":
      Sprites.drawGoblin(ctx, monster.x, monster.y);
      break;
    case "skeleton":
      Sprites.drawSkeleton(ctx, monster.x, monster.y);
      break;
    case "orc":
      Sprites.drawOrc(ctx, monster.x, monster.y);
      break;
    case "dragon":
      Sprites.drawDragon(ctx, monster.x, monster.y);
      break;
    case "demon":
      Sprites.drawDemon(ctx, monster.x, monster.y);
      break;
    case "wizard":
      Sprites.drawWizard(ctx, monster.x, monster.y);
      break;
    case "ghost":
      Sprites.drawGhost(ctx, monster.x, monster.y);
      break;
    default:
      // Fallback drawing
      ctx.fillStyle = monster.color;
      ctx.fillRect(monster.x + 4, monster.y + 8, 24, 16);
      ctx.font = "20px Arial";
      ctx.fillStyle = "#000";
      ctx.fillText(monster.emoji, monster.x + 8, monster.y + 22);
  }

  // Draw health bar for monsters with more than 1 HP
  if (monster.health > 1) {
    const barWidth = 24;
    const barHeight = 4;
    const healthPercent = monster.health / 2; // Assuming max health is 2

    // Background
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(monster.x + 4, monster.y + 2, barWidth, barHeight);

    // Health
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(
      monster.x + 4,
      monster.y + 2,
      barWidth * healthPercent,
      barHeight
    );
  }
}

function drawUI() {
  const currentLevel = levels[gameState.currentLevel];

  // Draw level info
  ctx.fillStyle = "rgba(99, 99, 99, 0.52)";
  ctx.fillRect(10, 10, 500, 80);
  ctx.fillStyle = "white";
  ctx.font = "14px Arial";
  ctx.fillText(
    `Level ${gameState.currentLevel}/${gameState.totalLevels}`,
    15,
    25
  );
  ctx.fillText(currentLevel.name, 15, 40);
  ctx.fillText(`Objective: ${currentLevel.objective}`, 15, 55);

  // Draw collected items
  if (gameState.collectedItems.length > 0) {
    ctx.fillStyle = "rgba(99, 99, 99, 0.52)";
    ctx.fillRect(10, 100, 250, 30);
    ctx.fillStyle = "white";
    ctx.font = "12px Arial";
    ctx.fillText("Recolectado:", 15, 115);
    let itemX = 90;
    for (let item of gameState.collectedItems) {
      ctx.fillText(item, itemX, 115);
      itemX += 40;
    }
  }

  // Draw detection radius indicator
  ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(
    player.x + player.size / 2,
    player.y + player.size / 2,
    64,
    0,
    2 * Math.PI
  );
  ctx.stroke();
}

// Initialize game
function initGame() {
  const currentLevel = levels[gameState.currentLevel];
  player.x = currentLevel.playerStart.x;
  player.y = currentLevel.playerStart.y;

  // Initialize monsters for the first level
  initializeMonsters();

  statusElement.textContent = `Level ${gameState.currentLevel}: ${currentLevel.name} - ${currentLevel.objective}`;
}

// Game loop
function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

// Start the game
initGame();
gameLoop();

// Modal functions
function showGameCompletionModal() {
  const modal = document.getElementById("gameCompletionModal");
  const modalContent = modal.querySelector(".modal-content");

  // Add TikTok video to the completion modal
  const tiktokVideo =
    "https://www.tiktok.com/@redbullarabia/video/6768782491626048773?_r=1&_t=ZN-8yd70iondn4";

  const updatedHTML = `
    <h2>Tu viaje no termina aquí: El viento será tu siguiente desafío.</h2>
    <h2>Feliz Cumpleaños, Bro. Este es tu regalo:</h2>
    <div class="tiktok-video-container">
      <blockquote class="tiktok-embed" cite="${tiktokVideo}" data-video-id="${tiktokVideo
    .split("/")
    .pop()}" style="max-width: 325px; min-width: 325px;">
        <section>
          <a target="_blank" href="${tiktokVideo}"></a>
        </section>
      </blockquote>
    </div>
    
    <div class="modal-buttons">
      <button class="modal-button restart" onclick="restartGame()">
        Reiniciar Juego
      </button>
    </div>
  `;

  modalContent.innerHTML = updatedHTML;
  modal.style.display = "block";

  // Force TikTok embed script to re-initialize for the new content
  // Remove existing TikTok script if it exists
  const existingScript = document.querySelector(
    'script[src="https://www.tiktok.com/embed.js"]'
  );
  if (existingScript) {
    existingScript.remove();
  }

  // Re-add the TikTok embed script to force re-initialization
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.tiktok.com/embed.js";
  document.body.appendChild(script);
}

function closeModal() {
  const modal = document.getElementById("gameCompletionModal");
  modal.style.display = "none";
}

function showQuestionModal(level) {
  const question = levelQuestions[level];
  gameState.showingQuestionModal = true;
  gameState.currentQuestion = question;

  // Create modal HTML
  const modalHTML = `
    <div id="questionModal" class="modal">
      <div class="modal-content question-modal">
        <div class="question-header">
          <h2>${question.title}</h2>
          <div class="subtitle">${question.subtitle}</div>
        </div>
        
        <div class="question-description">
          ${question.description
            .split("\n")
            .map((line) => `<p>${line}</p>`)
            .join("")}
        </div>
        
        <div class="question-text">
          <h3>${question.question}</h3>
        </div>
        
        <div class="question-options">
          ${question.options
            .map(
              (option) => `
            <button class="option-button" data-value="${option.value}">
              ${option.text}
            </button>
          `
            )
            .join("")}
        </div>
        
        <div class="timer">
          <span id="timerText">⏳ DECIDE ANTES DE QUE LA PUERTA SE SELLE (00:${question.timeLimit
            .toString()
            .padStart(2, "0")})</span>
        </div>
        
        <div class="modal-buttons">
          <button class="modal-button restart" onclick="closeQuestionModal()">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  `;

  // Add modal to body
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Make modal visible
  const modal = document.getElementById("questionModal");
  modal.style.display = "block";

  // Start timer
  startQuestionTimer(question.timeLimit);

  // Add event listeners to option buttons
  setTimeout(() => {
    const optionButtons = document.querySelectorAll(".option-button");
    optionButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const selectedValue = button.dataset.value;
        checkAnswer(selectedValue);
      });
    });
  }, 100);
}

function startQuestionTimer(seconds) {
  let timeLeft = seconds;
  const timerText = document.getElementById("timerText");

  gameState.questionTimer = setInterval(() => {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    timerText.textContent = `⏳ DECIDE ANTES DE QUE LA PUERTA SE SELLE (${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")})`;

    if (timeLeft <= 0) {
      clearInterval(gameState.questionTimer);
      timeUp();
    }
  }, 1000);
}

function checkAnswer(selectedAnswer) {
  const question = gameState.currentQuestion;
  clearInterval(gameState.questionTimer);

  if (selectedAnswer === question.correctAnswer) {
    // Correct answer
    gameState.answeredCorrectly = true;
    showAnswerResult(true, question);
  } else {
    // Wrong answer
    gameState.answeredCorrectly = false;
    showAnswerResult(false, question);
  }
}

function timeUp() {
  const question = gameState.currentQuestion;
  gameState.answeredCorrectly = false;
  showAnswerResult(false, question, true);
}

function showAnswerResult(isCorrect, question, isTimeUp = false) {
  const modal = document.getElementById("questionModal");
  const modalContent = modal.querySelector(".modal-content");

  let resultHTML = "";

  if (isCorrect) {
    // Get TikTok video based on current level
    let tiktokVideo = "";
    switch (gameState.currentLevel) {
      case 1:
        tiktokVideo =
          "https://www.tiktok.com/@cuttingedgeai8/video/7531203276151196941?_r=1&_t=ZN-8yd6p0lReEw";
        break;
      case 2:
        tiktokVideo =
          "https://www.tiktok.com/@yoestuveai/video/7519081291615079702?_r=1&_t=ZN-8yd6wPRCaiQ";
        break;
      case 3:
        tiktokVideo =
          "https://www.tiktok.com/@sophia0806449/video/7534289276280835342?_r=1&_t=ZN-8yd6xJEpMbW";
        break;
      case 4:
        tiktokVideo =
          "https://www.tiktok.com/@alnewton17/video/7529330139927203127?_r=1&_t=ZN-8yd6ypSV3J8";
        break;
      default:
        tiktokVideo = "";
    }

    resultHTML = `
      <div class="question-header">
        <h2>✅ ¡CORRECTO!</h2>
        <div class="subtitle">${question.title}</div>
      </div>
      
      <div class="answer-result correct">
        <p>🎉 ¡Excelente! Tu respuesta es correcta.</p>
        <p><strong>Cálculo:</strong> ${question.calculation}</p>
      </div>
      
      <div class="tiktok-video-container">
        <blockquote class="tiktok-embed" cite="${tiktokVideo}" data-video-id="${tiktokVideo
      .split("/")
      .pop()}" style="max-width: 325px; min-width: 325px;">
          <section>
            <a target="_blank" href="${tiktokVideo}"></a>
          </section>
        </blockquote>
      </div>
      
      <div class="modal-buttons">
        <button class="modal-button" onclick="proceedAfterQuestion()">
          Continuar al Siguiente Nivel
        </button>
      </div>
    `;
  } else {
    resultHTML = `
      <div class="question-header">
        <h2>❌ ¡INCORRECTO!</h2>
        <div class="subtitle">${question.title}</div>
      </div>
      
      <div class="answer-result incorrect">
                 <p>${
                   isTimeUp
                     ? "⏰ ¡Se acabó el tiempo!"
                     : "💔 Respuesta incorrecta."
                 }</p>
         ${
           !isTimeUp
             ? `<p><strong>Respuesta correcta:</strong> ${
                 question.correctAnswer
               }) ${
                 question.options
                   .find((opt) => opt.value === question.correctAnswer)
                   .text.split(") ")[1]
               }</p>`
             : ""
         }
         ${
           !isTimeUp
             ? `<p><strong>Cálculo:</strong> ${question.calculation}</p>`
             : ""
         }
      </div>
      
      <div class="modal-buttons">
        <button class="modal-button restart" onclick="retryLevel()">
          Repetir Nivel
        </button>
      </div>
    `;
  }

  modalContent.innerHTML = resultHTML;

  // Force TikTok embed script to re-initialize for the new content
  if (isCorrect) {
    // Remove existing TikTok script if it exists
    const existingScript = document.querySelector(
      'script[src="https://www.tiktok.com/embed.js"]'
    );
    if (existingScript) {
      existingScript.remove();
    }

    // Re-add the TikTok embed script to force re-initialization
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.tiktok.com/embed.js";
    document.body.appendChild(script);
  }
}

function proceedAfterQuestion() {
  closeQuestionModal();
  proceedToNextLevel();
}

function retryLevel() {
  closeQuestionModal();
  // Reset the current level
  resetCurrentLevel();
}

function retryQuestion() {
  closeQuestionModal();
  // Show the same question again
  showQuestionModal(gameState.currentLevel);
}

function closeQuestionModal() {
  const modal = document.getElementById("questionModal");
  if (modal) {
    modal.remove();
  }
  clearInterval(gameState.questionTimer);
  gameState.showingQuestionModal = false;
  gameState.currentQuestion = null;

  // If modal was closed manually (not through correct answer), reset the level
  // We need to track if the modal was closed through correct answer
  if (!gameState.answeredCorrectly) {
    resetCurrentLevel();
  }
  gameState.answeredCorrectly = false;
}

function resetCurrentLevel() {
  const currentLevel = levels[gameState.currentLevel];

  // Reset collected items for current level
  gameState.collectedItems = [];

  // Reset player position to level start
  player.x = currentLevel.playerStart.x;
  player.y = currentLevel.playerStart.y;

  // Reset all hidden objects
  for (let obj of currentLevel.hiddenObjects) {
    obj.found = false;
    obj.hidden = true;
  }

  // Reset all objectives
  for (let objective of currentLevel.objectives) {
    objective.completed = false;
  }

  // Reset monsters if any
  if (currentLevel.monsters) {
    gameState.monsters = [...currentLevel.monsters];
    for (let monster of gameState.monsters) {
      monster.alive = true;
      monster.health =
        monster.type === "dragon" || monster.type === "demon" ? 2 : 1;
    }
  }

  // Update status
  statusElement.textContent = `Level ${gameState.currentLevel}: ${currentLevel.name} - ${currentLevel.objective}`;
}

function restartGame() {
  // Reset game state
  gameState.currentLevel = 1;
  gameState.gameWon = false;
  gameState.collectedItems = [];
  gameState.levelStartTime = Date.now();
  gameState.monsters = [];
  gameState.showingQuestionModal = false;
  gameState.currentQuestion = null;
  gameState.questionTimer = null;
  gameState.answeredCorrectly = false;

  // Close any open question modals
  closeQuestionModal();

  // Reset player position to level 1 start
  const currentLevel = levels[gameState.currentLevel];
  player.x = currentLevel.playerStart.x;
  player.y = currentLevel.playerStart.y;

  // Initialize monsters for level 1
  initializeMonsters();

  // Update status
  statusElement.textContent = `Level ${gameState.currentLevel}: ${currentLevel.name} - ${currentLevel.objective}`;

  // Close modal
  closeModal();
}

// Close modal when clicking outside of it
window.onclick = function (event) {
  const gameCompletionModal = document.getElementById("gameCompletionModal");
  const questionModal = document.getElementById("questionModal");

  if (event.target === gameCompletionModal) {
    closeModal();
  }

  if (event.target === questionModal) {
    closeQuestionModal();
  }
};
