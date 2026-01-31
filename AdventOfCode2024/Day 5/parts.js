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

const parseInput = (input)=>{
    
    let rules = []
    let updates = []

    for (let i=0;i<input.length;i++)
    {
        if (input[i].indexOf('|')>=0)
        {
            rules.push(input[i].split('|').map(a=>parseInt(a)))
        }

        if (input[i].indexOf(',')>=0)
        {
            updates.push(input[i].split(',').map(a=>parseInt(a)))
        }

    }

    // console.log(rules)
    // console.log(updates)
    return [rules, updates]
}

const checkRules = (rules, update)=>
{
    // console.log(update)
    for (let i=0;i<rules.length;i++)
    {
        let a = update.indexOf(rules[i][0])
        let b = update.indexOf(rules[i][1])
        // Check if the rule is relevant
        if ((a>=0) && (b>=0)) 
        {
            if (a>b)
            {
                return false
            }
        }
    }
    return true
}



const enforceRules = (rules, update)=>
{
    while (!checkRules(rules,update))
    {

    
        for (let i=0;i<rules.length;i++)
        {
            let a = update.indexOf(rules[i][0])
            let b = update.indexOf(rules[i][1])
            // Check if the rule is relevant
            if ((a>=0) && (b>=0)) 
            {
                if (a>b)
                {
                    // console.log('rule missing', rules[i])
                    let tmp = update[b]
                    update[b] = update[a]
                    update[a] = tmp
                    break
                }
            }
        }   
    }
    // console.log(update)
    return update


}

readInput('AdventOfCode2024/Day 5/input.txt').then((input)=>{

    
    
    let [rules, updates] = parseInput(input)

    let counterPartI = updates.map((update)=>
    {

        let valid = checkRules(rules, update)
        let middle = (update.length - 1)/2
        return valid ? update[middle] : 0
    }).reduce((acc, cur)=>acc+cur,0)

    let counterPartII = updates.map((update)=>{

        let valid = checkRules(rules, update)
        let newUpdate = enforceRules(rules, update)
        let middle = (update.length - 1)/2
        return valid ? 0 : update[middle]
    }).reduce((acc, cur)=>acc+cur,0)
  

    console.log('Part I = ', counterPartI)
    console.log('Part II = ', counterPartII)

    
    // rules.map(r=>{
        // console.log(r)
    // })
})
