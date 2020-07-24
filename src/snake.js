const Snake = function(options){
    //default settings
    const settings = {
        rows: 20,
        columns: 20,
        size: 10,
        wrap: true
    }
    //applying user overrides
    for (key in settings){
        if (options.hasOwnProperty(key)){
            settings[key] = options[key];
        }
    }
    const colors = {
        snake: '#229922',
        apple: '#AA0000',
        background: '#111111'
    }
    
    const $canvas = document.createElement("canvas");
    const context = $canvas.getContext('2d');
    let loopIntervalId = undefined;
    let playerInput = "up";
    let running = false;
    
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
            //creates a set with all grid spaces
            let _grid = new Set();
            for (let i = 0; i< length; i++){
                _grid.add(i);
            }
            //creates a set with the spaces the snaeke is at
            let _snake = new Set(snake.body);
            //creates a set with the difference between sets
            let _available = new Set(_grid);
            for(let element of _snake){
                if (_available.has(element)) {
                    _available.delete(element);
                }
            }
            //transforming the set into an array to access an index
            _available = [..._available];
            let _random = Math.floor(Math.random() * _available.length);
            apple.index = _available[_random];
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
                    playerInput = "up";
                }
                break;
            case "ArrowDown":
            case "KeyS":
                if(snake.facing != "up"){
                    playerInput = "down";
                }
                break;
            case "ArrowLeft":
            case "KeyA":
                if(snake.facing != "right"){
                    playerInput = "left";
                }
                break;
            case "ArrowRight":
            case "KeyD":
                if(snake.facing != "left"){
                    playerInput = "right";
                }
                break;
        }
        if(!running) {
            start();
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
        //$canvas.focus();
        $canvas.addEventListener("keydown", inputHandler);
    }
    
    const reset = function(){
        //clear snake array if it already exists
        if (snake.body.length > 0){
            snake.body = [];
        }
        //places the snake in the middle of the grid
        let startX = Math.floor(0.5 * grid.width) + (grid.width % 2);
        let startY = Math.floor(0.5 * grid.height) + (grid.height % 2);
        for(let i = 0; i < 5; i++){
            snake.body.push(grid.getIndex(startX,startY) + i * grid.width);
        }
        //place the first apple
        apple.randomize();
        //draw everything
        draw();
    }
    
    const start = function(){
        //set the game loop
        loopIntervalId = window.setInterval(loop, 200);
        running = true;
    }
    const stop = function(){
        window.clearInterval(loopIntervalId);
        running = false;
        window.setTimeout(reset, 2000);
    }
    const update = function(){
        //get next head position, starting from its current position
        let headIndex = snake.body[0];
        let [nextX, nextY] = grid.getXY(headIndex);
        //check next direction from input
        snake.facing = playerInput;
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
        context.restore();
    }
    const loop = function(){
        update();
        draw();
    }
    const debug = function(){
        //start();
    }

    setup();
    reset();

    return {
        start,
        stop,
        debug,
    }
};