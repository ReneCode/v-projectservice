
var express = require('express');
var router = express.Router();

var database = require('../database/database');

// function getProjects(req, res) {
// 	database.getProjects(req.query)
// 		.then((projects) => {
// 			res.json(projects);
// 		})
// 		.catch(() => {
// 			res.sendStatus(500);
// 		})
// }

// function postProject(req, res) {
// 	database.postProject(req.body)
// 		.then((project) => {
// 			res.json(project);
// 		})
// 		.catch((err) => {
// 			console.error(err);
// 			res.sendStatus(500);
// 		})
// }

// function getProject(projectId, res) {

// 	database.getProject(projectId)
// 		.then((project) => {
// 			res.json(project);
// 		})
// 		.catch(() => {
// 			res.sendStatus(500);
// 		})
// }

// function getPages(req, res) {
// 	const projectId = req.params.projectId;

// 	database.getPages(projectId, req.query)
// 		.then((pages) => {
// 			res.json(pages);
// 		})
// 		.catch((err) => {
// 			res.sendStatus(500);
// 		})
// }

// function getPage(projectId, pageId, query, res) {
// 	database.getPage(projectId, pageId)
// 		.then((page) => {
// 			res.json(page);
// 		})
// 		.catch((err) => {
// 			res.sendStatus(500);
// 		})
// }


// function getFunctions(req, res) {
// 	const projectId = req.params.projectId;

// 	database.getFunctions(projectId, req.query)
// 		.then((pages) => {
// 			res.json(pages);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.sendStatus(500);
// 		})
// }

// function getRedlinings(req, res) {
// 	const projectId = req.params.projectId;
// 	database.getRedlinings(projectId, req.query)
// 		.then((redlinings) => {
// 			res.json(redlinings);

// 		})
// 		.catch((err) => {
// 			console.error(err);
// 			res.sendStatus(500)
// 		})
// }


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
  const graphicId = req.params.graphicId;
  database.dbGraphic.load(projectId, pageId, graphics)
    .then((data) => {
      res.json(data.ops);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
	
}


router.post("/projects/:projectId/graphics", postGraphics);
router.get("/projects/:projectId/graphics/:graphicId", getGraphics);

module.exports = router;


