# 拉去代码
git pull
# 安装依赖
npm install && npm run build

# 删除容器
docker rm -f jimmyStudio &> /dev/null

# 重启容器
docker run -d --restart=on-failure:5\
    -p 9999:80 \
    -v $PWD/public:/usr/share/nginx/html \
    --name jimmyStudio nginx
