select * from songs
select * from genres


sp_rename 'Songs.Songz', 'Song', 'COLUMN'

ALTER TABLE Songs
ADD URL VARCHAR(2083)

ALTER TABLE Songs
DROP COLUMN URL


CREATE TABLE Genres
(
	ID INT IDENTITY(1,1) PRIMARY KEY,
	Genre VARCHAR(20) NOT NULL
)

INSERT INTO Genres VALUES('Grunge')

UPDATE Songs
SET Artist = 'December, 1963 (Oh, What a Night)', Song = 'The Four Seasons'
WHERE Artist = 'The Four Seasons'

ALTER TABLE Songs ADD PRIMARY KEY (Song)

alter table songs alter column genreid int not null


CREATE PROC GetSongs
AS
BEGIN
	SET NOCOUNT ON
	SELECT Song, Artist, Genre, videoGroup, videoID
	FROM Songs
	INNER JOIN Genres ON 
	Songs.GenreID = Genres.ID
	LEFT JOIN Videos ON
	Songs.VideoID = Videos.ID
END

exec getmusic

ALTER TABLE Songs
ADD CONSTRAINT FK_Songs_Videos FOREIGN KEY (VideoID)     
REFERENCES Videos (ID)

DROP PROC GetMusic

select * from videos

