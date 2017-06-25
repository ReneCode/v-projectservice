
// let superagent = require('superagent');
let axios = require('axios')
let should = require('chai').should();

describe("pages", () => {

	let PAGE_URL = "";

	before( () => {
		let host = `http://localhost:${process.env.PORT}`;
		const projectId = "fb56fdb2-135f-4aae-8a4e-a0a3d9a8e7e3";
		PAGE_URL = `${host}/api/v1/projects/${projectId}/pages`;
	});

	it("should get pages", () => {
		return axios.get(PAGE_URL).then((res) => {
			res.should.be.not.null;
			res.data.should.be.not.null;;
			res.data.should.be.a('array');
			res.data.length.should.be.at.least(1);
		});
	});

	it("should count pages", () => {
		const options = {
			params: {
				meta: 'count'
			}
		}
		return axios.get(PAGE_URL, options).then((res) => {
			res.should.be.not.null;
			res.data.should.be.not.null;;
			res.data.should.be.equal(3);
		});
	});

	it("should filter pages by query string", () => {
		const options = {
			params: {
				q: "erste"
			}
		}
		return axios.get(PAGE_URL, options).then((res) => {
			res.should.be.not.null;
			res.data.should.be.not.null;;
			res.data.should.be.a('array');
			res.data.length.should.be.equal(1);
		});
	});

	it("should filter pages by query f:text (query on functions)", () => {
		const options = {
			params: {
				q: "function:=+-f1"
			}
		}
		return axios.get(PAGE_URL, options).then((res) => {
			res.should.be.not.null;
			res.data.should.be.not.null;;
			res.data.should.be.a('array');
			res.data.length.should.be.equal(1);
		});
	});

})