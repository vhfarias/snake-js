const Snake = function(options){
    const validOptions = {
        rows: options.rows || 20,
        columns: options.columns ||20,
        size: options.size || 10,
        wrap: false
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
        body: [],
        grow: false,
        move: function(destinationIndex){
            snake.body.unshift(destinationIndex);
            if (!snake.grow){
                snake.body.pop();
            } else {
                snake.grow = false;
            }
        }
    }

    let apple = {
        index: -1,
        randomize: function(){
            const length = validOptions.columns * validOptions.rows;
            apple.index = Math.floor(Math.random() * length);
            //TODO: check if space is empty (flag + while loop?)
        }
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
            },
            getPixel: function(index){
                let [x, y] = grid.getXY(index);
                return [x * validOptions.size, y * validOptions.size];
            }
    }

    const inputHandler = function(e){
        
        console.log(e.code);
        switch (e.code){
            case "ArrowUp":
            case "KeyW":
                if(snake.facing != "down"){
                    snake.facing = "up";
                }
                break;
            case "ArrowDown":
            case "KeyS":
                if(snake.facing != "up"){
                    snake.facing = "down";
                }
                break;
            case "ArrowLeft":
            case "KeyA":
                if(snake.facing != "right"){
                    snake.facing = "left";
                }
                break;
            case "ArrowRight":
            case "KeyD":
                if(snake.facing != "left"){
                    snake.facing = "right";
                }
                break;
                
        }
    }

    const setup = function(){
        $canvas.className = "snakeCanvas";
        const $script = document.currentScript;
        const $parent = $script.parentElement || document.body;
        $canvas.width = validOptions.columns * validOptions.size;
        $canvas.height = validOptions.rows * validOptions.size;
        $parent.insertBefore($canvas, $script);
        $canvas.tabIndex = 1;
        $canvas.addEventListener("keydown", inputHandler);
    }
    const start = function(){
        //places the snake in the middle of the grid
        let startX = Math.floor(0.5 * grid.width) + (grid.width % 2);
        let startY = Math.floor(0.5 * grid.height) + (grid.height % 2);
        for(let i = 0; i < 3; i++){
            snake.body.push(grid.getIndex(startX,startY) + i * grid.width);
        }
        //place the first apple
        apple.randomize();
    }
    const stop = function(){
        console.log("game stopped");
    }
    const update = function(){
        let headIndex = snake.body[0];
        let nextIndex = -1;
        switch (snake.facing){
            case "up":
            nextIndex = headIndex - validOptions.columns;
            break;
            case "down":
            nextIndex = headIndex + validOptions.columns;
            break;
            case "left":
            nextIndex = headIndex - 1;
            break;
            case "right":
            nextIndex = headIndex + 1;
            break;
        }
        //check collisions
        if (snake.body.indexOf(nextIndex) != -1){
            console.log("game over");
            stop();
        }
        //check boundaries
        if (!validOptions.wrap){
            let [x0, y0] = grid.getXY(nextIndex);
            let [x1, y1] = grid.getXY(headIndex);
            if(Math.abs(x1 - x0) > 1 || Math.abs(y1 - y0) > 1){
                console.log("hit the wall");
                stop();
            }
        }
        //check apple
        if (nextIndex === apple.index){
            apple.randomize();
            snake.grow = true;
        }
        snake.move(nextIndex);
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
            let [x, y] = grid.getPixel(snake.body[i]);
            context.fillRect(x + 1,
                             y + 1,
                             validOptions.size - 2,
                             validOptions.size - 2);
        }
        //draw apple
        context.fillStyle = colors.apple;
        let [x, y] = grid.getPixel(apple.index);
            context.fillRect(x + 1,
                             y + 1,
                             validOptions.size - 2,
                             validOptions.size - 2);
    }
    const loop = function(){
        update();
        draw();
        console.log(snake.body);
    }
    const debug = function(){
        start();
        draw();
        console.log(snake.body);
        window.setInterval(loop,1000);
    }

    setup();
    return {
        validOptions,
        start,
        stop,
        debug,
    }
};