
var express = require('express');
var router = express.Router();

var database = require('../database/database');

function getProjects(req, res) {
	database.getProjects(req.query)
		.then((projects) => {
			res.json(projects);
		})
		.catch(() => {
			res.sendStatus(500);
		})
}

function postProject(req, res) {
	database.postProject(req.body)
		.then((project) => {
			res.json(project);
		})
		.catch((err) => {
			console.error(err);
			res.sendStatus(500);
		})
}

function getProject(projectId, res) {

	database.getProject(projectId)
		.then((project) => {
			res.json(project);
		})
		.catch(() => {
			res.sendStatus(500);
		})
}

function getPages(projectId, query, res) {
	database.getPages(projectId, query)
		.then((pages) => {
			res.json(pages);
		})
		.catch((err) => {
			console.log(err);
			res.sendStatus(500);
		})
}

function getPage(projectId, pageId, query, res) {
	database.getPage(projectId, pageId)
		.then((page) => {
			res.json(page);
		})
		.catch((err) => {
			console.log(err);
			res.sendStatus(500);
		})
}

function getRedlinings(req, res) {
	const projectId = req.params.projectId;
	database.getRedlinings(projectId, req.query)
		.then((redlinings) => {
			res.json(redlinings);

		})
		.catch((err) => {
			console.error(err);
			res.sendStatus(500)
		})
}


router.get("/projects", getProjects);
router.post("/projects", postProject);
router.get("/projects/:projectId", (req, res) => getProject(req.params.projectId, res));
router.get("/projects/:projectId/pages", (req, res) => getPages(req.params.projectId, req.query, res));
router.get("/projects/:projectId/pages/:pageId", (req, res) => getPage(req.params.projectId, req.params.pageId, req.query, res));

router.get("/projects/:projectId/redlinings", getRedlinings);

module.exports = router;



