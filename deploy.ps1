# HP を GitHub Pages に公開する（gh-pages ブランチに dist の中身を送る）
# 使い方：site フォルダで  powershell -File deploy.ps1
$ErrorActionPreference = 'Stop'
$env:Path += ";C:\Program Files\GitHub CLI"
Set-Location $PSScriptRoot

npm run build
if ($LASTEXITCODE -ne 0) { throw 'ビルドに失敗しました' }

$remote = git remote get-url origin
Push-Location dist
try {
  # Jekyll の処理を止めて、ファイルをそのまま公開する
  New-Item -ItemType File -Force .nojekyll | Out-Null
  if (Test-Path .git) { Remove-Item .git -Recurse -Force }
  git init -q -b gh-pages
  git add -A
  git commit -q -m "公開 $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
  git push -f $remote gh-pages
  if ($LASTEXITCODE -ne 0) { throw '送信に失敗しました' }
} finally {
  Pop-Location
}
Write-Host '公開しました：https://raindog2000-star.github.io/enplus/'
