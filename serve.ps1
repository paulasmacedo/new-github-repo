param(
  [int]$Port = 8000
)

$root = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")

try {
  $listener.Start()
  Write-Host "Serving $root on http://localhost:$Port/"
  Write-Host "Press Ctrl+C to stop."

  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $localPath = $request.Url.AbsolutePath.TrimStart('/')
    if ([string]::IsNullOrWhiteSpace($localPath)) { $localPath = 'index.html' }

    $path = Join-Path $root $localPath
    if (Test-Path $path -PathType Leaf) {
      $bytes = [System.IO.File]::ReadAllBytes($path)
      $response.ContentType = switch ([System.IO.Path]::GetExtension($path).ToLower()) {
        '.html' { 'text/html' }
        '.css' { 'text/css' }
        '.js' { 'text/javascript' }
        '.json' { 'application/json' }
        '.png' { 'image/png' }
        '.jpg' { 'image/jpeg' }
        '.jpeg' { 'image/jpeg' }
        '.svg' { 'image/svg+xml' }
        '.ico' { 'image/x-icon' }
        default { 'application/octet-stream' }
      }
      $response.ContentLength64 = $bytes.Length
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $response.StatusCode = 404
      $response.ContentType = 'text/plain'
      $msg = "Not Found: $localPath"
      $buffer = [System.Text.Encoding]::UTF8.GetBytes($msg)
      $response.ContentLength64 = $buffer.Length
      $response.OutputStream.Write($buffer, 0, $buffer.Length)
    }

    $response.OutputStream.Close()
  }
}
finally {
  if ($listener.IsListening) { $listener.Stop() }
}
