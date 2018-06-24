// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var $ = require("jquery");
var changeFile = require('./change_file.js');
// var btn = document.getElementById('handleBtn');
// btn.addEventListener('click', () => {
// 	// console.log('in')
// 	alert('in');
// });
$("#handleBtn").on('click', () => {
	let dir = $('#dir')[0].value;
	let targetDir = $('#targetDir')[0].value;
	
	let sourceMail = $('#sourceMail')[0].value;
	let targetMail = $('#targetMail')[0].value;
	let sourceName = $('#sourceName')[0].value;
	let targetName = $('#targetName')[0].value;
	let sourceCard = $('#sourceCard')[0].value;
	let targetCard = $('#targetCard')[0].value;
	let sourceCity = $('#sourceCity')[0].value;
	let targetCity = $('#targetCity')[0].value;
	let sourceOther1 = $('#sourceOther1')[0].value;
	let targetOther1 = $('#targetOther1')[0].value;

	let sourceOther2 = $('#sourceOther2')[0].value;
	let targetOther2 = $('#targetOther2')[0].value;

	let source = [sourceMail, sourceName, sourceCard, sourceCity];
	let target = [targetMail, targetName, targetCard, targetCity];
	if (sourceOther1 && targetOther1) {
		source.push(sourceOther1);
		target.push(targetOther1);
	}
	if (sourceOther2 && targetOther2) {
		source.push(sourceOther2);
		target.push(targetOther2);
	}
	changeFile(dir, targetDir, source, target);
	console.log(dir);
});