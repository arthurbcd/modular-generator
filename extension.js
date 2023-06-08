const vscode = require('vscode');
const install = require('./src/install.js');
const modules = require('./src/add-module.js');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let installCmd = vscode.commands.registerCommand('modular-generator.install', install.install);
	let addModuleCmd = vscode.commands.registerCommand('modular-generator.addModule', modules.addModule);
	let upModuleCmd = vscode.commands.registerCommand('modular-generator.updateModule', modules.updateModule);

	context.subscriptions.push(installCmd);
	context.subscriptions.push(addModuleCmd);
	context.subscriptions.push(upModuleCmd);
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
