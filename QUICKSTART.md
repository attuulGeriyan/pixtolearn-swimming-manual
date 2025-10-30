# Quick Start Guide

Get the PixToLearn Swimming Manual application up and running in 5 minutes!

## Prerequisites

- Node.js (v16+)
- MongoDB installed and running

## Quick Setup

### 1. Install Dependencies

```bash
npm run install-all
```

### 2. Set Up Environment Variables

**Server:**
```bash
cd server
cp .env.example .env
```

**Client:**
```bash
cd client
cp .env.example .env
```

Default values in `.env.example` should work for local development.

### 3. Start MongoDB

```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

### 4. Seed the Database

```bash
cd server
npm run seed
```

### 5. Start the Application

From the root directory:

```bash
npm run dev
```

This starts both the server (port 5000) and client (port 3000).

## Access the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:3000
- **API:** http://localhost:5000
- **Health Check:** http://localhost:5000/health

## Test the Application

1. You should see a language selection page
2. Click on "EN English" to view the manual in English
3. The manual content will load with all sections
4. Try the "Change Language" button to go back
5. Try the "Print / Download PDF" button

## Next Steps

- Add translations for other languages by updating the seed data
- Customize the styling in Tailwind CSS
- Deploy to production (see README.md)

## Troubleshooting

**MongoDB not connecting?**
```bash
mongosh  # Test connection
```

**Port 3000 already in use?**
```bash
# Kill process on port 3000
lsof -i :3000
kill -9 <PID>
```

**Port 5000 already in use?**
```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

**Can't fetch data from API?**
- Check if both client and server are running
- Check browser console for CORS errors
- Verify `.env` files have correct URLs

## Need More Help?

See the full [README.md](./README.md) for detailed documentation.
