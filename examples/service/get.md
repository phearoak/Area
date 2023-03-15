# Service ```GET```

Used to get a service.

| Method   | Url           | Auth          |
| -------- | ---------------| ---------------------|
| `GET`   | `/service/:id` | <span style="color:red">**`ADMIN`**</span>   |

### Parameters

#### Path parameter

```id``` <small>number</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Service's id to get

### HTTP response status codes

| Status   | Description           |
|----------|-----------------------|
|```200``` | OK                    |
|```401``` | Problem in request    |
|```401``` | Unauthorized content  |
|```403``` | Forbidden content  |