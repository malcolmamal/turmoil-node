# Turmoil

There are currently three parts of the application:

+ frontend in ReactJS
+ new backend in NodeJS
+ old backend in Java Spring Boot

The idea is to migrate the Java backend into NodeJS backend, but it will take some time.

There is a travis file (`.travis.yml`) showing all the necessary steps to deploy the application.

# Requirements
+ node and npm
+ jdk 1.4 (https://www.oracle.com/java/technologies/javase/jdk14-archive-downloads.html) 
  + since the 1.4 JDK is old now, the official Oracle page requires a login, therefore if one does not want to create an account - there are other places where it could be downloaded without hassle, for instance:
    + linux: https://download.java.net/java/GA/jdk14.0.2/205943a0976c4ed48cb16f1043c5c647/12/GPL/openjdk-14.0.2_linux-x64_bin.tar.gz
    + windows: https://www.filehorse.com/download-java-development-kit-64/52936/download/
+ gradle (https://gradle.org/install/)
+ ports 8080 for Java backend, 3030 for NodeJS backend and 3000 for ReactJS frontend 

1. `npm run build:postgres` to build docker and `npm run run:postgres` to start the postgres docker image
2. `npm run build:java` to build java and `npm run build:java:docker` to build docker and `npm run run:java` to start the Java backend in the built docker
3. `npm run install:backend` to build and `npm run start:backend` to start the NodeJS backend
4. `npm run install:frontend` to build and `npm run start:frontend` to start the ReactJS frontend
 
# Travis CI status
+ https://app.travis-ci.com/github/malcolmamal/turmoil-node

# For the future
To avoid installing gradle/jdk perhaps the jar for the Java backend will be accessible somewhere and docker will just be downloading it.