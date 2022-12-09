const pacman = (()=>{

    const tileSize = 32;
    const gameGrid = document.getElementById('gameGrid');
    const ghost1 = new Image();
    const ghost2 = new Image();
    const ghost3 = new Image();
    let pacIndex = 0;
    let direction = "right"
    ghost2.src = './assets/ghost.png'
    ghost3.src = './assets/ghost.png'
    let rand = 0;
    let posEl = [];
    

    const map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 5, 1, 2, 1],
        [1, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 1, 2, 1, 1, 0, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1, 1, 2, 1],
        [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1],
        [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 4, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1],
        [1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1],
        [1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 2, 0, 0, 2, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1],
        [1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1],
        [1, 2, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 2, 1, 1, 2, 1, 1, 0, 1, 0, 1, 0, 1, 1, 5, 1, 2, 1],
        [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
        [1, 2, 1, 2, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]

    const loop = () => {
        pacmanGet();
        drawMap();
    }


    const drawMap = async() => {

        while(gameGrid.firstChild){
            gameGrid.removeChild(gameGrid.firstChild);
        }

        for(let row=0; row < map.length; row++){
            for(let column=0; column < map[row].length; column++){
                let tile = map[row][column];
                if(tile === 1){
                  const wall = document.createElement('div');
                  wall.classList.add('wall');
                  gameGrid.appendChild(wall);
                }else if(tile === 0){
                    const blank = document.createElement('div');
                    blank.classList.add('blank');
                    gameGrid.appendChild(blank);
                }else if(tile === 2){
                    const dot = document.createElement('div');
                    dot.classList.add('dot');
                    gameGrid.appendChild(dot);
                }else if(tile === 4){
                    const pacPos = document.createElement('div');
                    const pacChar = document.createElement('img');
                    pacChar.id = 'pac';
                    pacChar.src = './assets/pacman.gif'
                    pacPos.appendChild(pacChar)
                    gameGrid.appendChild(pacPos);
                }else if(tile === 5){
                    const ghostPos = document.createElement('div');
                    const ghostChar = new Image();
                    ghostChar.src = './assets/ghost.png'
                    ghostPos.appendChild(ghostChar);
                    gameGrid.appendChild(ghostPos)
                }
            }
        }
    };

    const pacmanGet = () =>{

        for(let row=0; row < map.length; row++){
            for(let column=0; column < map[row].length; column++){
                let tile = map[row][column];
                if(tile == 4){
                    return [column, row];
                }
            }
        }
    }

    const random = () =>{
        let rand =  Math.floor(Math.random()*4);
        return rand;
    }

    const ghostMovement = () =>{
        for(let row=0; row < map.length; row++){
            for(let column=0; column < map[row].length; column++){
                let tile = map[row][column];
                if(tile == 5){
                    if(posEl.length >= 4) return;
                    posEl.push([column, row]);
                }
            }
        }

        posEl.forEach(pos => {
            rand = random();
            if(rand == 0){
                if(map[pos[1]][pos[0]-1] == 1){
                    rand = random();
                    return;
                }else if(map[pos[1]][pos[0]-1] == 5){
                    rand = random();
                    return;
                }
                else{
                    map[pos[1]][pos[0]] = 0;
                    map[pos[1]][pos[0]-1] = 5;
                };
                return;
            }else if(rand == 1){
                if(map[pos[1]+1][pos[0]] == 1){
                    rand = random();
                    return;
                }else if(map[pos[1]+1][pos[0]] == 5){
                    rand = random();
                    return;
                }else{
                    map[pos[1]][pos[0]] = 0;
                    map[pos[1]+1][pos[0]] = 5;
                };
                return;
            }else if(rand == 2){
                if(map[pos[1]][pos[0]+1] == 1 ){
                    rand = random();
                    return;
                }else if(map[pos[1]][pos[0]+1] == 5){
                    rand = random();
                    return;
                }
                else{
                    map[pos[1]][pos[0]] = 0;
                    map[pos[1]][pos[0]+1] = 5;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
                };
            }else if(rand == 3){
                if(map[pos[1]-1][pos[0]] == 1){
                    rand = random();
                    return;
                }else if(map[pos[1]-1][pos[0]] == 5){
                    rand = random();
                    return;
                }
                else{
                    map[pos[1]][pos[0]] = 0;
                    map[pos[1]-1][pos[0]] = 5;
                };
            }
        });
        while(posEl.length){
            posEl.shift();
        }
}

    const movement = () =>{

        let pacPosition = pacmanGet();
        let moveDirection;

        document.addEventListener('keydown', (e)=>{      
              
            pacPosition = pacmanGet();    
            e.preventDefault();


            if(e.key === "ArrowRight"){
                direction = 'right'
                clearInterval(moveDirection);
                moveDirection = setInterval(moveRight, 1000/8);
            }
            if(e.key === "ArrowLeft"){
                direction = 'left'
                clearInterval(moveDirection);
                moveDirection = setInterval(moveLeft, 1000/8);
            }
            if(e.key === "ArrowUp"){
                direction = 'up'
                clearInterval(moveDirection);
                moveDirection = setInterval(moveUp, 1000/8);
            }
            if(e.key === "ArrowDown"){
                direction = 'down'
                clearInterval(moveDirection);
                moveDirection = setInterval(moveDown, 1000/8);
            }
        });
    }

    const moveLeft = () =>{
        let pacPosition = pacmanGet();
        if(map[pacPosition[1]][pacPosition[0]-1] == 1)return;
        map[pacPosition[1]][pacPosition[0]] = 0;
        map[pacPosition[1]][pacPosition[0]-1] = 4;
        //pacman.drawMap();
    }

    const moveRight = () =>{
        let pacPosition = pacmanGet();
        if(map[pacPosition[1]][pacPosition[0]+1] == 1) return;
        map[pacPosition[1]][pacPosition[0]] = 0;
        map[pacPosition[1]][pacPosition[0]+1] = 4;
        //pacman.drawMap();
    }

    const moveUp = () =>{
        let pacPosition = pacmanGet();
        if(map[pacPosition[1]-1][pacPosition[0]] == 1) return;
        map[pacPosition[1]][pacPosition[0]] = 0;
        map[pacPosition[1]-1][pacPosition[0]] = 4;
        //pacman.drawMap();
    }
    const moveDown = () =>{
        let pacPosition = pacmanGet();
        if(map[pacPosition[1]+1][pacPosition[0]] == 1) return;
        map[pacPosition[1]][pacPosition[0]] = 0;
        map[pacPosition[1]+1][pacPosition[0]] = 4;
        //pacman.drawMap();
    }
    const animation = () =>{
        const pac = document.getElementById('pac');
        let dir = direction;
        if(dir == 'right'){
            pac.style.transform = 'rotate(0deg)';
        }else if(dir == 'left'){
            pac.style.transform = 'rotate(180deg)';
        }else if(dir == 'up'){
            pac.style.transform = 'rotate(-90deg)';
        }else if(dir == 'down'){
            pac.style.transform = 'rotate(90deg)';
        }
    }


    return {loop, drawMap, map, movement, animation, ghostMovement, posEl}

})();

setInterval(pacman.drawMap, 200);
pacman.movement();
setInterval(pacman.animation, 1000/20);
setInterval(pacman.ghostMovement, 300);
