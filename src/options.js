const argv = require('minimist')(process.argv.slice(2));

if (argv._.length !== 1) {
	throw new Error('请选择一个操作 (either create or read)')
}

if (['create', 'read'].indexOf(argv._[0]) === -1) {
	throw new Error('错误的操作' + argv._[0] + ' - p请选择一个操作 (either create or read)');
}

if (!argv.in) {
	throw new Error('缺少必要的参数, 请选择一个图片源');
}

if (!argv.key) {
	throw new Error('缺少必要的参数, 请输入秘钥key');
}

argv.action = argv._[0];

if (argv.action === 'create') {
	if (!argv.out) {
		throw new Error('缺少必要的参数, 请选择一个图片输出路径');
	}

	if (!argv.msg) {
		throw new Error('缺少必要的参数, 请输入要加密的信息');
	}
}

module.exports = argv;