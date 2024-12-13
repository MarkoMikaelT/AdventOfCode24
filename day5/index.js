import fs from "node:fs";
const input1 = "./input1.txt";
const input2 = "./input2.txt";

function parseFileContent(file){
    try {
        const data = fs.readFileSync(file, 'utf8');
        return data.split('\r\n') ;;
      } catch (err) {
        console.error(err);
        return null;
      }
}

const ruleReg = /\d+|\d+/g

function returnArrRules(rules){
    let arrRules = []
    rules.forEach(rule => {
        let arr = rule.match(ruleReg).map(Number);
        arrRules.push(arr)
    });
    return arrRules;
}

function returnSplitUpdates(updates){
    let result = [];
    updates.forEach(update => {
        let split = update.split(',').map(Number)
        result.push(split)
    })
    return result
}

function isCorrectOrder(update, rules){

    for (let i = 0; i < rules.length; i++) {
        const left = Number(rules[i][0]);
        const right = (rules[i][1]);

        if(update.includes(left) && update.includes(right)){
            if(update.indexOf(right) < update.indexOf(left)){
                return [];
            }
        }
    }
    return update;
}

function calcMedian(numbers){

    const mid = (numbers.length + 1) / 2;
    const isEven = numbers.length % 2 === 0;
    
    if(numbers.length % 2 === 0){

    }
    return isEven ? (numbers[mid - 1.5]
        + numbers[mid - 0.5]) / 2 :
        numbers[mid - 1];
}

function part1Answer(){
    const rules = returnArrRules(parseFileContent(input1));
    const updates = returnSplitUpdates(parseFileContent(input2))
    console.log(updates)

    let result = 0
    updates.forEach(update => {

        let correct = isCorrectOrder(update, rules)
        if(correct.length > 0){
            let median = calcMedian(correct)
            result += median;
        }
    })

    return result
}

console.log(part1Answer())
