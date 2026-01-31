const fs = require('node:fs');



const readInput = (fileName) =>{
    return new Promise((resolve, reject)=>{
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                reject([])
            }
            resolve(data.split('\n').map(line=>line.split('')))
        });
    })
}

const search = (arr, row, col, row_delta, col_delta, WORD, verbose=false) =>{

    // const WORD = 'XMAS'
    for (let i=0;i<WORD.length;i++)
    {
        if (col+i*col_delta >= arr[row].length)        
            return false
        if (row+i*row_delta >= arr.length)
            return false
        if (col+i*col_delta < 0)
            return false
        if (row+i*row_delta < 0)
            return false

        let cur = arr[row+i*row_delta][col+i*col_delta]
        let tmp = cur === WORD[i]
        if (verbose)
            console.log(cur, WORD[i], tmp)
        if (!tmp)
        {
            return false
        }
    }
    return true

}

const searchAllDirections = (input, row, col, word)=>
{
    return [
        search(input, row, col, 0,  1, word),
        search(input, row, col, 0, -1, word),
        search(input, row, col, 1,  0, word),
        search(input, row, col, -1, 0, word),
        search(input, row, col, 1,  1, word),
        search(input, row, col, -1,-1, word),
        search(input, row, col, -1, 1, word),
        search(input, row, col, 1, -1, word)
    ]
}

const testForXMAS = (input, row, col) =>
{   
    if (row-1<0) return false
    if (col-1<0) return false
    if (row+1>= input.length) return false
    if (col+1>= input[row].length) return false
    const one = [input[row-1][col-1], input[row][col], input[row+1][col+1]].join('')
    const other = [input[row+1][col-1], input[row][col], input[row-1][col+1]].join('')

    return (((one == 'MAS') || (one == 'SAM')) && ((other == 'MAS')||(other == 'SAM')))

}

readInput('./AdventOfCode2024/Day 4/input.txt').then((input)=>{

    // input.map((row)=>console.log(row))
    let counterPartI = 0
    let counterPartII = 0
    // console.log(searchAll(input,9,9))
    for(let i=0;i<input.length;i++)
    {
        for (let j=0;j<input[i].length;j++)
        {
            // console.log(i,j)
            if (input[i][j] == 'X')
            {
                let found = searchAllDirections(input, i,j,'XMAS')
                let count = found.reduce((acc,cur)=> (cur ? acc+1 : acc) ,0)
                if (found)
                {
                    counterPartI+=count
                }
            }
            if (input[i][j] == 'A')
            {
                if (testForXMAS(input, i, j))
                {
                    counterPartII ++
                }
            }
            
        }
    }
    console.log('Part I = ',counterPartI)
    console.log('Part II = ',counterPartII)
   
})
