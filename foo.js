// Function as var
var foo = function() {

};

// Named function
function foo() {

}

// Anonymous function
$.ajax(function() {
  return function() {

  }
});

// Closure
var fun = function(foo) {
  return function(bar) {
    console.log('moo', foo, bar);
  }
};
fun('a')

// Method
var {
  foo: function() {
    console.log('moo')
  }
}

// hash
var hash = { foo: 'bar' };

// Obj
var obj = {
  foo: 'bar',
  "Foo bar mbaz and some #&!*$ ": function() {
    console.log('moo')
  }
};
obj["Foo bar mbaz and some #&!*$ "]();

// Basic inheretence
var animal = {
  name: 'Fluffy',
  eat: function(food) {
    this.belly += food;
    console.log('Yum, my belly has', food);
  },
  belly: []
}

var dog = {
  name: 'Fluffy',
  eat: function(food) {
    food += ' happiness';
    animal.eat(food).bind(this);
    var self = this;
    $('body').append(function() {
      $(this)
    });

  }
}

// Prototypes
var Animal = function(attributes) {
  _.extend(this, attributes);
  this.belly = [];
}
Animal.prototype.eat = function(food) {
  this.belly.push(food);
}

var Dog = function() {};
Dog.prototype = new Animal();
Dog.prototype.constructor = Animal;
Dog.prototype.eat = function(food) {
  food += 'yummy';
  Animal.prototype.eat.call(this, food);
}
var fluffy = new Dog({ name: 'Fluffy', feet: 4 });


// Composition
var Dog = function() {
};
Dog.prototype.eat = function(food) {
  food += 'yummy';
  Animal.prototype.eat.call(this, food);
}
