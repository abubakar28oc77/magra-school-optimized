@echo off
title Magra School Management
cd /d "%~dp0"

echo ======================================================
echo   Magra Pals Union High School Management
echo   Starting Optimized School System...
echo ======================================================

set "NODE_CMD=node"
if exist "C:\Program Files\nodejs\node.exe" set "NODE_CMD=C:\Program Files\nodejs\node.exe"

:: 1. Start local server in a minimized background window
start /min "MagraServer" "%NODE_CMD%" serve.js

:: 2. Wait 1.5 seconds for server to start
ping 127.0.0.1 -n 3 >nul

:: 3. Launch Google Chrome directly or default browser
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" "http://localhost:4173"
    goto finish
)
if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" "http://localhost:4173"
    goto finish
)
if exist "%LocalAppData%\Google\Chrome\Application\chrome.exe" (
    start "" "%LocalAppData%\Google\Chrome\Application\chrome.exe" "http://localhost:4173"
    goto finish
)

start "" "http://localhost:4173"

:finish
echo.
echo ======================================================
echo   Magra School Management is now running!
echo   Browser opened at: http://localhost:4173
echo ======================================================
timeout /t 3 >nul
exit
