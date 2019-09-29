set v=latest
docker build -f Dockerfile-prod -t connect4:%v% .
docker tag connect4:%v% peterlharms/connect4:%v%
docker login
docker push peterlharms/connect4:%v%