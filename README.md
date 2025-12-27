# Argonewx

基于 nodejs-argo 的 Docker 镜像，代码已混淆。

## 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| UUID | 用户 UUID | 自动生成 |
| ARGO_DOMAIN | 固定隧道域名 | 空(使用临时隧道) |
| ARGO_AUTH | 固定隧道 Token/JSON | 空 |
| ARGO_PORT | Argo 端口 | 8001 |
| CFIP | 优选 IP/域名 | cdns.doon.eu.org |
| CFPORT | 优选端口 | 443 |
| NAME | 节点名称 | 空 |

## 使用方法

```bash
docker run -d \
  -e UUID="你的UUID" \
  -e ARGO_DOMAIN="你的域名" \
  -e ARGO_AUTH="你的Token" \
  ghcr.io/你的用户名/argonewx:latest
```

## 订阅地址

部署后访问: `http://你的地址:3000/sub`
