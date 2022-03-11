FROM openjdk:14
ARG JAR_FILE=build/*.jar
COPY build/libs/*.jar app.jar
ADD properties properties
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
