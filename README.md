# SimpleBlogEngine, a simple, cross platform, system built on .NET Core

## Visual Studio 2017 and SQL Server

#### Prerequisites

- SQL Server
- [Visual Studio 2017 version 15.3 with .NET Core SDK 2.0](https://www.microsoft.com/net/core/)

#### Steps to run

1. CONFIG API:
- Update the connection string in appsettings.json.
- Build whole solution.
- Open Power Shell of API project and type:    
    + "dotnet ef database update" to create the database.
- Go to swagger API to create new user at link: https://localhost:44374/swagger/
- Run POST REGISTER API to create the new user. (i.e: user name: m_living@hotmail.com, password: iammrkhoA@newpwd1)
- In Visual Studio, press "Control + F5".

2. CONFIG ANGULAR 6:
- Open Angular with Visual Code.
- Run 'npm install'
- Run 'ng build'.
- Run 'ng server'
- Run 'http://localhost:4200/login'
- Use the created user above (user name: m_living@hotmail.com, password: iammrkhoA@newpwd1) to login the admin site.
- There are 02 main pages/ features to go through: Category management, Post Management, you can use CRUD to perform in this admin site.

## Technologies and frameworks used:
- ASP.NET MVC Core 2.0.0 on .NET Core 2.0.0 
- Entity Framework Core 2.0.0
- ASP.NET Identity Core 2.0.0

## How to contribute

- Report bugs or suggest features by create new issues or add comments to issues
- Submit pull requests

## License

SimpleBlogEngine is licensed under the Apache 2.0 license.