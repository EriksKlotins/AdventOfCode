const fs = require('node:fs');



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



readInput('./AdventOfCode2024/Day 3/input.txt').then((input)=>{

    let mul = [...input.matchAll(/mul\(([\d]{1,3}),([\d]{1,3})\)/g)].map(a=>a[1]*a[2]).reduce((acc,cur)=>cur+acc,0)
    console.log('Part I = ', mul)


    // console.log(input)
})

readInput('./AdventOfCode2024/Day 3/input.txt').then((input)=>{

    let mul = [...input.matchAll(/mul\(([\d]{1,3}),([\d]{1,3})\)/g)]
    let dos = [...input.matchAll(/do(n't)?\(\)/g)]

    let instructions = mul.concat(dos).sort((a,b) => a.index - b.index)
    // .map(a=>a[1]*a[2]).reduce((acc,cur)=>cur+acc,0)
    // console.log('Part II = ', mul)

    let enabled = true
    result = 0
    for (let i=0;i<instructions.length;i++)
    {
        if (instructions[i][0] == "don't()")
        {
            enabled = false
            continue
        }
        if (instructions[i][0] == "do()")
        {
            enabled = true
            continue
        }   
        if (enabled)
        {
            let a = instructions[i][1]
            let b = instructions[i][2]
            result += a*b
            // console.log(a,b)
        }
    }    
    console.log('Part II = ', result)


})