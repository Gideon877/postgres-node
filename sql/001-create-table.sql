create table IF NOT EXISTS system_user(
    id serial not null primary key,
    username text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL
);

create table IF NOT EXISTS booking(
    id serial not null primary key,
    user_id int not null,
    image text NOT NULL default '',
    summary text NOT NULL,
    name text NOT NULL,
    year int not null,
    FOREIGN KEY (user_id) REFERENCES system_user(id)
);

INSERT INTO system_user(username, first_name, last_name) VALUES ('JohnSmith', 'John', 'Smith');