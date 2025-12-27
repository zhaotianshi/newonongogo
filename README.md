# Argonewx 部署说明

基于 nodejs-argo 的 Docker 镜像，代码已混淆加密。

---

## 环境变量配置

### 必填变量

| 变量 | 说明 | 示例 |
|------|------|------|
| UUID | 用户 UUID | `aac5f28f-7e1b-4ca9-a3cd-088b60b15bd0` |
| ARGO_DOMAIN | Cloudflare 隧道域名 | `tunnel.example.com` |
| ARGO_AUTH | 隧道 Token | `eyJhIjoiNjRjMDE4...` |
| ARGO_PORT | 隧道端口（需与CF后台一致） | `4456` |

### 可选变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| SUB_PATH | 订阅路径（建议改成UUID防扫描） | `sub` |
| CFIP | 优选 IP/域名 | `cdns.doon.eu.org` |
| CFPORT | 优选端口 | `443` |
| NAME | 节点名称前缀 | 空 |
| NEZHA_SERVER | 哪吒服务器地址 | 空 |
| NEZHA_PORT | 哪吒端口（v0需填，v1留空） | 空 |
| NEZHA_KEY | 哪吒密钥 | 空 |

---

## Railway 部署步骤

### 1. 创建项目
- 登录 Railway：https://railway.app
- 点击 **New Project** → **Deploy from GitHub repo**
- 选择 `newonongogo` 仓库

### 2. 配置环境变量
在 Railway 项目的 **Variables** 中添加：

```
UUID=你的UUID
ARGO_DOMAIN=你的隧道域名
ARGO_AUTH=你的Token
ARGO_PORT=4456
SUB_PATH=你的UUID或复杂字符串
```

### 3. 部署
保存后 Railway 会自动部署

---

## Cloudflare 隧道配置

### 1. 创建隧道
- 登录 Cloudflare Zero Trust：https://one.dash.cloudflare.com
- 进入 **Networks** → **Tunnels**
- 点击 **Create a tunnel**
- 选择 **Cloudflared** → 输入隧道名称

### 2. 获取 Token
创建后复制 Token（以 `eyJ` 开头的长字符串）

### 3. 配置 Public Hostname
- Subdomain: 你想要的子域名
- Domain: 选择你的域名
- Service Type: `HTTP`
- URL: `localhost:4456`（端口需与 ARGO_PORT 一致）

---

## 访问订阅

部署成功后，订阅地址为：

```
https://你的Railway域名/你设置的SUB_PATH
```

例如：`https://xxx.up.railway.app/aac5f28f-7e1b-4ca9-a3cd-088b60b15bd0`

---

## 节点类型

部署成功后会生成 3 种节点：
- VLESS-WS-TLS
- VMess-WS-TLS  
- Trojan-WS-TLS

---

## 常见问题

### Q: 订阅地址访问不了？
检查 Railway 是否部署成功，查看日志是否有报错

### Q: 节点连不上？
1. 检查 ARGO_PORT 是否与 Cloudflare 后台配置一致
2. 检查 ARGO_DOMAIN 是否正确
3. 检查 ARGO_AUTH Token 是否完整

### Q: 如何防止订阅被扫描？
设置 `SUB_PATH` 为你的 UUID 或其他复杂字符串
