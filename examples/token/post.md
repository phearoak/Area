# Token ```POST```

Used to create a token.

| Method   | Url           | Auth          |
| -------- | ---------------| ---------------------|
| `POST`   | `/token/:service` | <span style="color:red">**`ADMIN`**</span>   |

### Parameters

#### Path parameter

```service``` <small>number</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Id of the service to which the token belongs

#### Body parameters

```user_id``` <small>number</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Id of the user to whom the token belongs

```token``` <small>string</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> access_token string

### HTTP response status codes

| Status   | Description           |
|----------|-----------------------|
|```200``` | OK                    |
|```401``` | Problem in request    |
|```401``` | Unauthorized content  |
|```403``` | Forbidden content  |