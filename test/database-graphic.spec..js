
let should = require('chai').should();

const database = require('../src/database/database');

describe('Database graphic', () => {
  const projectId = "4300cc5a-19d0-4b4f-8f60-f8e8b02bbdd1";

  before('remove all graphics', () => {
    return database.dbGraphic.remove(projectId);
  })

  after('remove all graphics', () => {
    return database.dbGraphic.remove(projectId);
  })

  it('should save one graphic', () => {
    const graphic = {
      type: "rect",
      x: 100,
      y: 200
    };
    const pageId = "pageId"
    return database.dbGraphic.save(projectId, pageId, graphic)
      .then(data => {
        data.should.be.not.null;
        data.ops.length.should.be.equal(1);
        const o = data.ops[0];
        o.should.not.be.null;
        o.type.should.be.equal(graphic.type);
        o.projectId.should.be.equal(projectId);
        o.pageId.should.be.equal(pageId);
      })
  })

  it('should save array of graphics', () => {
    const graphics =
      [{
        type: "rect",
        x: 100,
        y: 200
      },
      {
        type: "text",
        text: "hallo"
      }];
    const pageId = "pageId"
    return database.dbGraphic.save(projectId, pageId, graphics)
      .then(data => {
        data.should.be.not.null;
        data.ops.length.should.be.equal(2);
        const o1 = data.ops[0];
        o1.should.not.be.null;
        o1.type.should.be.equal(graphics[0].type);
        o1.projectId.should.be.equal(projectId);
        o1.pageId.should.be.equal(pageId);
        const o2 = data.ops[1];
        o2.should.not.be.null;
        o2.type.should.be.equal(graphics[1].type);
        o2.projectId.should.be.equal(projectId);
        o2.pageId.should.be.equal(pageId);
      })
  })

  it('should load one graphic by pageId', () => {
    const graphic = {
      type: "rect",
      x: 100,
      y: 200
    };
    const pageId = "page-a"
    return database.dbGraphic.save(projectId, pageId, graphic)
      .then(data => {
        const filter = {
          pageId: pageId
        };
        return database.dbGraphic.load(projectId, filter);
      })
      .then(data => {
        data.should.be.not.null;
        data.length.should.be.least(1);
        const o = data[0];
        o.should.not.be.null;
        o.type.should.be.equal(graphic.type);
        o.projectId.should.be.equal(projectId);
        o.pageId.should.be.equal(pageId);
      })
  });

  it('should load one graphic by graphicId', () => {
    const graphic = {
      type: "abc",
      x: 100,
      y: 200
    };
    const pageId = "page-c"
    return database.dbGraphic.save(projectId, pageId, graphic)
      .then(data => {
        const o1 = data.ops[0];
        const id = o1._id;
        const filter = {
          graphicId: id
        };
        return database.dbGraphic.load(projectId, filter);
      })
      .then(data => {
        data.should.be.not.null;
        data.length.should.be.equal(1);
        const o = data[0];
        o.should.not.be.null;
        o.type.should.be.equal(graphic.type);
        o.projectId.should.be.equal(projectId);
        o.pageId.should.be.equal(pageId);
      })
  });

  it('should fail on load with illegal filter', () => {
    const filter = {
      badFilter: 42
    };
    return database.dbGraphic.load(projectId, filter)
      .then(data => {
      })
      .catch(err => {
        err.should.not.be.null;
        err.should.be.a("Error");
        err.message.should.include("badFilter")
      });
  });

  it('should remove graphic', () => {
    const graphic = {
      type: "rect",
      x: 100,
      y: 200
    };
    const pageId = "page-a"
    return database.dbGraphic.save(projectId, pageId, graphic)
      .then(data => {
        return database.dbGraphic.remove(projectId);
      })
      .then(data => {
        data.should.be.not.null;
        data.result.ok.should.be.equal(1);
        return database.dbGraphic.load(projectId);
      })
      .then((data) => {
        data.should.be.not.null;
        data.length.should.be.equal(0);
      })
  });

  it('update one graphic', () => {
    const graphic = {
      type: "rect",
      x: 100,
      y: 200
    };
    const pageId = "page-a";
    let graphicId;
    return database.dbGraphic.save(projectId, pageId, graphic)
      .then(data => {
        let obj = data.ops[0];
        graphicId = data.ops[0]._id;
        obj.width = 50;
        obj.x = 120;
        return database.dbGraphic.update(projectId, graphicId, obj)
      })
      .then(data => {
        const o = data.value;
        o.should.not.be.null;
        o.type.should.be.equal("rect")
        o.x.should.be.equal(120);
        o.y.should.be.equal(200);
        o.width.should.be.equal(50);
      });
  })
})
