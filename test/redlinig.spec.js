
let axios = require('axios')
let should = require('chai').should();


describe("redlinings", () => {

	let REDLINING_URL;

	before(() => {
		const PORT = process.env.PORT;
		const host = `http://localhost:${PORT}`;

		const projectId = "d336e8c7-e93f-41ab-add6-87c2088656f4";
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

	it("should get redlinings from one page", () => {
		let options = {
			params: {
				pageTblObjectId: 1
			}
		}
		return axios.get(REDLINING_URL, options).then((res) => {
			res.data.forEach(rl => {
				rl.pageTblObjectId.should.be.equal(1)
			})
		});
	});


})