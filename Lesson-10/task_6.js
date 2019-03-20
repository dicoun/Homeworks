function lettersCount(text){
	var textArr = text.split(/[.!?]/g);
	var arr = [];
	for(key in textArr){
		if(textArr[key].length > 0){
			arr.push(textArr[key]);
		}
	}
	textArr = arr;
	var letters = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяabcdefghijklmnopqrstuvwxyz';
	for(var i = 0; i < textArr.length; i++){
		var count = 0;
		var str = textArr[i].trim();
		for(var j = 0; j < str.length; j++){

			if(letters.indexOf(str[j].toLowerCase()) >= 0){
				count++;
			}
		}
		console.log('"' + str + '" - ' + 'Количество букв в предложении: ' + count);
	}
}

lettersCount('Идет бычок, качается.\n Вздыхает на ходу. Ох, досточка кончается, \n Сейчас я упаду!');