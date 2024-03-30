create table "user"
(
    id          serial
        constraint user_pk
            primary key,
    createdAt timestamp default now(),
    updatedAt timestamp default now(),

    username    varchar(64),
    name        varchar(64)
);


create table chat
(
    id          serial
        constraint chat_pk
            primary key,
    createdAt timestamp   default now(),
    updatedAt timestamp default now(),

    name        varchar(64),
    type        varchar(10) default 'chat'
);


create table user_chat
(
    id          serial
        constraint user_chat_pk
            primary key,
    createdAt timestamp default now(),
    updatedAt timestamp default now(),

    userId     integer not null
        constraint user_chat_user__id_fk
            references "user"
            on delete cascade,
    chatId     integer not null
        constraint user_chat_chat__id_fk
            references chat
            on delete cascade
);

create table message
(
    id          serial
        constraint message_pk
            primary key,
    createdAt timestamp default now(),
    updatedAt timestamp default now(),

    chatId     integer not null
        constraint message_chat__id_fk
            references chat
            on delete cascade,
    userId     integer not null
        constraint message_user__id_fk
            references "user"
            on delete cascade,
    text        varchar(500)
);


