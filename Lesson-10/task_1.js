function isPalindrome(world){
		var length = world.length;
		if(length%2){
			var world = world.toLowerCase();
			var iterNumber = Math.floor(length/2);
            for(var i = 0; i <= iterNumber; i++){
                var reverseIndex = length - 1 - i;
                if(world[i] !== world[reverseIndex]){
                    return false;
                }
            }
            return true; 
		}
		return false;	
}

console.log(isPalindrome('шаЛАш'));
console.log(isPalindrome('привет'));