CREATE TABLE [dbo].[Book] (
    [GUID]      UNIQUEIDENTIFIER NOT NULL DEFAULT (NEWSEQUENTIALID()),
    [Name]      VARCHAR (50)     NOT NULL,
    [Author]    VARCHAR (50)     NOT NULL,
    [CreatedAt] DATETIME         NOT NULL,
    [UpdatedAt] DATETIME         NULL,
    CONSTRAINT [PK_Book] PRIMARY KEY CLUSTERED ([GUID] ASC)
);

