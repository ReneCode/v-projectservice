
let axios = require('axios')
require('chai').should();

describe("graphics REST interface", () => {
  let GRAPHIC_URL;
  let PROJECT_ID;

  before(() => {
    const PORT = process.env.PORT;
    const host = `http://localhost:${PORT}`;

    PROJECT_ID = "4300cc5a-19d0-4b4f-8f60-f8e8b02bbdd1";
    GRAPHIC_URL = `${host}/api/v1/projects/${PROJECT_ID}/graphics`;
  });

  it('should POST graphic', () => {
    const data = {
      type: "rect",
      x: 50,
      y: 100
    };
    return axios.post(GRAPHIC_URL, data)
      .then(res => {
        res.should.be.not.null;
        res.status.should.be.equal(200);
        res.data.length.should.be.equal(1);
        res.data[0].type.should.be.equal(data.type);
      })
  })

  it('should GET all graphics', () => {
    const data = [{
      type: "text-1",
      val: 1234
    },
    {
      type: "rect-1"
    }];
    return axios.post(GRAPHIC_URL, data)
      .then(res => {
        return axios.get(GRAPHIC_URL);
      })
      .then(res => {
        res.should.be.not.null;
        res.status.should.be.equal(200);
        res.data.length.should.be.least(2);
        let found = res.data.filter(d => d.type === "text-1");
        found.should.not.be.null;
        let last = found[found.length - 1];
        last.val.should.be.equal(1234);
      })
  })

  it('should GET graphic by id', () => {
    const data = {
      type: "text",
      text: "hi",
      y: 10
    };
    let graphicId;
    return axios.post(GRAPHIC_URL, data)
      .then(res => {
        graphicId = res.data[0].id;
        return axios.get(GRAPHIC_URL + "/" + graphicId);
      })
      .then(res => {
        res.should.be.not.null;
        res.status.should.be.equal(200);
        res.data.length.should.be.equal(1);
        let o = res.data[0];
        o.type.should.be.equal(data.type);
        o.y.should.be.equal(data.y);
      })
  })

  it('should GET graphic by filter', () => {
    const data = [{
      type: "text",
      pageId: "42"
    },
    {
      type: "rect",
      x: 222,
      pageId: "43"
    }];
    return axios.post(GRAPHIC_URL, data)
      .then(res => {
        const options = {
          params: { pageId: 43 }
        }
        return axios.get(GRAPHIC_URL, options);
      })
      .then(res => {
        res.should.be.not.null;
        res.status.should.be.equal(200);
        res.data.length.should.be.equal(1);
        let o = res.data[0];
        o.type.should.be.equal("rect");
        o.pageId.should.be.equal("43");
      })
  })

  it('should PUT graphics', () => {
    const data = {
      type: "text",
      text: "hi",
      y: 10
    };
    let graphicId;
    return axios.post(GRAPHIC_URL, data)
      .then(res => {
        graphicId = res.data[0].id;
        const newData = {
          projectId: PROJECT_ID,
          type: "rect",
          x: 200
        }
        return axios.put(GRAPHIC_URL + "/" + graphicId, newData);
      })
      .then(res => {
        res.should.be.not.null;
        res.status.should.be.equal(200);
        res.data.should.have.property("type", "rect");
        res.data.should.have.property("x", 200);
        res.data.should.not.have.property("y");
        return axios.get(GRAPHIC_URL + "/" + graphicId);
      })
      .then(res => {
        res.status.should.be.equal(200);
        res.data.length.should.be.equal(1);
        let o = res.data[0];
        o.should.have.property("type", "rect");
        o.should.have.property("x", 200);
        o.should.not.have.property("text");
      })
  })

  it('should DELETE graphics', () => {
    const data = {
      type: "text",
      text: "hi delete",
      y: 10
    };
    let graphicId;
    return axios.post(GRAPHIC_URL, data)
      .then(res => {
        graphicId = res.data[0].id;
        return axios.delete(GRAPHIC_URL + "/" + graphicId);
      })
      .then(res => {
        res.should.be.not.null;
        res.status.should.be.equal(204);
        return axios.get(GRAPHIC_URL + "/" + graphicId);
      })
      .then(res => {
        // should be not found
        res.status.should.be.equal(200);
        res.data.should.be.a("array")
        res.data.length.should.be.equal(0)
      })
  })
})
