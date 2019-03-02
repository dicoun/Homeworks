function Animal(name) {
	var self = this;
    var foodAmount = 50;

    this._getFormattedFoodAmount = function() {
        return foodAmount + 'гр.';
    }

    this.dailyNorm = function(amount) {
        if (!arguments.length) return foodAmount;

        if (amount < 50 || amount > 500) {
            return 'Недопустимое количество корма.';
        }

        foodAmount = amount;
    };

    this.name = name;

    this.feed = function() {
        return 'Насыпаем в миску ' + self._getFormattedFoodAmount() + ' корма.';
    };
}
function Cat(name) {
	Animal.apply(this, arguments);
	var animalFeed = this.feed;
	this.feed = function(){
		return animalFeed() + ' Кот доволен ^_^';
	}
}
var barsik = new Cat('Барсик');
console.log(barsik.name);

console.log(barsik.dailyNorm());
console.log(barsik.feed());

console.log(barsik.dailyNorm(600));
console.log(barsik.feed());