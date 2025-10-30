# Setup Notes

## Important Configuration Changes

### Port Configuration

**Note:** Port 5000 is used by macOS Control Center (AirPlay Receiver) by default. We've changed the backend server to use **port 5001** instead.

### Current Configuration

**Server:**
- Port: **5001** (changed from 5000)
- File: `server/.env`
- Value: `PORT=5001`

**Client:**
- API URL: `http://localhost:5001` (changed from 5000)
- File: `client/.env`
- Value: `REACT_APP_API_URL=http://localhost:5001`

### Application URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5001
- **Health Check:** http://localhost:5001/health

## Installation Summary

All steps have been completed successfully:

1. ✅ **Dependencies Installed**
   - Root dependencies
   - Server dependencies (Express, MongoDB, etc.)
   - Client dependencies (React, TypeScript, Tailwind, etc.)

2. ✅ **Environment Files Configured**
   - `server/.env` created with MongoDB URI and port 5001
   - `client/.env` created with API URL pointing to port 5001

3. ✅ **MongoDB Started**
   - Service: `mongodb-community`
   - Status: Running
   - Connection: `mongodb://localhost:27017/pixtolearn-manual`

4. ✅ **Database Seeded**
   - 24 languages added
   - English translation complete
   - 23 placeholder translations created

5. ✅ **Servers Running**
   - Backend: http://localhost:5001 ✅
   - Frontend: http://localhost:3000 ✅

## Testing the Application

### 1. Test Backend Health
```bash
curl http://localhost:5001/health
```

Expected response:
```json
{"success":true,"message":"Server is running","timestamp":"..."}
```

### 2. Test Languages API
```bash
curl http://localhost:5001/api/languages
```

Should return 24 languages.

### 3. Test Translation API
```bash
curl http://localhost:5001/api/translations/EN
```

Should return full English translation.

### 4. Test Frontend
Open browser and visit: http://localhost:3000

You should see the language selection page.

## Current Running Processes

The following processes are running in the background:

- **Backend Server** (Node.js on port 5001)
- **Frontend Server** (React on port 3000)
- **MongoDB** (port 27017)

## Next Steps

1. **Open your browser** and visit http://localhost:3000
2. **Select English** (EN) from the language list
3. **View the manual** content
4. **Test print functionality** using the "Print / Download PDF" button
5. **Try changing languages** using the "Change Language" button

## Troubleshooting

### If port 5001 is also in use:
```bash
# Find what's using the port
lsof -i :5001

# Change to another port (e.g., 5002)
# Update server/.env: PORT=5002
# Update client/.env: REACT_APP_API_URL=http://localhost:5002
# Restart servers
```

### To restart the servers:
```bash
# Stop current processes (Ctrl+C in terminals)

# Start backend
cd server && node server.js

# In a new terminal, start frontend
cd client && npm start
```

### To stop MongoDB:
```bash
brew services stop mongodb-community
```

## Files Modified

- `client/package.json` - Changed TypeScript version to 4.9.5 (compatibility)
- `server/.env` - Changed PORT to 5001
- `client/.env` - Changed REACT_APP_API_URL to port 5001

## Success Indicators

✅ Server logs: "Server running in development mode on port 5001"
✅ Server logs: "MongoDB Connected: localhost"
✅ Client logs: "Compiled successfully!"
✅ Client accessible at http://localhost:3000
✅ API responds to health check
✅ API returns 24 languages
✅ English translation available

---

**Status:** All systems operational! 🚀

**Date:** October 28, 2024
