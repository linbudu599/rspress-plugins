const fs = require('fs-extra');
const path = require('path');

const packagesDir = path.resolve(__dirname, '../packages');

const publishPackages = fs.readdirSync(packagesDir);

module.exports = {
  packages: publishPackages,
  scopes: publishPackages.map((p) => p.replace('rspress-', '')),
};
