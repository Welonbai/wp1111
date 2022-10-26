let number

function genNumber(min=0, max) {  
    number = Math.floor(
      Math.random() * (max - min + 1) + min
    )
}

function getNumber() {  
    return number
}

export {genNumber, getNumber} 