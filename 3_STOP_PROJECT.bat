@echo off
setlocal EnableExtensions EnableDelayedExpansion

title AI Project Stop

echo ========================================
echo AI Disease Project - Stop
echo ========================================

for %%P in (3001 5001) do (
  for /f "tokens=5" %%A in ('netstat -ano ^| findstr :%%P ^| findstr LISTENING') do (
    taskkill /PID %%A /F >nul 2>nul
  )
)

for %%W in ("AI Frontend" "AI Backend") do (
  taskkill /FI "WINDOWTITLE eq %%~W" /F >nul 2>nul
)

echo Stopped backend/frontend processes on ports 5001 and 3001 (if running).
echo.
pause
exit /b 0
