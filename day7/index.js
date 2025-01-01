import fs from "node:fs";
const testInput = './testInput.txt'
const input = './input.txt'

function parseFileContent(file){
    try {
        const data = fs.readFileSync(file, 'utf8');
        let rows = data.split('\r\n');
        let res = []
        rows.forEach(row => {
            let obj = {target: 0, numbers: []}
            let split = row.split(': ');
            obj.target = split[0];
            obj.numbers = split[1].split(' ')
            res.push(obj);
        });
        return res;
      } catch (err) {
        console.error(err);
        return null;
      }
}

function calculateLeftToRight(expression){
  const exprArr = expression.split(' ')
  let result = 0;
  for (let i = 0; i < exprArr.length - 2; i += 2) {
    let currentExpr = ''
    if(i == 0){
      currentExpr = exprArr[i] + exprArr[i+1] + exprArr[i+2];
    }else{
      currentExpr = result + exprArr[i+1] + exprArr[i+2];
    }
    result = new Function('return ' + currentExpr)()
    // console.log(`${currentExpr} = ${result}` )
  }
  return result
}

//#region GENERATIVE AI UTILIZED 
//<<<
//<<<
function evaluateExpression(numbers, index, currentExpr, results) {
  // Base case: If we've processed all numbers, evaluate the expression
  if (index === numbers.length) {
      try {
          // Evaluate the expression using the Function constructor
          const result = calculateLeftToRight(currentExpr);
          results.push(result);
      } catch (error) {
          console.error(`Error evaluating expression: ${currentExpr} -> ${error}`);
      }
      return;
  }

  // Recursive case: Add both '+' and '*' operators between the numbers
  if (index > 0) {
      evaluateExpression(numbers, index + 1, currentExpr + " + " + numbers[index], results);
      evaluateExpression(numbers, index + 1, currentExpr + " * " + numbers[index], results);
  } else {
      // For the first number, start the expression with it
      evaluateExpression(numbers, index + 1, "" + numbers[index], results);
  }
}

function allCalculations(numbers) {
  let results = [];
  evaluateExpression(numbers, 0, "", results);
  return results;
}
//>>>
//>>>
//#endregion

function part1Answer(input){
  const arr = parseFileContent(input);
  let result = 0;
  
  for (let i = 0; i < arr.length; i++) {
    const calcs = allCalculations(arr[i].numbers);
    const target = Number(arr[i].target)
    if(calcs.includes(target)){
      result += target;
    }
    console.log(calcs)
  }
  return result;
}

// console.log(calculateLeftToRight('11 + 6 * 16 + 20'))
console.log(part1Answer(input))