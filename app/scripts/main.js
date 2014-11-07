addClass = function(el, c) {
  var i = el.className.indexOf(c);
  if(i > -1) return el;
  else return (el.className = (el.className + ' ' + c.trim()).trimLeft(), el); 
}

removeClass = function(el, c) {
  var i = el.className.indexOf(c);
  if(i < 0) return el;
  else return (el.className = el.className.replace(c.trim(), '')
                                          .replace('  ', ' '), 
               el);
}

function extend(el) {
  el.addClass = function(c) {
    addClass(el, c);
  }
  el.removeClass = function(c) {
    removeClass(el, c);
  }
  
  return el;
}

function qq(q) {
  return document.querySelectorAll(q);
}

var nav = qq('nav')[0];

var initialNavOff = nav.offsetTop;

window.onscroll = function(ev) {
  var off = initialNavOff - window.scrollY;
  off = off > 0 ? off : 0;
  nav.style.top = off + "px";
};

function nameToDataTag(txt) {
  return txt.trim()
            .replace(/[A-Z ]/g, function(_) { return _ == " " ? "-" : _.toLowerCase(); });
};

function rgbStrTrim(rgbs) {
  return rgbs.replace(/rgb\(|rgba\(|\)/g, '');
};

var primaryNav   = document.querySelectorAll('.primary > li');
var secondaryNav = document.querySelectorAll('.secondary');
var navBits      = document.querySelectorAll('div.marker');
var contentPages = document.querySelectorAll('.content > section');
