function clone(Entity){
	if(Array.isArray(Entity)){
		var Arr = [];
		for(var i = 0; i < Entity.length; i++){
			if(typeof Entity[i] == 'object'){
				Arr[i] = clone(Entity[i]);
			}
			else{
				Arr[i] = Entity[i];
			}
		}
		return Arr;
	}
	if((!!Entity) && (Entity.constructor === Object)){
		var Obj = {};
		for(var key in Entity){
			if(typeof Entity[key] == 'object'){
				Obj[key] = clone(Entity[key]);
			}
			else{
				Obj[key] = Entity[key];	
			}		
		}
		return Obj;
	}
}

var initialObj = {
    string: 'Vasya',
    number: 30,
    boolean: true,
    undefined: undefined,
    null: null,
    array: [1, 2, 3],
    object: {
        string2: 'Petrov',
        object2: {
            array2: [{}, {}]
        },
        object3: {}
    },
    method: function() {
        alert('Hello');
    }
};

var clonedObj = clone(initialObj);
clonedObj.object.object2.array2[1].name = 'Vasya';
clonedObj.array.push(2);
console.log(initialObj);
console.log(clonedObj);