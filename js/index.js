import { Square } from "./generatorGraph/Square.js";
import { Vertex } from "./generatorGraph/Vertex.js";

const DEBUG = true;

const canvas = document.querySelector('canvas');
console.log(canvas)
const ctx = canvas.getContext('2d');
const playBtn = document.getElementById("play");

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

console.log(canvas.width, canvas.height);

let g = new Square(ctx, canvas.width, canvas.height, 20);


function init(){
  let allVertex = g.build();
}
init();