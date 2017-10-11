 
# AddressBook app

**A RESTful api of address book app.**
 

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# build application for production
npm run build


# serve for production with hot at localhost:3000
npm run start
```

## Usage

### Register an account.
- path:`POST /auth/register`

```bash
curl -X POST http://localhost:3000/auth/register -H 'Content-type:application/json' -d '{"username":"test01","password":"123456"}'
```

### Request a token.
- path:`POST /auth/accesstoken`

```bash
curl -X POST http://localhost:3000/auth/accesstoken -H 'Content-type:application/json' -d '{"username":"test01","password":"123456"}'
```
- Response :

```json
{
   "success": true,
   "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIyMDVlZDEzMi1kYTdiLTQ3ZmEtODQ3Mi1kZGI3NjJlZTA3MjIiLCJpYXQiOjE1MDY1MzExMDgsImV4cCI6MTUwNzEzNTkwOH0.z7e0tyP_BtMErP9uDhRc7ihM-z2Jc5kRbrdY8_qYVJg"
}
```
### Add a contact. 
path: `POST /api/v1/contacts` 

```bash
curl -X POST http://localhost:3000/api/v1/contacts -H 'Content-type:application/json' -H 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIyMDVlZDEzMi1kYTdiLTQ3ZmEtODQ3Mi1kZGI3NjJlZTA3MjIiLCJpYXQiOjE1MDY1MzExMDgsImV4cCI6MTUwNzEzNTkwOH0.z7e0tyP_BtMErP9uDhRc7ihM-z2Jc5kRbrdY8_qYVJg' -d '{"name":"Jack Ma","DOB":289324800000,"address":"4114 Sepulveda Blvd Culver","email":"jackma@gmail.com"}'
```
- Response :

```json
{
    "success": true,
    "data": {
        "__v": 0,
        "updatedAt": 1506531778114,
        "_owner": "205ed132-da7b-47fa-8472-ddb762ee0722",
        "createdAt": 1506531778099,
        "name": "Jack Ma",
        "DOB": 289324800000,
        "address": "4114 Sepulveda Blvd Culver",
        "email": "jackma@gmail.com",
        "_id": "59cbd9c28ea9671f8cbdec0c"
    }
}
```
### Get contacts list.
- path:`GET /api/v1/contacts`.
- Use query `?limit=100&offset=0&sort=_id`.
- Default value: `limit=1000,offset=0,sort=_id`.

```bash
curl http://localhost:3000/api/v1/contacts -H 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIyMDVlZDEzMi1kYTdiLTQ3ZmEtODQ3Mi1kZGI3NjJlZTA3MjIiLCJpYXQiOjE1MDY1MzExMDgsImV4cCI6MTUwNzEzNTkwOH0.z7e0tyP_BtMErP9uDhRc7ihM-z2Jc5kRbrdY8_qYVJg'
```
- Response :

```json
{
    "success": true,
    "total": 2,
    "offset": 0,
    "data": [{
        "_id": "59cbd9c28ea9671f8cbdec0c",
        "updatedAt": 1506531778114,
        "_owner": "205ed132-da7b-47fa-8472-ddb762ee0722",
        "createdAt": 1506531778099,
        "name": "Jack Ma",
        "DOB": 289324800000,
        "address": "4114 Sepulveda Blvd Culver",
        "email": "jackma@gmail.com",
        "__v": 0
    }, {
        "_id": "59cbe17d8ea9671f8cbdec0d",
        "updatedAt": 1506533757057,
        "_owner": "205ed132-da7b-47fa-8472-ddb762ee0722",
        "createdAt": 1506533757056,
        "name": "Jackson Xi",
        "DOB": 289322800400,
        "address": "9600 Bellaire Blvd. Suite 252 City/Zip Houston, Texas 77036",
        "email": "jacksonxi@gmail.com",
        "__v": 0
    }]
}

```

### Get a contact
- path:`GET /api/v1/contacts/:id`.

```bash
curl http://localhost:3000/api/v1/contacts/59cbd9c28ea9671f8cbdec0c -H 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIyMDVlZDEzMi1kYTdiLTQ3ZmEtODQ3Mi1kZGI3NjJlZTA3MjIiLCJpYXQiOjE1MDY1MzExMDgsImV4cCI6MTUwNzEzNTkwOH0.z7e0tyP_BtMErP9uDhRc7ihM-z2Jc5kRbrdY8_qYVJg'
```

- Response :

```json
{
    "success": true,
    "data": {
        "_id": "59cbd9c28ea9671f8cbdec0c",
        "updatedAt": 1506531778114,
        "_owner": "205ed132-da7b-47fa-8472-ddb762ee0722",
        "createdAt": 1506531778099,
        "name": "Jack Ma",
        "DOB": 289324800000,
        "address": "4114 Sepulveda Blvd Culver",
        "email": "jackma@gmail.com",
        "__v": 0
    }
}

```

### Update a contact
- path:`PATCH /api/v1/contacts/:id`.

```bash
curl -X PATCH http://localhost:3000/api/v1/contacts/59cbd9c28ea9671f8cbdec0c -H 'Content-type:application/json' -H 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIyMDVlZDEzMi1kYTdiLTQ3ZmEtODQ3Mi1kZGI3NjJlZTA3MjIiLCJpYXQiOjE1MDY1MzExMDgsImV4cCI6MTUwNzEzNTkwOH0.z7e0tyP_BtMErP9uDhRc7ihM-z2Jc5kRbrdY8_qYVJg' -d '{"address":"Los Angeles World Airports 1 World Way, Los Angeles California 90045"}'
```
- Response :

```json
{
    "_id": "59cbd9c28ea9671f8cbdec0c",
    "updatedAt": 1506534121678,
    "_owner": "205ed132-da7b-47fa-8472-ddb762ee0722",
    "createdAt": 1506531778099,
    "name": "Jack Ma",
    "DOB": 289324800000,
    "address": "Los Angeles World Airports 1 World Way, Los Angeles California 90045",
    "email": "jackma@gmail.com",
    "__v": 0
}
```

### Delete a contact

- path:`DELETE /api/v1/contacts/:id`.

```bash
curl -X DELETE http://localhost:3000/api/v1/contacts/59cbd9c28ea9671f8cbdec0c -H 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIyMDVlZDEzMi1kYTdiLTQ3ZmEtODQ3Mi1kZGI3NjJlZTA3MjIiLCJpYXQiOjE1MDY1MzExMDgsImV4cCI6MTUwNzEzNTkwOH0.z7e0tyP_BtMErP9uDhRc7ihM-z2Jc5kRbrdY8_qYVJg'
```

## Demo domain

- [https://randy-address-book-app.herokuapp.com/](https://randy-address-book-app.herokuapp.com/)

- Register an account like below:

```bash
curl -X POST https://randy-address-book-app.herokuapp.com/auth/register -H 'Content-type:application/json' -d '{"username":"test01","password":"123456"}'
```
## License

  [MIT](LICENSE)
