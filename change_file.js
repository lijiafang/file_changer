var readline = require('readline');  
var fs = require('fs');  
var path = require('path');
var utils = require('./utils');

var isDir = (dirPath, info) => {
	return new Promise((resolve, reject) => {
		fs.stat(dirPath,function(err,stats){
            if(err){
            	console.log(err);
            	reject(info + ':目录地址有误!');
            }else{
                var isFile = stats.isFile();//是文件
                var isDir = stats.isDirectory();//是文件夹
                if(isFile){
                	reject(info + ':目录地址有误!')
                }
                if(isDir){
                	resolve('dir');
                }
            }
        })
	});
}

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
var readDir = (dirPath) => {
    //根据文件路径读取文件，返回文件列表
    return new Promise((resolve, reject) => {
    	fs.readdir(dirPath, function(err,files){
	        if(err){
	        	reject('读取原文件目录失败！');
	        }else{
	        	resolve(files);
	        }
	    });
    })
}	

var printInfo = (info, callback) => {
	callback && callback(info)
}

var main = (dir, targetDir, source, target, callback) => {
	dir = path.resolve(dir);
	targetDir = targetDir ? path.resolve(targetDir) : path.dirname(dir);

	isDir(targetDir, '目标文件')
	.then((value) => {
		return isDir(dir, '原文件');
	})
	.then((value) => {
		return readDir(dir);
	})
	.then((files) => {
		files.forEach((item) => {
			if (/^\./.test(item)) {
				return;
			}
			var fileName = path.join(dir, item);
			var fRead = fs.createReadStream(fileName); 
			let targetFileDir = path.resolve(targetDir + '/'+  path.basename(fileName));
			readFile(fRead).then((fileInfo) => {
				if (fileInfo === 500) {
					printInfo('-读取失败:' + fileName, callback);
				}
				else {
					let {data, lastLine} = fileInfo;
					let handleResult = handleFile(data, source, target);
					let result = `${handleResult}\n${lastLine}`;
					fs.writeFile(targetFileDir, result,  function(err) {
					   	if (err) {
							printInfo('-写入失败:' + fileName, callback);
					   	}
					   	else {
							printInfo('-成功:' + fileName, callback);
					   	}
					});
				}
			}); 
		});
	})
	.catch((e) => {
		printInfo(e, callback);
	});
}
module.exports = main;
