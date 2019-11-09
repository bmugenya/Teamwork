const app = require('./app');

// Start server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening at port 3000`)
})
