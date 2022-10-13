const arr = [
  
    [
        "India Internet - AsiaNet Broadband",
        "IN_AB",
        "YES"
    ]
  ,
    [
        "India Internet - AsiaNet Broadband",
        "IN_AB",
        "YES"
    ],
    [
        "India Internet - AsiaNet Broadband",
        "IN_AB",
        "YES"
    ]

]

const update = arr.map((element)=>{
// console.log(element)
return {
    x: element[0],
    y: element[1],
    y: element[2]
}
})
console.log(update);