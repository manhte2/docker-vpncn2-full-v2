#Docker vpncn2.net 250131
#PORT: 5000, 8888, 8443, 443, 80
#1. Install Docker and docker-compose
apt install apt-transport-https ca-certificates curl software-properties-common -y

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

apt-get update

apt install docker-ce docker-ce-cli containerd.io -y

systemctl start docker
systemctl enable docker

curl -L "https://github.com/docker/compose/releases/download/v2.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

chmod +x /usr/local/bin/docker-compose
docker-compose --version
#v2.22.0


git clone https://github.com/manhte2/docker-vpncn2-full-v1.git 
cd 
sudo chown -R www-data:www-data ./wp/wordpress
sudo chmod -R 755 ./wp/wordpress
### Remark:
 ## 1. **Check .nginx/vpncn2.net.conf file and ensure that only port 80 configuration, remove all 443 ###
## 2. Configure DNS record for domain vpncn2.net point to new IP

docker network ls
docker network create shared_nw

cd wp
cp nginx/vpncn2.net.nossl.conf nginx/vpncn2.net.conf
docker-compose up -d --build
#if error PHP8.2
docker pull php:8.2-fpm

#Force renewal certbot SSL
docker exec -it certbot certbot certonly --webroot -w /var/www/certbot -d vpncn2.net -d user.vpncn2.net --force-renewal --email admin@vpncn2.net --agree-tos --non-interactive

cd ../be
docker-compose up -d --build

cd ../fe
docker-compose up -d --build

cd ../wp
cp nginx/vpncn2.net.ssl.conf nginx/vpncn2.net.conf
docker restart wp_nginx
docker logs wp_nginx


##TROUBLE SHOOOTING
docker-compose logs certbot
docker-compose exec certbot cat /var/log/letsencrypt/letsencrypt.log

docker-compose exec nginx cat /etc/nginx/conf.d/vpncn2.net.conf


docker rm -f $(docker ps -aq)
docker rmi -f $(docker images -aq)
docker volume rm $(docker volume ls -q)
docker network rm $(docker network ls -q)
docker system prune -a
