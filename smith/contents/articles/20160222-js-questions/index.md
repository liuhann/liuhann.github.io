---
title: 一些关于Javascript有趣的问题
author: Hand
date: 2015-11-15
template: article.jade
---

本文介绍了一些js试题。无论有趣或者无趣，这就是我们大前端正在使用着的语言。
 
![preview](preview.png)


## 问题1 

### 以下代码输出什么?
 
     var y = 1;
      if (function f(){}) {
        y += typeof f;
      }
      console.log(y);
 
好吧，很有迷惑性，输出为1undefined。 为何有此输出呢？ 再看下面的代码输出也是同样:  

     var k = 1;
      if (1) {
        eval(function foo(){});
        k += typeof foo;
      }
      console.log(k); 

关键点是， if 语句内部的判断执行scope同eval。 所以function foo() 并没有加入当前scope，所以 1+undefined = 1undefined.
下面这个就输出为 1function 了(多么奇怪的输出啊！)

    var k = 1;
    if (1) {
        function foo(){};
        k += typeof foo;
    }
    console.log(k); // output 1function


## 问题2 

### private 方法有什么缺点？ 

显然，缺点就是太消耗内存。看这个例子

    var Employee = function (name, company, salary) {
        this.name = name || "";       //Public attribute default value is null
        this.company = company || ""; //Public attribute default value is null
        this.salary = salary || 5000; //Public attribute default value is null

        // Private method
        var increaseSalary = function () {
            this.salary = this.salary + 1000;
        };

        // Public method
        this.dispalyIncreasedSalary = function() {
            increaseSlary();
            console.log(this.salary);
        };
    };

    // Create Employee class object
    var emp1 = new Employee("John","Pluto",3000);
    // Create Employee class object
    var emp2 = new Employee("Merry","Pluto",2000);
    // Create Employee class object
    var emp3 = new Employee("Ren","Pluto",2500);
    
每个new的Employee 都有一个方法increaseSalary。 而这个方法是完全相同的。


## 问题3 
### 实现一个方法 mul(2)(3)(4) = 2*3*4

蛋疼么？ 实现如下 

    function mul (x) {
        return function (y) { // anonymous function 
            return function (z) { // anonymous function 
                return x * y * z; 
            };
        };
    }
    
好吧，定义这个函数后，再调用

    mul(2)
    mul(2)(3)
    
看看返回什么吧。好吧，已碎。


    
## 问题4

### 如何清空一个数组 例如  var arrayList =  ['a','b','c','d','e','f'];

这个问题还有点意思。因为我经常碰到，而且做法如下 

    arrayList = []

虽然实用，但是有个问题就是如果这个arrayList被赋予过其他变量时，那个变量是不会改变的。 在angularjs中，如果绑定的数据是这个就不能这么清除了。

第2个实现是
 
    arrayList.length = 0;

第3个是

    arrayList.splice(0, arrayList.length);
    
好吧 splice都用上了， 牛人啊，最后一个是 

    while(arrayList.length){
        arrayList.pop();
    }
    
这是最弱的方法。 其实，当第一个无法清除引用时我就这么干的。 这个方法不推荐

## 问题5

### 以下代码输出什么？ 
    var output = (function(x){
        delete x;
        return x;
    })(0);

    console.log(output);
    
说输出undefined的 那可错了。输出为0， 因为delete操作符删除对象的属性。它不能直接删除对象。

一定会有人为那么怎么能删除x呢？看来这边文章你也学会蛋疼了， 那就是貌似无法删除。 好吧为了进一步了解情况。试试这2段代码或许有所启发吧

    x = 1;
    delete x;
    console.log(x)

输出为  x is not defined 

    var x = 1;
    delete x;
    console.log(x)

输出为 1 

## 问题6
### 以下代码输出什么

    var trees = ["xyz","xxxx","test","ryan","apple"];
    delete trees[3];
    console.log(trees.length);

返回为5. delete操作符可以删除数组成员， 但其效果基本等同于   trees[3] = null; 



## 问题7 

### 以下代码输出为什么？ 

    var bar = true;
    console.log(bar + 0);   
    console.log(bar + "xyz");  
    console.log(bar + true);  
    console.log(bar + false);   


答案是 1, "truexyz", 2, 1. 

    Number + Number -> 加法
    Boolean + Number -> 加法
    Boolean + Number -> 加法
    Number + String -> 连接
    String + Boolean -> 连接
    String + String -> 连接
    
所以请不要记住这些，忘掉它们把。 2个不同类型相加，受够了


## 问题8

### 以下这2种定义方法有何不同？ 

    var foo = function(){ 
        // Some code
    };
     
    function bar(){ 
        // Some code
    }; 


傻眼了吧， 其实区别在于前者为运行时解析，后者为解析时执行。大家可能没太关注这2个概念，但是一个页面的js的确是全部解析完才运行的。 
试着执行这2段(当然不执行相信您也明白了)

    foo(); 
    var foo = function(){ 
            console.log("Hi I am inside Foo");
    };
     
还有 
    
    bar(); 
    function bar(){ 
        console.log("Hi I am inside Foo");
    }; 


其实这个运行期解析期是个雷区，我们轻易不碰的。所以以上区别在这种情况下还有有用的，就是按条件定义函数

    if(testCondition) {// If testCondition is true then 
         var foo = function(){ 
            console.log("inside Foo with testCondition True value");
         }; 
     }else{
          var foo = function(){ 
            console.log("inside Foo with testCondition false value");
         }; 
     }

## 问题9

### 什么是函数提升? (hoisting)
 

好吧这是个经典问题。 

在js中，函数和变量都是首先被置于所有执行代码前执行。 

     foo(); // Here foo is still undefined 
     var foo = function foo(){ 
         return 12; 
     };
     
其执行次序为
      
    var foo = undefined;
    foo(); 
    foo = function foo(){ } 
    var foo = undefined;
    foo = function foo(){ } 
     
     
另外看一下这个代码 

    var salary = "1000$";
    
     (function () {
         console.log("Original salary was " + salary);
    
         var salary = "5000$";
    
         console.log("My New Salary " + salary);
     })();
     
结果就是 undefined, 5000$. 原因是 var 被提升，代码等同于 
  var salary = "1000$";
 
      (function () {
          var salary = undefined;
          console.log("Original salary was " + salary);
     
          salary = "5000$";
     
          console.log("My New Salary " + salary);
      })();
 
 
## 问题10 
 
###下面代码输出是什么? 

    (function(){
      var a = b = 3;
    })();
    console.log(b);
    console.log(a);

好吧，输出为3 然后报错。 这要是选择题就好了， 因为大家要注意我把b放在前面了。 
 
var a = b = 3; 等同于  

    b = 3; 
    var a = b; 

而不是  
    
    var b = 3;
    var a = b;

虽然2个变量在闭包中定义， b还是泄露出来了， 因为不带var的定义都是视为window属性，定义在全局。 所以以后不要这么干了 
 
 
 
## 问题11

## 调用以下2个函数返回相同么？ 

    function foo1() {
      return {
          bar: "hello"
      };
    }
    
    function foo2() {
      return
      {
          bar: "hello"
      };
    }

首先要看出来这2个有什么区别就赢了。 当return 后面什么都不跟时，会被解析为立即增加一个分号 

foo2等同于

    return;
    {
      bar: "hello"
    };

## 问题12

## NaN是什么含义，  typeof NaN === "number" 返回什么？ 

答： NaN表示不是一个数字 (Not a Number).并且它的类型为number。 以上判断返回true。并且以下输出为false 

    console.log(NaN === NaN);  //返回false

哎，自己都不等于自己了。迷茫啊~~
 
## 问题13

## 如何判断一个变量是integer

在ECMAscript 6 提供了一个方法 Number.isInteger()进行判断， 然而ES6之前，是没有这个方法的。

在ECMAscript中，integer只是在使用中存在，但是存储时所有number都以float形式存储。

 
最好的实现为
 
    function isInteger(x) { return (x^0) === x; } 

这个实现， x为非整数、字符串甚至null时都能正常工作。另外这个方法也可以

    function isInteger(x) { return Math.round(x) === x; }


或者 

    function isInteger(x) { return (typeof x === 'number') && (x % 1 === 0); }

我只能说，一个简单的功能竟然有这么五花八门的实现。 服了~

## 问题14

## 为什么下面代码输出不是1234

    console.log(1); 
    setTimeout(function(){console.log(4)}, 1000); 
    setTimeout(function(){console.log(2)}, 0); 
    console.log(3);


1和4的次序比较肯定，但是2在setTimeout之中，延时为0。为什么反而在3之后执行呢？
 
有个关键问题就是浏览器是单线程执行的。关于 [Javascript Event and Timing](http://javascript.info/tutorial/events-and-timing-depth)
简单来讲，就是任何事件、定时任务都要等浏览器空闲了才会被执行。 那么setTimeout增加了一个任务，必须要等当前代码全部执行完成。 
 

## 问题15

### 以下代码输出为？ 

    var hero = {
        _name: 'John Doe',
        getSecretIdentity: function (){
            return this._name;
        }
    };
    
    var stoleSecretIdentity = hero.getSecretIdentity;
    
    console.log(stoleSecretIdentity());
    console.log(hero.getSecretIdentity());

又是一道送分题啊，从题目就能看出了，知识点是this的含义：表示函数的调用方。  第一个调用方是global，第二个是hero。
所以答案是
 
    undefined
    John Doe
    
为了解决第一个调用的问题，更改为 

    var stoleSecretIdentity = hero.getSecretIdentity.bind(hero);
    
这是必考的送分题，同学们要记住啊！ 



## 问题16

### 以下代码输出为？ 


    var a={},
        b={key:'b'},
        c={key:'c'};
    
    a[b]=123;
    a[c]=456;
    
    console.log(a[b]);

有点糊涂吧， 答案是 456 . 大家可能看出来了， b是一个对象，却作为对象a的属性key来设置。 这在实际场景中是不会出现的，除非是出现bug写法，但是js的确允许这样，
将b设置为key时进行stringify处理。

所以

    a["[object Object]"] = 123;
    a["[object Object]"] = 456;





 
 

