import os
import re

def fix_markdown(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    prev_line_empty = False
    
    for line in lines:
        # Remove trailing spaces
        line = line.rstrip()
        
        # Avoid multiple blank lines
        if not line:
            if not prev_line_empty:
                new_lines.append(line + '\n')
                prev_line_empty = True
        else:
            # Fix headings (blanks around them)
            if line.startswith('#'):
                if new_lines and new_lines[-1].strip():
                    new_lines.append('\n')
                
                # Remove trailing punctuation from headings (colon, period etc)
                # But be careful with versions like "III."
                line = re.sub(r'([#]+ [^:]+):$', r'\1', line)
                
                new_lines.append(line + '\n')
                new_lines.append('\n')
                prev_line_empty = True
            else:
                new_lines.append(line + '\n')
                prev_line_empty = False

    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)

# Apply to PKM_110
fix_markdown(r"c:\Системы\Технические задания\01_Нормативка\02_Постановления\PKM_110_07.06.2007_Project_Expertise.md")
# Apply to UP_6247
fix_markdown(r"c:\Системы\Технические задания\01_Нормативка\02_Постановления\UP_6247_Openness.md")
# Apply to PKM_256
fix_markdown(r"c:\Системы\Технические задания\01_Нормативка\02_Постановления\PKM_256_22.11.2005_IS_Creation.md")
