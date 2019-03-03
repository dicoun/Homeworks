function Animal(name) {
    this.foodAmount = 50;
	this.name = name;
}
Animal.prototype.getFormattedFoodAmount = function() {
	return this.foodAmount + 'гр.';
}
Animal.prototype.dailyNorm = function(amount) {
	if (!arguments.length) return this.foodAmount;

	if (amount < 50 || amount > 500) {
		return 'Недопустимое количество корма.';
	}

	this.foodAmount = amount;
};
Animal.prototype.feed = function() {
	return 'Насыпаем в миску ' + this.getFormattedFoodAmount() + ' корма.';
};

function Cat(name) {
	Animal.apply(this, arguments);
}
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;
Cat.prototype.feed = function(){
	return Animal.prototype.feed.apply(this) + ' Кот доволен ^_^';
}

var barsik = new Cat('Барсик');
console.log(barsik.name);

console.log(barsik.dailyNorm());
console.log(barsik.feed());

console.log(barsik.dailyNorm(600));
console.log(barsik.feed());