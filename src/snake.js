const Snake = function(options){
    const validOptions = {
        rows: options.rows || 20,
        columns: options.columns ||20,
        size: options.size || 10
    }
    const colors = {
        snake: '#229922',
        apple: '#AA0000',
        background: '#111111'
    }

    const $canvas = document.createElement("canvas");
    const context = $canvas.getContext('2d');

    
    let snake = {
        facing: "up",
        body: []
    }

    let apple = {
        randomize: function(){
            const length = validOptions.columns * validOptions.rows;
            apple.index = Math.floor(Math.random() * length);
            //TODO: check if space is empty (flag + while loop?)
        },
        index: -1
    };

    let grid = {
            width: validOptions.columns,
            height: validOptions.rows,
            getIndex: function(x,y){
                if(x >= 0 && x < this.width && y >= 0 && y < this.height){
                    return y * this.width + x;
                }
                else throw new Error("Out of bounds");
            },
            getXY: function(index){
                return [index % this.width,
                        Math.floor(index / this.width)]
            }
    }

    const setup = function(){
        $canvas.className = "snakeCanvas";
        const $script = document.currentScript;
        const $parent = $script.parentElement || document.body;
        $canvas.width = validOptions.columns * validOptions.size;
        $canvas.height = validOptions.rows * validOptions.size;
        $parent.insertBefore($canvas, $script);
    }
    const start = function(){
        //places the snake in the middle of the grid
        let startX = Math.floor(0.5 * grid.width) + (grid.width % 2)
        let startY = Math.floor(0.5 * grid.height) + (grid.height % 2)
        for(let i = 0; i < 3; i++){
            snake.body.push(grid.getIndex(startX,startY) + i * grid.width);
        }
        //place the first apple
        apple.randomize();
    }
    const stop = function(){

    }
    const update = function(){

    }
    const draw = function(){
        const width = validOptions.columns * validOptions.size;
        const height = validOptions.rows * validOptions.size;
        context.save();
        //background
        context.fillStyle = colors.background;
        context.fillRect(0, 0, width, height);
        //draw snake
        context.fillStyle = colors.snake;
        for(let i = 0; i < snake.body.length; i++){
            let [x, y] = grid.getXY(snake.body[i]);
            x *= validOptions.size;
            y *= validOptions.size;
            console.log(x,y);
            context.fillRect(x + 1,
                             y + 1,
                             validOptions.size - 2,
                             validOptions.size - 2);
        }
        //draw apple
        let [x, y] = grid.getXY(apple.index);
            x *= validOptions.size;
            y *= validOptions.size;
            context.fillStyle = colors.apple;
            context.fillRect(x + 1,
                             y + 1,
                             validOptions.size - 2,
                             validOptions.size - 2);
    }
    const loop = function(){

    }
    const debug = function(){
        start();
        draw();
        console.log(snake.body);
    }

    setup();
    return {
        validOptions,
        start,
        stop,
        debug
    }
};