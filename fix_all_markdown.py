import os
import re

def fix_markdown_file(file_path):
    print(f"Fixing: {file_path}")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # MD009: Remove trailing spaces
    content = re.sub(r'[ \t]+$', '', content, flags=re.MULTILINE)

    # MD047: Ensure single trailing newline
    content = content.rstrip() + '\n'

    lines = content.split('\n')
    new_lines = []
    
    in_code_block = False
    in_table = False

    for i, line in enumerate(lines):
        # Tracking code blocks (don't fix formatting inside them)
        if line.strip().startswith('```'):
            in_code_block = not in_code_block
            new_lines.append(line)
            continue
        
        if in_code_block:
            new_lines.append(line)
            continue

        # MD030: Spaces after list markers
        # Fix: *  text -> * text, 1.   text -> 1. text
        line = re.sub(r'^(\s*[*+-]|\s*\d+\.)\s{2,}', r'\1 ', line)

        # MD022: Headings should be surrounded by blank lines
        if line.startswith('#'):
            # Blank line before (if not first line)
            if new_lines and new_lines[-1].strip():
                new_lines.append('')
            
            new_lines.append(line)
            
            # Blank line after (if not last line and next line isn't empty)
            if i < len(lines) - 1 and lines[i+1].strip():
                new_lines.append('')
            continue

        # MD032: Lists should be surrounded by blank lines
        is_list_item = re.match(r'^\s*([*+-]|\d+\.)\s', line)
        if is_list_item:
            # If previous line is not a list item and not empty, add blank line
            if new_lines and new_lines[-1].strip() and not re.match(r'^\s*([*+-]|\d+\.)\s', new_lines[-1]):
                new_lines.append('')
            
            new_lines.append(line)
            
            # If next line is not a list item and not empty, add blank line
            if i < len(lines) - 1 and lines[i+1].strip() and not re.match(r'^\s*([*+-]|\d+\.)\s', lines[i+1]):
                # But wait, we might stay in the list. Only add if it's the END of the list.
                pass 
            continue
        
        # MD036: Emphasis as heading (common mistake)
        # If a line is just **text** and it's not part of a paragraph
        if re.match(r'^\*\*[^*]+\*\*$', line.strip()):
            # Check context - if surrounded by empty lines, it's likely a heading
            prev_empty = (i == 0 or not lines[i-1].strip())
            next_empty = (i == len(lines)-1 or not lines[i+1].strip())
            if prev_empty and next_empty:
                line = "### " + line.strip().replace("**", "")

        new_lines.append(line)

    # Final cleanup of excessive blank lines
    final_content = '\n'.join(new_lines)
    final_content = re.sub(r'\n{3,}', '\n\n', final_content)
    
    # MD041: First line should be H1
    if not final_content.startswith('# '):
        # Search for first H1
        match = re.search(r'^# .+', final_content, re.MULTILINE)
        if match:
            h1 = match.group(0)
            # Check if it's already at the top or needs moving
            # For now, let's not auto-move it as it might break logic, 
            # but we can ensure there is NO text above it if it's small things like comments
            pass

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(final_content)

def walk_and_fix(root_dir):
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.md'):
                fix_markdown_file(os.path.join(root, file))

if __name__ == "__main__":
    target_dirs = [
        r"c:\Системы\Технические задания\01_Нормативка",
        r"c:\Системы\Технические задания\02_Документы_заказчика",
        r"c:\Системы\Технические задания\06_Техническое_задание\Финальная_версия"
    ]
    for d in target_dirs:
        if os.path.exists(d):
            walk_and_fix(d)
        else:
            print(f"Path does not exist: {d}")
