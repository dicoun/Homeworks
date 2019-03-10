function maxIterationCount(text){
	text = text.toLowerCase();
	textStr = text.split(/[.,!?]/g).join('');
	textArr = textStr.split(' ');
	console.log(textArr);
	var arr = [];
	var filterArr = [];
	for(var i = 0; i < textArr.length; i++){
		
		filterArr = textArr.filter(function(value, index, textArr){
			if(value == textArr[i]){
				return true;
			}
		});
		if(filterArr.length > arr.length){
			arr = filterArr;
		}
	}
	return 'Максимальное число повторений у слова "'+arr[0]+'" - '+arr.length+'.';
}

maxIterationCount('Маша мыла, мыла, мыла. Мыла маша раму');