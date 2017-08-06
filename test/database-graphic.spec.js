
require('chai').should();

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
        data.length.should.be.equal(1);
        const o = data[0];
        o.should.not.be.null;
        o.type.should.be.equal(graphic.type);
        o.projectId.should.be.equal(projectId);
        o.pageId.should.be.equal(pageId);
        o.should.have.property("id");
        o.should.not.have.property("_id");
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
        data.length.should.be.equal(2);
        const o1 = data[0];
        o1.should.not.be.null;
        o1.type.should.be.equal(graphics[0].type);
        o1.projectId.should.be.equal(projectId);
        o1.pageId.should.be.equal(pageId);
        o1.should.have.property("id");
        o1.should.not.have.property("_id");

        const o2 = data[1];
        o2.should.not.be.null;
        o2.type.should.be.equal(graphics[1].type);
        o2.projectId.should.be.equal(projectId);
        o2.pageId.should.be.equal(pageId);
        o2.should.have.property("id");
        o2.should.not.have.property("_id");
      })
  })

  it('should remove id-field on save a graphics', () => {
    const graphics =
      [{
        type: "rect",
        id: "hallo"
      },
      {
        type: "text",
        id: 666
      }];
    const pageId = "pageId"
    return database.dbGraphic.save(projectId, pageId, graphics)
      .then(data => {
        const o1 = data[0];
        o1.should.not.be.null;
        o1.should.have.property("id").not.equal("hallo");
        o1.should.not.have.property("_id");
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
        o.should.have.property("id");
        o.should.not.have.property("_id");
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
        const o1 = data[0];
        const id = o1.id;
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
        graphicId = data[0].id;
        let newGraphic = {
          width: 50,
          type: "text",
          projectId: projectId
        };
        return database.dbGraphic.update(projectId, graphicId, newGraphic)
      })
      .then(data => {
        data.should.not.be.null;
        data.type.should.be.equal("text")
        data.width.should.be.equal(50);
        data.id.toString().should.be.equal(graphicId.toString());
        data.should.have.property("id").to.deep.equal(graphicId);
        data.should.not.have.property("_id");

        return database.dbGraphic.load(projectId, { graphicId: graphicId });
      })
      .then(data => {
        const o = data[0];
        o.should.not.be.null;
        o.type.should.be.equal("text")
        o.width.should.be.equal(50);
        o.id.should.be.deep.equal(graphicId);
      });
  })



  it('update one graphic and remove id-field', () => {
    const graphic = {
      type: "rect",
    };
    const pageId = "page-a";
    let graphicId;
    return database.dbGraphic.save(projectId, pageId, graphic)
      .then(data => {
        graphicId = data[0].id;
        let newGraphic = {
          projectId: projectId,
          id: "hello"
        };
        return database.dbGraphic.update(projectId, graphicId, newGraphic)
      })
      .then(data => {
        data.should.not.be.null;
        data.should.have.property("id").to.deep.equal(graphicId);
        data.should.not.have.property("_id");
      });
  })  
})
