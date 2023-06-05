const vscode = require('vscode')

/// Returns pubscpec.yaml path and if it came from success or not.
async function getPubspecPath() {
    try {
        let path = await vscode.workspace.findFiles('pubspec.yaml')
        return [path[0].path, true];
    } catch (error) {
        const pickItems = installModularTemplate()

        const selectedTemplate = await vscode.window.showQuickPick(
            pickItems,
            {
                matchOnDescription: true,
                placeHolder: "No pubspec.yaml found. What would you like to do?",
            },
        )

        if (!selectedTemplate)
            return;

        const path = await chooseInstallModularTemplate(selectedTemplate.template.id);
        if (typeof path === 'string' && path.length > 0) return [path, false];
        return;
    }
}

/**
 * @param {string} id
 */
async function chooseInstallModularTemplate(id) {
    switch (id) {
        case 'createProject':
            return await createProjectInCurrentFolder();
        case 'openProject':
            return vscode.commands.executeCommand('vscode.openFolder');
        default:
            return;
    }
}

async function createProjectInCurrentFolder() {
    const terminal = vscode.window.createTerminal('Flutter Create');
    terminal.sendText(`flutter create . --empty --overwrite`);
    terminal.show();

    // Timeout after 15 seconds
    const maxTries = 30;
    for (let i = 0; i < maxTries; i++) {
        await new Promise(resolve => setTimeout(resolve, 500)); // 500 ms delay, adjust as necessary

        let pubspecPath = await vscode.workspace.findFiles('pubspec.yaml');
        if (pubspecPath.length > 0) {
            console.log('pubspec.yaml has been created');
            return pubspecPath[0].path;
        }
    }

    console.log('pubspec.yaml not found after waiting');
}



function installModularTemplate() {
    const templates = [
        {
            detail: "Install a new Modular project. (project folder must be in snake_case)",
            label: "Clean install here (overwrite)",
            template: { id: "createProject" },
        },
        {
            detail: "Pick a project with a valid pubspec.yaml and call install again.",
            label: "Open existing Flutter Project",
            template: { id: "openProject" },
        },
    ]

    return templates
}

module.exports = {
    getPubspecPath
}