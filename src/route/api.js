
var express = require('express');
var router = express.Router();

let routerGraphics = require('./router-graphics')
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

function getPages(req, res) {
	const projectId = req.params.projectId;

	database.getPages(projectId, req.query)
		.then((pages) => {
			res.json(pages);
		})
		.catch((err) => {
			res.sendStatus(500);
		})
}

function getPage(projectId, pageId, query, res) {
	database.getPage(projectId, pageId)
		.then((page) => {
			res.json(page);
		})
		.catch((err) => {
			res.sendStatus(500);
		})
}


function getFunctions(req, res) {
	const projectId = req.params.projectId;

	database.getFunctions(projectId, req.query)
		.then((pages) => {
			res.json(pages);
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

router.get("/projects/:projectId/pages", getPages);
router.get("/projects/:projectId/pages/:pageId", (req, res) => getPage(req.params.projectId, req.params.pageId, req.query, res));

router.get("/projects/:projectId/functions", getFunctions);


router.get("/projects/:projectId/redlinings", getRedlinings);


router.get("/projects/:projectId/redlinings", getRedlinings);

router.use("/", routerGraphics);

module.exports = router;



