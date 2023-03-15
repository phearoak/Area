# Field ```POST```

Used to create a field.

| Method   | Url           | Auth          |
| -------- | ---------------| ---------------------|
| `POST`   | `/field/` | <span style="color:red">**`ADMIN`**</span>   |

### Parameters

#### Body parameters

```action_id``` <small>number</small>

> Field's action_id

```reaction_id``` <small>number</small>

> Field's reaction_id

```name``` <small>string</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Field's name

```label``` <small>string</small>

> Field's label

```type``` <small>string</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Field's type

```helper``` <small>string</small>

> Field's helper

```required``` <small>boolean</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Field's required

### HTTP response status codes

| Status   | Description           |
|----------|-----------------------|
|```200``` | OK                    |
|```401``` | Problem in request    |
|```401``` | Unauthorized content  |
|```403``` | Forbidden content  |