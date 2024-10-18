# 一阶段 构建依赖项
ARG NODE_VERSION=node:20-alpine

FROM $NODE_VERSION AS dependency-base

WORKDIR /app
RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm config set registry https://registry.npmmirror.com
# RUN pnpm install
RUN pnpm install --frozen-lockfile
# 二阶段 构建应用程序
FROM dependency-base AS production-base
COPY . .
RUN pnpm run build
# 三阶段 生成生产镜像
FROM $NODE_VERSION AS production

COPY --from=production-base /app/.output /app/.output

ENV NUXT_HOST=0.0.0.0 \
    NUXT_APP_VERSION=latest \
    DATABASE_URL=file:./db.sqlite \
    NODE_ENV=production

WORKDIR /app

EXPOSE 3000

CMD ["node", "/app/.output/server/index.mjs"]
