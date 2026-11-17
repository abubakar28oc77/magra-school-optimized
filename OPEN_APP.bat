@echo off
title Magra School Management Local Server
cd /d "%~dp0"

echo ======================================================
echo   Magra Pals Union High School Management
echo   Starting Optimized Local Server...
echo ======================================================

set "NODE_CMD=node"
where node >nul 2>nul
if %errorlevel% neq 0 (
    if exist "C:\Program Files\nodejs\node.exe" (
        set "NODE_CMD=C:\Program Files\nodejs\node.exe"
    ) else (
        echo [ERROR] Node.js is not found on your PC.
        echo Please open the online link instead:
        echo https://abubakar28oc77.github.io/magra-school-optimized/
        pause
        exit /b 1
    )
)

start "" http://localhost:4173

echo.
echo Server is running at http://localhost:4173
echo Keep this window open while using the app.
echo.
"%NODE_CMD%" serve.js
