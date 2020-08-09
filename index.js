const express = require('express');
// const path = require('path');
const exphbs = require('express-handlebars');
const app = express();

const hbs = exphbs.create({
	defaultLayout: 'main',
	extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.get('/', (req, res) => {
	res.render('index');
	// res.status(200);
	// res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
	res.render('about');
	// res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	`Server listen on port ${PORT}`;
});