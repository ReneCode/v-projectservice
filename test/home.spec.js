
let axios = require('axios');
let should = require('chai').should();
let server = require('../src/server');

const PORT = 3000;
const host = `http://localhost:${PORT}`;

let api = undefined;

before('start server', (done) => {
	api = server.listen(PORT, () => {
		done();
	});
});

after('close server', () => {
	api.close();
})

describe("home", () => {
	const url = host;
	it("get", (done) => {

		axios.get(url).then( (res) => {
			res.should.be.not.null;
			done();
		})
	});
})