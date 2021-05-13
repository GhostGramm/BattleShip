// Getting common difference
function arrCommonDiff(arr) {
    var newArr = []
    for (var i = 1; i < arr.length; i++)  newArr.push(arr[i] - arr[i - 1])
    return newArr;
}

// Ship rules
function checkRule(shipType,arr){
    if(shipType === 0 || shipType === 3){
        // Destroyer
        let invalidLane = [9,29,39,49,59,69,79,89,99]
        if(invalidLane.includes(arr[0])) return false
        else return true
    }
    if(shipType === 1 || shipType === 2){
       // cruiser and submarine
       let invalidLane = [8,18,28,38,48,58,68,78,88,98,9,29,39,49,59,69,79,89,99]
       if(invalidLane.includes(arr[0])) return false
       else return true
   }

   if(shipType === 4){
       // Destroyer
       let invalidLane = [6,16,26,36,46,56,66,76,86,96,7,17,27,37,47,57,67,77,87,97,18,28,38,48,58,68,78,88,98,9,29,39,49,59,69,79,89,99]
       if(invalidLane.includes(arr[0])) return false
       else return true
   }
   }

   // Alignment type
   
   let alignmentTypes = {
    "horizontal" : 0,
    'vertical': 1,
}