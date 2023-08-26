import Express from 'express';
const app = Express();

app.get('/', (req, res) => {
  res.send('hello novo');
});

app.listen(8080, function () {
  console.log('servidpr rodando');
});
