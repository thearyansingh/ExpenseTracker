
How the  access and refresh token works 
LOGIN
 ↓
Access Token (header) + Refresh Token (cookie)
 ↓
API Requests (with access token)
 ↓
Access Token expired ❌
 ↓
401 error
 ↓
Auto call /refresh
 ↓
Verify refresh token
 ↓
New access token issued
 ↓
Retry request
 ↓
User continues seamlessly
---------------------------