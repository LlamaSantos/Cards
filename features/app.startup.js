(function (window, $, undefined){
    var templates = require("./templates")
        , _ = require("underscore")
        , Nodeject = require("nodeject")
        , EventEmitter2 = require("eventemitter2").EventEmitter2;

    function wrap(i) { return function () { return i; } };

    var container = new Nodeject();

    container.define({ name : "$", type : wrap($) })
        .define({ name : "_", type : wrap(_) })
        .define({ name : "templates", type : wrap(templates)})
        .define({ name : "bus", type : wrap(new EventEmitter2({delimiter : "::", wildcard : "*" })) })
        ;

    // -- Configure Features
    require("./main/configure.js")(container);

})(window, jQuery, undefined);
