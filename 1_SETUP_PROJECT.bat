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

set "PYTHON_MISSING=0"
set "NODE_MISSING=0"
set "NPM_MISSING=0"

where python >nul 2>nul
if errorlevel 1 set "PYTHON_MISSING=1"

where node >nul 2>nul
if errorlevel 1 set "NODE_MISSING=1"

where npm >nul 2>nul
if errorlevel 1 set "NPM_MISSING=1"

if "%PYTHON_MISSING%"=="1" (
  echo.
  echo [INFO] Python not found.
  set /p INSTALL_PY="Install Python 3.10 now using winget? (Y/N): "
  if /I "!INSTALL_PY!"=="Y" (
    where winget >nul 2>nul
    if errorlevel 1 (
      echo [ERROR] winget not found. Please install Python manually.
      echo https://www.python.org/downloads/
      pause
      exit /b 1
    )
    echo Installing Python 3.10...
    winget install -e --id Python.Python.3.10 --accept-package-agreements --accept-source-agreements
    if errorlevel 1 (
      echo [ERROR] Python installation failed.
      pause
      exit /b 1
    )
    echo Please close and re-open this file after Python install if needed.
    where python >nul 2>nul
    if errorlevel 1 (
      echo [ERROR] Python still not found in PATH.
      pause
      exit /b 1
    )
  ) else (
    echo [ERROR] Python is required.
    pause
    exit /b 1
  )
)

if "%NODE_MISSING%"=="1" (
  echo.
  echo [INFO] Node.js not found.
  set /p INSTALL_NODE="Install Node.js LTS now using winget? (Y/N): "
  if /I "!INSTALL_NODE!"=="Y" (
    where winget >nul 2>nul
    if errorlevel 1 (
      echo [ERROR] winget not found. Please install Node.js manually.
      echo https://nodejs.org/
      pause
      exit /b 1
    )
    echo Installing Node.js LTS...
    winget install -e --id OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
    if errorlevel 1 (
      echo [ERROR] Node.js installation failed.
      pause
      exit /b 1
    )
    echo Please close and re-open this file after Node install if needed.
    where node >nul 2>nul
    if errorlevel 1 (
      echo [ERROR] Node.js still not found in PATH.
      pause
      exit /b 1
    )
  ) else (
    echo [ERROR] Node.js is required.
    pause
    exit /b 1
  )
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm is not available yet. Re-open terminal and run setup again.
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
