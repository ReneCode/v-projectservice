
let axios = require('axios')
require('chai').should();

describe("graphics REST interface", () => {
  let GRAPHIC_URL;

  before(() => {
    const PORT = process.env.PORT;
    const host = `http://localhost:${PORT}`;

    const projectId = "4300cc5a-19d0-4b4f-8f60-f8e8b02bbdd1";
    GRAPHIC_URL = `${host}/api/v1/projects/${projectId}/graphics`;
  });

  it('should post graphic', () => {
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

  it('should get all graphics', () => {
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

  it('should get graphic by id', () => {
    const data = {
      type: "text",
      text: "hi",
      y: 10
    };
    let graphicId;
    return axios.post(GRAPHIC_URL, data)
      .then(res => {
        graphicId = res.data[0]._id;
        return axios.get(GRAPHIC_URL + "/" + graphicId);
      })
      .then(res => {
        res.should.be.not.null;
        res.status.should.be.equal(200);
        res.data.type.should.be.equal(data.type);
      })
  })

  /*
  it("should get all redlinings", () => {
    return axios.get(REDLINING_URL).then((res) => {
      res.should.be.not.null;
      res.data.should.be.not.null;;
      res.data.should.be.a('array');
      res.data.length.should.be.at.least(1);
      res.data.forEach(rl => {
        rl.should.have.property('pageTblObjectId');
      })
    });
  });

  it("should get one redlinings on specific page", () => {
    let options = {
      params: {
        pageTblObjectId: 21
      }
    }
    return axios.get(REDLINING_URL, options).then((res) => {
      res.data.length.should.be.equal(1)
    });
  });
*/
})
