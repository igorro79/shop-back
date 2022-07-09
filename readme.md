к сожалению все попытки деплоя на Heroku увенчались провалом ... :( 

(
2022-07-09T09:07:49.962484+00:00 heroku[web.1]: State changed from starting to crashed
)

для запуска сервера локально:

- `npm start` &mdash; старт сервера в режиме production

к корне проекта создать файл .env и указать путь к БД

MONGO_URL=mongodb+srv://admin:Kolobok123@cluster0.0o13tr6.mongodb.net/?retryWrites=true&w=majority

