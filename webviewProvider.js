const vscode = require('vscode');

class WebviewProvider {
    constructor() {
        this._panel = vscode.window.createWebviewPanel(
            'webviewSample',
            'Sample Webview',
            vscode.ViewColumn.One,
            {}
        );

        this._panel.webview.html = this._getWebviewContent();
    }

    _getWebviewContent() {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Sample Webview</title>
        </head>
        <body>
            <iframe src="https://example.com" width="100%" height="100%"></iframe>
        </body>
        </html>
        `;
    }
}

module.exports = WebviewProvider;
