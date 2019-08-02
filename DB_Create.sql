USE master
GO

IF EXISTS(select * from sys.databases where name='ProjectTask')
	DROP DATABASE ProjectTask

CREATE DATABASE ProjectTask
GO

USE ProjectTask;
GO

CREATE TABLE Users(
	UserID INT IDENTITY(1,1),
	UserName VARCHAR(30),
	Email VARCHAR(30),
	FullName VARCHAR(30),
	Password VARCHAR(30),
	UserRole VARCHAR(20),
	UserLocation VARCHAR(50)
	CONSTRAINT UserID_PK PRIMARY KEY(UserID)	
)

CREATE TABLE Devices(
	DeviceID INT IDENTITY(1,1),
	DName VARCHAR(30),
	Manufacturer VARCHAR(30),
	DType VARCHAR(10),
	OS VARCHAR(10),
	OSVersion INT,
	Processor VARCHAR(30),
	RAM INT,
	UserID INT,
	CONSTRAINT Device_PK PRIMARY KEY(DeviceID),
	CONSTRAINT User_FK FOREIGN KEY(UserID) REFERENCES Users(UserID) ON DELETE CASCADE
)

 
  
