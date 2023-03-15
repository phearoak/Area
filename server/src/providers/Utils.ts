class Utils {
    closeWindow() {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<script>
try {
    window.close()
} catch(err) {
    console.log(err)
}
</script>
</html>
`;
    }
}

export default new Utils();
