<h3><span style="color:red"><b>TODO ❌</b></span></h3>

# Reaction ```POST```

Used to create a reaction.

| Method   | Url           | Auth          |
| -------- | ---------------| ---------------------|
| `POST`   | `/reaction/:service` | <span style="color:red">**`ADMIN`**</span>   |

### Parameters

#### Path parameter

```service``` <small>number</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Id of the service to which the reaction belongs

#### Body parameters

```name``` <small>string</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Reaction's name

```description``` <small>string</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Reaction's description

### HTTP response status codes

| Status   | Description           |
|----------|-----------------------|
|```200``` | OK                    |
|```401``` | Problem in request    |
|```401``` | Unauthorized content  |
|```403``` | Forbidden content  |