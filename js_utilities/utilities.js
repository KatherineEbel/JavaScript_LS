(function() {
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
        element.forEach(function(el) {
          if (args.indexOf(el) === -1) {
            new_arr.push(el);
          }
        });
        return new_arr;
      },
      lastIndexOf: function(search) {
        var idx = -1;
        
        for (var i = element.length - 1; i >= 0; i--) {
          if (element[i] === search) {
            idx = i;
            break;
          } 
        }
        return idx;
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
        var match;

        element.some(function(obj) {
          var all_match = true;

          for (var prop in props) {
            if (!(prop in obj) || obj[prop] !== props[prop] ) {
              all_match = false;
            }        
          }

          if (all_match) {
            match = obj;
            return true;    
          }
        });
        return match;
      }
    };
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
  window._ = _;
})();


