const fs = require('node:fs');
const { parse } = require('node:path');


const readInput = (fileName) =>{
    return new Promise((resolve, reject)=>{
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                reject([])
            }
            resolve(data)
        });
    })
}


const isFullLine = (line)=> line.split('').reduce((acc, cur, i)=> cur=='#'? acc+1 : acc ,0) == 5


const parseInput = (input) =>{



    const lines = input.split('\n')


    var pins = [0,0,0,0,0];
    var kind = null;
    var len = 0
    var result = {'keys':[], 'locks':[]}
    lines.push('')



    for(let i=0;i<lines.length;i++)
    {
        if (lines[i].length == 0)
        {
            // console.log('--------------')
            // console.log(pins, kind)
            // console.log('--------------')
            result[kind].push(pins)
            len = 0
            kind = null
            pins = [0,0,0,0,0] 
        }
        else
        {
            if (isFullLine(lines[i]))
            {
                if (len ==0)
                {
                    kind = 'keys'
                }

                if (len == 6)
                {
                    kind = 'locks'
                }
                
            }
            // console.log(i,'\t',len,'\t',lines[i])
            for(let j=0;j<lines[i].length; j++)
            {
                if (lines[i][j] == '#')
                {
                    pins[j] ++
                }
            }
            len++
        }
    }

    return result
    
}

const compare = (lock, key)=>{

    var result = []
    var idx = 0
    var match = true
    for (let i=0;i<5;i++)
    {   
        result.push(lock[i] + key[i])
        if (lock[i] + key[i] > 7)
        {
            if (match)
                idx = i
            match = false
            
        }
    }
    return {'r': result, 'fit':match, 'n':idx}

}

readInput('./AdventOfCode2024/Day 1/input.txt').then((input)=>{
    
    
    var locksAndKeys = parseInput(input)
    var counter = 0
    // console.log(locksAndKeys)
    

    
    for(var i=0;i<locksAndKeys['keys'].length;i++)
    {
        for (var j=0;j<locksAndKeys['locks'].length;j++)
        {
            let a = locksAndKeys['keys'][i]
            let b = locksAndKeys['locks'][j]
            let c = compare(b,a)

            // console.log(b,a, c.r)
            if (c.fit === true)
            {
                // console.log(a,b,c.r)
                counter ++
            }
                // if (counter > 200)
                    // return

        }
    }
    console.log('Part I = ',counter)

})
// 7785 -- too high