CREATE TABLE Venues
(
	ID INT IDENTITY(1,1) PRIMARY KEY,
	Name VARCHAR(50) NOT NULL,
	Location VARCHAR(100) NOT NULL,
	URL VARCHAR(2083) NOT NULL
)


INSERT INTO Venues VALUES('Dozer''s', '411 Geyser Rd, Ballston Spa, NY 12020', 
	'https://www.google.com/maps/place/411+Geyser+Rd,+Ballston+Spa,+NY+12020/@43.047724,-73.8458277,17z/data=!3m1!4b1!4m5!3m4!1s0x89de477d344304cb:0xc57eb2f6e0b6b5a0!8m2!3d43.047724!4d-73.843639')

INSERT INTO Venues VALUES('Duffy''s Tavern', '20 Amherst St, Lake George, NY 12845', 
	'https://www.google.com/maps/place/20+Amherst+St,+Lake+George,+NY+12845/@43.4260694,-73.7139453,17z/data=!3m1!4b1!4m5!3m4!1s0x89dfc45acef6a037:0x9c8a3a729db8797a!8m2!3d43.4260694!4d-73.7117566')




CREATE TABLE Schedule
(
	DateTime DATETIME PRIMARY KEY NOT NULL,
	Duration FLOAT NOT NULL,
	VenueID INT NOT NULL,
	FOREIGN KEY (VenueID) REFERENCES Venues(ID)
)



INSERT INTO Schedule VALUES('20170616 08:00:00 PM', 4, 1)
INSERT INTO Schedule VALUES('20170824 10:00:00 PM', 4, 2)
INSERT INTO Schedule VALUES('20170825 10:00:00 PM', 4, 2)
INSERT INTO Schedule VALUES('20170826 10:00:00 PM', 4, 2)



CREATE PROC GetSchedule
AS
BEGIN
	SET NOCOUNT ON
	SELECT DateTime, Name as Venue, Location, URL, Duration
	FROM Schedule
	INNER JOIN Venues ON
	Schedule.VenueID = Venues.ID
	WHERE datetime > CONVERT (DATE, GETDATE())
END
