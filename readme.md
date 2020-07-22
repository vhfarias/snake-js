# Snake

A simple Snake game made from scratch using Javascript.

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

### Step 3 - Inside the `<script>` tag initialize the Snake function, passing a options object as a parameter.
```html
<script>
    const options = {
        columns: 20,
        rows: 15,
        size: 10
    }
    const game = Snake(options)
</script>
```
### This will create a `<canvas>` element before the `<script>` tag from steps 2 and 3. This is where the game will be drawn and its dimensions should be *columns* * *size* by *rows* * *size* pixels.

### Step 4 - start the game using the *start* function.
```javascript
game.start()
```