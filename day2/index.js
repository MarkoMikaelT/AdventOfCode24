import {testValues, inputValues } from "./inputs.js";

function log(whatToLog){
    console.debug(whatToLog);
}

function parseInput(input){
    let res = [];
    let s = String(input).split('\n')
    
    let listOfRows = [];
    s.forEach(e => {
        let es = e.split(' ')
        listOfRows.push(es)
    });

    let numListOfRows = [];
    listOfRows.forEach(list =>{
        let numList = list.map(Number)
        
        numListOfRows.push(numList)
    })
    res = numListOfRows

    return res
}

function isIncreasing(val){
    return Math.sign(val)
}

function difference(a, b){
    return a - b
}

function isBetweenOneAndThree(val){
    let value = Math.abs(val)
    if(value >= 1 && value <= 3){
        return true;
    }else{
        return false;
    }
}

function removeByIndex(list, i){
    return list.slice(0, i).concat(list.slice(i+1));
}

function isSafe(list){
    let prev = null;
    for (let i = 0; i < list.length - 1; i++) {
        let diff = difference(list[i], list[i + 1])
        let current = isIncreasing(diff);
        if(isBetweenOneAndThree(diff)){
            if(prev == current && prev != 0 || prev == null){
                prev = current;
            }else{
                return false;
            }
        }
        else{
            return false;
        } 
    }
    return true;
}

function part1Answer(input){
    let res = 0;
    let listOfRows = parseInput(input);
    
    listOfRows.forEach((list) => {
        if(isSafe(list) == true){
            res++;
        }
    })
    return res;
}

function part2Answer(input){
    let res = 0;
    let listOfRows = parseInput(input);
    
    let results = [];
    listOfRows.forEach((list) => {
        for (let i = 0; i < list.length; i++) {
            if(isSafe(removeByIndex(list, i))){
                res++;
                break;
            }
        }
    })
    return res;
}

log(part1Answer(inputValues))
log(part2Answer(inputValues))
