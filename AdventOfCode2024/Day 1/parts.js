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


const parseInput = (input)=> {

    return input.reduce((acc, cur, i)=> {
        let [el1, el2] = cur.split('   ')
        // console.log(el1, parseInt(el2))
        acc[0].push(parseInt(el1))
        acc[1].push(parseInt(el2))
        return acc
    }, [[],[]])
}

const calculateDistances = (list1, list2) =>{
    list1 = list1.sort()
    list2 = list2.sort()
    return list1.map((k,i)=> Math.abs(k - list2[i])).reduce((acc, cur)=> acc + cur,0)

}

const similarity = (list1, list2) => {


    let dict = list2.reduce((acc, cur)=>{
        
        if (acc.hasOwnProperty(cur))
        {
            acc[cur] ++
        }
        else
        {
            acc[cur] = 1
        }
        return acc
    }, {})


    return list1.map((item)=>{return dict.hasOwnProperty(item) ? item * dict[item] : 0}).reduce((acc, cur)=> acc + cur,0)

}

readInput('./AdventOfCode2024/Day 1/input.txt').then((input)=>{

    let [list1, list2] = parseInput(input)
    // console.log(list2)
    console.log('Part I = ', calculateDistances(list1, list2))
})



readInput('./AdventOfCode2024/Day 1/input.txt').then((input)=>{

    let [list1, list2] = parseInput(input)

    console.log('Part II = ', similarity(list1, list2))

})