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

CREATE PROC GetVideoGroups
AS
BEGIN
	SET NOCOUNT ON
	SELECT ID, Title, Thumbnail
	FROM VideoGroups
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

CREATE TABLE VideoGroups
(
	ID VARCHAR(20) PRIMARY KEY,
	Title VARCHAR(50) NOT NULL,
	Thumbnail VARCHAR(20) NOT NULL,
	Date DATETIME NOT NULL DEFAULT(GETDATE())
)



CREATE PROC GetVideos
(
	@groupID VARCHAR(20)
)
AS
BEGIN
	SET NOCOUNT ON
	SELECT Videos.ID, videoGroups.Title
	FROM Videos
	INNER JOIN VideoGroups ON
	Videos.GroupID = VideoGroups.id
	WHERE GroupID = @groupID
END

drop proc GetVideos

exec getvideos '99C26FAF-9B2B-4161-A'

select * from VideoGroups
select * from videos

	