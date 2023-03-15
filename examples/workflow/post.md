# Workflow ```POST```

Used to create a workflow.

| Method   | Url           | Auth          |
| -------- | ---------------| ---------------------|
| `POST`   | `/workflow` | <span style="color:red">**`ADMIN`**</span>   |

### Parameters

#### Body parameters

```user_id``` <small>number</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Id of the user to whom the workflow belongs

```action_id``` <small>number</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

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