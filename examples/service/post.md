# Service ```POST```

Used to create a service.

| Method   | Url           | Auth          |
| -------- | ---------------| ---------------------|
| `POST`   | `/service` | <span style="color:red">**`ADMIN`**</span>   |

### Parameters

#### Body parameters

```name``` <small>string</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Service's name

```description``` <small>string</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Service's description

### HTTP response status codes

| Status   | Description           |
|----------|-----------------------|
|```200``` | OK                    |
|```401``` | Problem in request    |
|```401``` | Unauthorized content  |
|```403``` | Forbidden content  |