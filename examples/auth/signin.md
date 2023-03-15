# Sign In

Used to connect to an account.

| Method   | Url           | Auth          |
| -------- | ---------------| ---------------------|
| `POST`   | `/auth/signin` | `false`   |

### Parameters

#### Body parameters

```email``` <small>string</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Account's email to sign-in

```password``` <small>string</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Account's password to sign-in

### HTTP response status codes

| Status   | Description           |
|----------|-----------------------|
|```200``` | OK                    |
|```401``` | Problem in request    |
|```401``` | Unauthorized content  |
|```403``` | Forbidden content     |