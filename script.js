function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}

function Fruit(name) {
	this.name = name;
	this.price = randomNumber(50, 999)/100;
}

Fruit.prototype.changePrice = function() {
	this.price += randomNumber(-25,25)/100;
	this.price = Math.round(this.price * 100)/100;
	if(this.price > 9.99) {
		this.price = 9.99;
	} else if(this.price < 0.50) {
		this.price = 0.50;
	}
}

Fruit.prototype.display = function(){
	var imgString = "<img src='images/" + this.name + ".png'></img>";
	var string = "<div>" + imgString + "<br>$" + this.price + "</div>";
	var button = "<button class='btnBuy' value='" + this.name + "'>Buy</button>";
	var buttonSell ="<button class='btnSell' value='" + this.name + "'>Sell</button>";
	var invString = "<div>You have " + inventory[this.name] + "</div>";
	var divWrapper = "<div class='fruit'>" + string + button + buttonSell + invString + "</div>";
	$("#container").append(divWrapper);
}

function PlayerInventory(array){
	// Loop through the given array, creating a variable for the name of each property
	for (var i = 0; i < array.length; i++) {
		var name = array[i].name;
		this[name] = 0;
	}
}

function updateAll(){
	$("#container").children().remove();
	for(var i = 0; i < fruit.length; i++){
		fruit[i].display();
	}
	$("#money").html("<p>Your Money: $" + money + "</p>");
}

var money;
var fruit;
var inventory;

function startMarket() {
	$("#container").children().remove();
	// Declare local variables: new fruit objects with random prices
	var apple = new Fruit("apples");
	var orange = new Fruit("oranges");
	var banana = new Fruit("bananas");
	var pear = new Fruit("pears");

	// Intialize / reset global variables to the above
	money = 50;
	fruit = [apple, orange, banana, pear];
	inventory = new PlayerInventory(fruit);
}

$(document).ready(function(){
	$("#btnStart").on("click", function(){
		// Initialize the app
		startMarket();
		// Display everything to start
		updateAll();
		// Set interval to 1500 -- 15 secs
		setInterval(function() {
			for (var i = 0; i < fruit.length; i++) {
				fruit[i].changePrice();
			}
			updateAll();
		}, 15000);				
		$("#sound").append("<iframe width='0' height='0' src='https://www.youtube.com/embed/q6EoRBvdVPQ?autoplay=1' frameborder='0'></iframe>")														//Remove up to parent, then to parent's sibling.  Removes: <div class="container">	
	});
$("#container").on("click", ".btnSell", function(){
		updateAll();
		// Loop through fruits array to check which fruit name the button was assigned
		for (var i = 0; i < fruit.length; i++) {
			if(fruit[i].name == this.value){
				if(inventory[this.value] < 1){
					alert("You don't have any " + this.value + " to sell!");
					return;
				}
				inventory[this.value]--;
				money += fruit[i].price;
				money = Math.round(money * 100) / 100;
				updateAll();
			}
		};
	});

	$("#container").on("click", ".btnBuy", function(){
		inventory[this.value]++;
		updateAll();
		// Loop through fruits array to check which fruit name the button was assigned
		for (var i = 0; i < fruit.length; i++) {
			if(fruit[i].name == this.value){
				if(money < fruit[i].price){
					alert("You don't have enough dosh to buy " + this.value +"!");
					return;
				}
				money -= fruit[i].price;
				money = Math.round(money * 100) / 100;
				updateAll();
			}
		};
	});
});
