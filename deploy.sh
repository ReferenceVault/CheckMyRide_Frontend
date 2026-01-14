git pull origin main
npm install
npm run build
pm2 delete frontend
pm2 start "npm start" --name frontend
