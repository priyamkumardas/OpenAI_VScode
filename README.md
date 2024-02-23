# VS Code Code Explanation Extension

![Image Alt Text](https://raw.githubusercontent.com/priyamkumardas/OpenAI_VScode/master/images/image.png)

This is a Visual Studio Code extension that fetches code explanations from the OpenAI API. It helps developers understand complex code snippets by providing explanations in natural language.

## Features

- **Code Explanation:** Get detailed explanations for code snippets.
- **Language Support:** Supports multiple programming languages.
- **Customization:** Configure the extension to suit your needs.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+X`.
3. Search for "Click Code".
4. Click on the Install button.

## Usage

1. Select a code snippet in your editor.
2. Right-click on the selected code & copy it.
3. Press `Ctrl+shift+p` & type `click-code` as the command and press enter.
4. A new empty temp txt file will open.
5. Type "Explain Code" in that file and paste the copied code.
6. An alert is generated seeking confirmation, press confirm.
7. The extension will fetch the explanation from the OpenAI API and display it in a new view in vscode.

## Configuration

You can configure the extension by pressing `Ctrl+Shift+P` and typing command "Click-Code: Set Api Key" in Visual Studio Code. Here are some available configurations:

- `api_key`: Your OpenAI API key.
- `default_language`: The default programming language for code snippets.
- `max_explanation_length`: The maximum length of the explanation to display.

## Repository

The source code for this extension is available on [GitHub](https://github.com/priyamkumardas/OpenAI_VScode.git).

## Known Issues

- This extension may not provide accurate explanations for all code snippets.
- There may be limitations on the number of API requests allowed per day.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.
