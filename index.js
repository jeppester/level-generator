(function (root, factory) {
  if (typeof module === 'object') {
    module.exports = factory();
  }
  else {
    root.LevelGenerator = factory();
  }
}(this, function () {
  return {
    createLevel: function (tilesCount) {
      const tiles = [this.createTile(0, 0)];

      while (tiles.length < tilesCount) {
        this.addRandomTile(tiles);
      }

      return tiles;
    },

    addRandomTile: function (tiles) {
      // Pick a random tile from the list
      const tile = this.pickTileWithFreeSides(tiles);

      // Add a new tile on one of the sides
      const position = this.pickFreeSideOfTile(tile, tiles);
      tiles.push(this.createTile(position.x, position.y));
    },

    pickTileWithFreeSides: function (tiles) {
      let tile;
      do {
        tile = tiles[Math.floor(Math.random() * tiles.length)];
      }
      while (this.getFreeSideTiles(tile, tiles).length === 0);
      return tile;
    },

    pickFreeSideOfTile: function (tile, tiles) {
      const sideTiles = this.getFreeSideTiles(tile, tiles);

      return sideTiles[Math.floor(Math.random() * sideTiles.length)];
    },

    getFreeSideTiles: function (tile, tiles) {
      return [
        this.createTile(tile.x - 1, tile.y),
        this.createTile(tile.x + 1, tile.y),
        this.createTile(tile.x, tile.y - 1),
        this.createTile(tile.x, tile.y - 1),
      ].filter((tile) => !this.tileByPosition(tile.x, tile.y, tiles))
    },

    tileByPosition: function (x, y, tiles) {
      return tiles.find(function (tile) {
        return tile.x === x && tile.y === y
      });
    },

    createTile: function (x, y) {
      return { x: x, y: y };
    },
  };
}))
