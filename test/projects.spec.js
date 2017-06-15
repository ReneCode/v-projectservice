
let axios = require('axios');
let should = require('chai').should();

const PORT = 3001;
const host = `http://localhost:${PORT}`;

const prjA = {
	uniqueId: "750057417",
	version: "1.0",
	name: "ESS_Sample_Project",
	description: " LAG #3385",
	dateOfUpload: "2017-06-08 14:54:59.667",
	pageStructure: ["1120", "1220", "1520"],
	functionStructure: ["1120", "1220"],
	completed: true
}

const prjB = {
	uniqueId: "2184030751",
	version: "1.0",
	name: "ESS_Sample_Project",
	description: " LAG #13",
	dateOfUpload: "2017-06-08 14:55:18.387",
	pageStructure: ["1120", "1220"],
	functionStructure: ["1120", "1220"],
	completed: true
}

describe("projects", () => {

	before("set axios header", () => {
		axios.defaults.headers["Content-Type"] = "application/json";
	});

	const PROJECT_URL = `${host}/api/v1/projects/`;

	it("get projects", () => {

		return axios.get(PROJECT_URL).then((res) => {
			res.should.be.not.null;
			res.data.should.be.a('array');
		});
	});

/*
	it("should post one project", () => {
		return axios.post(PROJECT_URL, prjA).then((res) => {
			res.should.be.not.null;
			const data = res.data;
			data.should.be.not.null;
			data.should.be.a('object');
			data.should.have.property('_id');
		})
	})

		it("should post array of projects", () => {
		return axios.post(PROJECT_URL, [prjA,prjB]).then((res) => {
			res.should.be.not.null;
			const data = res.data;
			data.should.be.not.null;
			data.should.be.a('array');
			data.length.should.be.equal(2);
		})
	})
	*/

	it("get one project", () => {
		const projectId = "fb56fdb2-135f-4aae-8a4e-a0a3d9a8e7e3";
		const url = `${host}/api/v1/projects/${projectId}`;

		return axios.get(url).then((res) => {
			res.should.be.not.null;
			res.data.should.be.not.null;
			res.data.should.be.a('object');
		})
	});

})