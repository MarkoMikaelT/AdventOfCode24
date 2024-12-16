import fs from "node:fs";
const input = "./input.txt";
const testInput = "./testInput.txt";

const up = '^'
const obstruction = '#'
const stepped = 'X'

function parseFileContent(file){
    try {
        const data = fs.readFileSync(file, 'utf8');
        let rows = data.split('\r\n');
        let res = []
        rows.forEach(row => {
            res.push(row.split(''))
        });
        return res;
      } catch (err) {
        console.error(err);
        return null;
      }
}

function findStart(grid){
    for (let y = 0; y < grid.length; y++) {
        let x = grid[y].indexOf(up)
        if(x != -1){
            return [x, y]
        }
    }

}

function moveUp(grid, position){
    try {
        for(let y = position[1]; y < grid.length; y--) {
            const newPos = grid[y][position[0]];
            if(newPos == obstruction){
                position[1]++;
                return true;
            }else{
                grid[y][position[0]] = stepped;
                position[1]--;
            }
        }
    } catch (err) {
        console.error(err)
        return false;
    }
  }

function moveRight(grid, position){
    try {        
        for(let x = position[0]; x < grid[0].length; x++){
            const newPos = grid[position[1]][x]
            if(newPos == obstruction){
                position[0]--;
                return true;
            }else{
                grid[position[1]][x] = stepped;
                position[0]++;
            }
        }
    } catch (err) {
        console.error(err)
        return false;
    }
}

function moveDown(grid, position){
    try {
        for(let y = position[1]; y < grid.length; y++) {
            const newPos = grid[y][position[0]];
            if(newPos == obstruction){
                position[1]--;
                return true;
            }else{
                grid[y][position[0]] = stepped;
                position[1]++;
            }
        }
    } catch (err) {
        console.error(err)
        return false;
    }
}

function moveLeft(grid, position){
    try {        
        for(let x = position[0]; x < grid[0].length; x--){
            const newPos = grid[position[1]][x]
            if(newPos == obstruction){
                position[0]++;
                return true;
            }else{
                grid[position[1]][x] = stepped;
                position[0]--;
            }
        }
    } catch (err) {
        console.error(err)
        return false;
    }
}

function printResult(grid){
    grid.forEach(row => {
        console.log(row.join(''))
    })
}

function Xcount(grid){
    let count = 0;
    grid.forEach(row => {
        row.forEach(char => {
            if(char == stepped){
                count++;
            }
        })
    })
    return count;
}

function part1Answer(file){
    const grid = parseFileContent(file);
    const position = findStart(grid);
    let keepMoving = true;
    // while(keepMoving){
    //     keepMoving = moveUp(grid, position);

    // }
    while(keepMoving){
        keepMoving = moveUp(grid, position);
        keepMoving = moveRight(grid, position);
        keepMoving = moveDown(grid, position);
        keepMoving = moveLeft(grid, position);
    }
    printResult(grid);

    return Xcount(grid);
}

console.log(part1Answer(input));