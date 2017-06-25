
let axios = require('axios');
let should = require('chai').should();


describe("home", () => {

	let URL;

	before( () => {
		const PORT = process.env.PORT;
		const host = `http://localhost:${PORT}`;
		URL = host;
	});

	it("get", () => {
		return axios.get(URL).then( (res) => {
			res.should.be.not.null;
		})
	});
})