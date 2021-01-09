QUnit.test("Build empty object", function (assert) {
    var result = JSONTree.create({});
    var expected = [
        "<span id=\"opening_1_0\" class=\"jstBracket\">{</span>",
        "<span>&nbsp;<a href=\"#\" class=\"jstCollapse\" onclick=\"JSONTree.click(this); return false; \">-</a>&nbsp;</span>",
        "<ul class=\"jstList\"></ul>",
        "<span id=\"opening_1_0_end\" class=\"jstBracket\">}</span>"
    ].join('');
    assert.equal(result, expected, 'same content');
});

QUnit.test("Build empty array", function (assert) {
    var result = JSONTree.create([]);
    var expected = [
        "<span id=\"opening_2_1\" class=\"jstBracket\">[</span>",
        "<span>&nbsp;<a href=\"#\" class=\"jstCollapse\" onclick=\"JSONTree.click(this); return false; \">-</a>&nbsp;</span>",
        "<ul class=\"jstList\"></ul>",
        "<span id=\"opening_2_1_end\" class=\"jstBracket\">]</span>"
    ].join('');
    assert.equal(result, expected, 'same content');
});


QUnit.test("Build single element object", function (assert) {
    var result = JSONTree.create({key: 'value'});
    var expected = "<span id=\"opening_3_2\" class=\"jstBracket\">{</span><span>&nbsp;<a href=\"#\" class=\"jstCollapse\" onclick=\"JSONTree.click(this); return false; \">-</a>&nbsp;</span><ul class=\"jstList\"><li class=\"jstItem\"><span class=\"jstProperty\">&quot;key&quot;</span><span class=\"jstColon\">: </span><span class=\"jstStr\">&quot;value&quot;</span></li></ul><span id=\"opening_3_2_end\" class=\"jstBracket\">}</span>";
    assert.equal(result, expected, 'same content');
});

QUnit.test("Build multiple elements object", function (assert) {
    var result = JSONTree.create({key: 'value', key2: 'value2'});
    var expected = "<span id=\"opening_4_3\" class=\"jstBracket\">{</span><span>&nbsp;<a href=\"#\" class=\"jstCollapse\" onclick=\"JSONTree.click(this); return false; \">-</a>&nbsp;</span><ul class=\"jstList\"><li class=\"jstItem\"><span class=\"jstProperty\">&quot;key&quot;</span><span class=\"jstColon\">: </span><span class=\"jstStr\">&quot;value&quot;</span><span class=\"jstComma\">,</span></li><li class=\"jstItem\"><span class=\"jstProperty\">&quot;key2&quot;</span><span class=\"jstColon\">: </span><span class=\"jstStr\">&quot;value2&quot;</span></li></ul><span id=\"opening_4_3_end\" class=\"jstBracket\">}</span>";
    assert.equal(result, expected, 'same content');
});

QUnit.test("Build single element array", function (assert) {
    var result = JSONTree.create(['value']);
    var expected = "<span id=\"opening_5_4\" class=\"jstBracket\">[</span><span>&nbsp;<a href=\"#\" class=\"jstCollapse\" onclick=\"JSONTree.click(this); return false; \">-</a>&nbsp;</span><ul class=\"jstList\"><li class=\"jstItem\"><span class=\"jstStr\">&quot;value&quot;</span></li></ul><span id=\"opening_5_4_end\" class=\"jstBracket\">]</span>";
    assert.equal(result, expected, 'same content');
});

QUnit.test("Build multiple elements array", function (assert) {
    var result = JSONTree.create(['value', 'value2']);
    var expected = "<span id=\"opening_6_5\" class=\"jstBracket\">[</span><span>&nbsp;<a href=\"#\" class=\"jstCollapse\" onclick=\"JSONTree.click(this); return false; \">-</a>&nbsp;</span><ul class=\"jstList\"><li class=\"jstItem\"><span class=\"jstStr\">&quot;value&quot;</span><span class=\"jstComma\">,</span></li><li class=\"jstItem\"><span class=\"jstStr\">&quot;value2&quot;</span></li></ul><span id=\"opening_6_5_end\" class=\"jstBracket\">]</span>";
    assert.equal(result, expected, 'same content');
});

QUnit.test("Build complex object", function (assert) {
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
    var expected = "<span id=\"opening_7_6\" class=\"jstBracket\">{</span><span>&nbsp;<a href=\"#\" class=\"jstCollapse\" onclick=\"JSONTree.click(this); return false; \">-</a>&nbsp;</span><ul class=\"jstList\"><li class=\"jstItem\"><span class=\"jstProperty\">&quot;foo&quot;</span><span class=\"jstColon\">: </span><span id=\"opening_7_7\" class=\"jstBracket\">{</span><span>&nbsp;<a href=\"#\" class=\"jstCollapse\" onclick=\"JSONTree.click(this); return false; \">-</a>&nbsp;</span><ul class=\"jstList\"><li class=\"jstItem\"><span class=\"jstProperty\">&quot;bar&quot;</span><span class=\"jstColon\">: </span><span class=\"jstStr\">&quot;foobar&quot;</span><span class=\"jstComma\">,</span></li><li class=\"jstItem\"><span class=\"jstProperty\">&quot;baz&quot;</span><span class=\"jstColon\">: </span><span class=\"jstStr\">&quot;foobaz&quot;</span><span class=\"jstComma\">,</span></li><li class=\"jstItem\"><span class=\"jstProperty\">&quot;qux&quot;</span><span class=\"jstColon\">: </span><span id=\"opening_7_8\" class=\"jstBracket\">[</span><span>&nbsp;<a href=\"#\" class=\"jstCollapse\" onclick=\"JSONTree.click(this); return false; \">-</a>&nbsp;</span><ul class=\"jstList\"><li class=\"jstItem\"><span id=\"opening_7_9\" class=\"jstBracket\">{</span><span>&nbsp;<a href=\"#\" class=\"jstCollapse\" onclick=\"JSONTree.click(this); return false; \">-</a>&nbsp;</span><ul class=\"jstList\"><li class=\"jstItem\"><span class=\"jstProperty\">&quot;foobar&quot;</span><span class=\"jstColon\">: </span><span class=\"jstStr\">&quot;bar&quot;</span><span class=\"jstComma\">,</span></li><li class=\"jstItem\"><span class=\"jstProperty\">&quot;foobaz&quot;</span><span class=\"jstColon\">: </span><span class=\"jstStr\">&quot;baz&quot;</span></li></ul><span id=\"opening_7_9_end\" class=\"jstBracket\">}</span></li></ul><span id=\"opening_7_8_end\" class=\"jstBracket\">]</span></li></ul><span id=\"opening_7_7_end\" class=\"jstBracket\">}</span><span class=\"jstComma\">,</span></li><li class=\"jstItem\"><span class=\"jstProperty\">&quot;bar&quot;</span><span class=\"jstColon\">: </span><span id=\"opening_7_10\" class=\"jstBracket\">[</span><span>&nbsp;<a href=\"#\" class=\"jstCollapse\" onclick=\"JSONTree.click(this); return false; \">-</a>&nbsp;</span><ul class=\"jstList\"><li class=\"jstItem\"><span id=\"opening_7_11\" class=\"jstBracket\">{</span><span>&nbsp;<a href=\"#\" class=\"jstCollapse\" onclick=\"JSONTree.click(this); return false; \">-</a>&nbsp;</span><ul class=\"jstList\"><li class=\"jstItem\"><span class=\"jstProperty\">&quot;foo&quot;</span><span class=\"jstColon\">: </span><span class=\"jstStr\">&quot;barfoo&quot;</span></li></ul><span id=\"opening_7_11_end\" class=\"jstBracket\">}</span><span class=\"jstComma\">,</span></li><li class=\"jstItem\"><span id=\"opening_7_12\" class=\"jstBracket\">{</span><span>&nbsp;<a href=\"#\" class=\"jstCollapse\" onclick=\"JSONTree.click(this); return false; \">-</a>&nbsp;</span><ul class=\"jstList\"><li class=\"jstItem\"><span class=\"jstProperty\">&quot;qux&quot;</span><span class=\"jstColon\">: </span><span class=\"jstNull\">null</span></li></ul><span id=\"opening_7_12_end\" class=\"jstBracket\">}</span></li></ul><span id=\"opening_7_10_end\" class=\"jstBracket\">]</span><span class=\"jstComma\">,</span></li><li class=\"jstItem\"><span class=\"jstProperty\">&quot;qux&quot;</span><span class=\"jstColon\">: </span><span id=\"opening_7_13\" class=\"jstBracket\">[</span><span>&nbsp;<a href=\"#\" class=\"jstCollapse\" onclick=\"JSONTree.click(this); return false; \">-</a>&nbsp;</span><ul class=\"jstList\"><li class=\"jstItem\"><span class=\"jstStr\">&quot;foo&quot;</span><span class=\"jstComma\">,</span></li><li class=\"jstItem\"><span class=\"jstStr\">&quot;bar&quot;</span><span class=\"jstComma\">,</span></li><li class=\"jstItem\"><span class=\"jstStr\">&quot;foobar&quot;</span></li></ul><span id=\"opening_7_13_end\" class=\"jstBracket\">]</span><span class=\"jstComma\">,</span></li><li class=\"jstItem\"><span class=\"jstProperty\">&quot;baz&quot;</span><span class=\"jstColon\">: </span><span class=\"jstBool\">true</span><span class=\"jstComma\">,</span></li><li class=\"jstItem\"><span class=\"jstProperty\">&quot;foobar&quot;</span><span class=\"jstColon\">: </span><span id=\"opening_7_14\" class=\"jstBracket\">[</span><span>&nbsp;<a href=\"#\" class=\"jstCollapse\" onclick=\"JSONTree.click(this); return false; \">-</a>&nbsp;</span><ul class=\"jstList\"><li class=\"jstItem\"><span class=\"jstNum\">0</span><span class=\"jstComma\">,</span></li><li class=\"jstItem\"><span class=\"jstNum\">1</span><span class=\"jstComma\">,</span></li><li class=\"jstItem\"><span class=\"jstNum\">2</span></li></ul><span id=\"opening_7_14_end\" class=\"jstBracket\">]</span></li></ul><span id=\"opening_7_6_end\" class=\"jstBracket\">}</span>";
    assert.equal(result, expected, 'same content');
});

QUnit.test("Build object that needs escaping", function (assert) {
    var result = JSONTree.create({key: "\"value & <>/'\""});
    var expected = '<span id=\"opening_8_15\" class=\"jstBracket\">{</span><span>&nbsp;<a href=\"#\" class=\"jstCollapse\" onclick=\"JSONTree.click(this); return false; \">-</a>&nbsp;</span><ul class=\"jstList\"><li class=\"jstItem\"><span class=\"jstProperty\">&quot;key&quot;</span><span class=\"jstColon\">: </span><span class=\"jstStr\">&quot;\\&quot;value &amp; &lt;&gt;/&#x27;\\&quot;&quot;</span></li></ul><span id=\"opening_8_15_end\" class=\"jstBracket\">}</span>';
    assert.equal(result, expected, 'same content');
});
