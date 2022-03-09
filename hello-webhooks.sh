#!/bin/sh
echo '开始执行webhook钩子'
unset GIT_DIR 
DIR_ONE=/home/shan/www/  #此目录为服务器页面展示目录 
cd $DIR_ONE
echo '清除git缓存'
git clean -df
echo '拉取远程代码'
git pull origin main
echo '部署完成'
