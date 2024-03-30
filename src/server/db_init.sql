create table user
(
    id           serial
        constraint user_pk
            primary key,
    time_create  timestamp    default now(),

    name varchar(64)

    github

);


create table chat
(
    id           serial
        constraint chat_pk
            primary key,

);


create table user_chat
(
    id           serial
        constraint user_chat_pk
            primary key,
   user_id
   chat_id
   role
);

create table message
(
    id           serial
        constraint user_chat_pk
            primary key,
    chat_id
    user_id
    text
);


