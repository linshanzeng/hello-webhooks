#!/bin/sh
echo '开始执行webhook钩子'
unset GIT_DIR 
DIR_ONE=/home/shan/www/  #此目录为服务器页面展示目录 
cd $DIR_ONE
git init
git remote add origin /home/shan/hello-webhooks.git
git clean -df
git pull origin master          #核心代码，自动部署的本质