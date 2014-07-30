addClass = function(el, c) {
  var i = el.className.indexOf(c);
  if(i > -1) return el;
  else return (el.className += ' ' + c.trim(), el); 
}

removeClass = function(el, c) {
  var i = el.className.indexOf(c);
  if(i < 0) return el;
  else return (el.className = el.className.replace(c.trim(), '')
                                          .split(' ')
                                          .filter(function(e){return e != ''})
                                          .join(' '), 
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

function nameToDataTag(txt) {
  return txt.trim()
             //alternatively, 
             //.split(" ")
             //.map(function(_) { return "".toLowerCase.call(_) })
             //.join("-");
             .replace(/[A-Z ]/g, function(_) { return _ == " " ? "-" : _.toLowerCase(); })
}

function rgbStrTrim(rgbs) {
  return rgbs.replace(/rgb\(|rgba\(|\)/g, '');
}

var primaryNav   = document.querySelectorAll('.primary > li');
var secondaryNav = document.querySelectorAll('.secondary');
var navBits       = document.querySelectorAll('div.marker');

function switchNavHeading(el) {  
  
  var sub = [].filter.call(secondaryNav,
    function(n) {
      n.removeClass('active');
      return n.className.indexOf(nameToDataTag(el.textContent)) > -1;
    })[0];
  
  var navBit = [].filter.call(navBits,
    function(nb) {
      return nb.parentNode.className == sub.className;
    })[0];
  
  [].forEach.call(primaryNav, function(el) {
    el.removeClass('active');
    navBit.removeClass(el.textContent);
  });
  
  [].forEach.call(sub.children, function(el) {
    el.removeClass('active');
  });
  
  el.addClass('active');
  sub.addClass('active');
  sub.children[0].addClass('active');
  
  var s = el.currentStyle || window.getComputedStyle(el);
  var bc = s.borderBottomColor;
  
  el.parentNode.style.borderBottomColor = bc;
  el.parentNode.style.boxShadow = '0px 5px 5px -5px ' + bc;
  navBit.style.background = bc;
  
  var rgb_bc = rgbStrTrim(bc);
  navBit.style.boxShadow = '-3px 0px 1px -1px rgba(' + 
                              rgb_bc + ', 0.5),' +
                           '3px  0px 1px -1px rgba(' +
                              rgb_bc + ', 0.5)';
}

[].forEach.call(primaryNav, function(el, i) {
  extend(el);
  
  el.addEventListener('click', function() { 
    switchNavHeading(el);
  });

});

[].forEach.call(secondaryNav, function(el) {
  extend(el);
  
  [].forEach.call(el.children, function(c) {
    extend(c);
    c.addEventListener('click', function() {
      [].forEach.call(el.children, function(c) {
        c.removeClass('active');
      });
      c.addClass('active');
    });
    //swap out article.content
  });
});

[].forEach.call(navBits, extend);