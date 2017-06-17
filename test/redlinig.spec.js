
let axios = require('axios')
let should = require('chai').should();

const host = 'http://localhost:3001';

describe("redlinings", () => {
	// const projectId = "fb56fdb2-135f-4aae-8a4e-a0a3d9a8e7e3";
	const projectId = "aa7c8e1e-0ced-4c4e-a436-0828b8bb1138";
	const url = `${host}/api/v1/projects/${projectId}/redlinings`;

	it("should get all redlinings", () => {
		return axios.get(url).then((res) => {
			res.should.be.not.null;
			res.data.should.be.not.null;;
			res.data.should.be.a('array');
			res.data.length.should.be.at.least(1);
		});
	});

	it("should get redlinings from one page", () => {
		let options = {
			params: {
				filter: {
					pageId: "0ba9ee26-fefb-480d-8637-38b781211c06"
				}
			}
		}
		return axios.get(url, options).then((res) => {
			res.should.be.not.null;
			res.data.should.be.not.null;;
			res.data.should.be.a('array');
			res.data.length.should.be.at.least(1);
		});
	});


})