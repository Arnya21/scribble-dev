# 1. Start with a tiny Linux OS that has Node.js
FROM node:18-alpine

# 2. Set the working folder inside this 'virtual container'
WORKDIR /app

# 3. Copy only the list of libraries first (Optimization)
COPY package*.json ./

# 4. Install those libraries inside the container
RUN npm install --production

# 5. Now copy all your files (index.html, script.js, etc.)
COPY . .

# 6. Open Port 3000 for the world to see
EXPOSE 3000

# 7. Final Command to start the app
CMD ["node", "server.js"]