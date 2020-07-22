const Snake = function(options){
    const validOptions = {
        rows: options.rows || 20,
        columns: options.columns ||20,
        size: options.size || 10
    }
    //init
    let $script = document.currentScript;
    let $parent = document.currentScript.parentElement || document.body;
    let $canvas = document.createElement("canvas");
    $canvas.className = "snakeCanvas";
    $canvas.width = validOptions.columns * validOptions.size;
    $canvas.height = validOptions.rows * validOptions.size;
    $parent.insertBefore($canvas, $script);

    
    let snake = {
        facing: "up",
        body: [],
    }

    let grid = {
            width: options.width,
            height: options.height,
            getIndex: function(x,y){
                if(x >= 0 && x < this.width && y >= 0 && y < this.height){
                    return y * this.width + x;
                }
                else throw new Error("Out of bounds");
            }
    }

    const setup = function(){

    }
    const start = function(){
        
    }
    const stop = function(){

    }
    const update = function(){

    }
    const draw = function(){

    }
    const loop = function(){

    }
    const debug = function(){

    }

    return {
        configs,
        start,
        stop,
        debug
    }
};