
// let superagent = require('superagent');
let axios = require('axios')
let should = require('chai').should();

describe("pages", () => {

	let PAGE_URL = "";

	before( () => {
		let host = `http://localhost:${process.env.PORT}`;
		const projectId = "9949702d-c3e2-4f48-bfdb-f63780bb51cd";

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

	it("should get one page", ()=> {
		let pageId = "a24fb442-449c-4c62-b814-ab216addd87b";
		return axios.get(PAGE_URL + "/" + pageId).then((res) => {
			res.should.not.be.null;
			res.data.should.not.be.null;
			res.data.should.be.a("object");
			res.data.id.should.be.equal(pageId);
		})

	})

	it("should count pages", () => {
		const options = {
			params: {
				meta: 'count'
			}
		}
		return axios.get(PAGE_URL, options).then((res) => {
			res.should.be.not.null;
			res.data.should.be.not.null;;
			res.data.should.be.equal(214);
		});
	});

	it("should filter pages by query string", () => {
		const options = {
			params: {
				q: "einspeisung"
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
				q: "function:-fa1"
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