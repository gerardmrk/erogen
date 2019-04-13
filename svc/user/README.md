## Local Development

### Docker Container

```sh
docker run \
    --name erogen-users \
    -d \
    -p 5432:5432 \
    -v /usr/local/var/lib/erogen/db/users/data:/var/lib/postgresql/data \
    -e POSTGRES_DB=erogen_users \
    -e POSTGRES_USER=erogen-admin \
    -e POSTGRES_PASSWORD=erogen-admin \
    postgres:11.2-alpine
```
