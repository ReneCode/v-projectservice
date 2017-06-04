
let superagent = require('superagent');
let assert = require('chai').assert;

const host = "http://localhost:3000";

describe.skip("pages", () => {

	const projectId = "1c543880-0a6a-4ef1-b1a1-8d4eb41465b0";

	before("open database", (done) => {
		done()
	});

	it("should get pages", (done) => {
		const url = `${host}/api/v1/projects/${projectId}/pages`;

		superagent.get(url, (err, res) => {
			assert.isNull(err);
			assert.isNotNull(res);
			assert.isArray(res.body);

			done();
		})
	});
})