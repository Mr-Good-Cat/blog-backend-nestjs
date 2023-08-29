# Crypto blog (backend)
One of three repositories to deploy a simple blog.

### Related repositories:
- [Crypto blog (admin)](https://github.com/Mr-Good-Cat/blog-admin-react-app)
- [Crypto blog (frontend)](https://github.com/Mr-Good-Cat/blog-frontend-nextjs)

The application allows you to create categories and articles within them.
The page structure is stored in the `page` table as a tree (template  
"Materialized Path"). There is also authorization through a crypto wallet.

### Stack:
- Nest.js
- PostgreSQL
- Ethers.js
- Swagger

## Instructions to run the project

1. Сreate a database image. To do this, run the command `docker-compose up -d`
2. Add host to `/etc/hosts`:
```
127.0.0.1       blog-backend-nestjs-db
```
3. Install dependencies `yarn install`
4. Run migrations `yarn run migration:up`. 
If the command didn't work run `yarn run typeorm` only once and then run `yarn run migration:up`
5. Visit [localhost:3000/openapi](http://localhost:3000/openapi)

