# Test script to upload image to backend
$imagePath = "C:\Users\lenovo\Downloads\parking_test.jpg"
$uri = "http://localhost:5001/detect"

# Create multipart form data
$boundary = [System.Guid]::NewGuid().ToString()
$LF = "`r`n"

$bodyLines = (
    "--$boundary",
    "Content-Disposition: form-data; name=`"image`"; filename=`"test.jpg`"",
    "Content-Type: image/jpeg$LF",
    [System.IO.File]::ReadAllBytes($imagePath),
    "--$boundary--$LF"
) -join $LF

try {
    $response = Invoke-RestMethod -Uri $uri -Method Post -ContentType "multipart/form-data; boundary=$boundary" -Body $bodyLines
    Write-Host "Success!" -ForegroundColor Green
    Write-Host "Free Count: $($response.free_count)"
    Write-Host "Occupied Count: $($response.occupied_count)"
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Response: $($_.Exception.Response | ConvertTo-Json)"
}
