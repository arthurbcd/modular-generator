const vscode = require('vscode')

async function getPubspecPath() {
    try {
        let path = await vscode.workspace.findFiles('pubspec.yaml')
        return path[0].path
    } catch (error) {
        const pickItems = getxInstallTemplate()

        const selectedTemplate = await vscode.window.showQuickPick(
            pickItems,
            {
                matchOnDescription: true,
                placeHolder: "Project not found!",
            },
        )

        if (!selectedTemplate)
            return;

        chooseGetxInstallTemplate(selectedTemplate.template.id);
        return;
    }
}

/**
 * @param {string} id
 */
function chooseGetxInstallTemplate(id) {
    switch (id) {
        case 'createProject':
            return createProjectInCurrentFolder();
        case 'openProject':
            return vscode.commands.executeCommand('vscode.openFolder');
        default:
            return;
    }
}

function createProjectInCurrentFolder() {
    const terminal = vscode.window.createTerminal('Flutter Create');
    // const projectName = 'your_project_name'; // Replace this with the desired project name.
    terminal.sendText(`flutter create .`);
    terminal.show();
}

function getxInstallTemplate() {
    const templates = [
        {
            detail: "Create new flutter project.",
            label: "Flutter: New Project",
            template: { id: "createProject" },
        },
        {
            detail: "Open an existing flutter project.",
            label: "Flutter: Open Project",
            template: { id: "openProject" },
        },
    ]

    return templates
}

module.exports = {
    getPubspecPath
}