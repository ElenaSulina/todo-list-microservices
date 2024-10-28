## Описание / Description

Данная версия проекта выполнена с использованием микросервисной архитектуры. Сервисы общаются через RabbitMQ. / Current version of the project was built with microservice architecture. The services communicate with each other via RabbitMQ.

Проект включает в себя бэкенд для приложения Todo list, выполнен с использованием следующих технологий:
- Nest JS
- TypeORM
- PostgreSQL
- RabbitMQ
- Swagger
- Docker / Docker compose

Он предоставляет API для управления проектами и задачами (CRUD), а также включает функциональность аутентификации через JWT и управления ролями.

Project is a backend for a Todo list application. The following technologies have been used:
- Nest JS
- TypeORM
- PostgreSQL
- RabbitMQ
- Swagger
- Docker / Docker compose

It provides an API for project and task management (CRUD), and also includes authentication  via JWT and role management functionality.

## Установка  / Installation

1. Клонируйте репозиторий / Clone the repository:

```bash
git clone https://github.com/ElenaSulina/todo-list-microservices.git
```

```bash
cd todo-list-microservices
```

2. В корневую папку добавьте файл .env и скопируйте туда следующие данные / Add .env file to the root folder and copy the following data there:
```bash
AUTH_DATABASE_HOST=auth-service-db
AUTH_DATABASE_PORT=5432
AUTH_DATABASE_USERNAME=postgres
AUTH_DATABASE_PASSWORD=postgres
AUTH_DATABASE_NAME=auth-service-db

TODO_DATABASE_HOST=todo-service-db
TODO_DATABASE_PORT=5432
TODO_DATABASE_USERNAME=postgres
TODO_DATABASE_PASSWORD=postgres
TODO_DATABASE_NAME=todo-service-db

RABBITMQ_HOST=rabbitmq
RABBITMQ_PORT=5672

PRIVATE_KEY=Markiz
JWT_KEY=ASAKLKJ35Y3M
```

## Запуск приложения / Running the app

 Убедитесь, что у вас установлены Docker и Docker Compose. / Ensure that you have Docker and Docker Compose installed.

  ```
  docker-compose up --build
  ```

Приложение доступно по адресу / The app is available at [http://localhost:3000](http://localhost:3000)

Документация доступна по адресу / The documentation is available at [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

RabbitMQ [http://localhost:15672](http://localhost:15672) (Логин: guest, Пароль: guest)


Для остановки контейнеров выполните команду ниже / To stop the container run the command below:
```bash
docker-compose down
```