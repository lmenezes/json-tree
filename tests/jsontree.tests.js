QUnit.test("#1 Represent empty object", function(assert) {
  var result = JSONTree.create({});
  var expected = '<span class=\"jstValue\"><span><span class=\"jstBracket\">{</span><span class=\"jstFold\" onclick=\"JSONTree.toggle(\'1_0\')\"></span>\n<span id=\"1_0\"></span>\n<span>}</span></span></span>';
  assert.equal(result, expected, 'same content');
});

QUnit.test("#2 Represent empty array", function(assert) {
  var result = JSONTree.create([]);
  var expected = '<span class=\"jstValue\"><span class=\"jstBracket\">[</span><span class=\"jstFold\" onclick=\"JSONTree.toggle(\'2_1\')\"></span>\n<span id=\"2_1\"></span>\n<span>]</span></span>';
  assert.equal(result, expected, 'same content');
});

QUnit.test("#3 Represent flat object", function(assert) {
  var result = JSONTree.create({key: 'value'});
  var expected = '<span class=\"jstValue\"><span><span class=\"jstBracket\">{</span><span class=\"jstFold\" onclick=\"JSONTree.toggle(\'3_2\')\"></span>\n<span id=\"3_2\"><span class=\"jstProperty\">  &quot;key&quot;: <span><span class=\"jstStr\">&quot;value&quot;</span></span></span></span>\n<span>}</span></span></span>';
  assert.equal(result, expected, 'same content');
});

QUnit.test("#4 Represent flat array", function(assert) {
  var result = JSONTree.create(['value']);
  var expected = '<span class=\"jstValue\"><span class=\"jstBracket\">[</span><span class=\"jstFold\" onclick=\"JSONTree.toggle(\'4_3\')\"></span>\n<span id=\"4_3\"><span class=\"jstStr\">  &quot;value&quot;</span></span>\n<span>]</span></span>';
  assert.equal(result, expected, 'same content');
});

QUnit.test("#5 Represent complex obejct", function(assert) {
  var result = JSONTree.create({
    foo: {
      bar: 'foobar',
      baz: 'foobaz',
      qux: [
        {
          foobar: 'bar',
          foobaz: 'baz'
        }
      ]
    },
    bar: [
      {foo: 'barfoo'},
      {qux: null}
    ],
    qux: [
        'foo',
        'bar',
        'foobar'
    ],
    baz: true,
    foobar: [0, 1, 2]
  });
  var expected = '<span class=\"jstValue\"><span><span class=\"jstBracket\">{</span><span class=\"jstFold\" onclick=\"JSONTree.toggle(\'5_4\')\"></span>\n<span id=\"5_4\"><span class=\"jstProperty\">  &quot;foo&quot;: <span><span><span class=\"jstBracket\">{</span><span class=\"jstFold\" onclick=\"JSONTree.toggle(\'5_5\')\"></span>\n<span id=\"5_5\"><span class=\"jstProperty\">    &quot;bar&quot;: <span><span class=\"jstStr\">&quot;foobar&quot;</span></span></span><span class=\"jstComma\">,\n</span><span class=\"jstProperty\">    &quot;baz&quot;: <span><span class=\"jstStr\">&quot;foobaz&quot;</span></span></span><span class=\"jstComma\">,\n</span><span class=\"jstProperty\">    &quot;qux&quot;: <span><span class=\"jstBracket\">[</span><span class=\"jstFold\" onclick=\"JSONTree.toggle(\'5_6\')\"></span>\n<span id=\"5_6\"><span><span class=\"jstBracket\">      {</span><span class=\"jstFold\" onclick=\"JSONTree.toggle(\'5_7\')\"></span>\n<span id=\"5_7\"><span class=\"jstProperty\">        &quot;foobar&quot;: <span><span class=\"jstStr\">&quot;bar&quot;</span></span></span><span class=\"jstComma\">,\n</span><span class=\"jstProperty\">        &quot;foobaz&quot;: <span><span class=\"jstStr\">&quot;baz&quot;</span></span></span></span>\n<span>      }</span></span></span>\n<span>    ]</span></span></span></span>\n<span>  }</span></span></span></span><span class=\"jstComma\">,\n</span><span class=\"jstProperty\">  &quot;bar&quot;: <span><span class=\"jstBracket\">[</span><span class=\"jstFold\" onclick=\"JSONTree.toggle(\'5_8\')\"></span>\n<span id=\"5_8\"><span><span class=\"jstBracket\">    {</span><span class=\"jstFold\" onclick=\"JSONTree.toggle(\'5_9\')\"></span>\n<span id=\"5_9\"><span class=\"jstProperty\">      &quot;foo&quot;: <span><span class=\"jstStr\">&quot;barfoo&quot;</span></span></span></span>\n<span>    }</span></span><span class=\"jstComma\">,\n</span><span><span class=\"jstBracket\">    {</span><span class=\"jstFold\" onclick=\"JSONTree.toggle(\'5_10\')\"></span>\n<span id=\"5_10\"><span class=\"jstProperty\">      &quot;qux&quot;: <span><span class=\"jstNull\">null</span></span></span></span>\n<span>    }</span></span></span>\n<span>  ]</span></span></span><span class=\"jstComma\">,\n</span><span class=\"jstProperty\">  &quot;qux&quot;: <span><span class=\"jstBracket\">[</span><span class=\"jstFold\" onclick=\"JSONTree.toggle(\'5_11\')\"></span>\n<span id=\"5_11\"><span class=\"jstStr\">    &quot;foo&quot;</span><span class=\"jstComma\">,\n</span><span class=\"jstStr\">    &quot;bar&quot;</span><span class=\"jstComma\">,\n</span><span class=\"jstStr\">    &quot;foobar&quot;</span></span>\n<span>  ]</span></span></span><span class=\"jstComma\">,\n</span><span class=\"jstProperty\">  &quot;baz&quot;: <span><span class=\"jstBool\">true</span></span></span><span class=\"jstComma\">,\n</span><span class=\"jstProperty\">  &quot;foobar&quot;: <span><span class=\"jstBracket\">[</span><span class=\"jstFold\" onclick=\"JSONTree.toggle(\'5_12\')\"></span>\n<span id=\"5_12\"><span class=\"jstNum\">    0</span><span class=\"jstComma\">,\n</span><span class=\"jstNum\">    1</span><span class=\"jstComma\">,\n</span><span class=\"jstNum\">    2</span></span>\n<span>  ]</span></span></span></span>\n<span>}</span></span></span>';
  assert.equal(result, expected, 'same content');
});

QUnit.test("#6 Handle escaping of content", function(assert) {
  var result = JSONTree.create({key: "\"value\""});
  var expected = '<span class=\"jstValue\"><span><span class=\"jstBracket\">{</span><span class=\"jstFold\" onclick=\"JSONTree.toggle(\'6_13\')\"></span>\n<span id=\"6_13\"><span class=\"jstProperty\">  &quot;key&quot;: <span><span class=\"jstStr\">&quot;\\&quot;value\\&quot;&quot;</span></span></span></span>\n<span>}</span></span></span>';
  assert.equal(result, expected, 'same content');
});
