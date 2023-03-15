<h3><span style="color:red"><b>TODO ❌</b></span></h3>

# Service ```PATCH```

Used to update a service.

| Method   | Url           | Auth          |
| -------- | ---------------| ---------------------|
| `PATCH`   | `/service/:id` | <span style="color:red">**`ADMIN`**</span>   |

### Parameters

#### Path parameter

```id``` <small>number</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Service's id to update

#### Body parameters

```name``` <small>string</small>

> Service's name

```description``` <small>string</small>

> Service's description

### HTTP response status codes

| Status   | Description           |
|----------|-----------------------|
|```200``` | OK                    |
|```401``` | Problem in request    |
|```401``` | Unauthorized content  |
|```403``` | Forbidden content  |