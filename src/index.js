/*
~start
node实现图片载体加密传输
-----------------------------------------------------------------------------------------------------------------------------------------------
|图片类型ffd8|图片内APPO标识用户注释userComment com|注释数据长度 length|随机注释标识符|注释数据(加密) message(encrypt)|图片其他正常内容 imgData|
-----------------------------------------------------------------------------------------------------------------------------------------------
~end
*/
const fs = require('fs');
const opts = require('./options.js');
const crypto = require('crypto');
// 数组内每一位标志8位字节的数字，0~255之间，超出取模
const START_MARKER = Buffer.from([67, 97, 114, 108, 111]);
const COMMENT_BYTES = Buffer.from([0xFF, 0xFE]); //COM 0xFFFE 注释
const ALGORITHM = 'aes-256-ctr'; //加密方式
const imgData = fs.readFileSync(opts.in); //取出图片元数据二进制流

if (opts.action === 'create') {
	if (retrieveMessage() !== null) throw new Error('这张图片已经包含了一个信息！');
	const message = createMessage();
	const manipulatedImgData = Buffer.concat([imgData.slice(0, 2), message, imgData.slice(2)]); //拼接buffer，前2位表示图片类型fffd8=>JPEG
	fs.writeFileSync(opts.out, manipulatedImgData);
	console.log('加密完成! 已将信息隐藏在：' + opts.out);
} else {
	const encryptedMessage = retrieveMessage();
	if (encryptedMessage === null) throw new Error(' 这张图片中没有发现信息' + opts.in);
	console.log('解密得到信息: ' + decrypt(encryptedMessage, opts.key).toString('utf8'));
}

function createMessage() {
	const encryptedMessage = encrypt(Buffer.from(opts.msg, 'utf8'), opts.key);
	const length = Buffer.from(getInt64Bytes(2 + START_MARKER.byteLength + encryptedMessage.byteLength));
	return Buffer.concat([COMMENT_BYTES, length, START_MARKER, encryptedMessage]);
}

function retrieveMessage() {
	const startIndex = imgData.indexOf(START_MARKER);
	if (startIndex === -1) return null;
	const msgLength = intFromBytes([imgData[startIndex - 2], imgData[startIndex - 1]]);
	return imgData.slice(startIndex + START_MARKER.byteLength, msgLength + 4);
}

function encrypt(buffer, password) {
	var cipher = crypto.createCipher(ALGORITHM, password)
	return Buffer.concat([cipher.update(buffer), cipher.final()]);
};

function decrypt(buffer, password) {
	var decipher = crypto.createDecipher(ALGORITHM, password)
	return Buffer.concat([decipher.update(buffer), decipher.final()]);
};

function intFromBytes(x) {
	var val = 0;
	for (var i = 0; i < x.length; ++i) {
		val += x[i];
		if (i < x.length - 1) {
			val = val << 8;
		}
	}
	return val;
}

function getInt64Bytes(x) {
	var bytes = [];
	var i = 2;
	do {
		bytes[--i] = x & (255);
		x = x >> 8; //位运算符
	} while (i)
	return bytes;
}