const path = require('path')
const reactpaths = require('react-scripts/config/paths')

reactpaths.appSrc = path.resolve(__dirname, 'project');
reactpaths.appIndexJs = path.resolve(__dirname, 'project/index.js');