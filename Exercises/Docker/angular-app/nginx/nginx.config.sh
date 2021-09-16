#!/bin/sh
if [ "$HOST_TYPE" == "k8s" ];
then
    mv /usr/share/nginx/html/nginx/k8s-nginx.conf /etc/nginx/conf.d/default.conf
else
    mv /usr/share/nginx/html/nginx/docker-nginx.conf /etc/nginx/conf.d/default.conf
fi
rm -rf /usr/share/nginx/html/nginx
