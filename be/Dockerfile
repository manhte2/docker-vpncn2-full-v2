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
COPY dist ./dist

# Mở cổng 3000 (cổng mặc định của Vite development server)
EXPOSE 5000
# Chạy ứng dụng với PM2
CMD ["pm2-runtime", "start", "dist/main.js", "--name", "be"]
