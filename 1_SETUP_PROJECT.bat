@echo off
setlocal EnableExtensions EnableDelayedExpansion

title AI Project Setup

set "ROOT_DIR=%~dp0"
if "%ROOT_DIR:~-1%"=="\" set "ROOT_DIR=%ROOT_DIR:~0,-1%"

cd /d "%ROOT_DIR%"

echo ========================================
echo AI Disease Project - Setup
echo ========================================

if not exist "app\app.py" (
  echo [ERROR] Run this file inside project root.
  echo Expected: app\app.py
  pause
  exit /b 1
)

where python >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Python is not installed or not in PATH.
  pause
  exit /b 1
)

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js is not installed or not in PATH.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm is not installed or not in PATH.
  pause
  exit /b 1
)

if not exist "venv\Scripts\python.exe" (
  echo [1/5] Creating Python virtual environment...
  python -m venv venv
  if errorlevel 1 (
    echo [ERROR] Failed to create virtual environment.
    pause
    exit /b 1
  )
) else (
  echo [1/5] Virtual environment already exists.
)

echo [2/5] Upgrading pip...
"venv\Scripts\python.exe" -m pip install --upgrade pip
if errorlevel 1 (
  echo [ERROR] Failed to upgrade pip.
  pause
  exit /b 1
)

echo [3/5] Installing backend dependencies...
"venv\Scripts\python.exe" -m pip install flask flask-cors joblib numpy pandas scikit-learn pyjwt shap lime
if errorlevel 1 (
  echo [ERROR] Failed to install backend dependencies.
  pause
  exit /b 1
)

echo [4/5] Installing frontend dependencies...
pushd "medical-dashboard"
call npm install
if errorlevel 1 (
  popd
  echo [ERROR] Failed to install frontend dependencies.
  pause
  exit /b 1
)
popd

if not exist "medical-dashboard\.env" (
  echo [5/5] Writing frontend .env...
  >"medical-dashboard\.env" echo REACT_APP_API_BASE_URL=http://127.0.0.1:5001/api
) else (
  echo [5/5] Frontend .env already exists.
)

if not exist ".runtime" mkdir ".runtime"

echo.
echo Setup complete.
echo Next step: run 2_START_PROJECT.bat
echo.
pause
exit /b 0
