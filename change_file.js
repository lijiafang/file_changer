var readline = require('readline');  
var fs = require('fs');  
var path = require('path');

var handleFile = (data, source, target) => {
	let dataList = (data.toString()).split('Content-Transfer-Encoding: base64');
	let preData = dataList[0];
	// preData = preData.replace(/79731859/g, '147757040');
	let contentData = (new Buffer(dataList[1], 'base64')).toString();
	// contentData = contentData.replace(/王新科/g, '李鹏');
	source.forEach((item, index) => {
		if (item) {
			let reg = new RegExp(item, 'g');
			preData = preData.replace(reg, target[index]);
			contentData = contentData.replace(reg, target[index]);
		}
	});

	contentData = (new Buffer(contentData)).toString('base64');
	let re = new RegExp('\.{1,76}', "g");
	contentData = contentData.match(re).join('\n');
	return preData + 'Content-Transfer-Encoding: base64\n' + '\n' +  contentData;
}

var readFile = (fRead) => {
	let objReadline = readline.createInterface({  
	    input: fRead,  
	});  

	let index = 1;  
	let lastLine = '';
	let data = '';
	objReadline.on('line', (line)=>{  
		data += line + '\n';
	    if (line) {
	    	lastLine = line;
	    }
	    index ++;  
	});  
	return new Promise((resolve, reject) => {
		objReadline.on('close', ()=>{  
		    resolve({data, lastLine});
		});
		objReadline.on('error', (e) => {
			reject(500);
		}) 
	});
	 
}
	


var main = (dir, targetDir, source, target) => {
	// var dir = '/Users/helloworld/Downloads/中国建设银行信用卡电子账单[1].eml';
	// var fReadName = '中国建设银行信用卡电子账单[1].eml';  
	dir = path.resolve(dir);
	targetDir = targetDir ? targetDir : path.dirname(dir);
	fs.exists(targetDir, function(exists) {  
		if (!exists) {
			alert('目标目录不存在!')
		}
		else {
			let targetFileDir = path.resolve(targetDir + '/'+  path.basename(dir));
			var fRead = fs.createReadStream(dir); 

			readFile(fRead).then((fileInfo) => {
				if (fileInfo === 500) {
					console.log('读取文件失败');
				}
				else {
					let {data, lastLine} = fileInfo;
					let handleResult = handleFile(data, source, target);
					let result = `${handleResult}\n${lastLine}`;
					fs.writeFile(targetFileDir, result,  function(err) {
					   	if (err) {
					       	return console.error(err);
					   	}
					   	// console.log("数据写入成功！");
					   	alert('修改文件成功！');
					});
				}
			}); 
		}
	
	});
}
module.exports = main;
