const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');
const oldNextDir = path.join(outDir, '_next');
const newNextDir = path.join(outDir, 'assets');

if (fs.existsSync(oldNextDir)) {
  fs.renameSync(oldNextDir, newNextDir);
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else {
      const ext = path.extname(fullPath);
      if (['.html', '.js', '.css', '.json', '.txt', '.xml'].includes(ext)) {
        let content = fs.readFileSync(fullPath, 'utf8');

        // Replace /_next/ with /assets/
        let replaced = false;
        if (content.includes('/_next/')) {
          content = content.split('/_next/').join('/assets/');
          replaced = true;
        }

        // Also catch _next/ without leading slash if any
        if (content.includes('_next/')) {
          content = content.split('_next/').join('assets/');
          replaced = true;
        }

        // Sometimes Next.js writes strings like \"/_next/static/...\"
        if (content.includes('\\/_next\\/')) {
          content = content.split('\\/_next\\/').join('\\/assets\\/');
          replaced = true;
        }

        if (replaced) {
          fs.writeFileSync(fullPath, content, 'utf8');
        }
      }
    }
  }
}

function deleteTxtFiles(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      deleteTxtFiles(fullPath);
    } else if (path.extname(fullPath) === '.txt') {
      fs.unlinkSync(fullPath);
    }
  }
}

function generateHtaccess() {
  const htaccessContent = `# Serve index.html as the default document
DirectoryIndex index.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Explicitly serve index.html for bare domain root requests
  # This bypasses any cPanel default landing page
  RewriteRule ^$ /index.html [L]

  # Serve existing files and directories directly
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Route extensionless URLs to .html files
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^(.*)$ $1.html [L]
</IfModule>

# Cache static assets aggressively (1 year for JS/CSS/images)
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"
</IfModule>

# Enable gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json
</IfModule>

Options -Indexes
`;

  const htaccessPath = path.join(outDir, '.htaccess');
  fs.writeFileSync(htaccessPath, htaccessContent, 'utf8');
  console.log('Generated .htaccess with root redirect fix.');
}

if (fs.existsSync(outDir)) {
  processDirectory(outDir);
  deleteTxtFiles(outDir);
  generateHtaccess();
  console.log('Successfully renamed _next to assets and removed .txt files.');
} else {
  console.log('out directory not found.');
}
