/*
* params
* x , y             coordinates
* color             to differentiate intermidiate-nodes and terminal-nodes
* closeVertex       Queue of closed node in directed graph
* radio             
* isStart, isEnd    
*/


export class Vertex{
  constructor(ctx , id, x, y, radio = 1, color = "black", closeVertex = undefined, isStart = false, isEnd = false){
      this.ctx = ctx;
      this.x = x;
      this.y =y;
      this.color = color;
      this.closeVertex = closeVertex;
      this.radio = radio;
      this.isStart = isStart;
      this.isEnd = isEnd;
  }

  // draw function
  draw(){
    this.ctx.beginPath();
    this.ctx.arc(this.x,this.y,this.radio, 2*Math.PI, false);
    this.ctx.linWidth = 2;
    if (this.isStart || this.isEnd){
      this.ctx.fillStyle = this.color;
    }else{
      this.strokeStyle = this.color;
    }
    this.ctx.fill();
    //this.ctx.strokes();
  }

  setColor = (color) => this.color = color;
  setClosedVertex = (closeVertex) => this.closeVertex = closeVertex;
  setRadio = (radio) => this.radio = radio;
  setIsStart = (isStart) => this.isStart = isStart;
  setIsEnd = (isEnd) => this.isEnd = isEnd;

  getColor = () => this.color;
  getCloseVertex = () => this.closeVertex;
  getRadio = () => this.radio;
  getIsStart = () => this.isStart;
  getIsEnd = () => this.isEnd;


}