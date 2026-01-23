
pm2 delete frontend || true
pm2 start npm --name "frontend" -- start
pm2 save

