
let axios = require('axios');
let should = require('chai').should();

let blobStorage = require('../src/blobstorage/blobstorage');


describe("blob storage", () => {
	it("get blob", () => {

		let container = "devcontainer";
		const projectId = "a76c8bc2-c591-4aee-b1ab-524b472bea92";
		const file = "1.svg";
		const key = `${projectId}-${file}`;
		return blobStorage.getBlob(container, key)
		.then( (content) => {
			content.should.be.not.null;
			content.should.be.a('string');
			content.length.should.be.least(100);
			content.indexOf("<svg ").should.be.least(0);
//			console.log(content)
		});
		// https://cs2-projectviewerservice-dev.azurewebsites.net/api/v1/a76c8bc2-c591-4aee-b1ab-524b472bea92/images/EPLAN-LIC.png
	});
})