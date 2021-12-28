# crusty-client
App that helps fast-food businesses get valuable insights into their daily sales and expense

## Docker compose for development

To build the docker container on a local machine:

```shell
docker-compose -f docker-compose.dev.yml up
```

PORT
```python
PORT=3000
```

## Docker compose for production

To build the docker container for production:

```shell
docker-compose -f docker-compose.prod.yml build
```

PORT
```python
PORT=80
```
