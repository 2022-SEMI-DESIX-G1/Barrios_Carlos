const express = require('express');

const app = express();

let fibonacci = function(n) {
	if (n === 1) {
		return [0, 1];
	} else {
		var array = fibonacci(n - 1);
		array.push(array[array.length - 1] + array[array.length - 2]);
		return array;
	}
};

app.get('/', (req,res) => {
	res.send(fibonacci(5));
});

app.listen(3000, () => {
	console.log(fibonacci(5));
});