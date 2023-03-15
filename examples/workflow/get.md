<h3><span style="color:red"><b>TODO ❌</b></span></h3>

# Workflow ```GET```

Used to get a workflow.

| Method   | Url           | Auth          |
| -------- | ---------------| ---------------------|
| `GET`   | `/workflow/:id` | <span style="color:red">**`ADMIN`**</span>   |

### Parameters

#### Path parameter

```id``` <small>number</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Workflow's id to get

### HTTP response status codes

| Status   | Description           |
|----------|-----------------------|
|```200``` | OK                    |
|```401``` | Problem in request    |
|```401``` | Unauthorized content  |
|```403``` | Forbidden content  |