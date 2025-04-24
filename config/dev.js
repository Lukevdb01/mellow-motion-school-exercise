// start-dev.js
import { spawn } from 'child_process';
import path from 'path';
import chalk from 'chalk';
import http from 'http';
import fs from 'fs';

// Configuratie
const PHP_PORT = 8000;
const VITE_PORT = 5173;
const phpBackendPath = path.resolve('backend');

// ➤ Log serverstart
console.log(chalk.cyanBright('[INFO] Starting local dev environment...\n'));
console.log(chalk.yellowBright(`[PHP]  → http://localhost:${PHP_PORT}`));
console.log(chalk.greenBright(`[VITE] → http://localhost:${VITE_PORT}\n`));

// ➤ Start PHP Server (stil, geen stdout/stderr)
const phpServer = spawn('php', ['-S', `localhost:${PHP_PORT}`, '-t', phpBackendPath], {
  stdio: ['ignore', 'pipe', 'pipe'],
  shell: true,
});

// ➤ Middleware-achtig logging script op de PHP-poort
const proxy = http.createServer((req, res) => {
  const start = Date.now();
  const proxyReq = http.request(
    {
      hostname: 'localhost',
      port: PHP_PORT,
      path: req.url,
      method: req.method,
      headers: req.headers,
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });

      proxyRes.on('end', () => {
        const ms = Date.now() - start;
        console.log(
          `${chalk.gray(`[${new Date().toISOString()}]`)} ${chalk.blue(req.method)} ${chalk.white(req.url)} → ${chalk.green(proxyRes.statusCode)} ${chalk.magenta(`${ms}ms`)}`
        );
      });
    }
  );

  proxyReq.on('error', (err) => {
    console.error(chalk.red(`[ERROR] ${err.message}`));
    res.writeHead(500);
    res.end('Internal Server Error');
  });

  req.pipe(proxyReq, { end: true });
});
proxy.listen(PHP_PORT + 1); // bijv. op poort 8001

console.log(chalk.gray(`[LOG] PHP proxy active on http://localhost:${PHP_PORT + 1}`));

// ➤ Start Vite Dev Server (stil)
const viteServer = spawn('npx', ['vite', '--port', VITE_PORT], {
  stdio: ['ignore', 'pipe', 'pipe'],
  shell: true,
});

// Clean-up
const cleanExit = () => {
  console.log('\n' + chalk.redBright('[SHUTDOWN] Cleaning up child processes...'));
  phpServer.kill();
  viteServer.kill();
  proxy.close(() => {
    console.log(chalk.gray('[LOG] Proxy server closed.'));
    process.exit();
  });
};

process.on('SIGINT', cleanExit);
process.on('SIGTERM', cleanExit);
