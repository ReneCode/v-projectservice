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

  it('should convertObjects .properties array of objects => dictionary', () => {
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


  it('should convertObjects keep .properties if it is an object', () => {
    let o0 = {
      properties:
      {
        "101": "hallo",
        "abc": 102
      }
    };
    let o2 = databaseTools.convertObjects(o0);
    o2.should.not.be.null;
    o2.should.have.property("properties");
    o2.properties.should.be.a("object")
    o2.properties["101"].should.be.equal("hallo");
    o2.properties["abc"].should.be.equal(102);
  })


  it('should build regularExp filter .getFilter()', () => {
    const q = "abc";
    filter = databaseTools.getFilter(['name', 'version'], q);
    const expectFilter = {
      '$or':
      [{ name: /abc/i },
      { version: /abc/i }]
    }
    filter.should.be.deep.equal(expectFilter);

  })

})
