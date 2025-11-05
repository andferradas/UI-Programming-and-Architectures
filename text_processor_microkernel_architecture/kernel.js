// kernel.js
const plugins = {};

function registerPlugin(name, func, description) {
  plugins[name] = { run: func, description };
}

function getPlugins() {
  return Object.keys(plugins);
}

function runPlugin(name, input) {
  return plugins[name].run(input);
}

// Additional
/*
 * Gets the description of a plugin by its name.
 */
function getPluginDescription(name) {
  return plugins[name]?.description || "";
}
