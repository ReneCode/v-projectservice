
// let superagent = require('superagent');
let axios = require('axios')
let should = require('chai').should();

const host = 'http://localhost:3001';

describe("pages", () => {
	const projectId = "fb56fdb2-135f-4aae-8a4e-a0a3d9a8e7e3";

	it("should get pages", () => {
		const url = `${host}/api/v1/projects/${projectId}/pages`;
		return axios.get(url).then((res) => {
			res.should.be.not.null;
			res.data.should.be.not.null;;
			res.data.should.be.a('array');
			res.data.length.should.be.at.least(1);
		});
	});

	it("should count pages", () => {
		const url = `${host}/api/v1/projects/${projectId}/pages`;
		const options = {
			params: {
				meta: 'count'
			}
		}
		return axios.get(url, options).then((res) => {
			res.should.be.not.null;
			res.data.should.be.not.null;;
			res.data.should.be.equal(3);
		});
	});
	
})