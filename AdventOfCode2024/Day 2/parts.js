const fs = require('node:fs');




const readInput = (fileName) =>{
    return new Promise((resolve, reject)=>{
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                reject([])
            }
            resolve(data.split('\n'))
        });
    })
}



const checkReport = (arr)=>
{
    // calculating deltas between n and n-1
    return arr.reduce((acc, cur, i, arr)=> {
            if (i>0)
            {
                let delta = arr[i] - arr[i-1]
                acc.push(delta)
            }
            return acc
        } ,[])
        
        // checking if all deltas have the same sign
        // and the deltas are within the alloted range
        .map((cur, i, arr)=>{
            let trend = arr[0]/Math.abs(arr[0])
            return (cur * trend >= 1 ) && (cur * trend <= 3)
        })
        // checking if all values in the arr are true
        .reduce((acc, cur)=> acc && cur,true)
}







const canBeSaved = (report, allowOneBadLevel)=> {


    let k = checkReport(report)
    if (k)
    {
        return true
    }

    if (!allowOneBadLevel)
    {
        return false
    }


    for (let i=0;i<report.length;i++)
    {
        let a = report.slice(0,i)
        let b = report.slice(i+1)
        let newArr = a.concat(b)
        if (checkReport(newArr))
        {
            return true
        }
    }
    return false
}



const parseReport = (report, allowOneBadLevel)=>{

    let arr = report.split(' ')
            // making the report a list of integers
            .map(el=>parseInt(el));


    return canBeSaved(arr, allowOneBadLevel)
}



readInput('AdventOfCode2024/Day 2/input.txt').then(input=>{


    let part1 = input.map(report=>parseReport(report, false))
                    
                    // summing positive values
                    .reduce((acc, cur)=> acc + (cur ? 1 : 0), 0)


    console.log('Part I = ', part1)
    let part2 = input.map(report=>parseReport(report, true))
                    
                    // summing positive values
                    .reduce((acc, cur)=> acc + (cur ? 1 : 0), 0)

                   
                   
    console.log('Part II = ', part2)



})