
let axios = require('axios')
let should = require('chai').should();


describe("redlinings", () => {

	let REDLINING_URL;

	before(() => {
		const PORT = process.env.PORT;
		const host = `http://localhost:${PORT}`;

		const projectId = "4300cc5a-19d0-4b4f-8f60-f8e8b02bbdd1";
		REDLINING_URL = `${host}/api/v1/projects/${projectId}/redlinings`;

	});

	it("should get all redlinings", () => {
		return axios.get(REDLINING_URL).then((res) => {
			res.should.be.not.null;
			res.data.should.be.not.null;;
			res.data.should.be.a('array');
			res.data.length.should.be.at.least(1);
			res.data.forEach(rl => {
				rl.should.have.property('pageTblObjectId');
			})
		});
	});

	it("should get one redlinings on specific page", () => {
		let options = {
			params: {
				pageTblObjectId: 21
			}
		}
		return axios.get(REDLINING_URL, options).then((res) => {
			res.data.length.should.be.equal(1)
		});
	});


})