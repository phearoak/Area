# Action ```GET```

Used to get action's field.

| Method   | Url           | Auth          |
| -------- | ---------------| ---------------------|
| `GET`   | `/action/:id/fields` | `true`   |

### Parameter

#### Path parameter

```id``` <small>number</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Action's id to get the fields

### HTTP response status codes

| Status   | Description           |
|----------|-----------------------|
|```200``` | OK                    |
|```401``` | Problem in request    |
|```401``` | Unauthorized content  |
|```403``` | Forbidden content  |