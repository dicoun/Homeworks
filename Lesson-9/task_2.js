function Clone(Entity){
	if(Array.isArray(Entity)){
		var Arr = [];
		for(var i = 0; i < Entity.length; i++){
			if(typeof Entity[i] == 'object'){
				Arr[i] = Clone(Entity[i]);
			}
			Arr[i] = Entity[i];
		}
		Arr.__proto__ = Entity.__proto__;
		return Arr;
	}
	if((!!Entity) && (Entity.constructor === Object)){
		var Obj = {};
		for(var key in Entity){
			if(typeof Entity[key] == 'object'){
				Obj[key] = Clone(Entity[key]);
			}
			Obj[key] = Entity[key];
		}
		Obj.__proto__ = Entity.__proto__;
		return Obj;
	}
}

var Entity = {
				key: 99,
				string: 'mother',
				boolean: true,
				massive: [2,4,'string', {num: 3, bool: false}],
				obj: {jump: 'rabbit', run: {run: 'cat'}, __proto__: {a: 'b'}}
			};
Clone(Entity);