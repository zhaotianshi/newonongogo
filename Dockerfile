FROM node:18-alpine

RUN apk add --no-cache bash curl wget ca-certificates tzdata

WORKDIR /app

# 复制混淆后的文件
COPY dist/index.js ./
COPY package.json ./

# 只安装运行时依赖
RUN npm install --omit=dev

# 环境变量
ENV UUID=""
ENV ARGO_DOMAIN=""
ENV ARGO_AUTH=""
ENV ARGO_PORT=8001
ENV CFIP="cdns.doon.eu.org"
ENV CFPORT=443
ENV NAME=""
ENV NEZHA_SERVER=""
ENV NEZHA_PORT=""
ENV NEZHA_KEY=""

EXPOSE 3000

CMD ["node", "index.js"]
