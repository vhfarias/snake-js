const Snake = function(options){
    const settings = {
        rows: options.rows || 20,
        columns: options.columns || 20,
        size: options.size || 10,
        wrap: true
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
            if (snake.grow){
                snake.grow = false;
                return;
            }
            snake.body.pop();
        }
    }

    let apple = {
        index: -1,
        randomize: function(){
            const length = settings.columns * settings.rows;
            apple.index = Math.floor(Math.random() * length);
            //TODO: check if space is empty (flag + while loop?)
        }
    };

    let grid = {
            width: settings.columns,
            height: settings.rows,
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
                return [x * settings.size, y * settings.size];
            }
    }

    const inputHandler = function(e){
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
        const $script = document.currentScript;
        const $parent = $script.parentElement || document.body;
        $canvas.className = "snakeCanvas";
        $canvas.width = settings.columns * settings.size;
        $canvas.height = settings.rows * settings.size;
        $parent.insertBefore($canvas, $script);
        $canvas.tabIndex = 1;
        $canvas.focus();
        $canvas.addEventListener("keydown", inputHandler);
    }
    const start = function(){
        //places the snake in the middle of the grid
        let startX = Math.floor(0.5 * grid.width) + (grid.width % 2);
        let startY = Math.floor(0.5 * grid.height) + (grid.height % 2);
        for(let i = 0; i < 5; i++){
            snake.body.push(grid.getIndex(startX,startY) + i * grid.width);
        }
        //place the first apple
        apple.randomize();
        //set the game loop
    }
    const stop = function(){
        console.log("game stopped");
    }
    const update = function(){
        let headIndex = snake.body[0];
        let [nextX, nextY] = grid.getXY(headIndex);
        switch (snake.facing){
            case "up":
            nextY--;
            break;
            case "down":
            nextY++;
            break;
            case "left":
            nextX--;
            break;
            case "right":
            nextX++
            break;
        }
        //check boundaries
        if (!settings.wrap){
            if (nextX < 0 || nextX >= settings.columns ||
                nextY < 0 || nextY >= settings.rows){
                    console.log("hit the wall");
                    stop();
                    return;
                }
        } else {
            if (nextX >= settings.columns){
                nextX = 0;
            }
            if (nextX < 0){
                nextX = settings.columns - 1;
            }
            if (nextY >= settings.rows){
                nextY = 0;
            }
            if (nextY < 0){
                nextY = settings.rows - 1;
            }
        }
        const nextIndex = grid.getIndex(nextX, nextY);
        //check collisions
        if (snake.body.indexOf(nextIndex) != -1){
            console.log("game over");
            stop();
            return;
        }
        //check apple
        if (nextIndex === apple.index){
            apple.randomize();
            snake.grow = true;
        }
        snake.move(nextIndex);
    }
    const draw = function(){
        const width = settings.columns * settings.size;
        const height = settings.rows * settings.size;
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
                             settings.size - 2,
                             settings.size - 2);
        }
        //draw apple
        context.fillStyle = colors.apple;
        let [x, y] = grid.getPixel(apple.index);
            context.fillRect(x + 1,
                             y + 1,
                             settings.size - 2,
                             settings.size - 2);
    }
    const loop = function(){
        update();
        draw();
        console.log(snake.body);
    }
    const debug = function(){
        start();
        draw();
        window.setInterval(loop,300);
    }

    setup();
    return {
        //settings,
        start,
        stop,
        debug,
    }
};