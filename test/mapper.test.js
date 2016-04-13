var assert = require('assert');
var mapper = require('../src/mapper');

describe('mapper', () => {
    it('replacePrefix pattern tests', () => {
        var r = mapper.replacePrefix;
        assert.equal(r("/path/to/devel/oreore", "/path/to/devel",  "D:\\devel"),   "D:\\devel\\oreore");
        assert.equal(r("/path/to/devel/oreore", "/path/to/devel/", "D:\\devel"),   "D:\\devel\\oreore");
        assert.equal(r("/path/to/devel/oreore", "/path/to/devel",  "D:\\devel\\"), "D:\\devel\\oreore");
        assert.equal(r("/path/to/devel/oreore", "/path/to/devel/", "D:\\devel\\"), "D:\\devel\\oreore");
        assert.equal(r("/path/to/other/oreore", "/path/to/devel/", "D:\\devel"),   null);
    });
});
