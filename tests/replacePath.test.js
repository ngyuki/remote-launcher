var assert = require('assert');
var replacePath = require('../src/replacePath');

describe('replacePath', function () {
    it('replacePrefix pattern tests', function () {
        var r = replacePath.replacePrefix;
        assert.equal(r("/path/to/devel/oreore", "/path/to/devel",  "D:\\devel"),   "D:\\devel\\oreore");
        assert.equal(r("/path/to/devel/oreore", "/path/to/devel/", "D:\\devel"),   "D:\\devel\\oreore");
        assert.equal(r("/path/to/devel/oreore", "/path/to/devel",  "D:\\devel\\"), "D:\\devel\\oreore");
        assert.equal(r("/path/to/devel/oreore", "/path/to/devel/", "D:\\devel\\"), "D:\\devel\\oreore");
        assert.equal(r("/path/to/other/oreore", "/path/to/devel/", "D:\\devel"),   null);
    });
});
