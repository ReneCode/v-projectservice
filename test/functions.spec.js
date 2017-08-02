
let axios = require('axios')
let should = require('chai').should();

const PORT = process.env.PORT;
const host = `http://localhost:${PORT}`;

describe("functions", () => {

	let FUNCTION_URL;

	before( () => {
		let host = `http://localhost:${process.env.PORT}`;
		const projectId = "4300cc5a-19d0-4b4f-8f60-f8e8b02bbdd1";
		FUNCTION_URL = `${host}/api/v1/projects/${projectId}/functions`;
	})


	it("should get functions", () => {
		return axios.get(FUNCTION_URL).then((res) => {
			res.should.be.not.null;
			res.data.should.be.not.null;
			res.data.should.be.a('array');
			res.data.length.should.be.at.least(1);
		});
	});

	it("should filter functions by query string", () => {
		const options = {
			params: {
				q: "=kf1+b3"
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
				q: "function:=+b2.y1"
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