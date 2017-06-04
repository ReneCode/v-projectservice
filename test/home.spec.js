
let axios = require('axios');
let should = require('chai').should();

const host = `http://localhost:3000`;

describe("home", () => {
	const url = host;
	it("get", () => {
		return axios.get(url).then( (res) => {
			res.should.be.not.null;
		})
	});
})