<h3><span style="color:red"><b>TODO ❌</b></span></h3>

# Workflow ```PATCH```

Used to update a workflow.

| Method   | Url           | Auth          |
| -------- | ---------------| ---------------------|
| `PATCH`   | `/workflow/:id` | <span style="color:red">**`ADMIN`**</span>   |

### Parameters

#### Path parameter

```id``` <small>number</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Workflow's id to update

#### Body parameters

```user_id``` <small>number</small>

> Id of the user to whom the workflow belongs

```action_id``` <small>number</small>

> Id of the action to which the workflow belongs

```status``` <small>boolean</small>

> status of the workflow

### HTTP response status codes

| Status   | Description           |
|----------|-----------------------|
|```200``` | OK                    |
|```401``` | Problem in request    |
|```401``` | Unauthorized content  |
|```403``` | Forbidden content  |