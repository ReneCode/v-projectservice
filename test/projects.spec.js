
let axios = require('axios');
let should = require('chai').should();

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
	let PROJECT_URL;

	before("set axios header", () => {
		let host = `http://localhost:${process.env.PORT}`;
		PROJECT_URL = `${host}/api/v1/projects`;

		axios.defaults.headers["Content-Type"] = "application/json";
	});


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
		const projectId = "4300cc5a-19d0-4b4f-8f60-f8e8b02bbdd1";

		const url = `${PROJECT_URL}/${projectId}`;

		return axios.get(url).then((res) => {
			res.should.be.not.null;
			res.data.should.be.not.null;
			res.data.should.be.a('object');
		})
	});

	it("get projects by query string", () => {
		const options = {
			params: {
				q: "ampl"
			}
		}
		return axios.get(PROJECT_URL, options).then((res) => {
			res.should.be.not.null;
			res.data.should.be.not.null;
			res.data.should.be.a('array');
			res.data.length.should.be.least(1);
		})
	});
})