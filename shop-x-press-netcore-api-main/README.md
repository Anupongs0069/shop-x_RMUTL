# ShopXPress API
ShopXPress API is an example Web API using Asp.Net Core which aim to use for training for people who interesting.

## Prerequisites
- [.Net 8](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Entity Framework Core 8](https://learn.microsoft.com/en-us/ef/core/what-is-new/ef-core-8.0/whatsnew)
- [EF Core Tool](https://learn.microsoft.com/en-us/ef/core/cli/dotnet)
- [Docker](https://www.docker.com/products/docker-desktop/) - optional

## Development
In case for development you can use docker to run the mysql8 database locally

### How to start docker
This will start up the mysql service container that expose port to `3406`
```
$ cd  ./ShopXPress.Api/Docker/
docker-compose up
```

Then you can use following connectionstring inside `appsettings.json` file
```
Server=localhost;Port=3406;Database=shopxpress-db;User=user;Password=password;
```

## Database update and migrations
This project is implemented with Entity Framework Core built up with `Code First`, so some command line are needed

###

### 1. How to update entity and create migration
Every time that we update or create or even delete the entity or property we need to create a **migration** to generate the sql script (in code) to update the Database changed.

Run the command

```bash
cd ShopXPress.Api
dotnet ef migrations add InitialDatabase -o "Entities/Migrations"
```

### 2. Run database update
Every time that we changed the entity and created migrations then we need to apply the change to database by using following command.
Only migration that hasn't applied will be execute.
```
$ cd ../ShopXPress.Api/Docker/
dotnet ef database update
```

### 3. How to revert migration
There are 2 cases to revert migration

#### 3.1 Undo migration that create recently and not run update database yet
This case you can run the command to remove your recent migration that created recently.

You can use this command to revert the unapply migration
```
dotnet ef migrations remove
```
This this command will delete most recent migration and undo the database snapshot file.

#### 3.2 Undo migration that run update database already (apply change to database)
If you've appplied the change already, you need to revert the change before remove the migration.

For example if you've apply the migrations named `20240217045714_UpdateUserTable_NotCorrect` (inside folder `Migrations`)
and you want to revert this change then you need to run update database with your latest successful one.

Incase that the previous migration is `20230216035259_UpdateLatest` You will need to run update database with migration named `20240216035259_UpdateLatest` first.

```
dotnet ef database update 20240216035259_UpdateLatest
```

Then run remove migration again to remove the incorrect one
```
dotnet ef migrations remove
```

**Shortcut To undo and remove last migration**
This command will remove and revert the last migration.
```
dotnet ef migrations remove --force
```

## References
- [Code First With Migrations](https://learn.microsoft.com/en-us/aspnet/core/data/ef-mvc/migrations?view=aspnetcore-7.0)
- [Migrations](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/?tabs=dotnet-core-cli)