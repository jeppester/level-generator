(function (root, factory) {
  if (typeof module === 'object') {
    module.exports = factory();
  }
  else {
    root.LevelGenerator = factory();
  }
}(this, function () {
  let pickRandom = array => array[Math.floor(Math.random() * array.length)];

  return {
    createLevel: function (tilesCount) {
      const tiles = [this.createTile(0, 0)];
      tiles.tileIndex = {};

      while (tiles.length < tilesCount) {
        this.addAdjacentTile(tiles);
      }

      return tiles;
    },

    addAdjacentTile: function (tiles) {
      // Create array of adjacent tiles
      let adjacentTiles = []
      tiles.forEach((tile) => {
        this.getFreeSideTiles(tile, tiles).forEach((tile) => {
          if (!adjacentTiles.find(at => at.x === tile.x && at.y === tile.y)) {
            adjacentTiles.push(tile);
          }
        })
      })
      let newTile = pickRandom(adjacentTiles)
      tiles.push(newTile);
      tiles.tileIndex[`${newTile.x}-${newTile.y}`] = newTile;
    },

    getFreeSideTiles: function (tile, tiles) {
      let freeSideTiles = []

      let sideTiles = [
        [tile.x - 1, tile.y],
        [tile.x + 1, tile.y],
        [tile.x, tile.y - 1],
        [tile.x, tile.y + 1],
      ]

      let len = sideTiles.length
      while (len --) {
        let coords = sideTiles[len];
        if (!this.tileByPosition(coords[0], coords[1], tiles)) {
          freeSideTiles.push(this.createTile(coords[0], coords[1]))
        }
      }
      return freeSideTiles;
    },

    tileByPosition: function (x, y, tiles) {
      return tiles.tileIndex[`${x}-${y}`];
    },

    createTile: function (x, y) {
      return { x: x, y: y };
    },

    translateLevel: function (level, x, y) {
      translated = level.map((tile) => ({
        x: tile.x + x,
        y: tile.y + y,
      }));
      translated.tileIndex = this.createTileIndex(translated)
      return translated
    },

    createTileIndex: function (level) {
      let index = {}
      let length = level.length
      while (length --) {
        let tile = level[length]
        index[`${tile.x}-${tile.y}`] = tile
      }
      return index
    },

    snapLevelTopLeft: function(level) {
      minX = level.reduce((minX, tile) => Math.min(tile.x, minX), Infinity);
      minY = level.reduce((minY, tile) => Math.min(tile.y, minY), Infinity);
      return this.translateLevel(level, -minX, -minY);
    },
  };
}))
