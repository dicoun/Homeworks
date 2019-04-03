var timerId;
var startBtn = document.getElementsByTagName('button')[0];
startBtn.onclick = startStopWatch;
var hiddenDiv = document.getElementById('hiddenDiv');
var stopTime = localStorage.stopTime;
//если до перезагрузки страницы секундомер не был сброшен
if(stopTime){
	var state = localStorage.state;
	//проверяем состояние кнопки 'Запустить' до перезагрузки страницы
	if(state){	
		//запускаем секундомер с той же временной точки
		if(state == 'stop'){
			stopwatch(localStorage.stopTime);
			hiddenDiv.className = 'block';
			startBtn.setAttribute('data-state', 'stop');
			startBtn.textContent = 'Приостановить';
		}
		//отображаем время секундомера на момент перезагрузки страницы
		else{
			hiddenDiv.className = 'block';
			startBtn.setAttribute('data-state', 'start');
			startBtn.textContent = 'Возобновить';
			var msms = document.getElementById('msms');
			var ss = document.getElementById('ss');
			var mm = document.getElementById('mm');
			setTime(stopTime, msms,ss, mm);
		}
	}	
}
//функция управления состоянием секундомера
function startStopWatch(){
	var state = startBtn.getAttribute('data-state');
	//если секундомер запущен после сброса или первый раз (нажата кн.'Запустить')
	if(!state){
		startBtn.setAttribute('data-state', 'stop');
		startBtn.textContent = 'Приостановить';
		hiddenDiv.className = 'block';
		stopwatch(1);
	}
	else{
		//если секундомер остановлен (нажата кн. 'Приостановить')
		if(state == 'stop'){
			startBtn.setAttribute('data-state', 'start');
			startBtn.textContent = 'Возобновить';
			var mm = document.getElementById('mm').textContent;
			var ss = document.getElementById('ss').textContent;
			var msms = document.getElementById('msms').textContent;
			var stopTime = +mm*60000 + +ss*1000 + +msms;
			clearInterval(timerId);
			localStorage.setItem('stopTime', stopTime);
		}
		//если секундомер запущен после остановки (нажата кн. 'Возобновить')
		if(state == 'start'){
			startBtn.setAttribute('data-state', 'stop');
			startBtn.textContent = 'Приостановить';
			var stopTime = localStorage.getItem('stopTime');
			stopwatch(stopTime);
		}
	}
}
//функция сохранения отметки
function saveMark(){	
	var mm = document.getElementById('mm').textContent;
	var ss = document.getElementById('ss').textContent;
	var msms = document.getElementById('msms').textContent;
	
	var pColl = document.getElementsByTagName('p');
	var pText = document.createElement('p');
	if(pColl.length){
		var length = pColl.length;
		var lastEl = pColl[length - 1];
		var lastNum = lastEl.getAttribute('data-number');
		var currNum = +lastNum + 1;
		pText.setAttribute('data-number', currNum);
		pText.innerHTML = '<b>Отметка ' + currNum + ':  &ensp;</b>' + mm + ' : ' + ss + ' . ' + msms;
	}
	else{
		pText.setAttribute('data-number', 1);
		pText.innerHTML = '<b>Отметка 1: &ensp;</b>' + mm + ' : ' + ss + ' : ' + msms;
	}
	document.body.appendChild(pText);
}
//функция сброса
function reset(){
	clearInterval(timerId);
	startBtn.setAttribute('data-state', '');
	startBtn.textContent = 'Запустить';
	var pColl = document.getElementsByTagName('p');
	while(pColl.length){
		var length = pColl.length;
		pColl[length - 1].remove();
	}
	hiddenDiv.className = 'hidden';
	document.getElementById('mm').textContent = '00';
	document.getElementById('ss').textContent = '00';
	document.getElementById('msms').textContent = '00';
	localStorage.removeItem('stopTime');
	localStorage.removeItem('state');
	startBtn.disabled = false;
}
//функция запуска секундомера
function stopwatch(startTime){
	var msms = document.getElementById('msms');
	var ss = document.getElementById('ss');
	var mm = document.getElementById('mm');
	timerId = setInterval(function() {
		var isVal = setTime(startTime, msms,ss, mm);
		if(!isVal){
			clearInterval(timerId);
			startBtn.disabled = true;
		}
		startTime++;
	}, 1);
}
//функция установки времени в секундомер
function setTime(startTime, msms,ss, mm){
	if(startTime < 100){
		var rest = startTime%10;
		var unit = (startTime - rest)/10;
		msms.innerText = '0' + unit;
		return true;
	}
	//если меньше 1с
	else if(startTime < 1000){
		var rest = startTime%10;
		var unit = (startTime - rest)/10;
		msms.innerText = unit;
		return true;
	}
	//если меньше 10с
	else if(startTime < 10000){
		var rest = startTime%1000;
		var unit = (startTime - rest)/1000;
		if(rest < 100){
			var rest2 = rest%10;
			var unit2 = (rest - rest2)/10;
			msms.innerText = '0' + unit2;
		}
		else if(rest < 1000){
			var rest2 = rest%10;
			var unit2 = (rest - rest2)/10;
			msms.innerText = unit2;
		}
		ss.innerText = '0' + unit;
		return true;
	}
	//если меньше 1мин
	else if(startTime < 60000){
		var rest = startTime%1000;
		var unit = (startTime - rest)/1000;
		if(rest < 100){
			var rest2 = rest%10;
			var unit2 = (rest - rest2)/10;
			msms.innerText = '0' + unit2;
		}
		else if(rest < 1000){
			var rest2 = rest%10;
			var unit2 = (rest - rest2)/10;
			msms.innerText = unit2;
		}
		ss.innerText = unit;
		return true;
	}
	//если меньше 10мин
	else if(startTime < 600000){
		var rest = startTime%60000;
		var restMs = rest%1000;
		var unitSs = (rest - restMs)/1000;
		var unitMm = (startTime - rest)/60000;
		mm.innerText = '0' + unitMm;	
		if(unitSs < 10){
			ss.innerText = '0' + unitSs;
		}
		else if(unitSs < 60){
			ss.innerText = unitSs;
		}
		if(restMs < 100){
			var rest2 = restMs%10;
			var unit2 = (restMs - rest2)/10;
			msms.innerText = '0' + unit2;
		}
		else if(restMs < 1000){
			var rest2 = restMs%10;
			var unit2 = (restMs - rest2)/10;
			msms.innerText = unit2;
		}
		return true;
	}
	//если меньше 60мин
	else if(startTime <= 3600000){
		var rest = startTime%60000;
		var restMs = rest%1000;
		var unitSs = (rest - restMs)/1000;
		var unitMm = (startTime - rest)/60000;
		mm.innerText = unitMm;
		if(unitSs < 10){
			ss.innerText = '0' + unitSs;
		}
		else if(unitSs < 60){
			ss.innerText = unitSs;
		}
		if(restMs < 100){
			var rest2 = restMs%10;
			var unit2 = (restMs - rest2)/10;
			msms.innerText = '0' + unit2;
		}
		else if(restMs < 1000){
			var rest2 = restMs%10;
			var unit2 = (restMs - rest2)/10;
			msms.innerText = unit2;
		}
		return true;
	}
}
//функция сохранения данных при перезагрузке страницы
window.onunload = function(e){
	var mm = document.getElementById('mm').textContent;
	var ss = document.getElementById('ss').textContent;
	var msms = document.getElementById('msms').textContent;
	var stopTime = +mm*60000 + +ss*1000 + +msms*10;
	clearInterval(timerId);
	stopTime && localStorage.setItem('stopTime', stopTime);
	var state = startBtn.getAttribute('data-state');
	state && localStorage.setItem('state', state);
}