<h3><span style="color:red"><b>TODO ❌</b></span></h3>

# Token ```DELETE```

Used to delete a token.

| Method   | Url           | Auth          |
| -------- | ---------------| ---------------------|
| `DELETE`   | `/token/:id` | <span style="color:red">**`ADMIN`**</span>   |

### Parameters

#### Path parameter

```id``` <small>number</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Token's id to delete

### HTTP response status codes

| Status   | Description           |
|----------|-----------------------|
|```200``` | OK                    |
|```401``` | Problem in request    |
|```401``` | Unauthorized content  |
|```403``` | Forbidden content  |