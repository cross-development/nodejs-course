const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {
	allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const homeRoutes = require('./routes/home');
const cartRoutes = require('./routes/cart');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');

const app = express();

const hbs = exphbs.create({
	defaultLayout: 'main',
	extname: 'hbs',
	handlebars: allowInsecurePrototypeAccess(Handlebars),
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/cart', cartRoutes);
app.use('/courses', coursesRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
	// const someParams = '?retryWrites=true&w=majority';
	try {
		const url = `mongodb+srv://vitaliy:38vjnQNInjRjmH87@productscluster.dtfx1.mongodb.net/shop`;

		await mongoose.connect(url, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useFindAndModify: false,
		});

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
}

start();
