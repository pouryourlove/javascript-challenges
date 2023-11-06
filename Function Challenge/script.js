//challenge 1

// function getCelsius(temperature){
//     const celsius = ((temperature - 32) * 5) / 9;
//     return celsius
// }

const getCelsius = (temperature) => ((temperature - 32) * 5) / 9;

//challenge 2 
const minMax = (arr) => {
    return ({
        min: Math.min(...arr),
        max: Math.max(...arr)
    })
}

console.log(minMax([55, 32, 43, 54, 65, 76, 87, 98, 109]));

//challenge 3

(function(length, width){
    const output = `The area of a rectangle with a length of ${length} and a width of ${width} is ${
      length * width
    }`
    console.log(output);
})(10,5)