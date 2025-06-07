@echo off
echo Starting Vehicle Management Backend Server...
echo Current directory: %CD%

REM Check if Maven is installed
where mvn >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: Maven is not installed or not in PATH
    echo Please install Maven from https://maven.apache.org/download.cgi
    pause
    exit /b 1
)

REM Check if pom.xml exists
if not exist pom.xml (
    echo Error: pom.xml not found in current directory
    echo Please make sure you are in the correct directory
    pause
    exit /b 1
)

echo Building and starting the application...
call mvn clean install
if %ERRORLEVEL% neq 0 (
    echo Error: Maven build failed
    pause
    exit /b 1
)

echo Starting Spring Boot application...
call mvn spring-boot:run
if %ERRORLEVEL% neq 0 (
    echo Error: Failed to start Spring Boot application
    pause
    exit /b 1
)

pause 