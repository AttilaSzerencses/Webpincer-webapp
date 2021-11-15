create table users
(
    id         serial       not null
        constraint users_pkey
            primary key,
    permission varchar(1)   not null,
    name       varchar(100) not null,
    email      varchar(100) not null,
    password   varchar(100) not null,
    phone      varchar(15)  not null
);

alter table users
    owner to vdqixrmcwgznhx;

create table locations
(
    id           serial      not null
        constraint locations_pkey
            primary key,
    u_id         integer     not null
        constraint fk_uid
            references users,
    postcode     numeric(4)  not null,
    city         varchar(30) not null,
    street       varchar(30) not null,
    streetnumber integer     not null,
    other        varchar(30) not null
);

alter table locations
    owner to vdqixrmcwgznhx;

create table restaurants
(
    id            serial       not null
        constraint restaurants_pkey
            primary key,
    u_id          integer      not null
        constraint fk_uid
            references users,
    opens         varchar(30)  not null,
    closes        varchar(30)  not null,
    cprice        integer      not null,
    restaurantpic varchar(100) not null,
    type          varchar(100)
);

alter table restaurants
    owner to vdqixrmcwgznhx;

create table foods
(
    id       serial       not null
        constraint foods_pkey
            primary key,
    u_id     integer      not null
        constraint fk_uid
            references users,
    foodname varchar(30)  not null,
    price    integer      not null,
    foodpic  varchar(100) not null
);

alter table foods
    owner to vdqixrmcwgznhx;

create table orders
(
    id        serial  not null
        constraint orders_pkey
            primary key,
    u_id      integer not null
        constraint fk_uid
            references users,
    fid       integer not null
        constraint fk_fid
            references foods,
    ordertime integer not null,
    sumprice  integer not null,
    cdone     varchar(100),
    rdone     varchar(100),
    date      varchar(100)
);

alter table orders
    owner to vdqixrmcwgznhx;

create table carts
(
    id    serial       not null
        constraint carts_pkey
            primary key,
    u_id  integer      not null
        constraint fk_uid
            references users,
    fid   integer      not null
        constraint fk_fid
            references foods,
    name  varchar(100) not null,
    price integer      not null
);

alter table carts
    owner to vdqixrmcwgznhx;

