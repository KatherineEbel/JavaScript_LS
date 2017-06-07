(function() {
  var findObjs = function(element, props, multiple) {
    var match = multiple ? [] : undefined;
    element.some(function(obj) {
      var all_match = true;
      for (var prop in props) {
        if (!(prop in obj) || obj[prop] !== props[prop] ) {
          all_match = false;
        }
      }
      if (all_match) {
        if (multiple) {
          match.push(obj);
        }
        else {
          match = obj;
          return true;
        }
      }
    });
    return match;
  };
  var _ = function(element) {
    u = {
      first: function() {
        return element[0];
      },
      last: function() {
        return element[element.length - 1];
      },
      without: function() {
        var new_arr = [],
            args = Array.prototype.slice.call(arguments);
        return element.filter(el => args.indexOf(el) === -1);
      },
      lastIndexOf: function(search) {
        return element.reduceRight((lastIdx, curVal, curIdx) => {
          if(lastIdx !== -1) { return lastIdx }
          if (curVal === search) {
            lastIdx = curIdx;
          }
          return lastIdx;
        }, -1);
      },
      sample: function(qty) {
        var sampled = [],
            copy = element.slice(),
            get = function() {
              var idx = Math.floor(Math.random() * copy.length),
                  el = copy[idx];
              copy.splice(idx, 1);
              return el;
            };
        if (!qty) { return get(); }
        while (qty) {
          sampled.push(get());
          qty--;
        }
        return sampled;
      },
      findWhere: function(props) {
        return findObjs(element, props, false);
      },
      where: function(props) {
        return findObjs(element, props, true);
      },
      pluck: function(query) {
        return element.reduce((vals, obj) => {
          if (obj[query]) {
            vals.push(obj[query]);
          }
          return vals;
        },[]);
      },
      keys: function() {
       return Object.getOwnPropertyNames(element)
      },
      values: function() {
        return Object.getOwnPropertyNames(element).map(prop => element[prop]);
        // alternate implementation
        // var values = [];
        // for (var prop in element) {
        //   values.push(element[prop]);
        // }
        // return values;
      },
      pick: function() {
        var args = [].slice.call(arguments);
        return args.reduce((newObj, prop) => {
          if (prop in element) { newObj[prop] = element[prop] }
          return newObj;
        },{});
      },
      omit: function() {
        let args = [].slice.call(arguments);
        return args.reduce((newObj, prop) => {
          if (!prop in element) { newObj[prop] = element[prop] }
          return newObj;
        },{});
      },
      has: function(prop) {
        return {}.hasOwnProperty.call(element, prop);
      }
    };

    (["isElement", "isArray", "isObject", "isFunction", "isBoolean", "isString", "isNumber"]).forEach(function(method) {
      u[method] = function() { _[method].call(u, element); }
    });
    return u;
  };

  _.range = function(start, stop) {
    var range = [];
    if (stop === undefined) {
      stop = start;
      start = 0;
    }
    for (var i = start; i < stop; i++) {
      range.push(i);
    }
    return range;
  };

  _.extend = function() {
    var args = [].slice.call(arguments),
        old_obj = args.pop(),
        new_obj = args[args.length - 1];
    for(var prop in old_obj) {
      new_obj[prop] = old_obj[prop];
    }
    return args.length === 1 ? new_obj : _.extend.apply(_, args);
  };

  _.isElement = function(obj) {
    return obj && obj.nodeType === 1;
  };

  _.isArray = Array.isArray || function() {
    return toString.call(obj) === "[object Array]";  
  };

  _.isObject = function(obj) {
    var type = typeof obj;

    return type === "function" || type === "object" && !!obj;
  };

  _.isFunction = function(obj) {
    var type = typeof obj;
    return type === "function";
  };

  (["Boolean", "String", "Number"]).forEach(function(method) {
    _["is" + method] = function(obj) {
      return toString.call(obj) === "[object " + method + "]";
    };
  });
  window._ = _;
})();
