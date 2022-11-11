export class Square{
    // c                    =   context canvas
    // x                    =   location X (weight)
    // y                    =   location Y (height)
    // color                =   color of square'line
    // l                    =   size of square
    // cost                 =   
    // isStep           =   true if it's a step-node, false otherwise   
    // isNode               =   true if it's a node, false otherwise

    constructor(c, x, y, l, color = "black", isStep = false, isNode=true, cost=1){
        this.c      = c;
        this.x      = x;
        this.y      = y;
        this.l      = l;
        this.cost   = cost;
        this.color  = color;
        this.isStep = isStep;
        this.isNode = isNode;
    }
    draw(){
        this.c.clearRect(this.x, this.y, this.l, this.l);
        this.c.beginPath();
        if (this.isStep){
            this.c.fillStyle = this.color;
            this.c.fillRect(this.x, this.y, this.l, this.l);
        }else{
            this.c.strokeStyle = this.color;
            this.c.strokeRect(this.x, this.y, this.l, this.l);
        }
        this.c.fill();
    }
    setIsStep   = (isStep) => this.isStep = isStep;
    setColor    = (color) => this.color = color;
    setIsNode   = (isNode) => this.isNode = isNode;

    getIsStep   = () => this.isStep;
    getColor    = () => this.color;
    getIsNode   = () => this.isNode;
}

export class Pcoor extends Square{
    // start        = 1 if it's start node, 0 otherwise
    constructor(c, x, y, l, color, start, cost){
        super(c, x, y, l, color, false, false, cost);
        this.l      = l;
        this.x      = x;
        this.y      = y;
        this.start  = start;
        this.color  = color;
        this.c      = c;
    }
    getIsStart(){
        return this.start;
    }
    draw(){
        this.c.clearRect(this.x, this.y, this.l, this.l);
        this.c.beginPath();
        this.c.fillStyle = this.color;
        this.c.fillRect(this.x, this.y, this.l, this.l);
        this.c.fill();
    }
}