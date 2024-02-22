// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const tmp = require('tmp');
const fs = require('fs');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "click-code" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('click-code.helloWorld', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from click-code!');
		tmp.file({ prefix: 'vscode-', postfix: '.txt' }, function _tempFileCreated(err, path, fd, cleanupCallback) {
            if (err) {
                vscode.window.showErrorMessage(`Failed to create temporary file: ${err.message}`);
            } else {
                fs.writeFile(path, '', (err) => {
                    if (err) {
                        vscode.window.showErrorMessage(`Failed to write to temporary file: ${err.message}`);
                    } else {
                        vscode.workspace.openTextDocument(path).then((document) => {
                            vscode.window.showTextDocument(document);
							readFile();
                        });
                    }
                });
            }
        });

    });

    
	context.subscriptions.push(disposable);
}

function readFile(){
	let editor = vscode.window.activeTextEditor;
        if (editor) {
            let document = editor.document;
            let text = document.getText();
            vscode.window.showInformationMessage(text);
        } else {
            vscode.window.showInformationMessage('No active editor');
        }
}

// This method is called when your extension is deactivated
export function deactivate() {}
