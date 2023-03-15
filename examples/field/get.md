# Field ```GET```

Used to get a field.

| Method   | Url           | Auth          |
| -------- | ---------------| ---------------------|
| `GET`    | `/field/:id` | <span style="color:red">**`ADMIN`**</span>   |

### Parameters

#### Path parameters

```id``` <small>number</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Field's id to get

### HTTP response status codes

| Status   | Description           |
|----------|-----------------------|
|```200``` | OK                    |
|```401``` | Problem in request    |
|```401``` | Unauthorized content  |
|```403``` | Forbidden content  |