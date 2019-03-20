function maxIterationCount(text){
	text = text.toLowerCase();
	textStr = text.split(/[.,!?]/g).join('');
	textArr = textStr.split(' ');
	console.log(textArr);
	var arr = [];
	for(var i = 0; i < textArr.length; i++){
		var filterArr = [];
		for(key in textArr){
			if(textArr[key] == textArr[i]){
				filterArr.push(textArr[i]);
			}
		}
		if(filterArr.length > arr.length){
			arr = filterArr;
		}
	}
	return 'Максимальное число повторений у слова "'+arr[0]+'" - '+arr.length+'.';
}

maxIterationCount('Маша мыла, мыла, мыла. Мыла маша раму');