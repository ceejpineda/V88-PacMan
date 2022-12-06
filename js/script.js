const pacman = (()=>{

    const tileSize = 32;
    const gameGrid = document.getElementById('gameGrid');
    const pac1 = new Image();
    const pac2 = new Image();
    const pac3 = new Image();
    const pac4 = new Image();
    let pacIndex = 0;

    const map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 0, 1, 2, 1],
        [1, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 1, 2, 1, 1, 0, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1, 1, 2, 1],
        [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1],
        [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 4, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1],
        [1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1],
        [1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 2, 0, 0, 2, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1],
        [1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1],
        [1, 2, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 2, 1, 1, 2, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 2, 1],
        [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
        [1, 2, 1, 2, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]

    const loop = () => {
        pacmanGet();
        drawMap();
    }


    const drawMap = () => {

        gameGrid.innerHTML = "";

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
                    const pacChar = pacmanSprite();
                    pacPos.id = 'pac';
                    pacPos.appendChild(pacChar)
                    gameGrid.appendChild(pacPos);
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

    const pacmanSprite = () =>{

        pac1.src = './assets/pac0.png'
        pac2.src = './assets/pac1.png'
        pac3.src = './assets/pac2.png'
        pac4.src = './assets/pac1.png'

        const pacArray = [pac1, pac2, pac3, pac4]
        pacIndex++;

        if(pacIndex == 4){
            pacIndex = 0;
        }

        return pacArray[pacIndex];
    }

    const movement = () =>{
        document.addEventListener('keydown', (e)=>{
            let pacPosition = pacmanGet();
            if(e.key === "ArrowRight"){
                let pac = document.getElementById('pac');
                if(map[pacPosition[1]][pacPosition[0]+1] == 1) return;
                console.log(pac)
                map[pacPosition[1]][pacPosition[0]] = 0;
                map[pacPosition[1]][pacPosition[0]+1] = 4;
                pacman.drawMap();
                pac.style.transform = "translate(0px)";

                pac.style.transform = "rotate(0deg)";

            }
            if(e.key === "ArrowLeft"){
                let pac = document.getElementById('pac');
                if(map[pacPosition[1]][pacPosition[0]-1] == 1) return;
                map[pacPosition[1]][pacPosition[0]] = 0;
                map[pacPosition[1]][pacPosition[0]-1] = 4;
                pacman.drawMap();
                pac.style.transform = "translate(0px)";

                pac.style.transform = "rotate(180deg)";              
            }
            if(e.key === "ArrowUp"){
                let pac = document.getElementById('pac');
                if(map[pacPosition[1]-1][pacPosition[0]] == 1) return;
                map[pacPosition[1]][pacPosition[0]] = 0;
                map[pacPosition[1]-1][pacPosition[0]] = 4;
                pac.style.transform = "translate(0px)";
                pac.style.transform = "rotate(-90deg)";
                pacman.drawMap();

            }
            if(e.key === "ArrowDown"){
                let pac = document.getElementById('pac');
                console.log(pac.style.transform)
                if(map[pacPosition[1]+1][pacPosition[0]] == 1) return;
                map[pacPosition[1]][pacPosition[0]] = 0;
                map[pacPosition[1]+1][pacPosition[0]] = 4;
                pacman.drawMap();
                pac.style.transform = "translate(0px)";

                pac.style.transform = "rotate(90deg)";

            }
    });
    }


    return {loop, drawMap, map, movement}

})();

pacman.drawMap();
pacman.movement();