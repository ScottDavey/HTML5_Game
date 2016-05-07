var scene;
var tileset;

var ROWS = 20;
var COLS = 40;
var SCREEN_ROWS = 15;
var SCREEN_COLS = 20;

var offRow = 0;
var offCol = 0;

var GRASS = 0;
var DIRT = 1;
var WATER = 2;
var NUMSTATES = 3;

var character;

function Character(){
    tCharacter = new Sprite(scene, "http://www.retroinvaders.net/media/platform/character.png", 20, 20);
    tCharacter.setSpeed(0);
    tCharacter.setPosition(10, 50);
          return tCharacter;

} // end character def


function Tile(){
    tTile = new Sprite(scene, "http://www.retroinvaders.net/media/tile/grass.png", 32, 32);
    tTile.setSpeed(0);
    tTile.state = GRASS;
    tTile.images = new Array("http://www.retroinvaders.net/media/tile/grass.png", "http://www.retroinvaders.net/media/tile/dirt.png", "http://www.retroinvaders.net/media/tile/water.png");
    tTile.row = 0;
    tTile.col = 0;

    tTile.setState = function(state){
        this.state = state;
        this.setImage(this.images[this.state]);
    } // end setState

    tTile.getRow = function(){
        return this.row;
    } // end getRow

    tTile.getCol = function(){
        return this.col;
    } // end getCol;

    tTile.getState = function(){
        return this.state;
    } // end getState

    return tTile;
} // end Tile constructor

function setupTiles(){
    tileset = new Array(SCREEN_ROWS);
    for (row = 0; row < SCREEN_ROWS; row++){
        tRow = new Array(SCREEN_COLS);
        for (col = 0; col < SCREEN_COLS; col++){
            tRow[col] = new Tile();
            xPos = 16 + (32 * col);
            yPos = 16 + (32 * row);
            tRow[col].setPosition(xPos, yPos);
            tRow[col].row = row;
            tRow[col].col = col;
        } // end col for loop
        tileset[row] = tRow;
    } // end row for loop;
} // end setupTiles

function showMap(){
    //displays a piece of the map sized
    //SCREEN_ROWS x SCREEN_COLS
    //offset by offRow, offCol

    for (row = 0; row < SCREEN_ROWS; row++){
        for (col = 0; col < SCREEN_COLS; col++){
            currentVal = map[row + offRow][col + offCol];
            tileset[row][col].setState(currentVal);
            tileset[row][col].update();
        } // end col for
    } // end row for
} // end showMap

function loadMap(){
    // loads a map from an array
    map = new Array(
      new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
      new Array(1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
      new Array(0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
      new Array(0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
      new Array(0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
      new Array(0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
      new Array(2,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
      new Array(2,2,2,2,2,2,0,0,0,0,1,0,0,0,0,0,2,2,2,2,2,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
      new Array(0,2,2,2,2,2,2,0,0,0,1,0,0,0,2,2,2,2,2,0,0,0,0,0,2,2,0,0,1,1,1,1,1,0,0,0,0,0,0,0),
      new Array(0,0,0,0,0,0,2,2,2,2,1,2,2,2,2,2,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,1,1,1,0,0,0,0),
      new Array(0,0,0,0,0,0,0,2,2,2,1,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,1,0,0,0),
      new Array(0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,2,2,2,1,0,0,0),
      new Array(0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,2,2,1,1,1),
      new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2),
      new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2),
      new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2),
      new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2),
      new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2),
      new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2),
      new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2)
    );
}



function checkKeys(){
    if (keysDown[K_LEFT]){
        character.changeXby(-5);
        if (offCol > 0){
            offCol--;
        }
    }

    if (keysDown[K_RIGHT]){
        character.changeXby(5);
        if (offCol < (COLS - SCREEN_COLS)){
            offCol++
        }
    }

    if (keysDown[K_UP]){
            character.changeYby(-5);
        character.setImage("http://www.retroinvaders.net/media/platform/characterUp.png");




        if (offRow > 0){
            offRow--;
        }
      }


    if (keysDown[K_DOWN]){
       character.changeYby(5);
        character.setImage("http://www.retroinvaders.net/media/platform/characterUp.png");


        if (offRow < (ROWS - SCREEN_ROWS)){
            offRow++;
            console.log(offRow);
        }
    }

  }


function init(){
    scene = new Scene();
    scene.setSize(640, 480);

    character = new Character();

    loadMap();
    setupTiles();
    showMap(0,0);
    scene.start();
} // end init

function update(){
    scene.clear();
    checkKeys();
    //checkCollisions();
    showMap();
    character.update();
} // endupdate