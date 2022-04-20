const fs = require('fs')
const path = require('path')
// 加载根目录的config.yaml
const { cosmiconfigSync } = require('cosmiconfig');
// 确保config.yaml存在
fs.appendFileSync(path.resolve(__dirname, '../../config.yaml'), '')

const config = cosmiconfigSync('config', {
	searchPlaces: [
		'config.yaml',
	]
}).search()

module.exports = {
	/** 站点基础路径 */
	basePath: '/v2/',
	config: config && config.config
};
