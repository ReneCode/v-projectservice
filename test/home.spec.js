
let superagent = require('superagent');
let assert = require('chai').assert;

const host = "http://localhost:3000";

describe("home", () => {
	const url = host;
	it("get", (done) => {

		superagent.get(url, (err, res) => {
			assert.isNull(err);
			assert.isNotNull(res);
			done();
		})
	});
})