if(!Function.prototype.softBind){
    Function.prototype.softBind = function(obj){
        var fn = this;
        //捕获所有curried参数
        var curried = [].slice.call(arguments, 1);
        var bound = function(){
            return fn.apply(
                (!this || this === (window || global)) ? 
                obj : this
                .curried.concat.apply(curried, arguments)
            );
        };
        bound.prototype = Object.create(fn.prototype);
        return bound;
    };
}


function foo() {    
    console.log("name: " + this.name); 
} 
var obj = { name: "obj" },
    obj2 = { name: "obj2" }, 
    obj3 = { name: "obj3" }; 
 
var fooOBJ = foo.softBind( obj );  
fooOBJ(); // name: obj 
obj2.foo = foo.softBind(obj);  
obj2.foo(); // name: obj2 <---- 看！！！ 
fooOBJ.call( obj3 ); // name: obj3 <---- 看！  
setTimeout( obj2.foo, 10 ); 
// name: obj   <---- 应用了软绑定
//软绑定版本的foo()可以手动将this绑定到obj2或者obj3上，
//如果应用了默认绑定，则会把this绑定到obj上