var JSONTree = (function() { // eslint-disable-line no-unused-vars
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#x27;',
    '/': '&#x2F;',
  };

  var internalId = 0;
  var instances = 0;

  this.create = function(data, settings) {
    instances += 1;
    return _jsVal(data);
  };

  this.click = function(elem) {
    var symbol = elem.innerHTML;
    if (symbol === '-') {
      var id = elem.parentElement.previousElementSibling.id;
      var siblings = _nextUntil(elem.parentElement, id + '_end');
      _hide(elem.parentElement, siblings);
      elem.innerHTML = '+';
    } else {
      var parent = elem.parentElement;
      var block = parent.nextElementSibling;
      var children = block.children;
      for (var i = children.length; i > 0; i--) {
        var child = children[i - 1];
        parent.after(child);
      }
      block.remove();
      elem.innerHTML = '-';
    }
  };

  var _id = function() {
    return instances + '_' + internalId++;
  };

  var _escape = function(text) {
    return text.replace(/[&<>'"]/g, function(c) {
      return escapeMap[c];
    });
  };

  var _jsVal = function(value) {
    var type = typeof value;
    switch (type) {
      case 'boolean':
        return _jsBool(value);
      case 'number':
        return _jsNum(value);
      case 'string':
        return _jsStr(value);
      default:
        if (value === null) {
          return _jsNull();
        } else if (value instanceof Array) {
          return _jsArr(value);
        } else {
          return _jsObj(value);
        }
    }
  };

  var _jsObj = function(object) {
    var id = _id();
    var elements = [];
    var keys = Object.keys(object);
    keys.forEach(function(key, index) {
      var html = ['<li class="jstItem">', _property(key, object[key])];
      if (index !== keys.length - 1) {
        html.push(_comma());
      }
      html.push('</li>');
      elements.push(html.join(''));
    });
    var body = elements.join('');
    return _collection(_open('{', id), body, _close('}', id));
  };

  var _collapseElem = function() {
    var onClick = 'onclick="JSONTree.click(this); return false;';
    var a = '<a href="#" class="jstCollapse" ' + onClick + ' ">-</a>';
    return '<span>&nbsp;' + a + '&nbsp;</span>';
  };

  var _collection = function(opening, data, closing) {
    return [
      opening,
      _collapseElem(),
      '<ul class="jstList">',
      data,
      '</ul>',
      closing,
    ].join('');
  };

  var _jsArr = function(array) {
    var id = _id();
    var elements = [];
    array.forEach(function(element, index) {
      var html = ['<li class="jstItem">', _jsVal(element)];
      if (index !== array.length - 1) {
        html.push(_comma());
      }
      html.push('</li>');
      elements.push(html.join(''));
    });
    var body = elements.join('');
    return _collection(_open('[', id), body, _close(']', id));
  };

  var _jsStr = function(value) {
    var jsonString = _escape(JSON.stringify(value));
    return _element(jsonString, {class: 'jstStr'});
  };

  var _jsNum = function(value) {
    return _element(value, {class: 'jstNum'});
  };

  var _jsBool = function(value) {
    return _element(value, {class: 'jstBool'});
  };

  var _jsNull = function() {
    return _element('null', {class: 'jstNull'});
  };

  var _property = function(name, value) {
    var escapedValue = _escape(JSON.stringify(name));
    var property = _element(escapedValue, {class: 'jstProperty'});
    var propertyValue = _jsVal(value);
    return [property + _colon(), propertyValue].join('');
  };

  var _colon = function() {
    return _element(': ', {class: 'jstColon'});
  };

  var _comma = function() {
    return _element(',', {class: 'jstComma'});
  };

  var _element = function(content, attrs) {
    var attrsStr = Object.keys(attrs).map(function(attr) {
      return ' ' + attr + '="' + attrs[attr] + '"';
    }).join('');
    return '<span' + attrsStr + '>' + content + '</span>';
  };

  var _open = function(sym, id) {
    return _element(sym, {id: 'opening_' + id, class: 'jstBracket'});
  };

  var _close = function(sym, id) {
    return _element(sym, {id: 'opening_' + id + '_end', class: 'jstBracket'});
  };

  var _nextUntil = function(elem, id) {
    var siblings = [];
    elem = elem.nextElementSibling;
    while (elem) {
      if (elem.id == id) {
        break;
      }
      siblings.push(elem);
      elem = elem.nextElementSibling;
    }
    return siblings;
  };

  var _hide = function(elem, siblings) {
    var wrapper = document.createElement('div');
    wrapper.className = 'jstHiddenBlock';
    siblings.forEach(function(s) {
      wrapper.appendChild(s);
    });
    elem.after(wrapper);
  };

  return this;
})();
