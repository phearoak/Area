# Action ```POST```

Used to create an action.

| Method   | Url           | Auth          |
| -------- | ---------------| ---------------------|
| `POST`   | `/action/:service` | <span style="color:red">**`ADMIN`**</span>   |

### Parameters

#### Path parameter

```service``` <small>number</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Id of the service to which the action belongs

#### Body parameters

```name``` <small>string</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Action's name

```description``` <small>string</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Action's description

### HTTP response status codes

| Status   | Description           |
|----------|-----------------------|
|```200``` | OK                    |
|```401``` | Problem in request    |
|```401``` | Unauthorized content  |
|```403``` | Forbidden content  |