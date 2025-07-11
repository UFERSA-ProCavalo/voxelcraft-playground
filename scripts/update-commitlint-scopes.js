// scripts/update-commitlint-scopes.js
// Gera dinamicamente os scopes para commitlint a partir das pastas apps, libs e packages
// e imprime um array pronto para ser usado em scope-enum do commitlint.config.js

const fs = require('fs');
const path = require('path');

function getDirs(srcPath) {
  return fs.existsSync(srcPath)
    ? fs.readdirSync(srcPath).filter(f => fs.statSync(path.join(srcPath, f)).isDirectory())
    : [];
}

function getFeatureScopes(appDir) {
  const featuresPath = path.join(appDir, 'app', 'features');
  return getDirs(featuresPath).map(feature => {
    const appName = path.basename(appDir);
    return `${appName}/${feature}`;
  });
}

function getComponentScopes(pkgDir) {
  const componentsPath = path.join(pkgDir, 'src', 'components');
  return getDirs(componentsPath).map(component => {
    const pkgName = path.basename(pkgDir);
    return `${pkgName}/${component}`;
  });
}

const scopes = new Set();

['apps', 'libs', 'packages'].forEach(dir => {
  getDirs(dir).forEach(sub => {
    scopes.add(sub);
    if (dir === 'apps') {
      getFeatureScopes(path.join(dir, sub)).forEach(scope => scopes.add(scope));
    }
    if (dir === 'packages') {
      getComponentScopes(path.join(dir, sub)).forEach(scope => scopes.add(scope));
    }
  });
});

['config', 'scripts', 'cli', 'ci', 'docs', 'tests', 'repo'].forEach(s => scopes.add(s));
// console.log('Scopes for commitlint:');
console.log(JSON.stringify(Array.from(scopes).sort(), null, 2));
