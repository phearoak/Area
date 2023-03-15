<h3><span style="color:red"><b>TODO ❌</b></span></h3>

# Token ```PATCH```

Used to update a token.

| Method   | Url           | Auth          |
| -------- | ---------------| ---------------------|
| `PATCH`   | `/token/:id` | <span style="color:red">**`ADMIN`**</span>   |

### Parameters

#### Path parameter

```id``` <small>number</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Token's id to update

#### Body parameters

```user_id``` <small>number</small>

> Id of the user to whom the token belongs

```service_id``` <small>number</small>

> Id of the service to which the token belongs

```token``` <small>string</small>

> access_token string

### HTTP response status codes

| Status   | Description           |
|----------|-----------------------|
|```200``` | OK                    |
|```401``` | Problem in request    |
|```401``` | Unauthorized content  |
|```403``` | Forbidden content  |