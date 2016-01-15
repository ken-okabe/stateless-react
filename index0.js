'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

(function () {
  'use strict';

  var React = require('react');
  var ReactDOM = require('react-dom');
  var Immutable = require('immutable');
  var __ = require('timeengine');
  var __Component = require('timeengine-react');

  //================================
  var HelloComponent = function HelloComponent() {
    return React.createElement(
      'div',
      null,
      'HelloComponent!!'
    );
  };

  var HelloChildrenComponent = function HelloChildrenComponent() {
    return React.createElement(
      'div',
      null,
      'Hello',
      React.createElement(
        'div',
        null,
        'child'
      ),
      React.createElement(
        'div',
        null,
        'child'
      ),
      React.createElement(
        'div',
        null,
        'child'
      )
    );
  };

  var ChildComponent = function ChildComponent() {
    return React.createElement(
      'div',
      null,
      'child'
    );
  };

  var HelloChildrenComponent2 = function HelloChildrenComponent2() {
    return React.createElement(
      'div',
      null,
      'Hello',
      ChildComponent(),
      ChildComponent(),
      ChildComponent()
    );
  };

  var ChildrenComponent = function ChildrenComponent() {

    var elArray = [ChildComponent(), ChildComponent(), ChildComponent()];

    var el = React.createElement(
      'div',
      null,
      elArray
    );

    return el;
  };

  var HelloChildrenComponent3 = function HelloChildrenComponent3() {
    return React.createElement(
      'div',
      null,
      'Hello',
      ChildrenComponent()
    );
  };

  var ChildNumberComponent = function ChildNumberComponent(number) {
    return React.createElement(
      'div',
      null,
      'child',
      number
    );
  };

  var ChildrenNumberComponent3 = function ChildrenNumberComponent3() {

    var el = React.createElement(
      'div',
      null,
      ChildNumberComponent(0),
      ChildNumberComponent(1),
      ChildNumberComponent(2)
    );
    return el;
  };

  var ChildrenNumberComponent5 = function ChildrenNumberComponent5() {

    var el = React.createElement(
      'div',
      null,
      [ChildNumberComponent(0), ChildNumberComponent(1), ChildNumberComponent(2), ChildNumberComponent(3), ChildNumberComponent(4)]
    );
    return el;
  };

  var ChildrenNumberComponent10 = function ChildrenNumberComponent10() {

    var elArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(ChildNumberComponent);
    //number array transforms to element array
    var el = React.createElement(
      'div',
      null,
      elArray
    );
    return el;
  };

  var ChildrenNumberComponent100 = function ChildrenNumberComponent100() {

    var elArray = Immutable.Range(0, 100).toArray().map(ChildNumberComponent);

    var el = React.createElement(
      'div',
      null,
      elArray
    );
    return el;
  };

  //########## FRP ############################

  var TextComponent = function TextComponent() {
    var __value = __();
    var onChange = function onChange(e) {
      __value.t = e.target.value;
      __value.log("__value");
    };

    var __seqEl = __([__value]).tMap(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1);

      var value = _ref2[0];
      return React.createElement(
        'div',
        null,
        React.createElement('input', { type: 'text', value: value, onChange: onChange })
      );
    });

    __value.t = "default text";
    return __Component(__seqEl);
  };

  var TimerComponent = function TimerComponent() {

    var naturalSeq = Immutable.Range();
    //infinite natural numbers sequence [0...Infinite]
    var __count = __.time(__.INTERVAL, 1000) //1000msec time resolution
    // `seqMap` is to map Immutable-js infinite Sequence
    //                 onto TimeEngine infinite Sequence
    // map natural numbers sequence onto intervalSeq(1000)
    .immutableSeqMap(naturalSeq).tMap(function (count) {
      __.log.t = count;
      return count;
    });
    // as a result, this works as an incremental counter

    var __seqEl = __([__count]).tMap(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 1);

      var count = _ref4[0];
      return React.createElement(
        'div',
        null,
        'Timer : ',
        count
      );
    });

    return __Component(__seqEl);
  };

  var PhysicsComponent = function PhysicsComponent() {
    //-------Physics-------------------------------
    //MKS system of units
    var V0 = 85.0; // m/s
    var DEG = 40; //degree
    var THETA = DEG / 180 * Math.PI; //radian
    var G = 9.8; //gravity const

    //10msec time resolution
    //t seconds elapsed since t0
    var t = __.time(__.INTERVAL, 10).tMap(function (tt, t0) {
      return (tt - t0) / 1000;
    });
    var x = t.tMap(function (t) {
      return V0 * Math.cos(THETA) * t;
    });
    var y = t.tMap(function (t) {
      return V0 * Math.sin(THETA) * t - 1 / 2 * G * Math.pow(t, 2);
    });
    //==============================================================
    var Drawscale = 2; //2 dot = 1 meter
    var __seqEl = __([x, y]) //atomic update
    .tMap(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2);

      var x = _ref6[0];
      var y = _ref6[1];
      return React.createElement(
        'div',
        null,
        React.createElement(
          'svg',
          { height: '100%', width: '100%' },
          React.createElement('circle', { r: '3', fill: 'red',
            cx: 50 + x * Drawscale, cy: 500 - y * Drawscale })
        )
      );
    });

    return __Component(__seqEl);
  };

  //====================================

  var HelloElement = React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'HelloElement!!'
    ),
    '=====================',
    HelloComponent(),
    '=====================',
    HelloChildrenComponent(),
    '=====================',
    HelloChildrenComponent2(),
    '=====================',
    HelloChildrenComponent3(),
    '=====================',
    ChildrenNumberComponent3(),
    '=====================',
    ChildrenNumberComponent5(),
    '=====================',
    ChildrenNumberComponent10(),
    '=====================',
    ChildrenNumberComponent100(),
    '=====================',
    TextComponent(),
    '=====================',
    TimerComponent(),
    '=====================',
    React.createElement(
      'p',
      null,
      'Scroll Down for Physics FRP DEMO'
    ),
    PhysicsComponent(),
    '====================='
  );

  var mount = ReactDOM.render(HelloElement, document.getElementById('container'));

  //===================================
})();
