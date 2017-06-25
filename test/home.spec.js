
let axios = require('axios');
let should = require('chai').should();

const PORT = process.env.PORT;
const host = `http://localhost:${PORT}`;

describe("home", () => {
	const url = host;
	it("get", () => {
		return axios.get(url).then( (res) => {
			res.should.be.not.null;
		})
	});
})