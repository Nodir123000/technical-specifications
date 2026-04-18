const fs = require('fs');
const path = require('path');

const targetDirs = [
    "c:\\Системы\\Технические задания\\01_Нормативка",
    "c:\\Системы\\Технические задания\\02_Документы_заказчика",
    "c:\\Системы\\Технические задания\\06_Техническое_задание\\Финальная_версия"
];

function fixMarkdown(content, filePath) {
    let lines = content.split('\n');
    let newLines = [];
    let inCodeBlock = false;

    // MD041: First line should be H1
    while (lines.length > 0 && lines[0].trim() === '') {
        lines.shift();
    }
    if (lines.length > 0 && !lines[0].startsWith('#')) {
        lines[0] = '# ' + lines[0].replace(/^#+\s*/, '');
    }

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let trimmed = line.trim();

        if (trimmed.startsWith('```')) {
            inCodeBlock = !inCodeBlock;
            newLines.push(line);
            continue;
        }

        if (inCodeBlock) {
            newLines.push(line);
            continue;
        }

        // MD009: Trailing spaces
        line = line.replace(/[ \t]+$/, '');

        // MD030: Spaces after list markers
        line = line.replace(/^(\s*[*+-]|\s*\d+\.)\s{2,}/, '$1 ');

        // MD029: Ordered list item prefix
        line = line.replace(/^(\s*)\d+\.\s/, '$11. ');

        // MD022: Blanks around headings
        if (line.startsWith('#')) {
            // Before heading
            if (newLines.length > 0 && newLines[newLines.length - 1].trim() !== '') {
                newLines.push('');
            }
            newLines.push(line);
            // After heading
            if (i < lines.length - 1 && lines[i + 1].trim() !== '') {
                newLines.push('');
            }
            continue;
        }

        // MD032: Blanks around lists
        const isListItem = /^(\s*[*+-]|\s*1\.)\s/.test(line);
        if (isListItem) {
            if (newLines.length > 0 && newLines[newLines.length - 1].trim() !== '') {
                const prevIsListItem = /^(\s*[*+-]|\s*1\.)\s/.test(newLines[newLines.length - 1]);
                const isTable = newLines[newLines.length - 1].trim().startsWith('|');
                if (!prevIsListItem && !isTable) {
                    newLines.push('');
                }
            }
            newLines.push(line);
            continue;
        } else if (trimmed !== '') {
            if (newLines.length > 0) {
                const prevIsListItem = /^(\s*[*+-]|\s*1\.)\s/.test(newLines[newLines.length - 1]);
                if (prevIsListItem) {
                    newLines.push('');
                }
            }
        }

        // Detect table rows
        if (trimmed.startsWith('|')) {
             if (newLines.length > 1 && newLines[newLines.length - 1].trim() === '' && newLines[newLines.length - 2].trim().startsWith('|')) {
                 newLines.pop();
             }
        }

        newLines.push(line);
    }

    let result = newLines.join('\n');
    result = result.replace(/\n{3,}/g, '\n\n');
    return result.trimEnd() + '\n';
}

function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (file.endsWith('.md')) {
            console.log(`Fixing: ${fullPath}`);
            const content = fs.readFileSync(fullPath, 'utf8');
            const fixed = fixMarkdown(content, fullPath);
            fs.writeFileSync(fullPath, fixed, 'utf8');
        }
    }
}

targetDirs.forEach(walk);
