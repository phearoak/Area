<h3><span style="color:red"><b>TODO ❌</b></span></h3>

# Reaction ```GET```

Used to get a reaction.

| Method   | Url           | Auth          |
| -------- | ---------------| ---------------------|
| `GET`   | `/reaction/:service/:id` | <span style="color:red">**`ADMIN`**</span>   |

### Parameters

#### Path parameters

```service``` <small>number</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Id of the service to which the reaction belongs

```id``` <small>number</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Reaction's id to get

### HTTP response status codes

| Status   | Description           |
|----------|-----------------------|
|```200``` | OK                    |
|```401``` | Problem in request    |
|```401``` | Unauthorized content  |
|```403``` | Forbidden content  |