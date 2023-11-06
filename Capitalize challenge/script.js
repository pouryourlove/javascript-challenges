// Create a new string called "myNewString" that holds the value of "Developer", using the lowercase value from "myString"

const myString = 'developer'

const myNewString = myString[0].toUpperCase() + myString.slice(1)

console.log(myNewString)