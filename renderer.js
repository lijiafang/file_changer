// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var $ = require("jquery");
var changeFile = require('./change_file.js');

function getValue(id) {
	return document.getElementById(id).value.trim();
}

$("#handleBtn").on('click', () => {
	let dir = getValue('dir');
	let targetDir = getValue('targetDir');
	let sourceMail = getValue('sourceMail');
	let targetMail = getValue('targetMail');
	let sourceName = getValue('sourceName');
	let targetName = getValue('targetName');
	let sourceCard = getValue('sourceCard');
	let targetCard = getValue('targetCard');
	let sourceCity = getValue('sourceCity');
	let targetCity = getValue('targetCity');

	let source = [sourceMail, sourceName, sourceCard, sourceCity];
	let target = [targetMail, targetName, targetCard, targetCity];
	for (let i = 1; i < 6; i ++) {
		let sourceOther = getValue('sourceOther' + i);
		let targetOther = getValue('targetOther' + i);
		if (sourceOther && targetOther) {
			source.push(sourceOther);
			target.push(targetOther);
		}
	}
	$('#result').text('执行结果：\n');
	changeFile(dir, targetDir, source, target, (info) => {
		$('#result').append('<p>' + info + '</p>');
	});
});