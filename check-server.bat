@echo off
echo Checking Vehicle Management Backend Server...

REM Try to connect to the server
curl -s -o nul -w "%%{http_code}" http://localhost:8080/vehicle/count
if %ERRORLEVEL% equ 0 (
    echo.
    echo Server is running and responding!
    echo You can access the application at http://localhost:8080
) else (
    echo.
    echo Server is not running or not responding.
    echo Please run start-backend.bat to start the server.
)

pause 