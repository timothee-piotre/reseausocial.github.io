document.getElementById('startServersBtn').addEventListener('click', startServers);

function appendToConsole(message) {
    const consoleOutput = document.getElementById('consoleOutput');
    consoleOutput.textContent += message + '\n';
}

function runCommand(command) {
    return new Promise((resolve) => {
        appendToConsole(`Executing command: ${command}`);
        // Simulation d'une commande avec un délai pour imiter une exécution réelle
        setTimeout(() => {
            resolve(`Command '${command}' executed successfully.`);
        }, 1000);
    });
}

async function startBackend() {
    appendToConsole('Starting backend server...');
    try {
        const result = await runCommand('node server.js');
        appendToConsole(result);
        appendToConsole('Backend server started successfully.');
    } catch (error) {
        appendToConsole('Failed to start backend server.');
    }
}

async function startFrontend() {
    appendToConsole('Starting frontend server...');
    // Simulation du démarrage du serveur frontend
    try {
        const result = await runCommand('Opening index.html');
        appendToConsole(result);
        appendToConsole('Frontend server started successfully.');
    } catch (error) {
        appendToConsole('Failed to start frontend server.');
    }
}

async function startServers() {
    await startBackend();
    await startFrontend();
}