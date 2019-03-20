function vowelsCount(text){
	var count = 0;
	text = text.toLowerCase();
	var vowelsArr = ['а','о','и','е','ё','э','ы','у','ю','я','a','e','i','o','u','y'];
	for(var i = 0; i < text.length; i++){
		if(vowelsArr.indexOf(text[i]) >= 0){
			count++;
		}
	}
	return count;
}

vowelsCount('Hello Мир!');