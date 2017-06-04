
let superagent = require('superagent');
let assert = require('chai').assert;
let expect = require('chai').expect;

const host = "http://localhost:3000";

describe.skip("projects", () => {

	before("open database", (done) => {
		done()
	});

	it("get projects", (done) => {
		const url = `${host}/api/v1/projects/`;

		superagent.get(url, (err, res) => {
			assert.isNull(err);
			assert.isNotNull(res);
			assert.isArray(res.body);

			done();
		})
	});

	it("get one project", (done) => {
		const projectId = "a76c8bc2-c591-4aee-b1ab-524b472bea92";
		const url = `${host}/api/v1/projects/${projectId}`;

		superagent.get(url, (err, res) => {
			expect(err).to.be.null;
			expect(res).to.not.be.null;
			expect(res.body).to.not.be.null;
			expect(res.body).to.be.an('object');

			done();
		})
	});

})