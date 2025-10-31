CREATE TABLE `drivers` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`number` int NOT NULL,
	`country` varchar(5) NOT NULL,
	`photo` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`team_id` int unsigned NOT NULL,
	CONSTRAINT `drivers_id` PRIMARY KEY(`id`),
	CONSTRAINT `drivers_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `news` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`summary` text NOT NULL,
	`full_content` text NOT NULL,
	`image_url` varchar(255),
	`date` datetime NOT NULL,
	`tags` varchar(255),
	`author_id` int unsigned,
	`track_id` int unsigned,
	CONSTRAINT `news_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `teams` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`base` varchar(255) NOT NULL,
	`chief` varchar(255) NOT NULL,
	`championships` int NOT NULL DEFAULT 0,
	`logo` varchar(255) NOT NULL,
	`car` varchar(255) NOT NULL,
	`info` text NOT NULL,
	`primary_color` varchar(10) NOT NULL,
	`slug` varchar(255) NOT NULL,
	CONSTRAINT `teams_id` PRIMARY KEY(`id`),
	CONSTRAINT `teams_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `tracks` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`location` varchar(255) NOT NULL,
	`length_km` varchar(10) NOT NULL,
	`laps` int NOT NULL,
	`fastest_lap_time` varchar(50),
	`fastest_lap_driver` varchar(255),
	`fastest_lap_year` int,
	`slug` varchar(255) NOT NULL,
	CONSTRAINT `tracks_id` PRIMARY KEY(`id`),
	CONSTRAINT `tracks_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`date_joined` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`is_admin` boolean NOT NULL DEFAULT false,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `drivers` ADD CONSTRAINT `drivers_team_id_teams_id_fk` FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `news` ADD CONSTRAINT `news_author_id_users_id_fk` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `news` ADD CONSTRAINT `news_track_id_tracks_id_fk` FOREIGN KEY (`track_id`) REFERENCES `tracks`(`id`) ON DELETE set null ON UPDATE no action;