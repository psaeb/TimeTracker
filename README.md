# Time Tracking App

- [Demo]()


## Description

A time tracking app with data managing capabilities such as erasig data, adding data, and storing data even when the page is closed/refreshed. 

## Installation

```sh
git clone https://github.com/psaeb/TimeTracker.git
```

### Installing Initialize a new Node.js

```sh
npm init -y
```

### Installing dependicies

```sh
npm install express cors body-parser
```

```sh
npm install nodemon --save-dev
```

### Server-side

Add a file **server.js** with the following content:

```js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from public directory
app.use(express.static('public'));

// GET request to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

```

Run the application with the following command:
```sh
npm run dev
```
