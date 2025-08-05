// Zelda-style sprite system
const Sprites = {
  // Tile sizes
  TILE_SIZE: 32,

  // Colors for Zelda-style tiles
  colors: {
    grass: "#4A7C59",
    water: "#4A90E2",
    stone: "#8B7355",
    sand: "#F4D03F",
    path: "#D2B48C",
    wall: "#6C5B7B",
    chest: "#8B4513",
    key: "#FFD700",
    gem: "#FF69B4",
    flower: "#FF69B4",
    scroll: "#DEB887",
    crown: "#FFD700",
    portal: "#9370DB",
    gate: "#228B22",
    throne: "#8B4513",
  },

  // Draw grass tile
  drawGrass(ctx, x, y) {
    ctx.fillStyle = this.colors.grass;
    ctx.fillRect(x, y, this.TILE_SIZE, this.TILE_SIZE);

    // Add grass details
    ctx.fillStyle = "#3A5F47";
    for (let i = 0; i < 3; i++) {
      const grassX = x + Math.random() * this.TILE_SIZE;
      const grassY = y + Math.random() * this.TILE_SIZE;
      ctx.fillRect(grassX, grassY, 2, 2);
    }
  },

  // Draw water tile
  drawWater(ctx, x, y) {
    ctx.fillStyle = this.colors.water;
    ctx.fillRect(x, y, this.TILE_SIZE, this.TILE_SIZE);

    // Add water ripples
    ctx.strokeStyle = "#3A7BC8";
    ctx.lineWidth = 1;
    for (let i = 0; i < 2; i++) {
      const waveX = x + Math.random() * this.TILE_SIZE;
      ctx.beginPath();
      ctx.arc(waveX, y + this.TILE_SIZE / 2, 3, 0, Math.PI);
      ctx.stroke();
    }
  },

  // Draw stone wall
  drawWall(ctx, x, y) {
    ctx.fillStyle = this.colors.wall;
    ctx.fillRect(x, y, this.TILE_SIZE, this.TILE_SIZE);

    // Add stone texture
    ctx.fillStyle = "#5A4B6B";
    for (let i = 0; i < 4; i++) {
      const stoneX = x + Math.random() * this.TILE_SIZE;
      const stoneY = y + Math.random() * this.TILE_SIZE;
      ctx.fillRect(stoneX, stoneY, 3, 3);
    }
  },

  // Draw path
  drawPath(ctx, x, y) {
    ctx.fillStyle = this.colors.path;
    ctx.fillRect(x, y, this.TILE_SIZE, this.TILE_SIZE);

    // Add path texture
    ctx.fillStyle = "#B8A089";
    for (let i = 0; i < 2; i++) {
      const pathX = x + Math.random() * this.TILE_SIZE;
      const pathY = y + Math.random() * this.TILE_SIZE;
      ctx.fillRect(pathX, pathY, 4, 2);
    }
  },

  // Draw player (Link-style)
  drawPlayer(ctx, x, y) {
    // Body
    ctx.fillStyle = "#4A90E2";
    ctx.fillRect(x + 8, y + 8, 16, 16);

    // Head
    ctx.fillStyle = "#FFE4C4";
    ctx.fillRect(x + 10, y + 4, 12, 8);

    // Hat (Link's cap)
    ctx.fillStyle = "#4A90E2";
    ctx.fillRect(x + 8, y + 2, 16, 4);

    // Eyes
    ctx.fillStyle = "#000";
    ctx.fillRect(x + 12, y + 6, 2, 2);
    ctx.fillRect(x + 18, y + 6, 2, 2);

    // Sword
    ctx.fillStyle = "#C0C0C0";
    ctx.fillRect(x + 24, y + 12, 6, 2);
    ctx.fillRect(x + 30, y + 10, 2, 6);
  },

  // Draw key
  drawKey(ctx, x, y) {
    ctx.fillStyle = this.colors.key;
    ctx.fillRect(x + 8, y + 8, 16, 16);

    // Key details
    ctx.fillStyle = "#000";
    ctx.fillRect(x + 12, y + 12, 8, 4);
    ctx.fillRect(x + 20, y + 10, 2, 8);
    ctx.fillRect(x + 22, y + 12, 4, 4);
  },

  // Draw chest
  drawChest(ctx, x, y) {
    ctx.fillStyle = this.colors.chest;
    ctx.fillRect(x + 4, y + 8, 24, 16);

    // Chest lid
    ctx.fillStyle = "#654321";
    ctx.fillRect(x + 6, y + 6, 20, 4);

    // Lock
    ctx.fillStyle = "#FFD700";
    ctx.fillRect(x + 14, y + 12, 4, 4);
  },

  // Draw gem
  drawGem(ctx, x, y) {
    ctx.fillStyle = this.colors.gem;
    ctx.fillRect(x + 8, y + 8, 16, 16);

    // Gem shine
    ctx.fillStyle = "#FFB6C1";
    ctx.fillRect(x + 10, y + 10, 4, 4);
    ctx.fillRect(x + 18, y + 18, 4, 4);
  },

  // Draw flower
  drawFlower(ctx, x, y) {
    // Stem
    ctx.fillStyle = "#228B22";
    ctx.fillRect(x + 15, y + 20, 2, 8);

    // Petals
    ctx.fillStyle = this.colors.flower;
    ctx.fillRect(x + 12, y + 12, 8, 8);
    ctx.fillRect(x + 14, y + 10, 4, 4);
    ctx.fillRect(x + 14, y + 18, 4, 4);
    ctx.fillRect(x + 10, y + 14, 4, 4);
    ctx.fillRect(x + 18, y + 14, 4, 4);

    // Center
    ctx.fillStyle = "#FFD700";
    ctx.fillRect(x + 14, y + 14, 4, 4);
  },

  // Draw scroll
  drawScroll(ctx, x, y) {
    ctx.fillStyle = this.colors.scroll;
    ctx.fillRect(x + 6, y + 8, 20, 16);

    // Scroll details
    ctx.fillStyle = "#000";
    ctx.fillRect(x + 8, y + 12, 16, 2);
    ctx.fillRect(x + 8, y + 16, 12, 2);
    ctx.fillRect(x + 8, y + 20, 14, 2);
  },

  // Draw crown
  drawCrown(ctx, x, y) {
    ctx.fillStyle = this.colors.crown;
    ctx.fillRect(x + 8, y + 12, 16, 8);

    // Crown points
    ctx.fillRect(x + 10, y + 8, 4, 4);
    ctx.fillRect(x + 18, y + 8, 4, 4);
    ctx.fillRect(x + 14, y + 6, 4, 4);

    // Jewels
    ctx.fillStyle = "#FF69B4";
    ctx.fillRect(x + 12, y + 14, 2, 2);
    ctx.fillRect(x + 18, y + 14, 2, 2);
  },

  // Draw portal
  drawPortal(ctx, x, y) {
    // Portal ring
    ctx.fillStyle = this.colors.portal;
    ctx.fillRect(x + 4, y + 4, 24, 24);

    // Inner portal
    ctx.fillStyle = "#000";
    ctx.fillRect(x + 8, y + 8, 16, 16);

    // Portal effect
    ctx.fillStyle = "#4A90E2";
    ctx.fillRect(x + 10, y + 10, 12, 12);
  },

  // Draw gate
  drawGate(ctx, x, y) {
    ctx.fillStyle = this.colors.gate;
    ctx.fillRect(x + 4, y + 4, 24, 24);

    // Gate bars
    ctx.fillStyle = "#000";
    ctx.fillRect(x + 8, y + 8, 16, 2);
    ctx.fillRect(x + 8, y + 14, 16, 2);
    ctx.fillRect(x + 8, y + 20, 16, 2);
  },

  // Draw throne
  drawThrone(ctx, x, y) {
    // Throne base
    ctx.fillStyle = this.colors.throne;
    ctx.fillRect(x + 4, y + 16, 24, 12);

    // Throne back
    ctx.fillRect(x + 8, y + 8, 16, 8);

    // Throne details
    ctx.fillStyle = "#654321";
    ctx.fillRect(x + 10, y + 10, 12, 4);
    ctx.fillRect(x + 12, y + 18, 8, 2);
  },

  // Draw treasure
  drawTreasure(ctx, x, y) {
    ctx.fillStyle = "#FFD700";
    ctx.fillRect(x + 8, y + 8, 16, 16);

    // Treasure shine
    ctx.fillStyle = "#FFF";
    ctx.fillRect(x + 10, y + 10, 4, 4);
    ctx.fillRect(x + 18, y + 18, 4, 4);
  },

  // Draw goblin monster
  drawGoblin(ctx, x, y) {
    // Body
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(x + 8, y + 12, 16, 12);

    // Head
    ctx.fillStyle = "#FFE4C4";
    ctx.fillRect(x + 10, y + 8, 12, 8);

    // Eyes
    ctx.fillStyle = "#000";
    ctx.fillRect(x + 12, y + 10, 2, 2);
    ctx.fillRect(x + 18, y + 10, 2, 2);

    // Weapon
    ctx.fillStyle = "#C0C0C0";
    ctx.fillRect(x + 20, y + 14, 6, 2);
  },

  // Draw skeleton monster
  drawSkeleton(ctx, x, y) {
    // Body
    ctx.fillStyle = "#C0C0C0";
    ctx.fillRect(x + 8, y + 12, 16, 12);

    // Head
    ctx.fillStyle = "#F5F5DC";
    ctx.fillRect(x + 10, y + 8, 12, 8);

    // Eye sockets
    ctx.fillStyle = "#000";
    ctx.fillRect(x + 12, y + 10, 2, 2);
    ctx.fillRect(x + 18, y + 10, 2, 2);

    // Bone weapon
    ctx.fillStyle = "#FFF";
    ctx.fillRect(x + 20, y + 14, 6, 2);
  },

  // Draw orc monster
  drawOrc(ctx, x, y) {
    // Body
    ctx.fillStyle = "#228B22";
    ctx.fillRect(x + 8, y + 12, 16, 12);

    // Head
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(x + 10, y + 8, 12, 8);

    // Eyes
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(x + 12, y + 10, 2, 2);
    ctx.fillRect(x + 18, y + 10, 2, 2);

    // Club
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(x + 20, y + 14, 6, 3);
  },

  // Draw dragon monster
  drawDragon(ctx, x, y) {
    // Body
    ctx.fillStyle = "#FF4500";
    ctx.fillRect(x + 6, y + 12, 20, 12);

    // Head
    ctx.fillStyle = "#8B0000";
    ctx.fillRect(x + 8, y + 8, 16, 8);

    // Eyes
    ctx.fillStyle = "#FFD700";
    ctx.fillRect(x + 10, y + 10, 2, 2);
    ctx.fillRect(x + 18, y + 10, 2, 2);

    // Wings
    ctx.fillStyle = "#FF6347";
    ctx.fillRect(x + 4, y + 6, 4, 8);
    ctx.fillRect(x + 24, y + 6, 4, 8);
  },

  // Draw demon monster
  drawDemon(ctx, x, y) {
    // Body
    ctx.fillStyle = "#8B0000";
    ctx.fillRect(x + 8, y + 12, 16, 12);

    // Head
    ctx.fillStyle = "#4B0082";
    ctx.fillRect(x + 10, y + 8, 12, 8);

    // Horns
    ctx.fillStyle = "#000";
    ctx.fillRect(x + 12, y + 6, 2, 4);
    ctx.fillRect(x + 18, y + 6, 2, 4);

    // Eyes
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(x + 12, y + 10, 2, 2);
    ctx.fillRect(x + 18, y + 10, 2, 2);
  },

  // Draw wizard monster
  drawWizard(ctx, x, y) {
    // Body
    ctx.fillStyle = "#4B0082";
    ctx.fillRect(x + 8, y + 12, 16, 12);

    // Head
    ctx.fillStyle = "#FFE4C4";
    ctx.fillRect(x + 10, y + 8, 12, 8);

    // Hat
    ctx.fillStyle = "#4B0082";
    ctx.fillRect(x + 8, y + 4, 16, 6);

    // Eyes
    ctx.fillStyle = "#000";
    ctx.fillRect(x + 12, y + 10, 2, 2);
    ctx.fillRect(x + 18, y + 10, 2, 2);

    // Staff
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(x + 20, y + 14, 6, 2);
  },

  // Draw ghost monster
  drawGhost(ctx, x, y) {
    // Body
    ctx.fillStyle = "#F0F8FF";
    ctx.fillRect(x + 8, y + 12, 16, 12);

    // Head
    ctx.fillStyle = "#E6E6FA";
    ctx.fillRect(x + 10, y + 8, 12, 8);

    // Eyes
    ctx.fillStyle = "#000";
    ctx.fillRect(x + 12, y + 10, 2, 2);
    ctx.fillRect(x + 18, y + 10, 2, 2);

    // Ghostly effect
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillRect(x + 6, y + 10, 4, 8);
    ctx.fillRect(x + 22, y + 10, 4, 8);
  },
};
