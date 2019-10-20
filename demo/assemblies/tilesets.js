export default [
  {
    "name": "characterTileset",
    "immediate": true,
    "components": [
      {
        "name": "TileSet",
        "init": {
          "name": "characterTileset",
          "imagePath": "static/assets/characters.png",
          "square": 16,
          "offset": 1
        }
      }
    ]
  },
  {
    "name": "worldTileset",
    "immediate": true,
    "components": [
      {
        "name": "TileSet",
        "init": {
          "name": "worldTileset",
          "imagePath": "static/assets/tileset.png",
          "square": 16,
          "offset": 1
        }
      }
    ]
  }
]
