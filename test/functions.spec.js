
let axios = require('axios')
let should = require('chai').should();

const PORT = process.env.PORT;
const host = `http://localhost:${PORT}`;

describe("functions", () => {

	let FUNCTION_URL;

	before( () => {
		let host = `http://localhost:${process.env.PORT}`;
		const projectId = "9949702d-c3e2-4f48-bfdb-f63780bb51cd";
		FUNCTION_URL = `${host}/api/v1/projects/${projectId}/functions`;
	})


	it("should get functions", () => {
		return axios.get(FUNCTION_URL).then((res) => {
			res.should.be.not.null;
			res.data.should.be.not.null;;
			res.data.should.be.a('array');
			res.data.length.should.be.at.least(1);
		});
	});

	it("should filter functions by query string", () => {
		const options = {
			params: {
				q: "-fa1"
			}
		}
		return axios.get(FUNCTION_URL, options).then((res) => {
			res.should.be.not.null;
			res.data.should.be.not.null;;
			res.data.should.be.a('array');
			res.data.length.should.be.least(1);
		});
	});

	it("should filter functions by 'function:' query string", () => {
		const options = {
			params: {
				q: "function:-fa1"
			}
		}
		return axios.get(FUNCTION_URL, options).then((res) => {
			res.should.be.not.null;
			res.data.should.be.not.null;;
			res.data.should.be.a('array');
			res.data.length.should.be.least(1);
		});
	});


})