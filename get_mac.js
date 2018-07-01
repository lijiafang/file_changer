var util = require('emailjs-mime-codec');
var iconv = require('iconv-lite');

var testStr = `<html><head><title>=D6=D0=B9=FA=B9=A4=C9=CC=D2=F8=D0=D0=D0=C5=D3=C3=BF=A8=
=B6=D4=D5=CB=B5=A5</title>`;

var re = util.quotedPrintableDecode(testStr, 'gbk');
console.log('----re:', re);


var initStr = '<html><head><title>中国工商银行信用卡对账单</title>';
var cStr = iconv.encode(initStr, 'gbk');
// var cStr = Buffer.from(initStr, 'gbk');
var cRe = util.quotedPrintableEncode(cStr, 'gbk');
console.log('---origin:', testStr);
console.log('----en:', cRe);

// var util = require('getmac');

// util.getMac(function(err, macAddress){
//     if (err)  throw err
//     console.log(macAddress)
// })

// var iconv = require('iconv-lite');
// var testStr = '=D6=D0=B9=FA=B9=A4=C9=CC=D2=F8=D0=D0=D0=C5=D3=C3=BF=A8=';
//  var str2 = (Buffer.from(testStr));

// var buf = iconv.encode("中文", 'gbk');
// console.log(buf.toString('hex'));


// Convert from an encoded buffer to js string.
// var str = iconv.decode(str2, 'win1251');
// console.log(str);