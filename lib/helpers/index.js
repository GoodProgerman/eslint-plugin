function isPathRelative(path) {
	return path === '.' || path.startsWith('./') ||path.startsWith('../')
}

function getFileLayer(filePath) {
	const normalizedPath = filePath.replace(/[\\]+/g, "/")
	const projectPath = normalizedPath?.split('src')[1]
	const segments = projectPath?.split('/')
	
	return segments?.[1]
}

function getImportFromLayer(importFrom) {
	const segments = importFrom?.split('/')
	
	return segments?.[0]
}

function getNormalizedPath(filePath) {
	const normalizedPath = filePath.replace(/[\\]+/g, "/");
	const filePathInSrc = normalizedPath.split('src/')[1];

	return filePathInSrc;
}

// function normalizePath(execPath) {
// 	let splitter = (OS.type() === "Windows_NT") ? "\\" : "/";
// 	const normalizedPath = path.normalize(execPath)
// 	let nameSpacedPath = normalizedPath.split(splitter);
// 	return (nameSpacedPath.join('/'));
// }
 
const layersSubordinates = {
	'app': ['pages', 'widgets', 'features', 'entities', 'shared', ],
	'pages': ['widgets', 'features', 'entities', 'shared', ],
	'widgets': ['features', 'entities', 'shared', ],
	'features': ['entities', 'shared', ],
	'entities': ['entities', 'shared', ],
	'shared': ['shared', ],
}

const checkingLayers = {
	'app': 'app',
	'pages': 'pages',
	'widgets': 'widgets',
	'features': 'features',
	'entities': 'entities',
}

const layers = {
	'app': 'app',
	'pages': 'pages',
	'widgets': 'widgets',
	'features': 'features',
	'entities': 'entities',
	'shared': 'shared',
}

module.exports = { 
	isPathRelative, 
	getFileLayer, 
	getImportFromLayer, 
	getNormalizedPath,
	layers,
	checkingLayers,
	layersSubordinates,
}