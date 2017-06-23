CREATE TABLE Photos
(
	ID VARCHAR(50) PRIMARY KEY,
	Title VARCHAR(50) NOT NULL,
	Thumbnail VARCHAR(50) NOT NULL,
)



CREATE PROC GetPhotos
AS
BEGIN
	SET NOCOUNT ON
	SELECT ID, Title, Thumbnail
	FROM Photos
	ORDER BY ID DESC
END

EXEC GetPhotos

select * from Photos
drop table Photos
drop proc GetPhotos