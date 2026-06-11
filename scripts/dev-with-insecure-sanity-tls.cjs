const { spawn } = require('child_process')
const path = require('path')

const command =
  process.platform === 'win32'
    ? path.join(process.cwd(), 'node_modules', '.bin', 'next.cmd')
    : path.join(process.cwd(), 'node_modules', '.bin', 'next')

const child = spawn(command, ['dev', '-p', '3001'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_TLS_REJECT_UNAUTHORIZED: '0',
  },
})

child.on('exit', (code) => {
  process.exit(code ?? 0)
})
