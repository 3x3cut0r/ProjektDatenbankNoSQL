# Howto run this project:

1. install docker(-desktop) from https://www.docker.com/products/docker-desktop/
2. install postman from https://www.postman.com/downloads/
3. open a shell, navigate to project folder and run:

```shell
docker compose up -d
```

4. to view the mongodb gui: open a browser and navigate to http://localhost:8081

5. credentials

```shell
URLs:
api: http://localhost:8081
login: admin
pass: admin
```

6. open postman and import the [Postman Collection](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/3x3cut0r/ProjektDatenbankNoSQL/blob/main/ProjectDatabaseNoSQL.postman_collection.json) to send postman requests to the api
