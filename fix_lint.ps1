$targetDirs = @(
    "c:\Системы\Технические задания\01_Нормативка",
    "c:\Системы\Технические задания\02_Документы_заказчика",
    "c:\Системы\Технические задания\06_Техническое_задание\Финальная_версия"
)

foreach ($dir in $targetDirs) {
    if (Test-Path $dir) {
        $files = Get-ChildItem -Path $dir -Filter "*.md" -Recurse
        foreach ($file in $files) {
            Write-Host "Fixing $($file.FullName)"
            $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
            
            # MD009: Remove trailing spaces
            $content = $content -replace '(?m)[ \t]+$', ''
            
            # MD030: Spaces after list markers
            $content = $content -replace '(?m)^(\s*[*+-]|\s*\d+\.)\s{2,}', '$1 '
            
            # MD022: Blanks around headings
            # This is complex in one-liners, so let's do simple ones first
            $content = $content -replace '(?m)^(#+ .*)$', "`n`n`1`n`n"
            
            # MD047: Single trailing newline
            $content = $content.TrimEnd() + "`n"
            
            # Cleanup excessive blank lines
            $content = $content -replace '(?m)\n{3,}', "`n`n"
            
            Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        }
    }
}
