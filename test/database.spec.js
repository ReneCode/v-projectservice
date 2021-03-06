
require('chai').should();

const database = require('../src/database/database');

describe('Database', () => {
  const projectId = "4300cc5a-19d0-4b4f-8f60-f8e8b02bbdd1";

  it('should query pages', () => {
    return database.getPages(projectId)
      .then((pages) => {
        pages.should.not.be.null;
        pages.should.be.a("array");
        pages.length.should.be.least(1)
      });
  })

  it('should query functions', () => {
    return database.getFunctions(projectId)
      .then((functions) => {
        functions.should.not.be.null;
        functions.should.be.a("array");
        functions.length.should.be.least(1)
      });
  })

  it('should query redlinings', () => {
    return database.getRedlinings(projectId)
      .then((redlinings) => {
        redlinings.should.not.be.null;
        redlinings.should.be.a("array");
        redlinings.length.should.be.least(1)
      });
  })

  it('should query functions on query string', () => {
    return database.getFunctions(projectId, { q: "+b2.y1" })
      .then(data => {
        data.should.be.not.null;
        data.length.should.be.least(1);
      });
  })
})
