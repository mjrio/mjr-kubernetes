# Docker Exercises

## 1.  Build a container image

- 📖 [docker build reference](https://docs.docker.com/engine/reference/commandline/build/)
- 🐳 *Dockerfiles:*
  - */Exercise/Docker/dotnet-api/Dockerfile*
  - */Exercises/Docker/angular-app/Dockerfile*

> A **Docker container image** is a lightweight, standalone, executable package of software that includes everything needed to run an application. A **Dockerfile** contains instructions for building a container image.

Create two container images, one for a .NET api and one for an Angular app. We will be using these container images throughout the workshop.

1. Build the container image for the .NET api:

```
docker build -t dotnet-api .\Exercises\Docker\dotnet-api
```

2. Do the same for the Angular app:

```
docker build -t angular-app .\Exercises\Docker\angular-app
```

3. Verify that the images are built using the command `docker images`.

## 2.  Run a container

- 📖 [docker run reference](https://docs.docker.com/engine/reference/commandline/run/)

Start a container for the .NET api and the Angular app and examine the applications.

1. Start a container for the .NET api:

```
docker run -dp 8080:80 dotnet-api
```

2. Visit and examine the .NET api in your browser at `http://localhost:8080/api/date/`.

3. Start a container for the Angular app:

```
docker run -dp 4200:4200 angular-app
```

4. Visit and examine the Angular app in your browser at `http://localhost:4200`.

5. List the current containers using the `docker ps` command and copy the container ids.

6. Stop both containers using the `docker stop` command followed by the container ids.