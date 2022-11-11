import {Grid} from "./generatorGraph/Grid.js";
import {Square, Pcoor} from "./generatorGraph/Square.js";

// import {BFS} from "./algorithms/Bfs.js";
// import {Astart} from "./algorithms/Astart.js";
// import {DFS} from "./algorithms/Dfs.js";

// import { RecursiveDivision } from "./generateMaze/RecursiveDivision.js";


const debug         = true;
const canvas        = document.querySelector('canvas');
const c             = canvas.getContext('2d');
// buttons
const clearBtn      = document.getElementById("clear");
const playBtn       = document.getElementById("play");
const resetBtn     = document.getElementById("reset");

// size of top container - header
const cPad          = parseInt(getComputedStyle(document.querySelector("header")).height)||0; // top del container
const menuContainer = document.getElementById("menu");
canvas.width        = document.documentElement.clientWidth;
canvas.height       = document.documentElement.clientHeight-cPad;
// width of menu container
const menuContainer_width = menuContainer.offsetWidth;

if (debug) console.log("canva: ",canvas.width,canvas.height, cPad);


var allCoords     = [[]];                                 // todas las coordenadas (x,y) square
var size          = 15;                                   // tamano de los squares
var g             = new Grid(c, canvas.width, canvas.height, size);   // grid ( context, ancho, alto, tamano de squares)
var coordsStart   = g.start;                              //  coord of start node
var coordsEnd     = g.end;                                //  coord of end node
var drawing       = false;                                //  when want to draw, it's a flag
var currentState  = true;                                 //  es para nodos steps y otros, es para hacer cambios sobre este o no.
var currentStatePrincipalNodes = false;                   //  es para nodos start and end, es para hacer cambios sobre este o no.
var saveNode;                                             //  <>
var saveNodePos;                                          //  <> 
var trackX, trackY, i, j, bestPath, k;
var myHash        = {};

// modal for tutorial
const tutorial        = document.getElementById("tutorial");
const modal_container = document.getElementById("modal-container");
// button of modal for tutorial
const close           = document.getElementById("close");


function init(){
    allCoords   = g.build(coordsStart, coordsEnd);
    coordsStart = g.start;
    coordsEnd   = g.end;
}

function clearMe(){
    let n = allCoords.length;
    let m = allCoords[0].length;
    for(let i = 0; i < n; i++){
        for(let j = 0; j <m; j++){
            if(!allCoords[i][j].getIsStep() && ((i != coordsStart.i || j != coordsStart.j)&&(i != coordsEnd.i || j != coordsEnd.j))){
                allCoords[i][j].setColor("black");
                allCoords[i][j].draw();
            }
        }
    }
}

let myDraw = (x, y, currentState = true) => {
    let i = (x/size)|0;
    let j = (y/size)|0;

    if(debug) console.log("i: ", i, "; j: ", j);
    
    if(allCoords[i][j].getIsNode() && !currentStatePrincipalNodes){
      if (drawing && currentState){
        // Si presiono por primera vez
        // y el valor de mi coordenada es falso (es decir, cuadrante a pintar)
        // Entonces solo quiero pintar a lo maldito.
        allCoords[i][j].setIsStep(true);
      }else if(drawing && !currentState){
          // Si presiono por primera vez
          // y el cuadrante es true (pintado)
          // entonces, quiero borrar siempre a lo deskiziado
          allCoords[i][j].setIsStep(false);
          currentState = false;
      }else if (allCoords[i][j].getIsStep()){
          allCoords[i][j].setIsStep(false);
          currentState = false;
      }else{
          allCoords[i][j].setIsStep(true);
      }
      allCoords[i][j].setColor("black");
      allCoords[i][j].draw();
      return currentState;
    }else if(!currentStatePrincipalNodes){
      // Se que estoy seleccionando un nodo start o end
      // variable que registre que el usuario
      // esta cambiando el estado / posicion del nodo start o end
      currentStatePrincipalNodes = true;
      saveNode = allCoords[i][j]
      saveNodePos = {i, j};
      return false;
    }else{
        // Ahora estamos modificando el estado del nodo start / end
        // esta arrastrando objeto
        if(i != saveNodePos.i || j != saveNodePos.j){
            allCoords[saveNodePos.i][saveNodePos.j] = new Square(c, saveNode.x, saveNode.y, size, "black");
            if(saveNode.getIsStart()){
                allCoords[i][j] = new Pcoor(c, allCoords[i][j].x, allCoords[i][j].y, size, "red", true,1);
                coordsStart = {i, j};
            }else{
                allCoords[i][j] = new Pcoor(c, allCoords[i][j].x, allCoords[i][j].y, size, "green", false,0);
                coordsEnd = {i, j};
            }
            allCoords[saveNodePos.i][saveNodePos.j].draw();
            allCoords[i][j].draw();
            saveNodePos = {i, j};
            saveNode = allCoords[i][j]
        }
        return false;
    }
}

let mappingClient = (x, y) =>{
    if(debug) console.log("pre: ", x, y);
    y-=cPad;
    if(debug) console.log("post: ", x, y);
    return {x, y};
}
// mouse events
canvas.addEventListener("mousedown", (e) => {
    let c = mappingClient(e.clientX, e.clientY);
    currentState = myDraw(c.x, c.y);
    drawing = true;
})

canvas.addEventListener("mousemove", (e) => {
    if(drawing){
        let c = mappingClient(e.clientX, e.clientY);
        myDraw(c.x, c.y, currentState);
    }
})

canvas.addEventListener("mouseup", (e) => {
    drawing = false;
    currentStatePrincipalNodes = false;
})


// // touch event
// canvas.addEventListener("touchmove", (e) => {
//   let clientX = e.touches[0].clientX;
//   let clientY = e.touches[0].clientY;
//   drawing = true;
//   if(drawing && (clientX !== undefined || clientY !== undefined)){
//       let c = mappingClient(clientX, clientY);
//       myDraw(c.x, c.y, currentState);
//   }
// })
// // touch event
// canvas.addEventListener("touchend", (e) => {
//   drawing = false;
//   currentStatePrincipalNodes = false;
// })
// canvas.addEventListener("touchstart", (e) => {
//   if (e.clientX !== undefined || e.clientY !== undefined){
//       let c = mappingClient(e.clientX, e.clientY);
//       currentState = myDraw(c.x, c.y);
//       drawing = true;
//   }
// })


// Modal Tutorial for vp
tutorial.addEventListener("click", ()=>{
    modal_container.classList.add("show");
});
close.addEventListener("click", ()=>{
    modal_container.classList.remove("show");
});


clearBtn.addEventListener("click", (e)  =>clearMe());
playBtn.addEventListener("click", (e)   =>solve());
resetBtn.addEventListener("click", (e)  =>init());

init();