# Sử dụng image Node.js làm base image để cài đặt dependencies
FROM node:18-alpine AS build

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install -f
RUN npm install -g pm2

#RUN npm audit fix
#RUN npm audit fix --force
COPY . .

# Mở cổng 3000 (cổng mặc định của Vite development server)
EXPOSE 3000
# Chạy ứng dụng với PM2
CMD ["pm2-runtime", "start", "npm", "--name", "fe", "--", "run", "dev"]
