
import { input, realInput } from "./input.js";

function log(whatToLog){
    console.debug(whatToLog);
}

function parseInput(input){
    let col1 = [];
    let col2 = [];

    let res = 0;
    let s = String(input).split('\n')
    
    s.forEach(e => {
        let es = e.split('   ')
        col1.push(Number(es[0]))
        col2.push(Number(es[1]))
    });
    res = s

    col1.sort()
    col2.sort()

    return {"left": col1, "right": col2}
}

function itemDistances(a, b){
    let totalDist = 0;
    for (let i = 0; i < a.length; i++) {
        let diff = Math.abs(a[i] - b[i])
        totalDist += diff
    }
    return totalDist
}

function part1Answer(input){
    let lists = parseInput(input)
    let result = itemDistances(lists.left, lists.right)
    return result;
}

function countOccurrance(number, right){
    let count = 0;
    for (let i = 0; i < right.length; i++) {
        if(number === right[i]){
            count++
        }
    }
    return count;
}

function part2Answer(input){
    let result = 0;
    let lists = parseInput(input)
    lists.left.forEach(item => {
        result += item * countOccurrance(item, lists.right)
    });
    return result
}

log(part1Answer(realInput))
log(part2Answer(realInput))