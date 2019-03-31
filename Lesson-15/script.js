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
				
				 // Declare all variables
				  var j, tabcontent, tablinks;

				  // Get all elements with class="tabcontent" and hide them
				  tabcontent = document.getElementsByClassName("tabcontent");
				  for (j = 0; j < tabcontent.length; j++) {
					tabcontent[j].style.display = "none";
				  }

				  // Get all elements with class="tablinks" and remove the class "active"
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
			
			var divContent = document.createElement('div');
			//divContent.className = 'tabcontent';
			
			var p1 = document.createElement('p');
			p1.textContent = 'Имя: ' + data[i].first_name;
			
			var p2 = document.createElement('p');
			p2.textContent = 'Фамилия: ' + data[i].last_name;
			
			divContent.appendChild(p1);
			divContent.appendChild(p2);
			
			tabContent.appendChild(img);
			tabContent.appendChild(divContent);
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

	//delete elements
	if(tabLinkEls.length){
		container.removeChild(tabLinkEls[0]);
		if(tabContentEls.length){
			while(tabContentEls.length){
				var length = tabContentEls.length;
				var lastNode = tabContentEls[length - 1];
				body.removeChild(lastNode);
			}
		}
	}
	if(localStorage.length){
		var data = [];
		for(var i = 0; i < localStorage.length; i++){
			var key = localStorage.key(i);
			var value = JSON.parse(localStorage[key]);
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
			//console.log(this.status + ' - ' + this.statusText);
			// Get the modal
			var modal = document.getElementById('myModal');

			// Get the <span> element that closes the modal
			var span = document.getElementsByClassName("close")[0];

			// Open the modal 
			modal.style.display = "block";

			// When the user clicks on <span> (x), close the modal
			span.onclick = function() {
			  modal.style.display = "none";
			}
		};
		xhr.send();
	}
});

