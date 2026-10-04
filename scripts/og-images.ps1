# Share previews (1200x630) for every agent and map page, in the site's own look:
# off-white paper, giant name centered, the agent (or the map art) in front of it.
# Writes public/og/agente/<slug>.jpg and public/og/mapa/<slug>.jpg; run `npm run og` (Windows only,
# uses System.Drawing) after Riot adds an agent or map. Font: Archivo Black (OFL, scripts/fonts).
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$root = Split-Path $PSScriptRoot -Parent
$fonts = New-Object System.Drawing.Text.PrivateFontCollection
$fonts.AddFontFile((Join-Path $PSScriptRoot 'fonts\ArchivoBlack-Regular.ttf'))
$family = $fonts.Families[0]
$W = 1200; $H = 630
$paper = [System.Drawing.ColorTranslator]::FromHtml('#f5f4f1')
$ink = [System.Drawing.ColorTranslator]::FromHtml('#111318')
$red = [System.Drawing.ColorTranslator]::FromHtml('#ff4655')
$jpeg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$quality = New-Object System.Drawing.Imaging.EncoderParameters 1
$quality.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 84L
$client = New-Object System.Net.WebClient

function Get-Slug([string]$name) {
  $plain = -join ($name.Normalize([Text.NormalizationForm]::FormD).ToCharArray() | Where-Object { [Globalization.CharUnicodeInfo]::GetUnicodeCategory($_) -ne 'NonSpacingMark' })
  return ($plain.ToLower() -replace '[^a-z0-9]', '')
}
function Get-Image([string]$url) {
  $stream = New-Object System.IO.MemoryStream (, $client.DownloadData($url))
  return [System.Drawing.Image]::FromStream($stream)
}
# Largest font size at which `text` fits in `maxWidth`.
function Get-FittedFont($g, [string]$text, [float]$maxWidth, [float]$maxSize) {
  $size = $maxSize
  while ($size -gt 20) {
    $font = New-Object System.Drawing.Font($family, $size, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
    if ($g.MeasureString($text, $font).Width -le $maxWidth) { return $font }
    $font.Dispose(); $size -= 4
  }
  return New-Object System.Drawing.Font($family, 20, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
}
function New-Canvas() {
  $bmp = New-Object System.Drawing.Bitmap $W, $H
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'; $g.InterpolationMode = 'HighQualityBicubic'; $g.TextRenderingHint = 'AntiAliasGridFit'
  return @($bmp, $g)
}
function Draw-Brand($g, $color) {
  $mark = [System.Drawing.PointF[]]@((New-Object System.Drawing.PointF 48, 40), (New-Object System.Drawing.PointF 61, 66), (New-Object System.Drawing.PointF 77, 40), (New-Object System.Drawing.PointF 70, 40), (New-Object System.Drawing.PointF 61, 55), (New-Object System.Drawing.PointF 55, 40))
  $g.FillPolygon((New-Object System.Drawing.SolidBrush $red), $mark)
  $small = New-Object System.Drawing.Font($family, 20, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $g.DrawString('PROTOCOLO', $small, (New-Object System.Drawing.SolidBrush $color), 90, 39)
}
function Save-Jpeg($bmp, [string]$path) {
  New-Item -ItemType Directory -Force (Split-Path $path) | Out-Null
  $bmp.Save($path, $jpeg, $quality)
}

$agents = (Invoke-RestMethod 'https://valorant-api.com/v1/agents?isPlayableCharacter=true').data
foreach ($agent in $agents) {
  $slug = Get-Slug $agent.displayName
  $canvas = New-Canvas; $bmp = $canvas[0]; $g = $canvas[1]
  $g.Clear($paper)
  $line = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(30, $ink)), 1
  foreach ($x in 240, 480, 720, 960) { $g.DrawLine($line, $x, 0, $x, $H) }
  $tint = [System.Drawing.ColorTranslator]::FromHtml('#' + $agent.backgroundGradientColors[0].Substring(0, 6))
  $g.FillEllipse((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55, $tint))), 330, 60, 540, 620)
  $name = $agent.displayName.ToUpper()
  $font = Get-FittedFont $g $name 1080 300
  $size = $g.MeasureString($name, $font)
  $g.DrawString($name, $font, (New-Object System.Drawing.SolidBrush $ink), ($W - $size.Width) / 2, ($H - $size.Height) / 2 - 10)
  $portrait = Get-Image $agent.fullPortraitV2
  $ph = 600; $pw = $portrait.Width * $ph / $portrait.Height
  $g.DrawImage($portrait, [single](($W - $pw) / 2), [single]($H - $ph + 20), [single]$pw, [single]$ph)
  Draw-Brand $g $ink
  $g.FillRectangle((New-Object System.Drawing.SolidBrush $red), 0, $H - 8, $W, 8)
  Save-Jpeg $bmp (Join-Path $root "public\og\agente\$slug.jpg")
  $portrait.Dispose(); $g.Dispose(); $bmp.Dispose()
  Write-Host "agente/$slug"
}

$mapSlugs = 'abyss', 'ascent', 'bind', 'breeze', 'corrode', 'fracture', 'haven', 'icebox', 'lotus', 'pearl', 'split', 'summit', 'sunset'
$maps = (Invoke-RestMethod 'https://valorant-api.com/v1/maps').data | Where-Object { $mapSlugs -contains (Get-Slug $_.displayName) }
foreach ($map in $maps) {
  $slug = Get-Slug $map.displayName
  $canvas = New-Canvas; $bmp = $canvas[0]; $g = $canvas[1]
  $splash = Get-Image $map.splash
  $scale = [Math]::Max($W / $splash.Width, $H / $splash.Height)
  $sw = $splash.Width * $scale; $sh = $splash.Height * $scale
  $g.DrawImage($splash, [single](($W - $sw) / 2), [single](($H - $sh) / 2), [single]$sw, [single]$sh)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(110, 15, 25, 35))), 0, 0, $W, $H)
  $name = $map.displayName.ToUpper()
  $font = Get-FittedFont $g $name 1040 260
  $size = $g.MeasureString($name, $font)
  $g.DrawString($name, $font, (New-Object System.Drawing.SolidBrush $paper), ($W - $size.Width) / 2, ($H - $size.Height) / 2)
  Draw-Brand $g $paper
  $g.FillRectangle((New-Object System.Drawing.SolidBrush $red), 0, $H - 8, $W, 8)
  Save-Jpeg $bmp (Join-Path $root "public\og\mapa\$slug.jpg")
  $splash.Dispose(); $g.Dispose(); $bmp.Dispose()
  Write-Host "mapa/$slug"
}
