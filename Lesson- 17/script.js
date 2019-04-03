var patt = /^((\+?375\-?)|(8\-?0))(29|25|44|33)\-?(\d{3})\-?(\d{2})\-?(\d{2})$/;
var str = '+375-25-777-77-77';
var res = patt.test(str);
console.log(res);