var numOne = document.getElementById("num1");
var numTwo = document.getElementById("num2");
var addSum = document.getElementById("sum");

numOne.addEventListener("input", add);
numTwo.addEventListener("input", add);

function add() {
	var one = parseFloat(numOne.value) || 0;
	var two = parseFloat(numTwo.value) || 0;
	sum.innerHTML = (one + two);
};



var myList = [ "apple", "orange", "banana", "cherry", "peach" ];

for (var i = 0; i < myList.length; i++) {
	console.log(myList[i]);
}


function welcome(name) {
	alert("Hi, " + name + ".");
};

function askName() {
	var name = prompt("Please enter your name.");
	
	return name;
}

//welcome(askName());