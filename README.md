# Howto run this project:

1. install docker(-desktop) from https://www.docker.com/products/docker-desktop/
2. install nodejs 18 from https://nodejs.org/en/download/
3. open a shell, navigate to project folder and run:

```shell
docker compose up -d
cd api
npm i
nodemon start

```

4. to view the mongodb gui: open a browser and navigate to http://localhost:8081

5. credentials

```shell
URLs:
api: http://localhost:8081
login: admin
pass: admin

```
