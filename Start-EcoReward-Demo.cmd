@echo off
setlocal
cd /d "%~dp0"
set "ECOREWARD_PYTHON=.venv\Scripts\python.exe"
if not exist "%ECOREWARD_PYTHON%" set "ECOREWARD_PYTHON=.venv312\Scripts\python.exe"
if not exist "%ECOREWARD_PYTHON%" (
    echo Python environment was not found. See PROTOTYPE.md for setup.
    pause
    exit /b 1
)
"%ECOREWARD_PYTHON%" -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --no-proxy-headers
if errorlevel 1 pause
