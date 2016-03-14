---
title: ReactJS - Template Method Pattern
author: Hand
date: 2016-03-13
template: article.jade

---

The Template Method Pattern let you redefine certain steps of an algorithm without changing the algorithm's structure. It is important for the UI design

![preview](preview.png)


## 1 Using mixin as the parent class

    var parentMixin = {
        render: function () {
            var abstract = this.abstractMethod();
            return (
                <div>
                    ..html code here
                    {editor}
                    ..other html 
                </div>
            );
        }
    };
    
the parentMixin make the abstractMethod which is implemented by the children . As the children like this:

## 2 Implement method at children

    var Child = React.createClass({
        mixins: [parentMixin], // Use the mixin
        abstractMethod: function() {
               // implementation
        }
    });
    

So the children has no render() method. In stead it has method abstractMethod().  The common code is put in the mixin and the child's row is 'fill the block'

## 3 Detect method existing

We can add some check code at the render() of mixin
 
    
    var parentMixin = {
        render: function () {
            /**Check method*/
            if(!_.isFunction(this.abstractMethod)) {
                 return <div>
                     Your component require to implement abstractMethod() method
                 </div>;
            }
            var abstract = this.abstractMethod();
            return (
                <div>
                    ..html code here
                    {editor}
                    ..other html 
                </div>
            );
        }
    };
