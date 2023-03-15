<h3><span style="color:red"><b>TODO ❌</b></span></h3>

# Field ```PATCH```

Used to update a field.

| Method   | Url           | Auth          |
| -------- | ---------------| ---------------------|
| `PATCH`   | `/field/:id` | <span style="color:red">**`ADMIN`**</span>   |

### Parameters

#### Path parameters

```id``` <small>number</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Field's id to update

#### Body parameters

```action_id``` <small>number</small>

> Field's action_id

```reaction_id``` <small>number</small>

> Field's reaction_id

```name``` <small>string</small>

> Field's name

```label``` <small>string</small>

> Field's label

```type``` <small>string</small>

> Field's type

```helper``` <small>string</small>

> Field's helper

```required``` <small>boolean</small>

> Field's required


### HTTP response status codes

| Status   | Description           |
|----------|-----------------------|
|```200``` | OK                    |
|```401``` | Problem in request    |
|```401``` | Unauthorized content  |
|```403``` | Forbidden content  |