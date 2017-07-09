
let axios = require('axios')
let should = require('chai').should();

const PORT = process.env.PORT;
const host = `http://localhost:${PORT}`;

describe("functions", () => {

	let FUNCTION_URL;

	before( () => {
		let host = `http://localhost:${process.env.PORT}`;
		const projectId = "fb56fdb2-135f-4aae-8a4e-a0a3d9a8e7e3";
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
				q: "=+-f"
			}
		}
		return axios.get(FUNCTION_URL, options).then((res) => {
			res.should.be.not.null;
			res.data.should.be.not.null;;
			res.data.should.be.a('array');
			res.data.length.should.be.equal(4);
		});
	});

	it("should filter functions by 'function:' query string", () => {
		const options = {
			params: {
				q: "function:=+-f"
			}
		}
		return axios.get(FUNCTION_URL, options).then((res) => {
			res.should.be.not.null;
			res.data.should.be.not.null;;
			res.data.should.be.a('array');
			res.data.length.should.be.equal(4);
		});
	});


})