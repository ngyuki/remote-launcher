var assert = require('assert');
var args = require('../src/args');

describe('args', () => {

    it('for realpath', () => {
        let vars = args.parse(["node", "temoto.js", "realpath", "--help"], 'bin/temoto.js');
        assert.deepEqual(vars, { command: "exec", args: [ "realpath", "--help" ] });
    });

    it('for symlink', () => {
        let vars = args.parse(["node", "symlink", "--help"], 'bin/temoto.js');
        assert.deepEqual(vars, { command: "exec", args: [ "symlink", "--help" ] });
    });

    it('server', () => {
        let vars = args.parse(["node", "temoto.js", "--server"], 'bin/temoto.js');
        assert.deepEqual(vars, { command: "server" });
    });

    it('local', () => {
        let vars = args.parse(["node", "temoto.js", "--local"], 'bin/temoto.js');
        assert.deepEqual(vars, { command: "local" });
    });
});

