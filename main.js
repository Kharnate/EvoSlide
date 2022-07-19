const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player{
    
    constructor(){
        this.position = {
            x: canvas.width/2,
            y: canvas.height - 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.height = 50;
        this.width = 50;

    }

    draw(){
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.fillRect (this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

}

class Block{
    
    constructor(position, velocity){
        this.position = {
            x: position.x,
            y: position.y
        }
        this.velocity = {
            x: velocity.x,
            y: velocity.y
        }
        this.height = Math.random() * (100 - 50) + 50;
        this.width = Math.random() * (150 - 50) + 50;
    }

    draw(){
        ctx.save();
        ctx.fillStyle = 'red';
        ctx.fillRect (this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

}

const player = new Player();
const blocks = [];

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    space: {
        pressed: false
    },
    f: {
        pressed: false
    }
}

function movePlayer(key){
    switch(key){
        case 'w':
            keys.w.pressed = true;
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 's':
            keys.s.pressed = true;
            break;
        case 'd':
            keys.d.pressed = true;
            break;
        case ' ':
            keys.space.pressed = true;
            break;
        case "f":
            keys.f.pressed = true;
            break;
    }
}

function stopPlayer(key){
    switch(key){
        case 'w':
            keys.w.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
        case ' ':
            keys.space.pressed = false;
            break;
        case "f":
            keys.f.pressed = false;
            break;
    }
}

function spawnBlocks(){
    setInterval(() => {
       const position = {
           x: Math.random() * canvas.width,
           y: -(Math.random() * 2)
       }
       const velocity = {
           x: 0,
           y: 2
       }
        blocks.push(new Block(position, velocity));
        console.log(blocks)
    }, 1000);
}

function removeBlocks(){
    for(let i=0; i<blocks.length; i++){
        if(blocks[i].position.y >= canvas.height){
            blocks.splice(i, 1);
            console.log("removed block")
        }
    }
}

function animate(){

    requestAnimationFrame(animate);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.draw();
    player.update();
    removeBlocks();

    blocks.forEach((block) =>{
        block.draw();
        block.update();
    })

    if(keys.a.pressed && player.position.x >= 0){
        player.velocity.x = -5;
    } else if(keys.w.pressed && player.position.y >= 0){
        player.velocity.y = -5;
    }
    else if(keys.d.pressed && player.position.x + player.width <= canvas.width){
        player.velocity.x = +5;
    } 
    else if(keys.s.pressed && player.position.y + player.height <= canvas.height){
        player.velocity.y = +5;
    }
    else if(keys.space.pressed){
    } 
    else if(keys.f.pressed){
    }
    else{
        player.velocity.x = 0;
        player.velocity.y = 0;
    }
}

animate();
spawnBlocks();
addEventListener('keydown', ({key}) => {movePlayer(key);});
addEventListener('keyup', ({key}) => {stopPlayer(key);});
