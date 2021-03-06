"use strict";
var dir = 'src/common/class/';
var tools_1 = require("./tools");
var vars = { dir: dir };
var Tool = (function () {
    function Tool() {
    }
    Tool.actions = function (short) {
        if (short === void 0) { short = true; }
        return short ? ['create (c)', 'remove (r)'] : ['create', 'remove'];
    };
    Tool.do = function (action) {
        switch (action) {
            case 'c':
            case 'create': return Tool.create;
            case 'r':
            case 'remove': return Tool.remove;
            default:
                tools_1.error((action ? 'unkown action "' + action + '"' : 'must define an action') + '\navailable actions: ' + Tool.actions().join(', '));
                return;
        }
    };
    Tool.init = function (args) {
        if (args.length) {
            vars.Name = args[0];
            vars.name = args[1] || tools_1.hyphen(args[0]);
            return true;
        }
        else {
            tools_1.error('use ts-webapp class <' + Tool.actions().join('/') + '> <class name> <filename?>');
            return false;
        }
    };
    Tool.create = function (args) {
        if (!Tool.init(args)) {
            return;
        }
        tools_1.writeFile(tools_1.tpl('{dir}/{name}.class.ts', vars), tools_1.tplFile('class.ts', vars));
        tools_1.addBefore(tools_1.tpl('{dir}/index.ts', vars), '/// exports', tools_1.tpl('export * from \'./{name}.class\';', vars));
    };
    Tool.remove = function (args) {
        if (!Tool.init(args)) {
            return;
        }
        tools_1.deleteFile(tools_1.tpl('{dir}/{name}.class.ts', vars));
        tools_1.removeLine(tools_1.tpl('{dir}/index.ts', vars), tools_1.tpl('export * from \'./{name}.class\';', vars));
    };
    return Tool;
}());
exports.Class = Tool;
//# sourceMappingURL=class.js.map