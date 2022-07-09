к сожалению все попытки деплоя на Heroku увенчались провалом ... :( 
(
Starting process with command `npm start`
2022-07-09T09:07:19.233912+00:00 app[web.1]:
2022-07-09T09:07:19.233926+00:00 app[web.1]: > shop-back@0.0.0 start
2022-07-09T09:07:19.233926+00:00 app[web.1]: > cross-env NODE_ENV=production node ./bin/server.js
2022-07-09T09:07:19.233927+00:00 app[web.1]:
2022-07-09T09:07:19.690747+00:00 app[web.1]: database connect succesfully
2022-07-09T09:07:49.865835+00:00 heroku[web.1]: Process exited with status 1
2022-07-09T09:07:49.727047+00:00 app[web.1]: connection <monitor> to 13.48.166.236:27017 closed
2022-07-09T09:07:49.962484+00:00 heroku[web.1]: State changed from starting to crashed
)

для запуска сервера локально:

- `npm start` &mdash; старт сервера в режиме production

к корне проекта создать файл .env и указать путь к БД

MONGO_URL=mongodb+srv://admin:Kolobok123@cluster0.0o13tr6.mongodb.net/?retryWrites=true&w=majority

