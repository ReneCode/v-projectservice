
let axios = require('axios')
let should = require('chai').should();

const host = 'http://localhost:3001';

describe("redlinings", () => {
	const projectId = "fb56fdb2-135f-4aae-8a4e-a0a3d9a8e7e3";
	const url = `${host}/api/v1/projects/${projectId}/redlinings`;



	it("should get all redlinings", () => {
		return axios.get(url).then((res) => {
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
		return axios.get(url, options).then((res) => {
			res.data.forEach(rl => {
				rl.pageTblObjectId.should.be.equal(1)
			})
		});
	});


})