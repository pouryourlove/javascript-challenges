for (let i = 1; i <= 100; i++) {
  console.log(i);
  if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else if ((i % 3 === 0) & (i % 5 === 0)) {
    console.log("FizzBuzz");
  } else {
    console.log(i);
  }
}

let j = 1;
while (j <= 100) {
  if (j % 3 === 0) {
    console.log("Fizz");
  } else if (j % 5 === 0) {
    console.log("Buzz");
  } else if ((j % 3 === 0) & (j % 5 === 0)) {
    console.log("FizzBuzz");
  } else {
    console.log(j);
  }
  j++;
}
