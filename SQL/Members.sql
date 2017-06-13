CREATE TABLE Members
(
	ID INT IDENTITY(1,1) PRIMARY KEY,
	Name VARCHAR(20) NOT NULL,
	Thumbnail VARCHAR(50) NOT NULL
)

CREATE TABLE Bios
(
	Bio VARCHAR(MAX) NOT NULL,
	MemberID int NOT NULL FOREIGN KEY REFERENCES Members(ID),
)

CREATE PROC GetMembers
AS
BEGIN
	SET NOCOUNT ON
	SELECT * FROM Members
END

exec GetMembers

select * from members
select * from bios



CREATE PROC GetBio
(
	@memberID int
)
AS
BEGIN
	SET NOCOUNT ON
	SELECT Bio
	FROM Bios
	WHERE MemberID = @memberID
END


drop proc getbio