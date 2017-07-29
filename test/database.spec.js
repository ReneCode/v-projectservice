
let should = require('chai').should();

const database = require('../src/database/database');

describe('Database', () => {
	const projectId = "9949702d-c3e2-4f48-bfdb-f63780bb51cd";

  it('should query functions on query string', () => {
    return database.getFunctions(projectId, { q: "-FA1" })
      .then(data => {
        data.should.be.not.null;
        data.length.should.be.least(1);
      });
  })

})
