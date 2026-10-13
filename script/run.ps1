# Arranque automatizado del proyecto: formatea, valida lint, compila y levanta el dev server.
# Se detiene en el primer paso que falle para no arrancar a desarrollar sobre codigo roto.

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot

function Invoke-Step {
    param(
        [string]$Name,
        [string]$Command
    )

    Write-Host ""
    Write-Host "==> $Name" -ForegroundColor Cyan

    Push-Location $projectRoot
    try {
        Invoke-Expression $Command
        if ($LASTEXITCODE -ne 0) {
            Write-Host "x $Name fallo (exit code $LASTEXITCODE)" -ForegroundColor Red
            exit $LASTEXITCODE
        }
        Write-Host "OK $Name" -ForegroundColor Green
    }
    finally {
        Pop-Location
    }
}

Invoke-Step -Name 'Formateo (prettier --write)' -Command 'yarn format'
Invoke-Step -Name 'Lint (eslint --fix)' -Command 'yarn lint:fix'
Invoke-Step -Name 'Build de produccion (vite build)' -Command 'yarn build'

Write-Host ""
Write-Host "==> Servidor de desarrollo (vite dev)" -ForegroundColor Cyan
Push-Location $projectRoot
try {
    yarn dev
}
finally {
    Pop-Location
}
