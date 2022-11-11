import {Square, Pcoor} from "./Square.js";

export class Grid{
// c                = context 2D canvas JS     
// w                = widht grid
// h                = height grid
// size             = size of square
// maxSizeW_floor   = max range of X
// maxSizeH_floor   = max range of Y
    constructor(c, w, h, size){
        this.c = c;
        this.w = w;
        this.h = h;
        this.size = size;
        // floor -> |0 (OR bit a bit)
        this.maxSizeW_floor = (this.w/this.size)|0;
        this.maxSizeH_floor = (this.h/this.size)|0;
        let sti  = ((this.maxSizeW_floor/2)|0) - 3, stj  = ((this.maxSizeH_floor/2)|0);     // START red-square
        let endi = ((this.maxSizeW_floor/2)|0) + 3, endj = ((this.maxSizeH_floor/2)|0);     // END green-square
        // initial position
        this.start = {i:sti, j:stj};
        this.end = {i:endi, j:endj};
    }

    build(start = undefined, end = undefined){
        // if(start !== "undefined" && end !== "undefined"){
        //     this.start = start;
        //     this.end = end;
        // }
        let allCoords = [[]];                                                           // matrix - GRID
        let sq;                                                                         // auxiliar square
        for(let i = 0; i < this.maxSizeW_floor+1; i++){
            allCoords[i] = [];
            let i_x = i*this.size;  // start of square (x)
            for(let j = 0; j < this.maxSizeH_floor+1; j++){
                let j_y = j*this.size;  // start of square (y)
                if(i == this.start.i && j == this.start.j){
                    sq = new Pcoor(this.c, i_x, j_y, this.size, "red", true, 0);
                }else if(i == this.end.i && j == this.end.j){
                    sq = new Pcoor(this.c, i_x, j_y, this.size, "green", false, 1);
                }else{
                    sq = new Square(this.c, i_x, j_y, this.size);
                }
                sq.draw();
                allCoords[i][j] = sq;
            }
        }
        return allCoords;
    }
}