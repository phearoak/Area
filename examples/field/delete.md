<h3><span style="color:red"><b>TODO ❌</b></span></h3>

# Field ```DELETE```

Used to delete a field.

| Method   | Url           | Auth          |
| -------- | ---------------| ---------------------|
| `DELETE`   | `/field/:id` | <span style="color:red">**`ADMIN`**</span>   |

### Parameters

#### Path parameters

```id``` <small>number</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Field's id to delete

### HTTP response status codes

| Status   | Description           |
|----------|-----------------------|
|```200``` | OK                    |
|```401``` | Problem in request    |
|```401``` | Unauthorized content  |
|```403``` | Forbidden content     |