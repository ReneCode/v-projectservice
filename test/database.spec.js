
let should = require('chai').should();

const database = require('../src/database/database');

describe('Database', () => {
	const projectId = "fb56fdb2-135f-4aae-8a4e-a0a3d9a8e7e3";

  it('should query functions on query string', () => {
    return database.getFunctions(projectId, { q: "=+-F1" })
      .then(data => {
        data.should.be.not.null;
        data.length.should.be.equal(1);
      });
  })

})
