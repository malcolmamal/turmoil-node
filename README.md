# Turmoil

There are currently three parts of the application:

+ frontend in ReactJS
+ new backend in NodeJS
+ old backend in Java Spring Boot

The idea is to migrate the Java backend into NodeJS backend, but it will take some time.

There is a travis file (`.travis.yml`) showing all the necessary steps to deploy the application.

# Requirements
+ node (https://nodejs.org/) and npm (included with node)
+ jdk 17 (https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) 
+ gradle (https://gradle.org/install/)
+ ports 8080 for Java backend, 3030 for NodeJS backend and 3000 for ReactJS frontend 

1. `npm run build:postgres` to build docker and `npm run start:postgres` to start the postgres docker image
2. `npm run build:java` to build java and `npm run build:java:docker` to build docker and `npm run start:java` to start the Java backend in the built docker
3. `npm run install:backend` to build and `npm run start:backend` to start the NodeJS backend
4. `npm run install:frontend` to build and `npm run start:frontend` to start the ReactJS frontend
 
# Travis CI status
+ https://app.travis-ci.com/github/malcolmamal/turmoil-node

# For the future
To avoid installing gradle/jdk perhaps the jar for the Java backend will be accessible somewhere and docker will just be downloading it.