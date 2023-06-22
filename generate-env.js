// Import the `fs` and `path` modules.
const fs = require('fs');
const path = require('path');

// Define the paths to the shared, server, and client environment files.
const envShared = path.join(__dirname, '.env.shared');
const envServer = path.join(__dirname, 'server', '.env');
const envClient = path.join(__dirname, 'client', '.env');

// Read the shared environment file and split it into an array of lines.
const sharedVars = fs.readFileSync(envShared, 'utf-8').split('\n');

// Create two empty arrays to store the server and client environment variables.
const clientVar = [];
const serverVar = [];

// Iterate over the shared environment variables and add them to the appropriate array based on their prefix.
sharedVars.forEach((line) => {
  const serverPrefix = 'SERVER_';
  const clientPrefix = 'CLIENT_';

  if (line.startsWith(serverPrefix)) {
    serverVar.push(line.substring(serverPrefix.length, line.length));
  } else if (line.startsWith(clientPrefix)) {
    clientVar.push(line.substring(clientPrefix.length, line.length));
  }
});

// Write the server and client environment variables to their respective files.
fs.writeFileSync(envServer, serverVar.join('\n'), 'utf-8');
fs.writeFileSync(envClient, clientVar.join('\n'), 'utf-8');
