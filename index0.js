'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  'use strict';

  var React = require('react');
  var ReactDOM = require('react-dom');
  var Immutable = require('immutable');
  var __ = require('timeengine');

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

  //***React state with life cycle is stateless sequence*****
  var seqComponent = function seqComponent(__seq) {
    var SeqComponent = (function (_React$Component) {
      _inherits(SeqComponent, _React$Component);

      function SeqComponent() {
        _classCallCheck(this, SeqComponent);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SeqComponent).call(this));

        _this.state = {
          seq: __seq.t
        };
        var timeseq = __seq.tMap(function (val) {
          _this.setState({
            seq: val
          });
        });
        return _this;
      }

      _createClass(SeqComponent, [{
        key: 'render',
        value: function render() {
          return React.createElement(
            'span',
            null,
            this.state.seq
          );
        }
      }]);

      return SeqComponent;
    })(React.Component);

    return React.createElement(SeqComponent, null);
  };
  //**************************************

  var TimerComponent = function TimerComponent() {

    var naturalSeq = Immutable.Range();
    //infinite natural numbers sequence [0...Infinite]

    var __count = __.intervalSeq(1000) //1000msec time resolution
    // `seqMap` is to map Immutable-js infinite Sequence
    //                 onto TimeEngine infinite Sequence
    // map natural numbers sequence onto intervalSeq(1000)
    .seqMap(naturalSeq).tMap(function (count) {
      __.t = __.log(count);
      return count;
    });
    // as a result, this works as an incremental counter

    var el = React.createElement(
      'div',
      null,
      'Timer : ',
      seqComponent(__count)
    );

    return el;
  };

  //-------Physics-------------------------------

  //MKS system of units
  var V0 = 85.0; // m/s
  var DEG = 40; //degree
  var THETA = DEG / 180 * Math.PI; //radian
  var G = 9.8; //gravity const

  //10msec time resolution
  //t seconds elapsed since t0
  var t = __.intervalSeq(10).tMap(function (tt, t0) {
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

  var PhysicsComponent = function PhysicsComponent() {

    var __seqElement = __([x, y]) //atomic update
    .tMap(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2);

      var x = _ref2[0];
      var y = _ref2[1];
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

    var el = React.createElement(
      'div',
      null,
      seqComponent(__seqElement)
    );

    return el;
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
