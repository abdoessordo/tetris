document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const ScoreDisplay = document.getElementById('score')
    const StartBtn = document.getElementById('start_button')
    const width = 10
    let nexRandom = 0
    let timerId
    
    //The Tetrominoes
    const l_Tetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]
    
    const z_Tetromino = [
        [width*2, width*2+1, width+1, width+2],
        [0, width, width+1, width*2+1],
        [width*2, width*2+1, width+1, width+2],
        [0, width, width+1, width*2+1]
    ]
    
    const t_Tetromino = [
        [width, width+1, 1, width+2],
        [1, width+1, width*2+1, width+2],
        [width, width+1, width*2+1, width+2],
        [1, width+1, width*2+1, width]
    ]
    
    const o_Tetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]
    const i_Tetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
      ]
    
    const TheTetrominoes = [l_Tetromino, z_Tetromino, t_Tetromino, o_Tetromino, i_Tetromino]
    
    
    let currentPosition = 4
    let currentRotation = 0
    
    //randomise the tetro
    let random = Math.floor(Math.random()*TheTetrominoes.length)
    
    let current = TheTetrominoes[random][currentRotation]
    
    //draw the tetro
    function draw(){
        current.forEach(index=>{
            squares[currentPosition + index].classList.add('tetromino')
        })
    }
    
    //undraw the Tetro
    function undraw(){
        current.forEach(index=>{
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }
    
    //make the tetro move down
    // timerId = setInterval(moveDown, 1000)
    
    //assign function to keycodes
    function control(e) {
        if(e.keyCode === 37) {
          moveLeft()
        } else if (e.keyCode === 82) {
          rotate()
        } else if (e.keyCode === 39) {
          moveRight()   
        } else if (e.keyCode === 40) {
          moveDown()
        }
      }
      document.addEventListener('keyup', control)

    //move down function
    function moveDown(){
        undraw()
        currentPosition += width
        draw()
        freeze()
    }
    
    //freeze function
    function freeze(){
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            //start a new tetro falling
            random = nexRandom
            nexRandom = Math.floor(Math.random()*TheTetrominoes.length)
            current = TheTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
        }
    }
    

    //movving the tetro

    function moveLeft(){
        undraw()
        const isleftedge = current.some(index => (currentPosition + index) % width === 0)
        if(!isleftedge) currentPosition -=1
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition +=1
        }
        draw()
    }

    function moveRight(){
        undraw()
        const isRightedge = current.some(index => (currentPosition + index) % width === width -1)
        if(!isRightedge) currentPosition +=1
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition -=1
        }
        draw()
    }

    //rotate 
    function rotate(){
        undraw()
        currentRotation ++
        currentRotation = currentRotation%4
        current = TheTetrominoes[random][currentRotation]
        draw()
    }

    // Show up-net tetro
    const displaysquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 5
    let displayIndex = 0

    //display the actual tettro
    const upNextTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1,2],
        [0, displayWidth, displayWidth+1, displayWidth*2+1],
        [1, displayWidth, displayWidth+1, displayWidth+2],
        [0, 1, displayWidth, displayWidth+1],
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1]
    ]

    function displayShape(){
        //remove all the tetrominoes from the main grid
        displaysquares.forEach(square =>{
            square  .classList.remove('tetromino')
        })
        upNextTetrominoes[nexRandom].forEach(index =>{
            displaysquares[displayWidth+1 + displayIndex + index].classList.add('tetromino')
        })
    }

    StartBtn.addEventListener('click', ()=>{
        if (timerId) {
            clearInterval(timerId)
            timerId = null   
        }else{
            draw()
            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random()*TheTetrominoes.length)
            displayShape()
        }
    })




})