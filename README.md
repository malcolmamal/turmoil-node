# Turmoil

There are currently three parts of the application:

+ frontend in ReactJS
+ new backend in NodeJS
+ old backend in Java Spring Boot

The idea is to migrate the Java backend into NodeJS backend, but it will take some time.

There is a travis file (`.travis.yml`) showing all the necessary steps to deploy the application.

# Requirements
+ node and npm
+ gradle
+ jdk 1.4

1. `npm run install:backend` to build and `npm run start:backend` to start the NodeJS backend
2. `npm run install:frontend` to build and `npm run start:frontend` to start the ReactJS frontend
3. `gradlew build` to build and `docker build -t nemhauser/turmoil-java .` with `docker run  --name="turmoil-java" -d -p 8080:8080 nemhauser/turmoil-java /bin/sh -c "java --jar /app.jar;"` to start the Java backend in the docker 

# For the future
To avoid installing gradle/jdk perhaps the jar for the Java backend will be accessible somewhere and docker will just be downloading it.