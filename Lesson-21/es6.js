//Задача 1
{
    let name = prompt('Введите имя');
    //console.log(name);
    const obj = {
        name,
        sayHi() {
            alert(`Hi, ${this.name}!`);
        }
    };
    obj.sayHi();
}
//Задача 2
{
    function f ({a: x, b: y}, z = 1) {
        return x**y*z;
    }
    const obj = {a: 2, b: 3};
    f(obj);
}
//Задача 3
{
    function f (name, age) {
        console.log(`Hello, I\'m ${name} and I\'m ${age} years old.`);
    }
    const mass = ['Vasia', 25];
    f(...mass);
}
//Задача 4
{
    function f (...arr) {
        for(let value of arr){
            console.log(value);
        }
    }
    const mass = [2,4,3,1,6,5];
    f(...mass);
}
//Задача 5
{
    function countVowelLetters(text) {
        text = text.toLowerCase().split('');
        const vowelLetters = ['а', 'я', 'ы', 'и', 'о', 'ё', 'у', 'ю', 'э', 'е', 'a', 'e', 'i', 'o', 'u', 'y'];
        let counter = 0;
        text.forEach(item => vowelLetters.includes(item) && counter++);
        return counter;
    }

    countVowelLetters('Шла Саша по шоссе И сосала сУшку'); // 12
}
//Задача 6
{
    function filter(arr){
        const ageArr = arr.filter(record => {return record.age < 40});
        const nameArr = arr.filter(record => {return record.name.includes('Fedor')});
        const obj = {
            'Пользователи младше 40:': ageArr,
            'Пользователь с именем Федор:': nameArr
        }
        return obj;
    }
    const arr = [
                    {name: 'Vasya Pupkin', age: 25},
                    {name: 'Ivan Petrov', age: 30},
                    {name: 'Fedor Ivanov', age: 42}
                ]
    filter(arr);

}
//Задача 7
{
    function transform(arr){
        const transformArr = arr.map((name,i) => ({['Пользователь ' + (i+1)]: name}));
		return transformArr;
    }
    const arr = ['Вася', 'Петя'];
	transform(arr);
}
//Задача 8
{
	function assignment(arr){
		const result = arr.reduce((previous, current) => (Object.assign(previous, current)));
		return result;
	}
	const obj = [
					{name: 'Vasya'},
					{name: 'Piotr', age: 25},
					{salary: '2000$'}
				];
	assignment(obj);
}
//Задача 9
{
	class Animal{
		constructor (name) {
			this._foodAmount = 50;
			this.name = name;
		}
		_getFormattedFoodAmount() {
			return `${this._foodAmount}гр.`;
		}
		dailyNorm(amount) {
			if (!arguments.length) return this._foodAmount;

			if (amount < 50 || amount > 500) {
				return 'Недопустимое количество корма.';
			}

			this._foodAmount = amount;
		}
		feed() {
			return `Насыпаем в миску ${this._getFormattedFoodAmount()} корма.`;
		}
	}

	class Cat extends Animal{
		constructor(name) {
			super(arguments);
		}

		feed() {
			return `${super.feed()} Кот доволен ^_^`;
		}
	}

	var barsik = new Cat('Барсик');
	console.log(barsik.name);

	console.log(barsik.dailyNorm());
	console.log(barsik.feed());

	console.log(barsik.dailyNorm(600));
	console.log(barsik.feed());
}