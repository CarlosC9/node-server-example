DROP DATABASE IF EXISTS `video`;
CREATE DATABASE `video`;

CREATE TABLE `video`.`users` (
	`id` INT AUTO_INCREMENT,
	`username` VARCHAR(20) NOT NULL,
    `passwd` VARCHAR(100) NOT NULL,
    `money` FLOAT NOT NULL,
    
    PRIMARY KEY(id),
    UNIQUE(`username`)
);

CREATE TABLE `video`.`movies` (
	`id` INT AUTO_INCREMENT,
	`name` VARCHAR(30) NOT NULL,
    `nameDirectory` VARCHAR(30) NOT NULL,
    `filmFile` VARCHAR(100) NOT NULL,
    `imageFile` VARCHAR(100) NOT NULL,
    
    PRIMARY KEY(id)
);

INSERT INTO `video`.`movies` VALUES
(NULL, 'Fast & Furious 9', 'fast_and_furious_9', 'fast_and_furious_9.mp4', 'fast_and_furious_9.jpg'),
(NULL, 'Avatar 2', 'avatar_2', 'avatar_2.mp4', 'avatar_2.jpg');