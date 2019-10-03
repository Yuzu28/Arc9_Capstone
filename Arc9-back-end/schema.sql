create table users
(id serial primary key,
username varchar(10),
email varchar not null,
password varchar(200),
pic  varchar);


create table favorites
(pathname varchar,
user_id integer references users(id));