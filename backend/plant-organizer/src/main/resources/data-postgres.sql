insert into users(id, username, email, role, password, reset_pass) values (-1, 'admin', 'admin@gmail.com', 'ADMIN', '$2a$10$dxrnyLzYoeyGm2PaSL6i/e6.usplJfbGfr6xKdUdDz7i1ftCahwza', '2019-12-01 09:00:01');
insert into users(id, username, email, role, password, reset_pass) values (-2, 'user1', 'user1@gmail.com', 'USER', '$2a$10$dxrnyLzYoeyGm2PaSL6i/e6.usplJfbGfr6xKdUdDz7i1ftCahwza', '2019-12-01 09:00:01');

insert into authority(name) values ('ADMIN');
insert into authority(name) values ('USER');

insert into user_authority(user_id, authority_id) values (-1,'ADMIN');
insert into user_authority(user_id, authority_id) values (-2,'USER');