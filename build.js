const { inlineSource } = require('inline-source');
const PJSON = require('./package.json');
const fs = require('fs');
const path = require('path');
const htmlpath = path.resolve('./src/template.html');
const savepath = path.resolve('./dist')
const chokidar = require('chokidar');
const open = require('open');
const ejs = require('ejs');
const execSync = require('child_process').execSync;
let html;

async function build(callback) {
  try {
    // Ensuring savepath exists
    if (!fs.existsSync(savepath)){
      fs.mkdirSync(savepath);
    }
    // Inlining Resources
    if (process.env.mode === "production") {
      // Attempting to build webpack bundles
      code = execSync('npx webpack --mode production');

      html = await inlineSource(htmlpath, {
        compress: true,
        rootpath: path.resolve('./src'),
      });
    } else {
      // Attempting to build webpack bundles
      code = execSync('npx webpack --mode development');

      html = await inlineSource(htmlpath, {
        compress: false,
        pretty: true,
        rootpath: path.resolve('./src'),
      });
    }
    // Compiling template
    html = await ejs.render(html, {
      version: PJSON.version
    })
    // Saving HTML
    fs.writeFile(path.join(savepath, 'TagCite v' + PJSON.version + '.html'), html, function (err) {
      if (err) {
        throw err;
      }
      callback();
    }); 
  } catch (err) {
    throw err;
  }
}

function watch() {
  console.log("Building...");
  build(function() {
    console.log("Done");

    console.log("Opening...");
    openpath = path.join(savepath, 'TagCite v' + PJSON.version + '.html');
    console.log(openpath);
    open(openpath);
    
    console.log("Watching...")
    // Watch for changes in src dir
    chokidar.watch('src', {
      ignored: /(^|[\/\\])\../
    }).on('change', (path) => {
      console.log("\nChange detected in file " + path);
      console.log("Rebuilding...");
      build(function() {
        console.log("Done");
      })
    });
  });
}

module.exports = {
  build: function() {
    console.log("Building...");
    build(function() {
      console.log("Done");
    });
  },
  watch: function() {
    watch();
  }
}
