const serve = require('serve')
const port = process.env.API_PORT || 9000
const server = serve(`${__dirname}/build`, {
	port: port,
	ignore: ['node_modules']
  })