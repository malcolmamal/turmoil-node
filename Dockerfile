FROM openjdk:14
ARG JAR_FILE=build/*.jar
COPY build/libs/turmoil-0.0.1-SNAPSHOT.jar app.jar
ADD properties properties
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
