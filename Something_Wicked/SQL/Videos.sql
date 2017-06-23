CREATE TABLE Videos
(
	ID VARCHAR(20) PRIMARY KEY,
	Title VARCHAR(50) NOT NULL,
	Date DATETIME NOT NULL DEFAULT(GETDATE())
)

INSERT INTO Videos
(ID, Title)
VALUES('XlH7y9NEu0c', 'Boogie Oogie Oogie')

INSERT INTO Videos
(ID, Title)
VALUES('4tWCSPJ95R8', 'Hot Stuff')

CREATE PROC GetVideos
AS
BEGIN
	SET NOCOUNT ON
	SELECT ID, Title
	FROM VIDEOS
	ORDER BY Date DESC
END

CREATE PROC GetVideo
(
	@id VARCHAR(20)
)
AS
BEGIN
	SET NOCOUNT ON
	SELECT ID, Title
	FROM VIDEOS
	WHERE ID = @id
END