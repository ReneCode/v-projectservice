let expect = require('chai').expect;

const databaseTools = require('../src/database/database-tools');

const page = {
  projectId: "fd653ca3-fb26-46de-b470-8e7f2e81b28e",
  sortId: 1,
  tblObjectId: 143,
  properties: [
    {
      _id: "11000",
      Idx: null,
      Val: "1"
    },
    {
      _id: "11011",
      Idx: null,
      Val: "Titel- / Deckblatt"
    },
    {
      _id: "11017",
      Idx: null,
      Val: "Titel- / Deckblatt"
    },
    {
      _id: "11067",
      Idx: null,
      Val: "EPLAN-DEMO-GOST"
    }
  ],
  "id": "de2e5bbd-e034-443f-9d9e-770f2e87eea7"
}

function getPage(id, val) {
  let p = JSON.parse(JSON.stringify(page));
  p.properties.push( {
    _id: id,
    Val: val
  });
  return p;
}

describe('ConvertProperties', () => {

  it('should convertProperties of one object', () => {
    let o = databaseTools.convertProperties(getPage(7, "bla"));
    expect(o).to.not.not.null;
    expect(o.properties).to.not.not.null;
    expect(o.properties[7]).to.equal("bla")
    expect(o.properties[11067]).to.equal("EPLAN-DEMO-GOST")
    expect(o.properties[11017]).to.equal("Titel- / Deckblatt")
  })

  it('should convertProperties of array oj objects', () => {
    let objs = [];
    objs.push( getPage(13, "hallo") );
    objs.push( getPage(14, "abc") );
    objs.push( getPage(15, "xyz") );
    let os = databaseTools.convertProperties(objs);
    expect(os).to.not.be.null;
    expect(os).to.be.an('array');
    expect(os).to.have.length(3);
    expect(os[0].properties).to.not.not.null;
    expect(os[0].properties[13]).to.equal("hallo")
    expect(os[1].properties[14]).to.equal("abc")
    expect(os[2].properties[11017]).to.equal("Titel- / Deckblatt")
  })
})
