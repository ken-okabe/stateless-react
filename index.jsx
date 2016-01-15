(() => {
  'use strict';

  var React = require('react');
  var ReactDOM = require('react-dom');
  var Immutable = require('immutable');
  var __ = require('timeengine');
  var __Component = require('timeengine-react');

  //================================
  var HelloComponent = () => (<div>HelloComponent!!</div>);

  var HelloChildrenComponent = () => (
  <div>
      Hello
      <div>child</div>
      <div>child</div>
      <div>child</div>
  </div>
  );

  var ChildComponent = () => (
  <div>child</div>
  );

  var HelloChildrenComponent2 = () => (
  <div>
      Hello
      {ChildComponent()}
      {ChildComponent()}
      {ChildComponent()}
  </div>
  );

  var ChildrenComponent = () => {

    var elArray = [ChildComponent(),
      ChildComponent(),
      ChildComponent()];

    var el = (<div>{elArray}</div>);

    return el;
  };

  var HelloChildrenComponent3 = () => (
  <div>
      Hello
      {ChildrenComponent()}
  </div>
  );



  var ChildNumberComponent = (number) => (
  <div>child{number}</div>
  );

  var ChildrenNumberComponent3 = () => {

    var el = (
    <div>
        {ChildNumberComponent(0)}
        {ChildNumberComponent(1)}
        {ChildNumberComponent(2)}
    </div>
    );
    return el;

  };

  var ChildrenNumberComponent5 = () => {

    var el = (
    <div>
        {[ChildNumberComponent(0),
      ChildNumberComponent(1),
      ChildNumberComponent(2),
      ChildNumberComponent(3),
      ChildNumberComponent(4)]}
    </div>
    );
    return el;

  };

  var ChildrenNumberComponent10 = () => {

    var elArray
    = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(ChildNumberComponent);
    //number array transforms to element array
    var el = (<div>{elArray}</div>);
    return el;

  };

  var ChildrenNumberComponent100 = () => {

    var elArray
    = Immutable.Range(0, 100).toArray().map(ChildNumberComponent);

    var el = (<div>{elArray}</div>);
    return el;

  };

  //########## FRP ############################


  var TextComponent = () => {
    var __value = __();
    var onChange = (e) => {
      __value.t = e.target.value;
      __value.log("__value");
    };

    var __seqEl = __([__value])
      .tMap(([value]) => (<div>
        <input type="text" value={value} onChange={onChange}/>
        </div>));

    __value.t = "default text";
    return __Component(__seqEl);
  };

  var TimerComponent = () => {

    var naturalSeq = Immutable.Range();
    //infinite natural numbers sequence [0...Infinite]
    var __count = __
      .time(__.INTERVAL, 1000) //1000msec time resolution
      // `seqMap` is to map Immutable-js infinite Sequence
      //                 onto TimeEngine infinite Sequence
      // map natural numbers sequence onto intervalSeq(1000)
      .immutableSeqMap(naturalSeq)
      .tMap((count) => {
        __.log.t = count;
        return count;
      });
      // as a result, this works as an incremental counter

    var __seqEl = __([__count])
      .tMap(([count]) => (<div>Timer : {count}</div>));

    return __Component(__seqEl);
  };



  var PhysicsComponent = () => {
    //-------Physics-------------------------------
    //MKS system of units
    var V0 = 85.0; // m/s
    var DEG = 40; //degree
    var THETA = DEG / 180 * Math.PI; //radian
    var G = 9.8; //gravity const

    //10msec time resolution
    //t seconds elapsed since t0
    var t = __.time(__.INTERVAL, 10).tMap((tt, t0) => (tt - t0) / 1000);
    var x = t.tMap((t) => V0 * Math.cos(THETA) * t);
    var y = t.tMap((t) => V0 * Math.sin(THETA) * t - 1 / 2 * G * Math.pow(t, 2));
    //==============================================================
    var Drawscale = 2; //2 dot = 1 meter
    var __seqEl = __([x, y]) //atomic update
      .tMap(([x, y]) => (
      <div>
        <svg height = "100%"  width = "100%">
            <circle r="3" fill="red"
        cx = {50 + x * Drawscale} cy = {500 - y * Drawscale}/>
        </svg>
      </div>));

    return __Component(__seqEl);
  };



  //====================================

  var HelloElement = (
  <div>
      <p>HelloElement!!</p>
      =====================
      {HelloComponent()}
      =====================
      {HelloChildrenComponent()}
      =====================
      {HelloChildrenComponent2()}
      =====================
      {HelloChildrenComponent3()}
      =====================
      {ChildrenNumberComponent3()}
      =====================
      {ChildrenNumberComponent5()}
      =====================
      {ChildrenNumberComponent10()}
      =====================
      {ChildrenNumberComponent100()}
      =====================
      {TextComponent()}
      =====================
      {TimerComponent()}
      =====================
      <p>Scroll Down for Physics FRP DEMO</p>
      {PhysicsComponent()}
      =====================
  </div>
  );

  var mount = ReactDOM.render(HelloElement, document.getElementById('container'));

//===================================
})();
