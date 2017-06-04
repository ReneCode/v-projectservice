
// let superagent = require('superagent');
let axios = require('axios')
let assert = require('chai').assert;

let server = require('../src/server');
let getAuthToken = require('./get-auth-token');

const PORT = 3000;
const host = `http://localhost:${PORT}`;

let api = undefined;

before('start server', (done) => {
	api = server.listen(PORT, () => {
		getAuthToken().then((token) => {
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			done();
		});
	});
});

after('close server', () => {
	api.close();
})


describe.skip("pages", () => {

	const projectId = "1c543880-0a6a-4ef1-b1a1-8d4eb41465b0";

	before("open database", (done) => {
		done()
	});

	it("should get pages", (done) => {
		const url = `${host}/api/v1/projects/${projectId}/pages`;

		axios.get(url).then( (res) => {
			assert.isNull(err);
			assert.isNotNull(res);
			assert.isArray(res.body);
			done();
		})
	});
})