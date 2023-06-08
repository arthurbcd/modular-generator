const vscode = require('vscode')
var cp = require('child_process')

// const install = require('./install.js')


// async function getPubspecPath() {
//     try {
//         const files = await vscode.workspace.findFiles('pubspec.yaml');
//         return files[0].path;
//     } catch (error) {
//         const action = await vscode.window.showWarningMessage(
//             'No project found. Install?',
//             { modal: true },
//             'Yes 🔥'
//         );
//         if (action === 'Yes 🔥') {
//             await install.install();
//             const files = await vscode.workspace.findFiles('pubspec.yaml');
//             return files[0].path;
//         }
//     }
// }

/// Returns pubscpec.yaml path and if it came from success or not.
async function createPubspecPath() {
    let path
    let option;

    try {
        const files = await vscode.workspace.findFiles('pubspec.yaml');
        path = files[0].path;
        option = 'Overwrite only lib folder ⚡️';

    } catch (error) {
        path = null;
    }

    const action = await vscode.window.showWarningMessage(
        'This will overwrite everything. Are you sure you want to continue?',
        { modal: true },
        'Yes 🔥', option
    );
    if (action === 'Yes 🔥') return await createProjectInCurrentFolder();
    if (action === 'Overwrite only lib folder ⚡️') return path;
}

async function createProjectInCurrentFolder() {
    let pubspecPath = await vscode.workspace.findFiles('pubspec.yaml');
    //delete current yaml path file
    if (pubspecPath.length > 0) {
        await vscode.workspace.fs.delete(pubspecPath[0]);
    }

    const terminal = vscode.window.createTerminal('Flutter Create');
    terminal.sendText(`flutter create . --empty --overwrite`);
    terminal.show();
    // await execPromise(`flutter create . --empty --overwrite`);

    // Timeout after 5 minutes
    const maxTries = 5 * 60;
    for (let i = 0; i < maxTries; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // 500 ms delay, adjust as necessary

        let pubspecPath = await vscode.workspace.findFiles('pubspec.yaml');
        if (pubspecPath.length > 0) {
            console.log('pubspec.yaml has been created');
            await new Promise(resolve => setTimeout(resolve, 5000)); 
            return pubspecPath[0].path;
        }
    }

    console.log('pubspec.yaml not found after waiting');
}

module.exports = {
    // getPubspecPath,
    createPubspecPath
}