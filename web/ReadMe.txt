> show databases;
admin                              0.000GB
config                             0.000GB
local                              0.000GB
node-mongo-registration-login-api  0.000GB
> use node-mongo-registration-login-api
switched to db node-mongo-registration-login-api
> show collections
collection
users
> db.users.find()
{ "_id" : ObjectId("5d664e3b7b4d8bae7c1a3984"), "id" : 1, "username" : "admin", "password" : "admin", "firstName" : "Admin", "lastName" : "User", "role" : "Admin", "hash" : "$2y$12$00oncrRIczaBWLCp/OVSN.vLH3B3d8FsPaUOWrL/3AXdz.4GBb0vW" }
>




web app

/src/app/app.module.ts
comment this line "fakeBackendProvider"