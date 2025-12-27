const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const srcDir = path.join(__dirname, '../src');

// 确保 src 目录存在
if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir, { recursive: true });
}

// 生成新的 UUID
function generateUUID() {
    return crypto.randomUUID();
}

const sourceUrl = 'https://raw.githubusercontent.com/eooce/nodejs-argo/main/index.js';

function downloadAndModify() {
    console.log('下载源文件...');
    
    https.get(sourceUrl, (response) => {
        let data = '';
        
        response.on('data', (chunk) => {
            data += chunk;
        });
        
        response.on('end', () => {
            // 生成新的 UUID
            const newUUID = generateUUID();
            console.log(`生成新 UUID: ${newUUID}`);
            
            // 替换默认 UUID
            const modifiedCode = data.replace(
                /const UUID = process\.env\.UUID \|\| '[^']+'/,
                `const UUID = process.env.UUID || '${newUUID}'`
            );
            
            const outputPath = path.join(srcDir, 'index.js');
            fs.writeFileSync(outputPath, modifiedCode);
            console.log(`源文件已保存: ${outputPath}`);
            console.log('\n下载完成！');
        });
    }).on('error', (err) => {
        console.error('下载失败:', err.message);
    });
}

downloadAndModify();
