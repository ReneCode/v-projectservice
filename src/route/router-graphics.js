
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
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
}

function putGraphics(req, res) {
  const graphics = req.body;
  const projectId = req.params.projectId;
  const graphicId = req.params.graphicId;
  database.dbGraphic.update(projectId, graphicId, graphics)
    .then(data => {
      if (data.ok !== 1) {
        res.sendStatus(500);
      } else {
        res.json(data.value);
      }
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
}

function deleteGraphics(req, res) {
  const projectId = req.params.projectId;
  const graphicId = req.params.graphicId;
  database.dbGraphic.remove(projectId, graphicId)
    .then(data => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
}

router.post("/projects/:projectId/graphics", postGraphics);

router.get("/projects/:projectId/graphics", getGraphics);
router.get("/projects/:projectId/graphics/:graphicId", getGraphicsWithId);

router.put("/projects/:projectId/graphics/:graphicId", putGraphics);

router.delete("/projects/:projectId/graphics/:graphicId", deleteGraphics);

module.exports = router;
