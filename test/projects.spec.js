
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
		const projectId = "a76c8bc2-c591-4aee-b1ab-524b472bea92";
		const url = `${host}/api/v1/projects/${projectId}`;

		return axios.get(url).then ( (res) => {
			res.should.be.not.null;
			res.data.should.be.not.null;
			res.data.should.be.a('object');
		})
	});

})