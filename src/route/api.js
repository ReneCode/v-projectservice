
var express = require('express');
var router = express.Router();

var database = require('../database/database');
let blobStorage = require('../blobstorage/blobstorage');

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

function getSvg(projectId, fileName, res) {
	const tenantId = '0a7b63de-9e54-4d7d-a3b0-d15a2aef8679';
	const containerName = blobStorage.getContainerName(tenantId);
	const key = blobStorage.getKey(projectId, fileName);
	blobStorage.getBlob(containerName, key)
		.then((svg) => {
			res.json(svg);
		})
		.catch((err) => {
			console.log(err);
			res.sendStatus(500);
		})
}

router.get("/projects", getProjects);
router.get("/projects/:projectId", (req, res) => getProject(req.params.projectId, res));
router.get("/projects/:projectId/pages", (req, res) => getPages(req.params.projectId, req.query, res));
router.get("/projects/:projectId/pages/:pageId", (req, res) => getPage(req.params.projectId, req.params.pageId, req.query, res));
router.get("/projects/:projectId/svg/:fileName", (req, res) => getSvg(req.params.projectId, req.params.fileName, res));

module.exports = router;



