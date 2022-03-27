FROM openjdk:17
COPY build/libs/turmoil-0.1.1.jar app.jar
ADD properties properties
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
