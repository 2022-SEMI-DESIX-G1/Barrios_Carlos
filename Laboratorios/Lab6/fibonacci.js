const num = 5;
const fibonacci = [];
fibonacci[0] = 0;
fibonacci[1] = 1;
for (let i = 2; i < num; i++) {
  fibonacci[i] = fibonacci[i - 2] + fibonacci[i - 1];
}
console.log(fibonacci);