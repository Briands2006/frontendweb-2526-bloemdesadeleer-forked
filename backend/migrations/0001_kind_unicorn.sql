ALTER TABLE `favoriteDriver` ADD PRIMARY KEY(`userId`,`driverId`);--> statement-breakpoint
ALTER TABLE `drivers` ADD `bibliography` text NOT NULL;