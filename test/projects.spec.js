
let axios = require('axios');
let should = require('chai').should();

const PORT = 3000;
const host = `http://localhost:${PORT}`;


describe("projects", () => {

	it("get projects", () => {
		const url = `${host}/api/v1/projects/`;

		return axios.get(url).then( (res) => {
			res.should.be.not.null;
			res.data.should.be.a('array');
		});
	});

	it("get one project", () => {
		const projectId = "fb56fdb2-135f-4aae-8a4e-a0a3d9a8e7e3";
		const url = `${host}/api/v1/projects/${projectId}`;

		return axios.get(url).then ( (res) => {
			res.should.be.not.null;
			res.data.should.be.not.null;
			res.data.should.be.a('object');
		})
	});

})