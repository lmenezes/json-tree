function JSONTree(collapse_icon,expand_icon) {
	this.node_id = 0;
	this.collapse_icon = collapse_icon != null ? collapse_icon : "<span>-</span>";
	this.expand_icon = expand_icon != null ? expand_icon : "<span>+</span>";
	
	this.create=function(data) {
		this.node_id = 0;
		return '<div class=\"json-content\">' + this.jsonComplexValue(data) + '</div>';
	}

	/* complex value(array or object) */
	this.jsonComplexValue=function(data) {
		var is_array = data instanceof Array;
		this.node_id += 1;
		return is_array ? this.jsonArray(this.node_id, data) : this.jsonObject(this.node_id, data);
	}
	
	/* icon for collapsing/expanding a json object/array */
	this.collapseIcon=function(id) {
		var icon = "<span class=\"json-object-collapse\" onclick=\"jsonTree.toggleVisible('collapse_json" + id + "')\">";
		icon += this.collapse_icon + "</span>";
		return icon;
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
		element.previousSibling.innerHTML = visible ? this.expand_icon : this.collapse_icon;
		element.previousSibling.className = visible ? "json-object-expand" : "json-object-collapse";
	}
	
	/* a json value might be a string, number, boolean, object or an array of other values */
	this.jsonValue=function(value) {
		if (value == null) {
			return this.jsonSimpleValue("null","null");
		}
		var type = typeof value;
		if (type === 'boolean' || type === 'number' || type === 'string') {
			return this.jsonSimpleValue(type,value);
		} else {
			return this.jsonComplexValue(value);
		}
	}
	
	/* json object is made of property names and jsonValues */
	this.jsonObject=function(id, data) {
		var object_content = "{";
		object_content += this.collapseIcon(id);
		object_content += "<div class=\"json-visible json-object\" id=\"collapse_json" + id + "\">";
		var jsonProperty = this.jsonProperty;
		var properties = Object.keys(data);
		for (var i = 0; i < properties.length; i++) {
			var property = properties[i];
			if (i == properties.length - 1) { // dont add the comma
				object_content += '<div>' + this.jsonProperty(property, data[property]) + '</div>';
			} else {
				object_content += '<div>' + this.jsonProperty(property, data[property]) + ',</div>';	
			}
		}
		object_content += "</div>";
		object_content += "}";
		return object_content;
	}
	
	/* a json property, name + value pair */
	this.jsonProperty=function(name, value) {
		return '<span class="json-property">\"'+name+"\"</span> : " + this.jsonValue(value);
	}
	
	/* array of jsonValues */
	this.jsonArray=function(id, data) {
		var array_content = "[";
		array_content += this.collapseIcon(id);
		array_content += "<div class=\"json-visible json-object\" id=\"collapse_json" + id + "\">";
		for (var i = 0; i < data.length; i++) {
			if (i == data.length - 1) {
				array_content += '<div>' + this.jsonValue(data[i])+ '</div>';
			} else {
				array_content += '<div>' + this.jsonValue(data[i])+ ',</div>';	
			}
		}
		array_content += "</div>";
		array_content += "]";
		return array_content;
	}
	
	/* simple value(string, boolean, number...) */
	this.jsonSimpleValue=function(type, value) {
		return "<span class=\"json-" + type + "\">"+value+"</span>";
	}
}
