// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

const vscode = require('vscode');
const tmp = require('tmp');
const fs = require('fs');
const axios = require('axios');


 var storedValue='';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "click-code" is now active!');
    
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('click-code.clickcode', async function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from click-code!');
        console.log(context.workspaceState);
        //getApiKey();
        const apiKey = context.workspaceState.get('apiKey');

        if (apiKey) {
            storedValue=apiKey;
            vscode.window.showInformationMessage(`Stored value is: ${apiKey}`);
        } else {
            vscode.window.showInformationMessage('No value stored.');
        }

	 tmp.file({ prefix: 'vscode-', postfix: '.txt' }, function _tempFileCreated(err, path, fd, cleanupCallback) {
            if (err) {
                vscode.window.showErrorMessage(`Failed to create temporary file: ${err.message}`);
            } else {
                const markdownString = new vscode.MarkdownString(`[Click Me](command:click-code.buttonClicked)`);
        markdownString.isTrusted = true; // Enable commands in MarkdownString
                fs.writeFile(path, '', (err) => {
                    if (err) {
                        vscode.window.showErrorMessage(`Failed to write to temporary file: ${err.message}`);
                    } else {
                        vscode.workspace.openTextDocument(path).then((document) => {
                            vscode.window.showTextDocument(document);
							readFile(context);
                            
                        });
                    }
                });
            }
        });

	

    });
	context.subscriptions.push(disposable);

	console.log('Congratulations, your extension "click-code" is now active!');
    
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let Api_disposable = vscode.commands.registerCommand('click-code.api-key', async function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Set APi Key for click-code!');
        //setApiKey();
        const value = await vscode.window.showInputBox({
            prompt: 'Enter your API key',
            placeHolder: 'API key'
        });
        if (value) {
            context.workspaceState.update('apiKey', value);
            console.log(context.workspaceState);
            storedValue=value;
            vscode.window.showInformationMessage('Value stored successfully.');
        } else {
            vscode.window.showInformationMessage('No value entered.');
        }
	

    });
	context.subscriptions.push(Api_disposable);
}




function readFile(context){
	let disposable = vscode.workspace.onDidChangeTextDocument(debounce(async (event) => {

		let editor = vscode.window.activeTextEditor;
        if (editor) {
            let document = editor.document;
            let text = document.getText();;
			 console.log(`Change in document ${text}:`);

            const confirmMessage = 'Are you sure you want to proceed?';
            const confirmButtonLabel = 'Confirm';


            const result = await vscode.window.showInformationMessage(confirmMessage,confirmButtonLabel, 'No');

            if (result === confirmButtonLabel) {
                vscode.window.showInformationMessage('Confirmed!');
                main(text)
            } else {
                vscode.window.showInformationMessage('Cancelled.');
            }
            
        } else {
            vscode.window.showInformationMessage('No active editor');
        }
    }, 500)); // Debounce time in milliseconds;

    context.subscriptions.push(disposable);
	
}

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

async function main(text) {
    
    console.log(`Bearer ${storedValue}`)
   let response = await axios.post('https://api.openai.com/v1/chat/completions', {
                
                "model": "gpt-3.5-turbo",
                "messages": [
                // {
                //     "role": "system",
                //     "content": "provide code for creating vscode extension"
                // },
                {
                    "role": "user",
                    "content": JSON.stringify(`Explain ${text}`)
                }
                ]
            
            }, {
                headers: {
                    'Authorization': `Bearer ${storedValue}`,
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
        //handle success
        var completion = response.data.choices[0].message.content.trim();
        showresults(completion)
        console.log(response);
        vscode.window.showInformationMessage(`data: ${data}`);
            
        // <button id="myButton">Click Me</button>
        //     <script>
        //         const vscode = acquireVsCodeApi();
        //         const button = document.getElementById('myButton');
        //         button.addEventListener('click', () => {
        //             vscode.postMessage({ command: 'buttonClick' });
        //         });
        //     </script>
    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });

 
}

    function showresults(data){
    
        vscode.window.createInputBox();
             const panel = vscode.window.createWebviewPanel(
            'buttonSample',
            'Open AI Response',
            vscode.ViewColumn.Beside,
            {}
        );

        panel.webview.html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Open AI Response</title>
        </head>
        <body>
        ${data}
            
        </body>
        </html>
        `;
    }

    
    async function setApiKey(context){
        const apiKey = await vscode.window.showInputBox({
            prompt: 'Enter your API key',
            placeHolder: 'API key'
        });
        //vscode.window.showInformationMessage(apiKey);
        if (apiKey) {
            vscode.ExtensionContext.workspaceState.update('apiKey', apiKey);
            vscode.window.showInformationMessage('Value stored successfully.');
        } else {
            vscode.window.showInformationMessage('No value entered.');
        }
    }

    function getApiKey(context){
    //    const apiKey = context.workspaceState.get('apiKey');

    //     if (apiKey) {
    //         vscode.window.showInformationMessage(`Stored value is: ${apiKey}`);
    //     } else {
    //         vscode.window.showInformationMessage('No value stored.');
    //     }

    }

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
