var addBtn = document.getElementById('addBtn');
var table = document.getElementsByTagName('table')[0];
//флаг для предотвращения выполнения кода обработчика blur, вызывающегося после keydown
var flag = 0;
function inputToText(input, target){
	var value = input.value;
	var text = document.createTextNode(value);
	target.appendChild(text);
}
addBtn.addEventListener("click", function(){
	var tbody = document.getElementsByTagName('tbody')[0];
	var firstRow = table.getElementsByTagName('tr')[0];
	var tr = document.createElement('tr');
	for(var i = 0; i < 3; i++){
		var td = document.createElement('td');
		tr.appendChild(td);
	}
	tbody.insertBefore(tr, firstRow);
});
table.addEventListener("click", function(event){
	var target = event.target;
	// цикл двигается вверх от target к родителям до table
	while (target != table) {
		if (target.tagName == 'TD' && !target.id) {
				var input = document.createElement('input');
				input.value = target.textContent;
				target.textContent = '';
				target.appendChild(input);
				input.focus();
				input.addEventListener("blur", function(event){
					if(!flag){
						inputToText(input,target);
						target.removeChild(input);
					}
					else{
						flag = 0;
					}
				});
				input.addEventListener("keydown", function(event){
					if (event.key === "Enter") {
						flag = 1;
						inputToText(input,target);
						target.removeChild(input);
					}
				});
			return;
		}
		target = target.parentNode;
	}
});