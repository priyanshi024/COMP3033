const connect = require('connect');
const url = require('url');

const app = connect();

// Handler function for /lab2
function lab2Handler(req, res) {
  const query = url.parse(req.url, true).query;

  const method = query.method;
  const x = parseFloat(query.x);
  const y = parseFloat(query.y);

  let result;
  let error = null;

  switch (method) {
    case "add":
      result = x + y;
      break;
    case "subtract":
      result = x - y;
      break;
    case "multiply":
      result = x * y;
      break;
    case "divide":
      if (y === 0) {
        error = "Cannot divide by zero";
      } else {
        result = x / y;
      }
      break;
    default:
      error = "Invalid method. Use add, subtract, multiply, or divide.";
  }

  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);

  if (error) {
    res.end(JSON.stringify({ error }));
  } else {
    res.end(JSON.stringify({
      x: query.x,
      y: query.y,
      operation: method,
      result: result.toString()
    }));
  }
}

// Router
app.use('/lab2', lab2Handler);

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
