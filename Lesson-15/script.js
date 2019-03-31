function paintTabs(data, container, body){
	var tabCount = data.length;
	
	if(tabCount){	
		var divLinks = document.createElement('div');
		divLinks.className = 'tab';
		for(var i = 0; i < tabCount; i++){	
			var id = data[i].id;
			var tabLink = document.createElement('button');
			tabLink.className = 'tablinks';
			tabLink.textContent = 'Пользователь ' + (i+1);
			tabLink.setAttribute('data-id', id);
			tabLink.addEventListener("click", function(event){
				
				var j, tabcontent, tablinks;
				tabcontent = document.getElementsByClassName("tabcontent");
				for (j = 0; j < tabcontent.length; j++) {
					
					tabcontent[j].style.display = "none";
				}

				tablinks = document.getElementsByClassName("tablinks");  
				for (j = 0; j < tablinks.length; j++) {
					
					tablinks[j].className = tablinks[j].className.replace(" active", "");
				}			
				
				var dataId = this.getAttribute('data-id');
				var block = document.getElementById(dataId);
				block.style.display = "block";
				event.currentTarget.className += " active";
			});
			
			divLinks.appendChild(tabLink);
			
			var tabContent = document.createElement('div');
			tabContent.className = 'tabcontent';
			tabContent.setAttribute('id', id);
			
			var img = document.createElement('img');
			img.setAttribute('src', data[i].avatar);
			
			var divContent1 = document.createElement('div');
			var divContent2 = document.createElement('div');
			divContent1.className = 'divcontent';
			divContent2.className = 'divcontent';
			
			var p1 = document.createElement('p');
			p1.textContent = 'Имя: ' + data[i].first_name;
			
			var p2 = document.createElement('p');
			p2.textContent = 'Фамилия: ' + data[i].last_name;
			
			divContent2.appendChild(img);
			divContent1.appendChild(p1);
			divContent1.appendChild(p2);
		
			tabContent.appendChild(divContent2);
			tabContent.appendChild(divContent1);
			
			body.appendChild(tabContent);
		}
		
		container.appendChild(divLinks);
		divLinks.firstChild.click();
	}
}

var button = document.getElementById('button');

button.addEventListener("click", function(){	
	var body = document.getElementsByTagName('body')[0];
	var container = document.getElementById('container');
	var tabLinkEls = document.getElementsByClassName('tab');
	var tabContentEls = document.getElementsByClassName('tabcontent');
	
	if(tabLinkEls.length){
		
		container.removeChild(tabLinkEls[0]);
		if(tabContentEls.length){
			
			var length, lastNode;
			while(tabContentEls.length){
				
				length = tabContentEls.length;
				lastNode = tabContentEls[length - 1];
				body.removeChild(lastNode);
			}
		}
	}
	if(localStorage.length){
		var data = [];
		var key, value;
		for(var i = 0; i < localStorage.length; i++){
			
			key = localStorage.key(i);
			value = JSON.parse(localStorage[key]);
			data[i] = value;
		}
		paintTabs(data, container, body);
	}
	else{
		
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://reqres.in/api/users?page=2', true);
		xhr.onload = function () {
			
			var data = JSON.parse(this.response).data;
			for(var k = 0; k < data.length; k++){
				localStorage['user_' + k] = JSON.stringify(data[k]);
			}
			paintTabs(data, container, body);
		};
		xhr.onerror = function () {
			
			var modal = document.getElementById('myModal');
			var span = document.getElementsByClassName("close")[0];
			modal.style.display = "block";

			span.onclick = function() {
			  modal.style.display = "none";
			}
		};
		xhr.send();
	}
});

