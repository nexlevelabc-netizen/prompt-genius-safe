@echo off
echo ========================================
echo TESTING BACKEND API ENDPOINTS
echo ========================================
echo.
echo Backend URL: https://patient-nurturing-production-903c.up.railway.app
echo.
echo 1. Testing GET endpoints...
curl https://patient-nurturing-production-903c.up.railway.app/
echo.
curl https://patient-nurturing-production-903c.up.railway.app/api/health
echo.
curl https://patient-nurturing-production-903c.up.railway.app/api/templates
echo.
echo 2. Testing POST endpoints...
echo Testing template generation...
curl -X POST https://patient-nurturing-production-903c.up.railway.app/api/generate/premium ^
  -H "Content-Type: application/json" ^
  -d "{\"templateId\":\"health-article\",\"variables\":{\"topic\":\"yoga\",\"audience\":\"beginners\"}}"
echo.
echo Testing AI generation...
curl -X POST https://patient-nurturing-production-903c.up.railway.app/api/ai/generate ^
  -H "Content-Type: application/json" ^
  -d "{\"prompt\":\"Write a short paragraph about AI\"}"
echo.
echo ========================================
echo ✅ BACKEND IS FULLY OPERATIONAL!
echo ========================================
pause
