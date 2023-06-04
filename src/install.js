// @ts-nocheck
const vscode = require('vscode')
const replace = require('replace-in-file')
const fs = require('fs')
const utils = require('./utils.js')
var cp = require('child_process')

async function install() {
    var pubspecPath = await utils.getPubspecPath()

    if (typeof pubspecPath === 'string' && pubspecPath.length > 0) {

        /// path = .../
        let path = pubspecPath.replace("pubspec.yaml", "")
        var data = fs.readFileSync(pubspecPath, 'utf-8')
        var lines = data.split('\n')

        cp.exec(`
        cd ${path} &&
        flutter pub remove get flutter_spinkit responsive_framework google_fonts flutter_datetime_picker
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
            lines.splice(index - 1, 0, "  flutter_modular: 2.2.0")
            fs.writeFileSync(pubspecPath, lines.join('\n'), 'utf-8')
            data = lines.join('\n')

            cp.exec(`cd ${path} && dart pub upgrade --major-versions`)
        })


        var projectName = lines[0].replace("name: ", "")
        await moveFile(path, projectName)
        vscode.window.showInformationMessage('Generate successful 🥳🤘🏻')
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
                        `${path}lib/app/data/api/*.dart`,
                        `${path}lib/app/data/provider/*.dart`,
                        `${path}lib/app/modules/home_module/*.dart`,
                        `${path}lib/app/modules/splash_module/*.dart`,
                        `${path}lib/app/routes/*.dart`,
                        `${path}lib/app/themes/*.dart`,
                        `${path}lib/app/translations/*.dart`,
                        `${path}lib/app/utils/*.dart`,
                        `${path}lib/app/utils/widgets/*.dart`,
                        `${path}lib/app/utils/widgets/app_bar/*.dart`,
                        `${path}lib/app/utils/widgets/app_button/*.dart`,
                        `${path}lib/app/utils/widgets/app_divider/*.dart`,
                        `${path}lib/app/utils/widgets/app_text_field/*.dart`,
                        `${path}lib/app/utils/widgets/bottom_sheet_provider/*.dart`,
                        `${path}lib/app/utils/widgets/dialog_provider/*.dart`,
                        `${path}lib/app/utils/widgets/dialog_provider/view_dialog/*.dart`,
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