function divideArr(Arr, length){
	var newArr = [];
	while(Arr.length > length){
		newArr.push(Arr.splice(0, length));
	}
	newArr.push(Arr);
	return newArr;
}

console.log(divideArr([1, 2, 3, 4], 2)); // [[1, 2], [3, 4]]
console.log(divideArr([1, 2, 3, 4, 5], 3)); // [[1, 2, 3], [4, 5]]