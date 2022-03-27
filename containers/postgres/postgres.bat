# docker pull postgres:alpine
docker run -d --name turmoil-postgres -p 5432:5432 -e POSTGRES_PASSWORD=nopass postgres:alpine