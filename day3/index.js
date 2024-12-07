import fs from "node:fs"
const fileInput = "./input.txt"
const fileTest = "./testinput.txt"

const regMuls = /mul\(\d+,\d+\)/g
const regMulNums = /\d+/g

function readInput(file){
    try {
        const data = fs.readFileSync(file, 'utf8');
        return data;
      } catch (err) {
        console.error(err);
        return null;
      }
}

function regexMuls(input){
  return input.match(regMuls)
}

function calcMulResult(mul){
  let nums = mul.match(regMulNums)
  return Number(nums[0]) * Number(nums[1]);
}

function part1Answer(input){
  let ri = '';
  ri = readInput(input);
  let muls = [''];
  muls = regexMuls(ri);
  let result = 0;
  muls.forEach(mul => {
    result += calcMulResult(mul)
  })
  return result
}

console.log(part1Answer(fileInput))