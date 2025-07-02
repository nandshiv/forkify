@echo off
echo 🔄 Resetting Parcel...
taskkill /f /im node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

if exist .parcel-cache rmdir /s /q .parcel-cache
if exist dist rmdir /s /q dist
if exist .parcelrc del .parcelrc

echo ✅ Reset complete!