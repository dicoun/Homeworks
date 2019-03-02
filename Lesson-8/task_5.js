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
	var self = this;
	Animal.apply(self, arguments);
	var animalFeed = self.feed;
	self.feed = function(){
		console.log(animalFeed() + ' Кот доволен ^_^');
		return self;
	}
	self.stroke = function(){
		console.log('Гладим кота.');
		return self;
	}
}
var barsik = new Cat('Барсик');

console.log(barsik.feed().stroke().stroke().feed());