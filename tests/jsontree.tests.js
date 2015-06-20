QUnit.test("Represent simple object as HTML tree", function(assert) {
  var object = {name: 'some value'};
  JSONTree.newId = function() {
    return 'static_id';
  };
  var tree = JSONTree.create(object);
  var expected = '<div class=\"json-content\">{<span onclick=\"JSONTree.toggleVisible(\'collapse_jsonstatic_id\')\"><span class=\"json-object-collapse\"></span></span><div class=\"json-visible json-object\" id=\"collapse_jsonstatic_id\"><div><span class=\"json-property\">\"name\"</span> : <span class=\"json-string\">\"some value\"</span></div></div>}</div>';
  assert.equal(tree, expected, 'whitespace equals');
});

QUnit.test("Represent object with array", function(assert) {
  var object = {names: ['some value', 'other value']};
  JSONTree.newId = function() {
    return 'other_static_id';
  };
  var tree = JSONTree.create(object);
  var expected = '<div class=\"json-content\">{<span onclick=\"JSONTree.toggleVisible(\'collapse_jsonother_static_id\')\"><span class=\"json-object-collapse\"></span></span><div class=\"json-visible json-object\" id=\"collapse_jsonother_static_id\"><div><span class=\"json-property\">\"names\"</span> : [<span onclick=\"JSONTree.toggleVisible(\'collapse_jsonother_static_id\')\"><span class=\"json-object-collapse\"></span></span><div class=\"json-visible json-object\" id=\"collapse_jsonother_static_id\"><div><span class=\"json-string\">\"some value\"</span>,</div><div><span class=\"json-string\">\"other value\"</span></div></div>]</div></div>}</div>';
  assert.equal(tree, expected, 'whitespace equals');
});