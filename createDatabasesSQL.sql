DROP DATABASE IF EXISTS `video`;
CREATE DATABASE `video`;

CREATE TABLE `video`.`users` (
	`id` INT AUTO_INCREMENT,
	`username` VARCHAR(20) NOT NULL,
    `passwd` VARCHAR(100) NOT NULL,
    
    PRIMARY KEY(id),
    UNIQUE(`username`)
);