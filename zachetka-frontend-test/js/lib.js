// Inspired by base2 and Prototype
(function () {
  let initializing = false;
  const fnTest = /xyz/.test(() => {
    xyz;
  }) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  this.Class = function () {};

  // Create a new Class that inherits from this class
  Class.extend = function (prop) {
    const _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    const prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (const name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] === 'function'
      && typeof _super[name] === 'function' && fnTest.test(prop[name])
        ? (function (name, fn) {
          return function () {
            const tmp = this._super;

            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];

            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            const ret = fn.apply(this, arguments);
            this._super = tmp;

            return ret;
          };
        }(name, prop[name]))
        : prop[name];
    }

    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if (!initializing && this.__init) this.__init.apply(this, arguments);
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;

    return Class;
  };
}());

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
}());

const Drawer = {};
Drawer.Factory = Class.extend({
  $elem: null,

  __init() {
    this.observable = [];
    this.render = this.render.bind(this);
    requestAnimFrame(this.render);
  },

  initialize() {
  },

  render() {
    let isRedraw = false;
    for (const i in this.observable) {
      const model = this.observable[i];
      if (model.isChanged) {
        model.render();
        model.isChanged = false;
        isRedraw = true;
      }
    }
    requestAnimFrame(this.render);

    if (isRedraw) {
      this.onRedraw();
    }
  },

  append(model) {
    this.$elem.append(model.$elem);
    this.observable.push(model);
  },

  onRedraw() {},
});

Drawer.Model = Class.extend({
  $elem: null,
  defaults: {},

  __init(variables) {
    this.isChanged = false;
    this.variables = {};
    this.set({...this.defaults, ...variables});
    this.initialize();
  },

  render() {
  },

  initialize() {},

  set(name, value) {
    this.isChanged = true;
    if (typeof name === 'object') {
      Object.keys(name).forEach((prop) => {
        this.__set(prop, name[prop]);
      });
    } else {
      this.__set(name, value);
    }
    this.onChange();
  },

  __set(name, value) {
    if (this.variables[name] instanceof Drawer.Model) {
      this.variables[name].isChanged = true;
    }
    this.variables[name] = value;
  },

  get(name) {
    return this.variables[name];
  },

  onChange() {
  },
});

Drawer.Utils = {
  createSvgElement(tag) {
    return $(document.createElementNS('http://www.w3.org/2000/svg', tag));
  },
};

window.Drawer = Drawer;
