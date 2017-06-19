CREATE TABLE Videos
(
	ID INT IDENTITY(1,1) PRIMARY KEY,
	Title VARCHAR(50) NOT NULL,
	Thumbnail VARCHAR(50) NOT NULL,
	URL VARCHAR(2083) NOT NULL
)

INSERT INTO Videos
(Title, Thumbnail, URL)
VALUES('Boogie Oogie Oogie', 'Boogie-Oogie-Oogie.png', 'https://www.youtube.com/watch?v=XlH7y9NEu0c&feature=youtu.be')

INSERT INTO Videos
(Title, Thumbnail, URL)
VALUES('Hot Stuff', 'Hot-Stuff.png', 'https://www.youtube.com/watch?v=4tWCSPJ95R8')

CREATE PROC GetVideos
AS
BEGIN
	SET NOCOUNT ON
	SELECT Title, Thumbnail, URL
	FROM Videos
END

EXEC GetVideos
