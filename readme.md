# Snake

A simple Snake game made from scratch using Javascript. The aim of this project is to practice programming and Git by creating something presentable. Every feedback is appreciated.

## Setup

### Step 1 - Link the game script in your `<head>` tag
```html
<script type="text/javascript" src="[yourPath]/snake.js"></script>
```
### Step 2 - Create a `<script>` tag inside the game screen parent element, between siblings if necessary.
```html
<div id="parent">
    <div id="previousSibling">/div>
    <script></script>
    <div id="nextSibling">/div>
</div>
```

### Step 3 - Inside this `<script>` tag initialize the Snake function, passing a options object as a parameter.
```html
<script>
    const options = {
        columns: 20,
        rows: 15,
        size: 10,
        wrap: true
    }
    Snake(options)
</script>
```
### This will create a `<canvas>` element before the `<script>` tag from steps 2 and 3. This is where the game will be drawn and its dimensions should be *columns* * *size* by *rows* * *size* pixels.

## Options

- _columns_: number of columns in the grid. (default 20)
- _rows_: number of rows in the grid. (default 20)
- _size_: number informing the size of the "pixel" the game draws. (default 30)
- _speed_: game update speed in millisseconds. (default 300)
- _wrap_: boolean informing wheter the snake wraps around the grid or not. (default true)

