# Docker Exercises

## 1.  Build a Docker container image

- 📖 [docker build reference](https://docs.docker.com/engine/reference/commandline/build/)
- 🐳 *Docker files:*
  - */Exercise/Docker/dotnet-api/Dockerfile*
  - */Exercises/Docker/angular-app/Dockerfile*

> A **Docker container image** is a lightweight, standalone, executable package of software that includes everything needed to run an application. A **Dockerfile** contains instructions for building a container image.

Create two container images, one for a .NET api and one for an Angular app. We will be using these container images throughout the workshop.


1. Go to the directory where the Dockerfile for the .NET api is located and build the container image:

```
docker build -t dotnet-api .
```

2. Do the same for the Angular app:

```
docker build -t angular-app .
```