// @ts-nocheck
const vscode = require('vscode')
const replace = require('replace-in-file')
const fs = require('fs')
const utils = require('./utils.js')
const install = require('./install.js');
const path = require('path');

module.exports = {
    addModule: addModule,
    updateModule: updateModule
}

async function getModules() {
    var [pubspecPath] = await utils.getPubspecPath();
    let path = pubspecPath.replace("pubspec.yaml", "")

    const modulePaths = `${path}lib/app/modules/`;

    const moduleDirectories = fs.readdirSync(modulePaths, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory());

    const modules = moduleDirectories.map(dirent => ({
        name: dirent.name,
        path: modulePaths + dirent.name
    }));

    return modules;
}

function validateInput(input) {
    let regex = /^[a-zA-Z\s_]*$/;

    if (!regex.test(input) || input.length === 0) {
        vscode.window.showInformationMessage(`Invalid name: ${input} 😵‍💫`)
        return false;
    }
    return true;
}

async function updateModule() {

    const modules = await getModules();
    const moduleNames = modules.map(module => module.name);

    const moduleName = await vscode.window.showQuickPick(moduleNames, {
        placeHolder: 'Which Module do you want to update?',
    });

    if (!validateInput(moduleName)) return;

    await addModule(moduleName);

}

async function addModule(maybeModuleName) {
    var [pubspecPath] = await utils.getPubspecPath()

    if (typeof pubspecPath === 'string' && pubspecPath.length > 0) {

        /// * Pick the module
        const moduleName = maybeModuleName ?? await vscode.window.showInputBox({
            placeHolder: "e.g module name or module_name or ModuleName",
            prompt: "Add a valid Module name.",
        });

        if (!validateInput(moduleName)) return;

        await moveFile(null, moduleName, 'module');

        /// * Generate the pages
        const pageNamesInput = await vscode.window.showInputBox({
            placeHolder: "e.g login, register, ... (leave empty to skip)",
            prompt: "Pages to add. If the Module and Page names are equal, the route will be '/', otherwise '/page_name'.",
        });

        if (pageNamesInput) {
            const pageNames = pageNamesInput.split(',').map(name => name.trim());

            for (const pageName of pageNames) {
                if (!validateInput(pageName)) continue;
                await moveFile(moduleName, pageName, 'view');
            }
        }

        /// * Generate the services
        const serviceNamesInput = await vscode.window.showInputBox({
            placeHolder: "e.g server auth, google auth, ... (leave empty to skip)",
            prompt: "Services to add. Please, separate by commas.",
        });

        if (serviceNamesInput) {
            const serviceNames = serviceNamesInput.split(',').map(name => name.trim());

            for (const serviceName of serviceNames) {
                if (!validateInput(serviceName)) continue;
                await moveFile(moduleName, serviceName, 'service');
            }
        }

        /// * Generate the repositories
        const repositoryNamesInput = await vscode.window.showInputBox({
            placeHolder: "e.g server auth, ... (leave empty to skip)",
            prompt: "Repositories to add. Please, separate by commas.",
        });

        if (repositoryNamesInput) {
            const repositoryNames = repositoryNamesInput.split(',').map(name => name.trim());

            for (const repositoryName of repositoryNames) {
                if (!validateInput(repositoryName)) continue;
                await moveFile(moduleName, repositoryName, 'repository');
            }
        }

        vscode.window.showInformationMessage('Module Generated 🔥')

    }
}

/**
 * @param {string} path
 * @param {string} projectName
 * @param {string} typeName
 * @param {string} type
 */
async function moveFile(moduleName, typeName, type) {
    let extension
    vscode.extensions.all.forEach((e) => {
        if (e.id.includes("modular-generator")) {
            extension = e
        }
    })

    if (extension == null) {
        return
    }
    var [pubspecPath] = await utils.getPubspecPath();

    let path = pubspecPath.replace("pubspec.yaml", "")
    var data = fs.readFileSync(pubspecPath, 'utf-8')
    var lines = data.split('\n')
    var projectName = lines[0].replace("name: ", "")

    var fileName = typeName
        .replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .toLowerCase()
        .replace(/page/g, '').trim()
        .replace(/\s\s+/g, ' ')
        .replace(/\s/g, '_')

    var fileModuleName = (moduleName ?? typeName)
        .replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .toLowerCase()
        .replace(/page/g, '').trim()
        .replace(/\s\s+/g, ' ')
        .replace(/\s/g, '_');

    var className = fileName
        .replace(/_/g, ' ')
        .replace(/\w+/g,
            function (w) { return w[0].toUpperCase() + w.slice(1).toLowerCase(); })
        .replace(/\s/g, '')

    if (type === 'repository') {
        await vscode.workspace.fs.copy(
            vscode.Uri.parse(`${extension.extensionPath}/pattern/template/app/modules/template/repositories/template_repository.dart`),
            vscode.Uri.parse(`${path}lib/app/modules/${fileModuleName}/repositories/${fileName}_repository.dart`),
            { overwrite: true }
        )
    }
    if (type === 'service') {
        await vscode.workspace.fs.copy(
            vscode.Uri.parse(`${extension.extensionPath}/pattern/template/app/modules/template/services/template_service.dart`),
            vscode.Uri.parse(`${path}lib/app/modules/${fileModuleName}/services/${fileName}_service.dart`),
            { overwrite: true }
        )
    }
    if (type === 'view') {
        await vscode.workspace.fs.copy(
            vscode.Uri.parse(`${extension.extensionPath}/pattern/template/app/modules/template/views/template/template_page.dart`),
            vscode.Uri.parse(`${path}lib/app/modules/${fileModuleName}/views/${fileName}/${fileName}_page.dart`),
            { overwrite: true }
        )
        await vscode.workspace.fs.copy(
            vscode.Uri.parse(`${extension.extensionPath}/pattern/template/app/modules/template/views/template/template_controller.dart`),
            vscode.Uri.parse(`${path}lib/app/modules/${fileModuleName}/views/${fileName}/${fileName}_controller.dart`),
            { overwrite: true }
        )
    }
    if (type === 'module') {
        await vscode.workspace.fs.copy(
            vscode.Uri.parse(`${extension.extensionPath}/pattern/template/app/modules/template/template_module.dart`),
            vscode.Uri.parse(`${path}lib/app/modules/${fileName}/${fileName}_module.dart`),
            { overwrite: true }
        )
    }

    const modulePath = `${path}lib/app/modules/${fileModuleName}/${fileModuleName}_module.dart`;
    const viewPath = `${path}lib/app/modules/${fileModuleName}/views/${fileName}/*.dart`;
    const servicePath = `${path}lib/app/modules/${fileModuleName}/services/*.dart`;
    const repositoryPath = `${path}lib/app/modules/${fileModuleName}/repositories/*.dart`;

    var files = [modulePath];

    if (type === 'view') files.push(viewPath);
    if (type === 'service') files.push(servicePath);
    if (type === 'repository') files.push(repositoryPath);

    /// Add imports, binds and routes as module templates
    modifyModule(modulePath, fileName, type);

    // const pageSuffix = vscode.workspace.getConfiguration().get('modular-generator.pageSuffix');
    // const controllerSuffix = vscode.workspace.getConfiguration().get('modular-generator.controllerSuffix');
    // const viewFolder = vscode.workspace.getConfiguration().get('modular-generator.viewFolder');
    // const serviceSuffix = vscode.workspace.getConfiguration().get('modular-generator.serviceSuffix');
    // const serviceFolder = vscode.workspace.getConfiguration().get('modular-generator.serviceFolder');
    // const repositorySuffix = vscode.workspace.getConfiguration().get('modular-generator.repositorySuffix');
    // const repositoryFolder = vscode.workspace.getConfiguration().get('modular-generator.repositoryFolder');

    const replacements = [
        { from: /modular_generator/g, to: projectName },
        { from: /Template/g, to: className },
        { from: /template/g, to: fileName },
        // { from: /Page/g, to: pageSuffix },
        // { from: /page/g, to: pageSuffix.toLowerCase() },
        // { from: /Controller/g, to: controllerSuffix },
        // { from: /controller/g, to: controllerSuffix.toLowerCase() },
        // { from: /views/g, to: viewFolder },
        // { from: /Service/g, to: serviceSuffix },
        // { from: /service/g, to: serviceSuffix.toLowerCase() },
        // { from: /services/g, to: serviceFolder },
        // { from: /Repository/g, to: repositorySuffix },
        // { from: /repository/g, to: repositorySuffix.toLowerCase() },
        // { from: /repositories/g, to: repositoryFolder },
    ];

    replace.sync({
        files,
        from: replacements.map(replacement => replacement.from),
        to: replacements.map(replacement => replacement.to),
        countMatches: true
    });


    // Update app_routes.dart
    if (type === "view") {
        const moduleRoute = fileModuleName == fileName ? '' : '/' + fileModuleName;
        modifyAppRoutes(path, moduleRoute, fileName);
    }
}

function modifyAppRoutes(path, moduleRoute, pageRoute) {
    let appRoutesPath = `${path}lib/app/app_routes.dart`;
    var appRoutesData = fs.readFileSync(appRoutesPath, 'utf-8');

    if (!appRoutesData.includes('static')) {
        fs.writeFileSync(appRoutesPath, `mixin AppRoutes {\n  static const ${pageRoute} = '${moduleRoute}/${pageRoute}';\n}\n`, 'utf-8');
    } else {
        var appRoutesLines = appRoutesData.split('\n');

        var index = 0;
        for (let i = 0; i < appRoutesLines.length; i++) {
            const element = appRoutesLines[i];
            if (element.includes('}')) {
                index = i;
            }
        }

        appRoutesLines.splice(index, 0,
            `  static const ${pageRoute} = '${moduleRoute}/${pageRoute}/';`
        );
        fs.writeFileSync(appRoutesPath, appRoutesLines.join('\n'), 'utf-8');
    }
}

function modifyModule(path, fileName, type) {

    if (type === 'module') return;

    var templateModuleData = fs.readFileSync(path, 'utf-8');
    var templateModuleLines = templateModuleData.split('\n');

    // Add the new import lines after the last import
    var lastImportIndex = templateModuleLines.lastIndexOf(line => line.includes('import'));

    // Add import and bind statements based on the type
    var importStatement, bindStatement;

    switch (type) {
        case 'view':
            importStatement = `import 'views/template/template_controller.dart';`;
            importStatement += `\nimport 'views/template/template_page.dart';`;
            bindStatement = `    AutoBind.lazySingleton(TemplateController.new),`;
            break;
        case 'service':
            importStatement = `import 'services/template_service.dart';`;
            bindStatement = `    AutoBind.lazySingleton(TemplateService.new),`;
            break;
        case 'repository':
            importStatement = `import 'repositories/template_repository.dart';`;
            bindStatement = `    AutoBind.lazySingleton(TemplateRepository.new),`;
            break;
    }

    templateModuleLines.splice(lastImportIndex + 1, 0, importStatement);

    // If the opening and closing brackets are on the same line, break the line
    function openBrackets(index) {
        if (templateModuleLines[index].includes('];')) {
            templateModuleLines.splice(index + 1, 0, '  ];');
            templateModuleLines[index] = templateModuleLines[index].replace('];', '');
        }
    }

    // Find the index of the closing bracket for the binds list
    var bindIndex = templateModuleLines.findIndex(line => line.includes('binds = ['));
    openBrackets(bindIndex);
    var bindEndIndex = bindIndex;

    for (let i = bindIndex; i < templateModuleLines.length; i++) {
        if (templateModuleLines[i].includes('];')) {
            bindEndIndex = i;
            break;
        }
    }

    // Add the new Bind line before the closing bracket of the binds list
    templateModuleLines.splice(bindEndIndex, 0, bindStatement);

    // If type is 'view', add the routing info
    if (type === 'view') {
        // Find the index of the closing bracket for the routes list
        var routesIndex = templateModuleLines.findIndex(line => line.includes('routes = ['));
        openBrackets(routesIndex);
        var routesEndIndex = routesIndex;

        for (let i = routesIndex; i < templateModuleLines.length; i++) {
            if (templateModuleLines[i].includes('];')) {
                routesEndIndex = i;
                break;
            }
        }

        const routeName = path.endsWith(`${fileName}_module.dart`) ? '' : 'template';

        // Add the new ChildRoute line before the closing bracket of the routes list
        templateModuleLines.splice(routesEndIndex, 0,
            `    ChildRoute('/${routeName}', child: (_, args) => const TemplatePage()),`
        );
    }

    fs.writeFileSync(path, templateModuleLines.join('\n'), 'utf-8');
}
