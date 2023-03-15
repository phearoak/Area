# Workflow ```GET```

Used to call callback function thanks to workflow id.

| Method   | Url           | Auth          |
| -------- | ---------------| ---------------------|
| `GET`   | `/workflow/callback/:id` | <span style="color:red">**`ADMIN`**</span>   |

### Parameters

#### Path parameter

```id``` <small>number</small>&nbsp;&nbsp;&nbsp;<span style="color: orange">**Required**</span>

> Workflow's id to call

### HTTP response status codes

| Status   | Description           |
|----------|-----------------------|
|```200``` | OK                    |
|```401``` | Problem in request    |
|```401``` | Unauthorized content  |
|```403``` | Forbidden content  |