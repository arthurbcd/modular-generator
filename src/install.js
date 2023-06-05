// @ts-nocheck
const vscode = require('vscode')
const replace = require('replace-in-file')
const fs = require('fs')
const utils = require('./utils.js')
var cp = require('child_process')

async function install() {
    var [pubspecPath, success] = await utils.getPubspecPath();

    if (typeof pubspecPath === 'string' && pubspecPath.length > 0) {

        if (success) {
            const overwrite = await vscode.window.showWarningMessage(
                'This will overwrite everything. Are you sure you want to continue?',
                { modal: true },
                'Yes 🔥', 'No'
            );

            if (overwrite !== 'Yes 🔥') return;
        }

        let path = pubspecPath.replace("pubspec.yaml", "")
        var data = fs.readFileSync(pubspecPath, 'utf-8')
        var lines = data.split('\n')

        cp.exec(`
        cd ${path} &&
        flutter pub add asp flutter_modular:6.0.0-beta.2
        `, (err, stdout, stderr) => {
            if (err) {

                return console.log('error: ' + err)
            }
            console.log('stdout: ' + stdout)
            console.log('stderr: ' + stderr)

            data = fs.readFileSync(pubspecPath, 'utf-8')
            lines = data.split('\n')
            var index = 0
            for (let i = 0; i < lines.length; i++) {
                const element = lines[i];
                if (element.includes('dev_dependencies')) {
                    index = i
                }
            }
            // lines.splice(index - 1, 0, "  flutter_modular: 2.2.0")
            fs.writeFileSync(pubspecPath, lines.join('\n'), 'utf-8')
            data = lines.join('\n')

            cp.exec(`cd ${path} && dart pub upgrade --major-versions`)
        })


        var projectName = lines[0].replace("name: ", "")
        await moveFile(path, projectName)
        vscode.window.showInformationMessage('Generate successful 🟨⬛');
        vscode.window.showInformationMessage('Press F5 to get started 🔥');
    }
    else { return }
}

/**
 * @param {string} path
 * @param {string} projectName
 */
async function moveFile(path, projectName) {

    vscode.extensions.all.forEach((e) => {
        if (e.id.includes("modular-generator")) {
            vscode.workspace.fs.copy(vscode.Uri.parse(`${e.extensionPath}/pattern/lib`), vscode.Uri.parse(`${path}lib`), { overwrite: true }).then(() => {

                replace.sync({
                    files: [
                        `${path}lib/*.dart`,
                        `${path}lib/app/*.dart`,
                        `${path}lib/app/modules/*.dart`,
                        `${path}lib/app/modules/views/*.dart`,
                        `${path}lib/app/modules/views/home/*.dart`,
                        `${path}lib/app/modules/services/*.dart`,
                        `${path}lib/app/modules/repositories/*.dart`,
                        `${path}lib/app/modules/models/*.dart`,
                    ],
                    from: /modular_generator/g,
                    to: projectName,
                    countMatches: true,
                });
            })
        }
    })

}


module.exports = {
    install: install
}