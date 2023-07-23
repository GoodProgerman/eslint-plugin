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

// function normalizePath(execPath) {
// 	let splitter = (OS.type() === "Windows_NT") ? "\\" : "/";
// 	const normalizedPath = path.normalize(execPath)
// 	let nameSpacedPath = normalizedPath.split(splitter);
// 	return (nameSpacedPath.join('/'));
// }

module.exports = { isPathRelative, getFileLayer, getImportFromLayer }