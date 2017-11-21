const express= require('express');

const app = express(),
  port = 3005;
app.use(express.static('dist'));

app.listen(port, () => console.log(`listening on ${port}`));
