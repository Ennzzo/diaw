# ==========================================================================
# ETAPA 1 - BUILD
# Maven + JDK 25 para compilar o projeto e gerar o .jar
# ==========================================================================
FROM maven:3.9-eclipse-temurin-25 AS build

WORKDIR /app

# baixa as dependencias antes de copiar o codigo para aproveitar o cache
COPY pom.xml .
RUN mvn -q -B dependency:go-offline

COPY src ./src
RUN mvn -q -B clean package -DskipTests

# ==========================================================================
# ETAPA 2 - EXECUCAO
# Imagem menor, so com o Java 25 (JRE), para rodar o .jar
# ==========================================================================
FROM eclipse-temurin:25-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

# o plano gratuito do Render tem 512 MB, entao limita o uso de memoria
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75", "-jar", "app.jar"]
