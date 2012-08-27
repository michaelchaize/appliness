/**
 * Adobe Edge: symbol definitions
 */
(function($, Edge, compId){
//images folder
var im='images/';

var fonts = {};


var resources = [
];
var symbols = {
"stage": {
   version: "0.1.6",
   build: "0.10.0.134",
   baseState: "Base State",
   initialState: "Base State",
   gpuAccelerate: true,
   content: {
         dom: [
         {
            id:'bk',
            type:'image',
            rect:[0,0,600,600],
            fill:["rgba(0,0,0,0)",'icons/bk.jpg'],
            transform:[[-150,-150],[0,0],[0],[0.5,0.5]]
         },
         {
            id:'Angrybirds-128',
            type:'image',
            rect:[0,0,128,128],
            fill:["rgba(0,0,0,0)",'icons/Angrybirds-128.png'],
            transform:[[-119,227],[-31,0],[0],[0.5,0.5]]
         },
         {
            id:'Cloud-128',
            type:'image',
            rect:[0,0,128,128],
            fill:["rgba(0,0,0,0)",'icons/Cloud-128.png'],
            transform:[[-109,-0],[0,0],[0],[0.5,0.5]]
         },
         {
            id:'Sparrow-128',
            type:'image',
            rect:[0,0,128,128],
            fill:["rgba(0,0,0,0)",'icons/Sparrow-128.png'],
            transform:[[247,289],[0,0],[0],[0.685,0.685]]
         },
         {
            id:'Fraise-128',
            type:'image',
            rect:[0,0,128,128],
            fill:["rgba(0,0,0,0)",'icons/Fraise-128.png'],
            transform:[[-142,187],[0,0],[0],[0.5,0.5]]
         }],
         symbolInstances: [

         ]
      },
   states: {
      "Base State": {
         "${_Cloud-128}": [
            ["transform", "scaleX", '0.5'],
            ["transform", "scaleY", '0.5'],
            ["transform", "translateY", '-0.02px'],
            ["transform", "translateX", '267.99px']
         ],
         "${_Angrybirds-128}": [
            ["transform", "translateX", '-119.6px'],
            ["transform", "rotateZ", '-31deg'],
            ["transform", "scaleX", '0.5'],
            ["transform", "translateY", '227.15px'],
            ["transform", "scaleY", '0.5']
         ],
         "${_Stage}": [
            ["style", "height", '300px'],
            ["style", "overflow", 'hidden'],
            ["color", "background-color", 'rgba(255,255,255,1)'],
            ["style", "width", '300px']
         ],
         "${_Sparrow-128}": [
            ["transform", "translateX", '247.84px'],
            ["transform", "scaleX", '0.68502'],
            ["style", "opacity", '1'],
            ["transform", "translateY", '289.94px'],
            ["transform", "scaleY", '0.68502']
         ],
         "${_bk}": [
            ["transform", "scaleX", '0.5'],
            ["transform", "translateY", '-150px'],
            ["transform", "scaleY", '0.5'],
            ["transform", "translateX", '-150px']
         ],
         "${_Fraise-128}": [
            ["transform", "scaleX", '0.5'],
            ["transform", "scaleY", '0.5'],
            ["transform", "translateY", '180.78px'],
            ["transform", "translateX", '-142.84px']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 5075.17578125,
         autoPlay: true,
         timeline: [
            { id: "eid20", tween: [ "transform", "${_Sparrow-128}", "translateX", '-85.99px', { fromValue: '247.84px'}], position: 0, duration: 5075, easing: "easeInOutQuad" },
            { id: "eid4", tween: [ "transform", "${_Cloud-128}", "translateX", '-96px', { fromValue: '267.99px'}], position: 500, duration: 4575 },
            { id: "eid23", tween: [ "transform", "${_Sparrow-128}", "scaleY", '0.34368', { fromValue: '0.68502'}], position: 0, duration: 5075, easing: "easeInOutQuad" },
            { id: "eid6", tween: [ "transform", "${_Fraise-128}", "translateY", '123px', { fromValue: '180.78px'}], position: 1750, duration: 500, easing: "easeInOutQuad" },
            { id: "eid8", tween: [ "transform", "${_Fraise-128}", "translateY", '196.25px', { fromValue: '123px'}], position: 2250, duration: 460, easing: "easeInOutQuad" },
            { id: "eid11", tween: [ "transform", "${_Fraise-128}", "translateY", '135.51px', { fromValue: '196.25px'}], position: 2710, duration: 584, easing: "easeInOutQuad" },
            { id: "eid14", tween: [ "transform", "${_Fraise-128}", "translateY", '190.34px', { fromValue: '135.51px'}], position: 3294, duration: 455, easing: "easeInOutQuad" },
            { id: "eid17", tween: [ "transform", "${_Fraise-128}", "translateY", '116.76px', { fromValue: '190.34px'}], position: 3750, duration: 500, easing: "easeInOutQuad" },
            { id: "eid19", tween: [ "transform", "${_Fraise-128}", "scaleY", '0.39477', { fromValue: '0.5'}], position: 1750, duration: 960, easing: "easeInOutQuad" },
            { id: "eid12", tween: [ "transform", "${_Fraise-128}", "scaleY", '0.5', { fromValue: '0.39477'}], position: 2710, duration: 584, easing: "easeInOutQuad" },
            { id: "eid15", tween: [ "transform", "${_Fraise-128}", "scaleY", '0.39898', { fromValue: '0.5'}], position: 3294, duration: 455, easing: "easeInOutQuad" },
            { id: "eid18", tween: [ "transform", "${_Fraise-128}", "scaleY", '0.48073', { fromValue: '0.39898'}], position: 3750, duration: 500, easing: "easeInOutQuad" },
            { id: "eid21", tween: [ "transform", "${_Sparrow-128}", "translateY", '-86px', { fromValue: '289.94px'}], position: 0, duration: 5075, easing: "easeInOutQuad" },
            { id: "eid2", tween: [ "transform", "${_Angrybirds-128}", "translateY", '-107.91px', { fromValue: '227.15px'}], position: 0, duration: 1250, easing: "easeInQuad" },
            { id: "eid5", tween: [ "transform", "${_Fraise-128}", "translateX", '-13.91px', { fromValue: '-142.84px'}], position: 1750, duration: 500, easing: "easeInOutQuad" },
            { id: "eid7", tween: [ "transform", "${_Fraise-128}", "translateX", '46.37px', { fromValue: '-13.91px'}], position: 2250, duration: 460, easing: "easeInOutQuad" },
            { id: "eid10", tween: [ "transform", "${_Fraise-128}", "translateX", '117.99px', { fromValue: '46.37px'}], position: 2710, duration: 584, easing: "easeInOutQuad" },
            { id: "eid13", tween: [ "transform", "${_Fraise-128}", "translateX", '193.34px', { fromValue: '117.99px'}], position: 3294, duration: 455, easing: "easeInOutQuad" },
            { id: "eid16", tween: [ "transform", "${_Fraise-128}", "translateX", '291.99px', { fromValue: '193.34px'}], position: 3750, duration: 500, easing: "easeInOutQuad" },
            { id: "eid1", tween: [ "transform", "${_Angrybirds-128}", "translateX", '303.57px', { fromValue: '-119.6px'}], position: 0, duration: 1250, easing: "easeInQuad" },
            { id: "eid22", tween: [ "transform", "${_Sparrow-128}", "scaleX", '0.34368', { fromValue: '0.68502'}], position: 0, duration: 5075, easing: "easeInOutQuad" }         ]
      }
   }
}
};


Edge.registerCompositionDefn(compId, symbols, fonts, resources);

/**
 * Adobe Edge DOM Ready Event Handler
 */
$(window).ready(function() {
     Edge.launchComposition(compId);
});
})(jQuery, AdobeEdge, "EDGE-316521125");
