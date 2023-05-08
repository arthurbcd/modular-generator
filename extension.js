const vscode = require('vscode');
const install = require('./src/install.js');
const addPage = require('./src/add-page.js');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let installCmd = vscode.commands.registerCommand('modular-generator.install', install.install);
	let addModuleCmd = vscode.commands.registerCommand('modular-generator.addPage', addPage.addModule);

	context.subscriptions.push(installCmd);
	context.subscriptions.push(addModuleCmd);
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
