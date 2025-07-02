# Parcel Reset Script - Run this when you have caching issues
Write-Host "🔄 Resetting Parcel development environment..." -ForegroundColor Yellow

# Kill all Node processes
Write-Host "Stopping all Node processes..." -ForegroundColor Cyan
taskkill /f /im node.exe 2>$null
Start-Sleep -Seconds 2

# Remove cache and build folders
Write-Host "Clearing cache and build folders..." -ForegroundColor Cyan
if (Test-Path ".parcel-cache") {
    Remove-Item -Recurse -Force ".parcel-cache"
    Write-Host "✓ Removed .parcel-cache" -ForegroundColor Green
}
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "✓ Removed dist" -ForegroundColor Green
}
if (Test-Path ".parcelrc") {
    Remove-Item -Force ".parcelrc"
    Write-Host "✓ Removed .parcelrc" -ForegroundColor Green
}

# Clear browser cache (optional - uncomment if needed)
# Write-Host "Clearing browser cache..." -ForegroundColor Cyan
# Start-Process "chrome.exe" "--args --disable-application-cache --disable-cache --disable-offline-load-stale-cache --disk-cache-size=0"

Write-Host "✅ Reset complete! Starting Parcel..." -ForegroundColor Green
Write-Host "💡 Remember to do a hard refresh (Ctrl+Shift+R) in your browser!" -ForegroundColor Yellow

# Start Parcel
npm run start 