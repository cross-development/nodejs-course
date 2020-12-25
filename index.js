const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const csrf = require('csurf');
const flash = require('connect-flash');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {
	allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const homeRoutes = require('./routes/home');
const cartRoutes = require('./routes/cart');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const ordersRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
const varMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/user');
const errorMiddleware = require('./middleware/error');
const keys = require('./keys');

const app = express();
const hbs = exphbs.create({
	defaultLayout: 'main',
	extname: 'hbs',
	helpers: require('./utils/hbs-helpers'),
	handlebars: allowInsecurePrototypeAccess(Handlebars),
});

const store = new MongoStore({
	collection: 'sessions',
	uri: keys.MONGODB_URI,
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: keys.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store,
	}),
);

app.use(csrf());
app.use(flash());
app.use(varMiddleware);
app.use(userMiddleware);

app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/cart', cartRoutes);
app.use('/courses', coursesRoutes);
app.use('/orders', ordersRoutes);
app.use('/auth', authRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

async function start() {
	try {
		await mongoose.connect(keys.MONGODB_URI, {
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
