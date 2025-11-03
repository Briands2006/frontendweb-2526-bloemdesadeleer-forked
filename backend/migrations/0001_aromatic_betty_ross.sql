CREATE TABLE `calender` (
	`year` int unsigned NOT NULL,
	`nrOfRaces` int NOT NULL,
	CONSTRAINT `calender_year` PRIMARY KEY(`year`)
);
--> statement-breakpoint
CREATE TABLE `race` (
	`id` int unsigned NOT NULL,
	`date` datetime NOT NULL,
	`weather` varchar(100) NOT NULL,
	`trackRecord` varchar(50),
	`trackId` int unsigned NOT NULL,
	`calendarYear` int NOT NULL,
	`slug` varchar(255) NOT NULL,
	CONSTRAINT `race_id` PRIMARY KEY(`id`),
	CONSTRAINT `race_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `raceResults` (
	`raceId` int unsigned NOT NULL,
	`driverId` int unsigned NOT NULL,
	`position` int NOT NULL,
	`points` int NOT NULL,
	`isWinner` boolean NOT NULL DEFAULT false,
	CONSTRAINT `raceResults_raceId_driverId_pk` PRIMARY KEY(`raceId`,`driverId`)
);
--> statement-breakpoint
ALTER TABLE `race` ADD CONSTRAINT `race_trackId_tracks_id_fk` FOREIGN KEY (`trackId`) REFERENCES `tracks`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `race` ADD CONSTRAINT `race_calendarYear_calender_year_fk` FOREIGN KEY (`calendarYear`) REFERENCES `calender`(`year`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `raceResults` ADD CONSTRAINT `raceResults_raceId_race_id_fk` FOREIGN KEY (`raceId`) REFERENCES `race`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `raceResults` ADD CONSTRAINT `raceResults_driverId_drivers_id_fk` FOREIGN KEY (`driverId`) REFERENCES `drivers`(`id`) ON DELETE cascade ON UPDATE no action;