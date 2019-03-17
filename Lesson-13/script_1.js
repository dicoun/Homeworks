var x = document.getElementById('x');
var y = document.getElementById('y');
var button = document.getElementById('button');
var numbersArr = [1,2,3,4,5,6,7,8,9,10];
function changeBtnState(x,y){
	if( x.value && y.value ){
		document.getElementById("button").disabled = false;
	}
	else{
		document.getElementById("button").disabled = true;
	}
}
function isValid(input){
	if(numbersArr.indexOf(+input.value) < 0){
		alert('Недопустимое значение поля. Допустимые значения - числа от 1 до 10');
		input.value = '';
		document.getElementById("button").disabled = true;
		input.focus();
	};
}
x.addEventListener("input", function(){
	changeBtnState(x,y);
});
x.addEventListener("change", function(){
	isValid(x);
});
y.addEventListener("input", function(){
	changeBtnState(x,y);
});
y.addEventListener("change", function(){
	isValid(y);
});
button.addEventListener("click", function(){
    var body = document.getElementsByTagName('body')[0];
	var brs = document.getElementsByTagName('br');
	body.removeChild(brs[brs.length - 1]);
	var isTable = body.getElementsByTagName('table');
	if(isTable.length){
		body.removeChild(isTable[0]);
	}
	table = document.createElement('table');
	var tbody = document.createElement('tbody');
	var tr, td;
	for(var i = 1; i <= y.value; i++){
		tr = document.createElement('tr');
		for(var j = 1; j <= x.value; j++){
			td = document.createElement('td');
			div = document.createElement('div');
			//нечетная строка
			if(i%2){
				//нечетный столбец
				if(j%2){
					div.style.backgroundColor = 'black';
				}
			}
			//четная строка
			else{
				//четный столбец
				if(!(j%2)){
					div.style.backgroundColor = 'black';
				}
			}
			td.appendChild(div);
			tr.appendChild(td);
		}
		tbody.appendChild(tr);	
	}
	table.appendChild(tbody);
	table.onclick = function(event){
		var target = event.target;
	  // цикл двигается вверх от target к родителям до table
		while (target != table) {
			if (target.tagName == 'TD') {
			    for(var i = 0; i < y.value; i++){
					for(var j = 0; j < x.value; j++){
						var td = this.rows[i].cells[j];
						var div = td.getElementsByTagName('div')[0];
						if(div.getAttribute('style')){
							div.removeAttribute('style');
						}
						else{
							div.setAttribute('style', 'background-color: black');
						}
					}
			    }
			   return;
			}
			target = target.parentNode;
		}
	}
	var br = document.createElement('br');
	body.appendChild(br);
	body.appendChild(table);
});