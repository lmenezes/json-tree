var JSONTree = (function() {

  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#x27;',
    '/': '&#x2F;'
  };

  var internalId = 0;
  var instances = 0;

  this.create = function(data, settings) {
    instances += 1;
    var value = _jsVal(data, 0);
    return '<span class="jstValue">' + value + '</span>';
  };

  this.click = function(elem) {
    var symbol = elem.innerHTML;
    if (symbol ===  '-') {
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

  var _jsVal = function(value, depth) {
    var type = typeof value;
    switch (type) {
      case 'boolean':
        return _jsBool(value, depth);
      case 'number':
        return _jsNum(value, depth);
      case 'string':
        return _jsStr(value, depth);
      default:
        if (value === null) {
          return _jsNull(depth);
        } else if (value instanceof Array) {
          return _jsArr(value, depth);
        } else {
          return _jsObj(value, depth);
        }
    }
  };

  var _jsObj = function(object, depth) {
    var id = _id();
    var body = Object.keys(object).map(function(property) {
      var prop = _property(property, object[property], depth + 1);
      return _indent(depth + 1) + prop;
    }).join(_comma() + _br());
    return _collection(_open('{', id), body, _close('}', id), depth);
  };

  var _collapseElem = function() {
    var onClick = 'onclick="JSONTree.click(this); return false;';
    var a = '<a href="#" class="jstCollapse" ' + onClick + ' ">-</a>';
    return '<span>&nbsp;' + a + '&nbsp;</span>';
  };

  var _collection = function(opening, data, closing, depth) {
    return [
      opening,
      _collapseElem(),
      _br(), // TODO: avoid line break for empty collections?
      data,
      _br(),
      _indent(depth),
      closing
    ].join('');
  };

  var _jsArr = function(array, depth) {
    var  id = _id();
    var body = array.map(function(element) {
      return _indent(depth + 1) + _jsVal(element, depth + 1);
    }).join(_comma() + _br());
    return _collection(_open('[', id), body, _close(']', id), depth);
  };

  var _jsStr = function(value, depth) {
    var jsonString = _escape(JSON.stringify(value));
    return _element(jsonString, {class: 'jstStr'});
  };

  var _jsNum = function(value, depth) {
    return _element(value, {class: 'jstNum'});
  };

  var _jsBool = function(value, depth) {
    return _element(value, {class: 'jstBool'});
  };

  var _jsNull = function(depth) {
    return _element('null', {class: 'jstNull'});
  };

  var _property = function(name, value, depth) {
    var escapedValue = _escape(JSON.stringify(name));
    var property = _element(escapedValue, {class: 'jstProperty'});
    var propertyValue = _jsVal(value, depth);
    return [
      property + _colon(),
      propertyValue
    ].join('');
  };

  var _colon = function() {
    return _element(': ', {class: 'jstColon'});
  };

  var _comma = function() {
    return _element(',', {class: 'jstComma'});
  };

  var _span = function(value, attrs) {
    return _tag('span', attrs, value);
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

  var _indent = function(depth) {
    return _element(Array((depth * 2) + 1).join('&nbsp;'), {});
  };

  var _br = function() {
    return '<br>';
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
