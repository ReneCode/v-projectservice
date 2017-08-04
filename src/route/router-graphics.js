
var express = require('express');
var router = express.Router();

var database = require('../database/database');

function postGraphics(req, res) {
  const projectId = req.params.projectId;
  const graphics = req.body;
  const pageId = req.query.pageId;
  database.dbGraphic.save(projectId, pageId, graphics)
    .then((data) => {
      res.json(data.ops);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
}

function getGraphics(req, res) {
  const projectId = req.params.projectId;
  database.dbGraphic.load(projectId)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
}

function getGraphicsWithId(req, res) {
  const projectId = req.params.projectId;
  const filter = {
    graphicId: req.params.graphicId
  }
  database.dbGraphic.load(projectId, filter)
    .then(data => {
      if (data.length !== 1) {
        res.sendStatus(500);
      } else {
        res.json(data[0]);
      }
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
}

router.post("/projects/:projectId/graphics", postGraphics);
router.get("/projects/:projectId/graphics", getGraphics);
router.get("/projects/:projectId/graphics/:graphicId", getGraphicsWithId);

module.exports = router;
