// JSONTree 0.1.2
function JSONTree(collapse_icon,expand_icon) {
		
	var id = 0;
	var collapse_icon = collapse_icon != null ? collapse_icon : span('',{'class' : 'json-object-collapse'});
	var expand_icon = expand_icon != null ? expand_icon : span('',{'class' : 'json-object-expand'});
	
	function html(type, text, attrs) {
		var html = '<' + type;
		if (attrs != null) {
			Object.keys(attrs).forEach(function(attr) {
				html += ' ' + attr + '=\"' + attrs[attr] + '\"';
			});
		}
		html += '>' + text + '</' + type + '>';
		return html;
	}
	
	function div(text, attrs) {
		return html('div', text, attrs);
	}

	function span(text, attrs) {
		return html('span', text, attrs);
	}

	this.create=function(data) {
		id = 0;
		return div(jsValue(data), {'class': 'json-content'});
	}
	
	/* icon for collapsing/expanding a json object/array */
	function collapseIcon(id) {
		var attrs = {'onclick': "jsonTree.toggleVisible('collapse_json" + id + "')" };
		return span(collapse_icon, attrs);
	}
	
	/* toggles an object visibility */
	this.toggleVisible=function(id) {
		var element = document.getElementById(id);
		var element_class = element.className;
		var classes = element_class.split(" ");
		var visible = false;
		for (var i = 0; i < classes.length; i++) {
			if (classes[i] === "json-visible") {
				visible = true;
				break;
			}
		}
		element.className = visible ? "json-collapsed json-object" : "json-object json-visible";
		element.previousSibling.innerHTML = visible ? expand_icon : collapse_icon;
	}
	
	/* a json value might be a string, number, boolean, object or an array of other values */
	function jsValue(value) {
		if (value == null) {
			return jsText("null","null");
		}
		var type = typeof value;
		if (type === 'boolean' || type === 'number') {
			return jsText(type,value);
		} else if (type === 'string') {
			return jsText(type,'"' + value + '"');
		}
		 else {
			id += 1;
			return value instanceof Array ? jsArray(id, value) : jsObject(id, value);
		}
	}
	
	/* json object is made of property names and jsonValues */
	function jsObject(id, data) {
		var object_content = "{" + collapseIcon(id);;
		var object_properties = '';
		Object.keys(data).forEach(function(name, position, names) {
			if (position == names.length - 1) { // dont add the comma
				object_properties += div(jsProperty(name, data[name]));
			} else {
				object_properties += div(jsProperty(name, data[name]) + ',');
			}			
		});
		object_content += div(object_properties, {'class': 'json-visible json-object', 'id': "collapse_json" + id});
		return object_content += "}";
	}
	
	/* a json property, name + value pair */
	function jsProperty(name, value) {
		return span('"' + name + '"', {'class': 'json-property'}) + " : " + jsValue(value);
	}
	
	/* array of jsonValues */
	function jsArray(id, data) {
		var array_content = "[" + collapseIcon(id);;
		var values = '';
		for (var i = 0; i < data.length; i++) {
			if (i == data.length - 1) {
				values += div(jsValue(data[i]));
			} else {
				values += div(jsValue(data[i]) + ',');
			}
		}
		array_content += div(values, {'class':'json-visible json-object', 'id': 'collapse_json' + id});
		return array_content += "]";
	}
	
	/* simple value(string, boolean, number...) */
	function jsText(type, value) {
		return span(value, {'class': "json-" + type});
	}
}
