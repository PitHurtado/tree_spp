import { Vertex } from "./Vertex.js";

export class Square{
  constructor(ctx, w, h, size){
    this.ctx = ctx;
    this.w;
    this.h = h;
    this.size = size;
  }
  build(start = undefined, end=undefined){
    let v = undefined;
    for(let i=0; i<10; i++){
      v = new Vertex(this.ctx, 1, 10 + i*100,10,10);
      console.log(v.x);
      v.draw();
    }
    return v;
  }
}