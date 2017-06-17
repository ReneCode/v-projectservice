
let axios = require('axios')
let should = require('chai').should();

const host = 'http://localhost:3001';

describe("redlinings", () => {
	const projectId = "fb56fdb2-135f-4aae-8a4e-a0a3d9a8e7e3";

	it("should get all redlinings", () => {
		const url = `${host}/api/v1/projects/${projectId}/redlinings`;
		return axios.get(url).then((res) => {
			res.should.be.not.null;
			res.data.should.be.not.null;;
			res.data.should.be.a('array');
			res.data.length.should.be.at.least(1);
		});
	});

})