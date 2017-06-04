
var express = require('express');
var router = express.Router();

var database = require('../database/database');

function getProjects(req, res) {
	database.getProjects()
		.then((projects) => {
			res.json(projects);
		})
		.catch(() => {
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

function getPages(projectId, res) {
	database.getPages(projectId)
		.then((pages) => {
			res.json(pages);
		})
		.catch((err) => {
			console.log(err);
			res.sendStatus(500);
		})
}

function getSvg(projectId, fileName, res) {
	res.send("SVG");
}

router.get("/projects", getProjects);
router.get("/projects/:projectId", (req, res) => getProject(req.params.projectId, res));
router.get("/projects/:projectId/pages", (req, res) => getPages(req.params.projectId, res));
router.get("/projects/:projectId/svg/:fileName", (req, res) => getSvg(req.params.projectId, req.params.fileName,res));

module.exports = router;



