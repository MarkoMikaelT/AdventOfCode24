import fs from "node:fs";
const fileInput = "./input.txt";
const fileTest = "./inputTest.txt";

const testWidth = 10;
const xmas = /xmas/gi;
const samx = /samx/gi;

function readInput(file){
    try {
        const data = fs.readFileSync(file, 'utf8');
        return data;
      } catch (err) {
        console.error(err);
        return null;
      }
}

function splitIntoRowsOfCharacters(val){
    let rows = val.split('\r\n') ;
    let splitStrings = [];
    rows.forEach(row => splitStrings.push(row.split('')));
    return splitStrings;
}

function horizontal(grid){
  let count = 0;
  for(let row = 0; row < grid[0].length; row++){
    let xmasStr = grid[row].join(''); 
    count += (xmasStr.match(xmas) || []).length;
    count += (xmasStr.match(samx) || []).length;
    console.log(xmasStr + '-')
  }
  return count;
}

function vertical(grid){
  let count = 0;
  for(let x = 0; x < grid[0].length; x++){
    let xmasStr = '';
    for(let y = 0; y < grid.length; y++) {
      xmasStr = xmasStr.concat(grid[y][x]); 
    }
    console.log(xmasStr + '-')
    count += (xmasStr.match(xmas) || []).length;
    count += (xmasStr.match(samx) || []).length;
  }
  return count;
}

function diagonalDownLeftToUpRight(grid){
  let count = 0;
  let gridHeight = grid.length;
  let gridWidth = grid[0].length;
  for(let x = 1 - gridHeight; x < gridWidth; x++){
    let xmasStr = '';
    for(let y = 0; y < gridHeight; y++) {
      if ((x + y) >= 0 && (x + y) < gridWidth) {
        xmasStr = xmasStr.concat(grid[y][x + y]); 
      }
    }
    console.log(xmasStr + '-')
    count += (xmasStr.match(xmas) || []).length;
    count += (xmasStr.match(samx) || []).length;
  }
  return count;
}

function diagonalUpRightToDownLeft(grid){
  let count = 0;
  let gridHeight = grid.length;
  let gridWidth = grid[0].length;
  for(let x = 0; x < gridWidth + gridHeight - 1; x++){
    let xmasStr = '';
    for(let y = 0; y < gridHeight; y++) {
      if ((x - y) >= 0 && (x - y) < gridWidth) {
        xmasStr = xmasStr.concat(grid[y][x - y]); 
      }
    }
    console.log(xmasStr + '-')
    count += (xmasStr.match(xmas) || []).length;
    count += (xmasStr.match(samx) || []).length;
  }
  return count;
}
const testArr = [
  ['X','X','X','X','X','X'],
  ['M','M','M','M','A','A'],
  ['A','A','A','A','M','M'],
  ['S','S','S','S','X','X']]

function day1Answer(file){
  const arrOfCharRows = splitIntoRowsOfCharacters(readInput(file));
  let result = 0;
  result += horizontal(arrOfCharRows)
  result += vertical(arrOfCharRows)
  result += diagonalDownLeftToUpRight(arrOfCharRows)
  result += diagonalUpRightToDownLeft(arrOfCharRows)

  return result;
}


console.log(day1Answer(fileInput));

//Wrong 1184