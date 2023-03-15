# Reaction ```GET```

Used to get reaction's field.

| Method   | Url           | Auth          |
| -------- | ---------------| ---------------------|
| `GET`   | `/reaction/:id/fields` | `true`   |

### Parameter

#### Path parameter

```id``` <small>number</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Reaction's id to get the fields

### HTTP response status codes

| Status   | Description           |
|----------|-----------------------|
|```200``` | OK                    |
|```401``` | Problem in request    |
|```401``` | Unauthorized content  |
|```403``` | Forbidden content  |