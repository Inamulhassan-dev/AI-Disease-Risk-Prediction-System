@echo off
echo ======================================
echo  AI Medical Project - Starting
echo ======================================

REM ---------- Start Backend ----------
echo Starting Flask Backend...
cd app
call ..\venv\Scripts\activate
start cmd /k python app.py

REM ---------- Start Frontend ----------
echo Starting React Frontend...
cd ..\medical-dashboard
start cmd /k npm start

echo ======================================
echo Project started successfully!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo ======================================

pause
