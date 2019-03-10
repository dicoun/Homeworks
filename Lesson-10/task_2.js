function isAnagram(str1, str2){
	if(str1.length == str2.length){
		var arr1 = str1.split('');
		var arr2 = str2.split('');
		for(var i = 0; i < arr1.length; i++){
			if(arr2.indexOf(arr1[i]) < 0){
				return false;
			}
		}
		return true;
	}
	return false;
}

console.log(isAnagram('кот', 'отк')); // true
console.log(isAnagram('кот', 'атк')); // false
console.log(isAnagram('кот', 'отко')); // false