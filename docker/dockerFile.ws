FROM oven/bun:1
WORKDIR /usr/src/app 

COPY packages ./packages
COPY ./bun.lock ./bun.lock
COPY ./package.json ./package.json
COPY ./turbo.json ./turbo.json

COPY ./apps/ws ./apps/ws
RUN bun install 

WORKDIR /usr/src/app/packages/db 
RUN bunx prisma generate 

WORKDIR /usr/src/app/apps/ws
RUN bun install 
EXPOSE 3002
CMD [ "bun" , "index.ts" ]