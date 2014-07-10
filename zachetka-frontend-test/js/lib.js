// Inspired by base2 and Prototype
(function () {
    var initializing = false, fnTest = /xyz/.test(function () {xyz;}) ? /\b_super\b/ : /.*/;

    // The base Class implementation (does nothing)
    this.Class = function () {};

    // Create a new Class that inherits from this class
    Class.extend = function (prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == "function" &&
                typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                (function (name, fn) {
                    return function () {
                        var tmp = this._super;

                        // Add a new ._super() method that is the same method
                        // but on the super-class
                        this._super = _super[name];

                        // The method only need to be bound temporarily, so we
                        // remove it when we're done executing
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;

                        return ret;
                    };
                })(name, prop[name]) :
                prop[name];
        }

        // The dummy class constructor
        function Class() {
            // All construction is actually done in the init method
            if (!initializing && this.__init)
                this.__init.apply(this, arguments);
        }

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // Enforce the constructor to be what we expect
        Class.prototype.constructor = Class;

        // And make this class extendable
        Class.extend = arguments.callee;

        return Class;
    };
})();

window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

EForm = {};
EForm.Factory = Class.extend({

    $elem: null,

    __init: function () {
        this.observable = [];
        requestAnimFrame($.proxy(this.render, this));
    },

    initialize: function () {},

    render: function () {
        var isRedraw = false;
        for (var i in this.observable) {
            var model = this.observable[i];
            if (model.isChanged) {
                model.render();
                model.isChanged = false;
                isRedraw = true;
            }
        }
        requestAnimFrame($.proxy(this.render, this));

        if(isRedraw) {
            this.onRedraw();
        }
    },

    append: function (model) {
        this.$elem.append(model.$elem);
        this.observable.push(model);
    },

    onRedraw: function() {}
})

EForm.Model = Class.extend({

    $elem: null,
    defaults: {},

    __init: function (variables) {
        this.isChanged = false;
        this.variables = {};
        this.set( $.extend({}, this.defaults, variables) )
        this.initialize();
    },

    render: function () {},

    initialize: function () {},

    set: function (name, value) {
        this.isChanged = true;
        if (typeof name == 'object') {
            for (var prop in name) {
                this.__set(prop, name[prop]);
            }
        }
        else {
            this.__set(name, value);
        }
        this.onChange();
    },

    __set: function (name, value) {
        if (this.variables[name] instanceof  EForm.Model) {
            this.variables[name].isChanged = true;
        }
        this.variables[name] = value;
    },

    get: function (name) {
        return this.variables[name];
    },

    onChange: function () {}
});