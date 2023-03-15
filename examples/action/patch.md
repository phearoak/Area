<h3><span style="color:red"><b>TODO ❌</b></span></h3>

# Action ```PATCH```

Used to update an action.

| Method   | Url           | Auth          |
| -------- | ---------------| ---------------------|
| `PATCH`   | `/action/:service/:id` | <span style="color:red">**`ADMIN`**</span>   |

### Parameters

#### Path parameters

```service``` <small>number</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Id of the service to which the action belongs

```id``` <small>number</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Action's id to update

#### Body parameters

```name``` <small>string</small>

> Action's name

```description``` <small>string</small>

> Action's description

### HTTP response status codes

| Status   | Description           |
|----------|-----------------------|
|```200``` | OK                    |
|```401``` | Problem in request    |
|```401``` | Unauthorized content  |
|```403``` | Forbidden content  |