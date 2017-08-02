const should = require('chai').should();

const databaseTools = require('../src/database/database-tools');

describe('database-tools', () => {

  it('should convertObjects ._id => .id', () => {
    let o0 = {
      _id: 42
    };
    let o2 = databaseTools.convertObjects(o0);
    o2.should.not.be.null;
    o2.should.not.have.property("_id");
    o2.should.have.property("id", 42);
  })

  it('should convertObjects .properties-array of objects => properties.dictionary', () => {
    let o0 = {
      properties: [
        {
          id: 101,
          val: "hallo"
        },
        {
          id: 102,
          val: "vue"
        }
      ]
    };
    let o2 = databaseTools.convertObjects(o0);
    o2.should.not.be.null;
    o2.should.have.property("properties");
    o2.properties.should.be.a("object")
    o2.properties["101"].should.be.equal("hallo");
    o2.properties["102"].should.be.equal("vue");
  })

})
