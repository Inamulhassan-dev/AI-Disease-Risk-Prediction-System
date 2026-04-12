@echo off
setlocal EnableExtensions EnableDelayedExpansion

title AI Project Start

set "ROOT_DIR=%~dp0"
if "%ROOT_DIR:~-1%"=="\" set "ROOT_DIR=%ROOT_DIR:~0,-1%"

cd /d "%ROOT_DIR%"

echo ========================================
echo AI Disease Project - Start
echo ========================================

if not exist "venv\Scripts\python.exe" (
  echo [ERROR] Setup not found. Run 1_SETUP_PROJECT.bat first.
  pause
  exit /b 1
)

if not exist "medical-dashboard\node_modules" (
  echo [ERROR] Frontend dependencies missing. Run 1_SETUP_PROJECT.bat first.
  pause
  exit /b 1
)

if not exist ".runtime" mkdir ".runtime"

echo [1/2] Starting backend on port 5001...
start "AI Backend" cmd /k "cd /d "%ROOT_DIR%\app" && set PYTHONIOENCODING=utf-8 && "%ROOT_DIR%\venv\Scripts\python.exe" -c "import app as m; m.app.run(port=5001, debug=False)""

timeout /t 3 /nobreak >nul

echo [2/2] Starting frontend on port 3001...
start "AI Frontend" cmd /k "cd /d "%ROOT_DIR%\medical-dashboard" && set PORT=3001 && npm start"

echo.
echo Project starting...
echo Frontend: http://localhost:3001
echo Backend:  http://127.0.0.1:5001/api/health
echo.
echo Use 3_STOP_PROJECT.bat to stop all project windows.
echo.
pause
exit /b 0
