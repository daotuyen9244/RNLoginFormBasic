USE [Demo]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product](
	[product_id] [int] IDENTITY(1,1) NOT NULL,
	[product_name] [varchar](50) NOT NULL,
	[product_price] [numeric](18, 0) NOT NULL,
	[product_description] [varchar](250) NULL,
	[product_qty] [numeric](18, 0) NULL,
PRIMARY KEY CLUSTERED 
(
	[product_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, 
	ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[product] ON 

INSERT [dbo].[product] ([product_id], [product_name], [product_price], [product_description], 
	[product_qty]) VALUES (1, N'testing data', CAST(1235 AS Numeric(18, 0)),
	 N'this is testing product', CAST(12 AS Numeric(18, 0)))
SET IDENTITY_INSERT [dbo].[product] OFF


Use Demo
 GO
SET ANSI_NULLS ON
 GO
 SET QUOTED_IDENTIFIER ON
 GO
CREATE PROCEDURE dbo.getAllProducts 
 AS
 BEGIN
 SELECT * from product;
 END
 GO


 Use Demo
 GO
SET ANSI_NULLS ON
 GO
 SET QUOTED_IDENTIFIER ON
 GO
CREATE PROCEDURE dbo.addProduct
 @product_name varchar(50),
 @product_price numeric(18,2),
 @product_description varchar(250),
 @product_qty numeric(18,2)
 AS
 BEGIN
 INSERT INTO product(product_name,product_price,product_description,product_qty)
 VALUES(@product_name,@product_price,@product_description,@product_qty);
 END
 GO

 Use Demo
 GO
SET ANSI_NULLS ON
 GO
 SET QUOTED_IDENTIFIER ON
 GO
CREATE PROCEDURE dbo.deleteProduct
 @product_id int
 AS
 BEGIN
 DELETE FROM product WHERE product_id = @product_id;
 END
 GO

 Use Demo
 GO
SET ANSI_NULLS ON
 GO
 SET QUOTED_IDENTIFIER ON
 GO
CREATE PROCEDURE dbo.updateProduct
 @product_id int,
 @product_name varchar(50),
 @product_price numeric(18,2),
 @product_description varchar(250),
 @product_qty numeric(18,2)
 AS
 BEGIN
 UPDATE product SET product_name= @product_name, product_price=@product_price,
 product_description=@product_description, product_qty=@product_qty
 WHERE product_id = @product_id;
 
 END
 GO