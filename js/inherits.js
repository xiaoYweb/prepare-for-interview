function People() {
  this.type = 'people'
}
People.prototype.eat = function () {
  console.log('eat');
}

// 原型继承
function Man() {

}
Man.prototype = new People()

// 构造继承
function Man() {
  People.call(this)
}

// 组合继承 结合上面2种

// 寄生组合继承 结合上面2种 优化原型继承

function Man() {
  People.call(this)
}
Man.prototype = Object.create(People, {
  constructor: {
    value: Man
  }
})


class M {
  static fn() {
    console.log('static fn')
  }
}
class N extends M { }



// -------------- 原型继承    缺点 多个实例的属性 共有 导致 修改会相互影响
// -------------- 构造函数基础 缺点 实例原型上的属性 和 私有属性 重写了2遍
// -------------- 组合继承     缺点 实例原型上的属性 和 私有属性 重写了2遍
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function () {
  console.log(this.name)
};

function SubType(name, age) {
  // 继承属性
  // 第二次调用SuperType()
  SuperType.call(this, name);
  this.age = age;
}

// 继承方法
// 构建原型链
// 第一次调用SuperType()
SubType.prototype = new SuperType(); // { colors: [], name: '' }  .__proto__ === SuperType.prototype {sayName: Function}
// 重写SubType.prototype的constructor属性，指向自己的构造函数SubType
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function () {
  console.log(this.age);
};

var instance1 = new SubType("Nicholas", 29); // { colors: [], name: 'Nicholas', age: 29 } 
instance1.colors.push("black");
console.log(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29

var instance2 = new SubType("Greg", 27);
console.log(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27

// -------------- 原型式继承     缺点 无法传递参数
function _create(obj){
  function F(){}
  F.prototype = obj;
  return new F();
}
var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = _create(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = _create(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

console.log(person.friends);   //"Shelby,Court,Van,Rob,Barbie"

// -------------- 寄生式继承     在原型式继承的基础上，增强对象，返回构造函数   缺点 无法传递参数
function createAnother(original){
  var clone = _create(original); // 通过调用 _create() 函数创建一个新对象
  clone.sayHi = function(){  // 以某种方式来增强对象
    alert("hi");
  };
  return clone; // 返回这个对象
}

var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //"hi"
