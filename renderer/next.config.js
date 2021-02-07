const withImages = require('next-images')

module.exports = withImages({
	webpack: (config) =>
		Object.assign(config, {
			target: 'electron-renderer',
		}),
})
