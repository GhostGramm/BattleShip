let draggedShip
let draggedShipLength
let selectedShipNameWithIndex
const width = 10
const userSquares = []
var lastDragShipArr = []
let positionOccupied = []
const computerGrid = document.querySelector('.grid-computer')
let userGrid = document.getElementsByClassName('grid-user')
let isMouseDown
let dropCalled
let isValidParent

window.addEventListener("drop",dragDrop,0);
window.addEventListener("dragover", function(event) {
    event.preventDefault();
  });
  window.addEventListener("dragend", function(event) {
      if(!dropCalled){
        let shipNameWithLastId = draggedShip.lastChild.id
        let shipClass = shipNameWithLastId.slice(0,-2)
          let isHorizontal
        let lastShipStyle = draggedShip.attributes.style.value
        let shipType = parseInt(draggedShip.dataset.shiptype)
        let alignmentType = draggedShip.dataset.alignmenttype
        if(alignmentType === "horizontal") isHorizontal = true
        else isHorizontal = false

        UpdatePositions(positionOccupied,lastDragShipArr,shipType)
        PlaceShip(lastDragShipArr,isHorizontal,shipClass,lastShipStyle,shipType)
        draggedShip = null
      }
  });
  window.addEventListener("mousedown", function(event) {
    isMouseDown = true
    dropCalled = false
  })
  window.addEventListener("mouseup", function(event) {
    isMouseDown = false
  })

  document.addEventListener("mouseleave", function(event) {
      if(isMouseDown){
        let shipNameWithLastId = draggedShip.lastChild.id
        let shipClass = shipNameWithLastId.slice(0,-2)
        let shipType = parseInt(draggedShip.dataset.shiptype)
        lastShipStyle = draggedShip.attributes.style.value

        if(shipClass === 'destroyer' && shipIsHorizontal[shipType]){
            isHorizontal = true
        }
        if(shipClass === 'carrier' && shipIsHorizontal[shipType]){
            isHorizontal = true
        }
        if(shipClass === 'cruiser' && shipIsHorizontal[shipType]){
            isHorizontal = true
        }
        if(shipClass === 'submarine' && shipIsHorizontal[shipType]){
            isHorizontal = true
        }
        if(shipClass === 'battleship' && shipIsHorizontal[shipType]){
            isHorizontal = true
        }
        if(shipClass === 'destroyer' && !shipIsHorizontal[shipType]){
            isHorizontal = false
        }
        if(shipClass === 'carrier' && !shipIsHorizontal[shipType]){
            isHorizontal = false
        }
        if(shipClass === 'cruiser' && !shipIsHorizontal[shipType]){
            isHorizontal = false
        }
        if(shipClass === 'submarine' && !shipIsHorizontal[shipType]){
            isHorizontal = false
        }
        if(shipClass === 'battleship' && !shipIsHorizontal[shipType]){
            isHorizontal = false
        }
        RemoveShip(draggedShip)
        PlaceShip(lastDragShipArr,isHorizontal,shipClass,lastShipStyle,shipType)
        isMouseDown = false
      }
  });



const shipPivot = [
    0,
    0,
    0,
    0,
    0
];
const shipArray = [
    {
        name : 'destroyer',
        directions : [
            [0,1],
            [0,width]
        ]
    },
    {
        name : 'submarine',
        directions : [
            [0,1,2],
            [0,width,width*2],
        ]
    },
    {
        name : 'cruiser',
        directions : [
            [0,1,2],
            [0,width,width*2]
        ]
    },
    {
        name : 'battleship',
        directions : [
            [0,1,2,3],
            [0,width,width*2,width*3]
        ]
    },
    {
        name : 'carrier',
        directions : [
            [0,1,2,3,4],
            [0,width,width*2,width*3,width*4]
        ]
    },
]
let shipIsHorizontal = [
    true,
    true,
    true,
    true,
    true
];

function GetIndexOfObject(arr,param){
    for(let i = 0; i < arr.length;i++ ){
        if(arr[i].name === param) return i
    }
}

function dragDrop(e){
    let shipNameWithLastId = draggedShip.lastChild.id
    let shipClass = shipNameWithLastId.slice(0,-2)
    let shipType = parseInt(draggedShip.dataset.shiptype)
    let dataSetID = e.target.dataset.id
     isValidParent = e.target.offsetParent.classList.contains("grid-user")

    if(shipClass === 'destroyer' && shipIsHorizontal[shipType]){
        isHorizontal = true
    }
    if(shipClass === 'carrier' && shipIsHorizontal[shipType]){
        isHorizontal = true
    }
    if(shipClass === 'cruiser' && shipIsHorizontal[shipType]){
        isHorizontal = true
    }
    if(shipClass === 'submarine' && shipIsHorizontal[shipType]){
        isHorizontal = true
    }
    if(shipClass === 'battleship' && shipIsHorizontal[shipType]){
        isHorizontal = true
    }
    if(shipClass === 'destroyer' && !shipIsHorizontal[shipType]){
        isHorizontal = false
    }
    if(shipClass === 'carrier' && !shipIsHorizontal[shipType]){
        isHorizontal = false
    }
    if(shipClass === 'cruiser' && !shipIsHorizontal[shipType]){
        isHorizontal = false
    }
    if(shipClass === 'submarine' && !shipIsHorizontal[shipType]){
        isHorizontal = false
    }
    if(shipClass === 'battleship' && !shipIsHorizontal[shipType]){
        isHorizontal = false
    }

    SetupShipOnGrid(isHorizontal,shipClass,shipNameWithLastId,dataSetID,e)
    isMouseDown = false
    draggedShip = null
    dropCalled = true
}

function SetupShipOnGrid(isHorizontal,shipClass,shipNameWithLastId,dataSetID,e){
    let shipType = parseInt(draggedShip.dataset.shiptype)
    let posArr = []
    let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
    let selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))
    const notAllowedHorizontal = [0,10,20,30,40,50,60,70,80,90,1,11,21,31,41,51,61,71,81,91,2,12,22,32,42,52,62.72,82,92,3,13,23,33,43,53,63,73,83,93]
    let shipHorizontalPoint;
    let shipVerticalPoint;
    let testingVerticalPoint;
    let testingHorizontalPoint;
    let shipLastIdHorizontal = lastShipIndex + parseInt(dataSetID)
    let shipLastIdVertical = parseInt(dataSetID) - (selectedShipIndex * width)
    let newNotAllowedHorizontal = notAllowedHorizontal.splice(0,10 * lastShipIndex)
    let selectedShip = shipArray[GetIndexOfObject(shipArray,shipClass)]
    shipLastIdHorizontal = shipLastIdHorizontal -  selectedShipIndex
    lastShipStyle = draggedShip.attributes.style.value
  
      // calculating the pixel position of the ship
      shipVerticalPoint = ((shipLastIdHorizontal - (shipLastIdHorizontal % 10))/10) * 40
      shipHorizontalPoint = (((parseInt(dataSetID) % 10) - selectedShipIndex) * 40)
      testingVerticalPoint = ((((shipLastIdVertical - (shipLastIdVertical % 10)) - (selectedShipIndex * 10))/10) * 40) + (selectedShipIndex * 40)
      testingHorizontalPoint = ((((parseInt(dataSetID) % 10) - selectedShipIndex) * 40)) + (selectedShipIndex * 40)
      if(isHorizontal && !newNotAllowedHorizontal.includes(shipLastIdHorizontal)){
        lastShipStyle = draggedShip.attributes.style.value
        randomStart = parseInt(dataSetID) - selectedShipIndex
        if(!Number.isNaN(randomStart)){
            let current  = selectedShip.directions[0]
                current.forEach(function(index)
                {
                    posArr.push(randomStart + index)
                })
                if(CheckIfPositionTaken(posArr) && isValidParent){
                    let style = "top:"+shipVerticalPoint +"px; left:"+shipHorizontalPoint+"px";
                    PlaceShip(posArr,isHorizontal,shipClass,style,shipType)
                    UpdatePositions(positionOccupied,posArr,shipType)
                }else{
                    PlaceShip(lastDragShipArr,isHorizontal,shipClass,lastShipStyle,shipType)
                    UpdatePositions(positionOccupied,lastDragShipArr,shipType)
                    return
                }
        }else {
            UpdatePositions(positionOccupied,lastDragShipArr,shipType)
            PlaceShip(lastDragShipArr,isHorizontal,shipClass,lastShipStyle,shipType)
            return

        }
    }else if(!isHorizontal){
        let current  = selectedShip.directions[1]
        lastShipStyle = draggedShip.attributes.style.value
        let isLastIndexValid = true
            randomStart = parseInt(dataSetID) - selectedShipIndex * width
            current.forEach(function(index,i)
            {
                posArr.push(randomStart + index)
                if((randomStart + index) > 99) isLastIndexValid = false
            })
            if(shipLastIdVertical < 99){
                if(Number.isNaN(randomStart)){
                    UpdatePositions(positionOccupied,lastDragShipArr,shipType)
                    PlaceShip(lastDragShipArr,isHorizontal,shipClass,lastShipStyle,shipType)
                }
                    if(isLastIndexValid){
                        //Check if the new position is valid, TRUE drop ship at location
                         if(CheckIfPositionTaken(posArr) && isValidParent){
                            //Check if the ship location exist,TRUE then remove
                            let style = "top:"+testingVerticalPoint +"px; left:"+testingHorizontalPoint+"px";
                            UpdatePositions(positionOccupied,posArr,shipType)
                           PlaceShip(posArr,isHorizontal,shipClass,style,shipType)
                           return
                            }else{
                                PlaceShip(lastDragShipArr,isHorizontal,shipClass,lastShipStyle,shipType)
                                UpdatePositions(positionOccupied,lastDragShipArr,shipType)
                                return
                            }
                    }else{
                        UpdatePositions(positionOccupied,lastDragShipArr,shipType)
                        PlaceShip(lastDragShipArr,isHorizontal,shipClass,lastShipStyle,shipType)
                        return
                    } 
            }else{
                UpdatePositions(positionOccupied,lastDragShipArr,shipType)
                PlaceShip(lastDragShipArr,isHorizontal,shipClass,lastShipStyle,shipType)
                return
            } 
    }else{
        CheckAndRemovePosition(positionOccupied,shipType)
        UpdatePositions(positionOccupied,lastDragShipArr,shipType)
        PlaceShip(lastDragShipArr,isHorizontal,shipClass,lastShipStyle,shipType);
         return
    }

}
function PlaceShip(positionArr,isHorizontal,ship,style,shipType){
    let position=""
    var gridClass =  document.getElementsByClassName("grid-user")[0];

    // creating the parent ship container
    var shipElem = document.createElement('div');
    if(isHorizontal) shipElem.className = "b-ship b-ship-" +ship;
    if(!isHorizontal) shipElem.className = "b-ship b-ship-" +ship+"-vertical" ;
    shipElem.style = style;
    shipElem.setAttribute("ondragstart", "DragStart(this)")
    shipElem.setAttribute("onmousedown", "MouseDown(event)")
    shipElem.setAttribute("onclick", "rotate(this)")
    shipElem.setAttribute("draggable","true")
    shipElem.setAttribute("data-shiptype",shipType)
    if(isHorizontal) shipElem.setAttribute("data-alignmenttype","horizontal")
    else shipElem.setAttribute("data-alignmenttype","vertical")


        // creating the child indexed nodes
    for(let i = 0; i < positionArr.length; i++){
        var childElem = document.createElement('div')
        childElem.setAttribute("id",ship+"-"+i)
        shipElem.appendChild(childElem)
    }
    positionArr.forEach(function(index)
    {
        if(position == "") position = (index).toString()
        else position = (position + "-"+index).toString()
    })
    shipElem.setAttribute("data-position",position)

    let alignmentType = ""
    if(isHorizontal) alignmentType = "horizontal"
    if(!isHorizontal) alignmentType = "vertical"
    positionArr.forEach(function(index,i){
        let directionClass
        if(i === 0) directionClass = "start"
        if(i === positionArr.length - 1) directionClass = "end"
        userSquares[index].classList.add('taken',alignmentType,directionClass,ship)
        gridClass.appendChild(shipElem);
    })

}

function getOldPosition(){
    lastDragShipArr = []
    let oldPos = draggedShip.dataset.position.split("-")
    oldPos.forEach(function(index,i){
        lastDragShipArr.push(parseInt(index))
    })
}
function RemoveShip(ship){
    setTimeout(() => {
        ship.classList.add("hide")
    }, 0);
    let oldPos = ship.dataset.position.split("-")
    oldPos.forEach(function(index,i){
        let directionClass
        if(i === 0) directionClass = "start"
        if(i === oldPos.length - 1) directionClass = "end"
            userSquares[index].classList.remove("taken","horizontal","vertical",directionClass,"destroyer","submarine","cruiser","battleship","carrier")
        })
}

function CheckAndRemovePosition(arr,shipType){
    checkedAndReplaced = false
    arr.forEach(function(index,i){
        if(index.shipType == shipType){
            arr.splice(i,1)
            checkedAndReplaced = true
            return checkedAndReplaced
        }
    })
    return checkedAndReplaced
}

function UpdatePositions(arr,newPositions,shipType){
    ar = {
        "shipType": shipType,
        "position": newPositions
        }
        arr.push(ar)
}


function CheckIfPositionTaken(param){
    arr = positionOccupied
    isValid = true
     for(c = 0;c < arr.length; c++){
         for(d = 0; d < arr[c].position.length; d++){
            for(i = 0; i < param.length; i++){
                if(arr[c].position[d] == param[i]){
                    isValid = false
                    return isValid
                }
            }
         }
     }
    return isValid
}

document.addEventListener('DOMContentLoaded', () => {
    const userGrid = document.querySelector('.grid-user')
    const computerGrid = document.querySelector('.grid-computer')
    const ships = document.querySelectorAll('.b-ship')
    const infoContainer = document.querySelector(".info-container")
    const StartButton = document.querySelector('#start')
    const turnDisplay = document.querySelector('#whose-go')
    const infoDisplay = document.querySelector('#info')
    const setupButtons = document.getElementById('setup-buttons')
    const computerSquares = []
    let isGameOver = false
    let currentPlayer = 'user'

    let cpuDestroyerCount = 0
    let cpuSubmarineCount = 0
    let cpuCruiserCount = 0
    let cpuBattleshipCount = 0
    let cpuCarrierCount = 0

    let destroyerCount = 0
    let submarineCount = 0
    let cruiserCount = 0
    let battleshipCount = 0
    let carrierCount = 0


    //Create Board
    function createBoard(grid, squares) {
        for (let i = 0; i < width*width; i++) {
            const square = document.createElement('div')
            square.dataset.id = i
            grid.appendChild(square)
            squares.push(square)
        }
    }

    createBoard(userGrid, userSquares)
    createBoard(computerGrid, computerSquares)

    let shipTypes = {
        "destroyer" : 0,
        'submarine': 1,
        'cruiser': 2,
        'battleship': 3,
        'carrier': 4
    }
    let shipStartingPosition = {
        "destroyer" : 8,
        'submarine': 3,
        'cruiser': 77,
        'battleship': 30,
        'carrier': 53
    }



    //Draw the computer ships in random locations
    function generateComputerShips(ship){
        let randomDirection = Math.floor(Math.random() * ship.directions.length)
        let current = ship.directions[randomDirection]
        if(randomDirection === 0) direction = 1
        if(randomDirection === 1) direction = 10
        let randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (ship.directions[0].length * direction)))

        const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains('taken'))
        const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1)
        const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0)

        if(!isTaken && !isAtRightEdge && !isAtLeftEdge){
            current.forEach(index => computerSquares[randomStart + index].classList.add('taken', ship.name))
        }

        else generateComputerShips(ship)
    }

    generateComputerShips(shipArray[0])
    generateComputerShips(shipArray[1])
    generateComputerShips(shipArray[2])
    generateComputerShips(shipArray[3])
    generateComputerShips(shipArray[4])


    // Generating user ships
    function generateUserShips(ship){
        let posArr = []
        let randomDirection =  Math.floor(Math.random() * ship.directions.length)
        let current = ship.directions[randomDirection]
        var gridClass =  document.getElementsByClassName("grid-user")[0];

        if(randomDirection === 0) direction = 1
        if(randomDirection === 1) direction = 10

        let shipType = shipTypes[ship.name]
        let randomStart = shipStartingPosition[ship.name]

            let shipHorizontalPoint;
            let shipVerticalPoint;
            let testingVerticalPoint;
            let testingHorizontalPoint;
            shipVerticalPoint = ((randomStart - (randomStart % 10))/10) * 40
            shipHorizontalPoint = ((randomStart % 10) * 40)
            testingVerticalPoint = (((randomStart - (randomStart % 10))/10) * 40)
            testingHorizontalPoint = ((randomStart % 10)* 40)
            let position=""

            if(randomDirection === 0){
                var shipElem = document.createElement('div');
                shipElem.className = "b-ship b-ship-" +ship.name;
                shipElem.style.top = shipVerticalPoint +"px"
                shipElem.style.left = shipHorizontalPoint +"px"
                shipElem.setAttribute("ondragstart", "DragStart(this)")
                shipElem.setAttribute("onmousedown", "MouseDown(event)")
                shipElem.setAttribute("onclick", "rotate(this)")
                shipElem.setAttribute("draggable","true")
                shipElem.setAttribute("data-shiptype",shipType)
                shipElem.setAttribute("data-alignmenttype","horizontal")
                shipIsHorizontal[shipType] = !(shipElem.classList.contains("b-ship-"+ship.name+"-vertical"));

                 // Child nodes
                for(let i = 0; i < ship.directions[randomDirection].length; i++){
                    var childElem = document.createElement('div')
                    childElem.setAttribute("id",ship.name+"-"+i)
                    shipElem.appendChild(childElem)
                }
                current.forEach(function(index)
                {
                    posArr.push(randomStart + index)
                    if(position == "") position = ((randomStart + index)).toString()
                    else position = (position + "-"+(randomStart + index)).toString()
                })
                shipElem.setAttribute("data-position",position)
                    if(CheckIfPositionTaken(posArr)){
                        current.forEach(function(index,i)
                        {
                            let directionClass
                            if(i === 0) directionClass = "start"
                            if(i === current.length - 1) directionClass = "end"
                            userSquares[randomStart + index].classList.add('taken','horizontal',directionClass,ship.name)
                            posArr.push(randomStart + index)
                            gridClass.appendChild(shipElem);
                        })
                        UpdatePositions(positionOccupied,posArr,shipType)
                    }
            }
            else if(randomDirection === 1){
                var shipElem = document.createElement('div');
                shipElem.className = "b-ship b-ship-" +ship.name+"-vertical" ;
                shipElem.style.top = testingVerticalPoint +"px"
                shipElem.style.left = testingHorizontalPoint +"px"
                shipElem.setAttribute("ondragstart", "DragStart(this)")
                shipElem.setAttribute("onmousedown", "MouseDown(event)")
                shipElem.setAttribute("onclick", "rotate(this)")
                shipElem.setAttribute("draggable","true")
                shipElem.setAttribute("data-shiptype",shipType)
                shipElem.setAttribute("data-alignmenttype","vertical")
                shipIsHorizontal[shipType] = !(shipElem.classList.contains("b-ship-"+ship.name+"-vertical"));

                 // Child nodes
                for(let i = 0; i < ship.directions[randomDirection].length; i++){
                    var childElem = document.createElement('div')
                    childElem.setAttribute("id",ship.name+"-"+i)
                    shipElem.appendChild(childElem)
                }
                var gridClass =  document.getElementsByClassName("grid-user")[0];
                current.forEach(function(index)
                {
                    posArr.push(randomStart + index)
                    if(position == "") position = ((randomStart + index)).toString()
                    else position = (position + "-"+(randomStart + index)).toString()
                })
                shipElem.setAttribute("data-position",position)
                    if(CheckIfPositionTaken(posArr)){
                        current.forEach(function(index,i)
                        {
                            let directionClass
                            if(i === 0) directionClass = "start"
                            if(i === current.length - 1) directionClass = "end"
                            userSquares[randomStart + index].classList.add('taken','vertical',directionClass,ship.name)
                            posArr.push(randomStart + index)
                            gridClass.appendChild(shipElem);
                        })
                        UpdatePositions(positionOccupied,posArr,shipType)
                    }
            }else return

    }

    generateUserShips(shipArray[0])
    generateUserShips(shipArray[1])
    generateUserShips(shipArray[2])
    generateUserShips(shipArray[3])
    generateUserShips(shipArray[4])

    // Move around user grid
    userSquares.forEach(ship => ship.addEventListener('dragover',dragOver,false))
    userSquares.forEach(ship => ship.addEventListener('dragenter',dragEnter,false))
    userSquares.forEach(ship => ship.addEventListener('drop',dragOver,false))

    function dragOver(e){
            e.preventDefault()
    }
    function dragEnter(e){
        e.preventDefault()
    }

    function playGame(){
        if(isGameOver) return

        if(currentPlayer == 'user'){
            turnDisplay.innerHTML = "Your Go"
            computerSquares.forEach(square => square.addEventListener('click',function(e){
                revealSquare(square);
            }))
        }
        if(currentPlayer == 'computer'){
            turnDisplay.innerHTML = "Computers Go"
            setTimeout(ComputerGo, 1000)
        }
    }
    StartButton.addEventListener('click',()=>{
        setupButtons.style.display = 'none'
        infoContainer.style.display = 'block'
        ships.forEach(function(index){
            ships[index].setAttribute('draggable',false)
        })
        playGame()
    })

    function revealSquare(square){
        if(square.classList.contains('boom') || square.classList.contains('miss')){
            alert("you can't double pick a spot")
        }
        else{
            if(square.classList.contains('taken')){
                square.classList.add('boom')
            }
            else{
                square.classList.add('miss')
            }
            if(square.classList.contains('boom')){
                if(square.classList.contains('destroyer')) destroyerCount++
                if(square.classList.contains('submarine')) submarineCount++
                if(square.classList.contains('cruiser')) cruiserCount++
                if(square.classList.contains('battleship')) battleshipCount++
                if(square.classList.contains('carrier')) carrierCount++
                checkForWins()
            }
            currentPlayer = 'computer'
            playGame()
        }
    }

    function ComputerGo(){
        let random = Math.floor(Math.random() * userSquares.length)

        if(userSquares[random].classList.contains('taken')){
            userSquares[random].classList.add('boom')
        }
        else{
            userSquares[random].classList.add('miss')
        }
        if(userSquares[random].classList.contains('boom')){
            if(userSquares[random].classList.contains('destroyer')) cpuDestroyerCount++
            if(userSquares[random].classList.contains('submarine')) cpuSubmarineCount++
            if(userSquares[random].classList.contains('cruiser')) cpuCruiserCount++
            if(userSquares[random].classList.contains('battleship')) cpuBattleshipCount++
            if(userSquares[random].classList.contains('carrier')) cpuCarrierCount++
            checkForWins()
        }

        currentPlayer = 'user'
        turnDisplay.innerHTML = "Your Go"
    }
    function checkForWins(){
        if(destroyerCount === 2){
            infoDisplay.innerHTML = "Your sunk the computers destroyer"
            destroyerCount = 10
        }
        if(submarineCount === 3){
            infoDisplay.innerHTML = "Your sunk the computers submarine"
            submarineCount = 10
        }
        if(cruiserCount === 3){
            infoDisplay.innerHTML = "Your sunk the computers cruiser"
            cruiserCount = 10
        }
        if(battleshipCount === 4){
            infoDisplay.innerHTML = "Your sunk the computers battleship"
            battleshipCount = 10
        }
        if(carrierCount === 5){
            infoDisplay.innerHTML = "Your sunk the computers carrier"
            carrierCount = 10
        }

        if(cpuDestroyerCount === 2){
            infoDisplay.innerHTML = "computer sunk your destroyer"
            cpuDestroyerCount = 10
        }
        if(cpuSubmarineCount === 3){
            infoDisplay.innerHTML = "computer sunk your submarine"
            cpuSubmarineCount = 10
        }
        if(cpuCruiserCount === 3){
            infoDisplay.innerHTML = "computer sunk your cruiser"
            cpuCruiserCount = 10
        }
        if(cpuBattleshipCount === 4){
            infoDisplay.innerHTML = "computer sunk  your battleship"
            cpuBattleshipCount = 10
        }
        if(cpuCarrierCount === 5){
            infoDisplay.innerHTML = "computer sunk your carrier"
            cpuCarrierCount = 10
        }

        if((destroyerCount + submarineCount + cruiserCount + battleshipCount + carrierCount) === 50){
            infoDisplay.innerHTML = "You Won"
            GameOver()
        }
        if((cpuBattleshipCount + cpuCarrierCount + cpuDestroyerCount + cpuSubmarineCount + cpuCruiserCount) === 50){
            infoDisplay.innerHTML = "Computer won"
            GameOver()
        }
    }

    function GameOver(){
        isGameOver = true;
        StartButton.removeEventListener('click',playGame)
    }


})

function DragStart(e){
        draggedShip = e
        draggedShipLength = e.childNodes.length
        let shipType = parseInt(draggedShip.dataset.shiptype)
        RemoveShip(draggedShip)
        getOldPosition()
        CheckAndRemovePosition(positionOccupied,shipType)

}
function MouseDown(e){
    draggedShip = e
    selectedShipNameWithIndex = e.target.id
}

function rotate(e){
    let arr = []
    let shipType = parseInt(e.dataset.shiptype)
    let pivot = shipPivot[shipType]
    let currentShiHorizontal
    let shipNameWithLastId = e.lastChild.id
    let shipClass = shipNameWithLastId.slice(0,-2)
    let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
    let selectedShip = shipArray[GetIndexOfObject(shipArray,shipClass)]
    let position = e.dataset.position.split("-")
    const notAllowedHorizontal = [0,10,20,30,40,50,60,70,80,90,1,11,21,31,41,51,61,71,81,91,2,12,22,32,42,52,62.72,82,92,3,13,23,33,43,53,63,73,83,93]
    let newNotAllowedHorizontal = notAllowedHorizontal.splice(0,10 * lastShipIndex)
    let shipHorizontalPoint;
    let shipVerticalPoint;
    let testingVerticalPoint;
    let testingHorizontalPoint;
    let lastShipPosition = [];
    let randomStart = parseInt(position[pivot])
    let shipLastIdHorizontal = lastShipIndex + randomStart

    if(userSquares[randomStart].classList.contains("horizontal")) currentShiHorizontal = true
    if(userSquares[randomStart].classList.contains("vertical")) currentShiHorizontal = false

    if(currentShiHorizontal){
        testingVerticalPoint = (((randomStart - (randomStart % 10))/10) * 40)
        testingHorizontalPoint = ((randomStart % 10)* 40)

        let lastPosition
        let style = "top:"+testingVerticalPoint +"px; left:"+testingHorizontalPoint+"px";
        let current = selectedShip.directions[1]
        current.forEach(function(index,i)
        {
            arr.push(randomStart + index)
            if(i !== 0) lastShipPosition.push(randomStart + index)
            if(i === current.length -1) lastPosition = randomStart + index
        })
        if(randomStart < 99 && lastPosition < 99){
            isValid = CheckIfPositionTaken(lastShipPosition)
            if(isValid){
                RemoveShip(e)
                CheckAndRemovePosition(positionOccupied,shipType)
                PlaceShip(arr,!currentShiHorizontal,shipClass,style,shipType)
                UpdatePositions(positionOccupied,arr,shipType)

                shipIsHorizontal[shipType] = !shipIsHorizontal[shipType]
            }else return
       }
    }
    else if(!currentShiHorizontal  && !newNotAllowedHorizontal.includes(shipLastIdHorizontal)){
        shipVerticalPoint = ((randomStart - (randomStart % 10))/10) * 40
        shipHorizontalPoint = ((randomStart % 10) * 40)
        let style = "top:"+shipVerticalPoint +"px; left:"+shipHorizontalPoint+"px";
        let current = selectedShip.directions[0]
        current.forEach(function(index,i)
        {
            arr.push(randomStart + index)
            if(i !== 0) lastShipPosition.push(randomStart + index)
        })
            isValid = CheckIfPositionTaken(lastShipPosition)
            if(isValid){
                RemoveShip(e)
                CheckAndRemovePosition(positionOccupied,shipType)
                PlaceShip(arr,!currentShiHorizontal,shipClass,style,shipType)
                UpdatePositions(positionOccupied,arr,shipType)
                shipIsHorizontal[shipType] = !shipIsHorizontal[shipType]
            }
            draggedShip = null
                return
    }
}
