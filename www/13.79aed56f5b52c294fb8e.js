(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{b4ga:function(e,t,n){"use strict";n.r(t),n.d(t,"createSwipeBackGesture",function(){return a});var r=n("k6lV");function a(e,t,n,a,i,o){var u=e.ownerDocument.defaultView;return Object(r.createGesture)({el:e,queue:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:function(e){return e.startX<=50&&n()},onStart:a,onMove:function(e){i(e.deltaX/u.innerWidth)},onEnd:function(e){var t=u.innerWidth,n=e.deltaX/t,r=e.velocityX,a=r>=0&&(r>.2||e.deltaX>t/2),i=(a?1-n:n)*t,c=0;if(i>5){var s=i/Math.abs(r);c=Math.min(s,300)}o(a,n,c)}})}}}]);