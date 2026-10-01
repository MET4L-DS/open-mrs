<#
.SYNOPSIS
    OpenMRS 3.x Developer Helper Script

.DESCRIPTION
    Convenience wrapper to manage the OpenMRS 3.x Docker Reference Application stack.

.EXAMPLE
    .\openmrs.ps1 start
    .\openmrs.ps1 status
    .\openmrs.ps1 logs backend
    .\openmrs.ps1 open
    .\openmrs.ps1 stop
#>

param (
    [Parameter(Position=0)]
    [ValidateSet("start", "stop", "restart", "status", "logs", "open", "pull", "down", "setup")]
    [string]$Action = "status",

    [Parameter(Position=1)]
    [string]$Service = ""
)

$DistroDir = Join-Path $PSScriptRoot "openmrs-distro-referenceapplication"
$ComposeFile = Join-Path $DistroDir "docker-compose.yml"

if (-not (Test-Path $ComposeFile)) {
    Write-Error "Could not find $ComposeFile"
    exit 1
}

function Test-DockerDaemon {
    $ver = docker info --format '{{.ServerVersion}}' 2>$null
    if (-not $ver) {
        Write-Host "============================================================" -ForegroundColor Yellow
        Write-Host "[WARNING] Docker Desktop is not running or not yet ready." -ForegroundColor Yellow
        Write-Host "============================================================" -ForegroundColor Yellow
        Write-Host "Please start Docker Desktop from your Start Menu or Desktop." -ForegroundColor Cyan
        Write-Host "Wait until the whale icon in your system tray indicates that" -ForegroundColor Cyan
        Write-Host "the Docker Engine is running, then re-run this command." -ForegroundColor Cyan
        Write-Host "============================================================" -ForegroundColor Yellow
        return $false
    }
    return $true
}

if (-not (Test-DockerDaemon)) {
    exit 1
}

switch ($Action) {
    "start" {
        Write-Host "Starting OpenMRS 3.x Docker stack..." -ForegroundColor Cyan
        docker compose -f $ComposeFile up -d
        Write-Host "Stack started. OpenMRS 3 UI: http://localhost/openmrs/spa" -ForegroundColor Green
    }
    "stop" {
        Write-Host "Stopping OpenMRS 3.x Docker stack..." -ForegroundColor Yellow
        docker compose -f $ComposeFile stop
    }
    "down" {
        Write-Host "Stopping and removing containers..." -ForegroundColor Red
        docker compose -f $ComposeFile down
    }
    "restart" {
        Write-Host "Restarting OpenMRS 3.x Docker stack..." -ForegroundColor Cyan
        if ($Service) {
            docker compose -f $ComposeFile restart $Service
        } else {
            docker compose -f $ComposeFile restart
        }
    }
    "status" {
        Write-Host "OpenMRS 3.x Container Status:" -ForegroundColor Cyan
        docker compose -f $ComposeFile ps
    }
    "logs" {
        if ($Service) {
            docker compose -f $ComposeFile logs -f --tail 100 $Service
        } else {
            docker compose -f $ComposeFile logs -f --tail 100
        }
    }
    "pull" {
        Write-Host "Pulling latest OpenMRS images..." -ForegroundColor Cyan
        docker compose -f $ComposeFile pull
    }
    "open" {
        Write-Host "Opening OpenMRS 3.x in browser: http://localhost/openmrs/spa" -ForegroundColor Green
        Start-Process "http://localhost/openmrs/spa"
    }
    "setup" {
        Write-Host "Running OpenMRS AIIMS Complete Environment Setup..." -ForegroundColor Cyan
        $SetupScript = Join-Path $PSScriptRoot "scripts\setup_environment.py"
        python $SetupScript
    }
}
