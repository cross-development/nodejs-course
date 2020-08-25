const { Router } = require('express');
const Course = require('../models/course/course');
const router = Router();

router.get('/', (req, res) => {
	res.render('add', {
		title: 'Добавить курс',
		isAdd: true,
	});
});

router.post('/', async (req, res) => {
	const { title, price, img } = req.body;
	const { _id } = req.user;

	const course = new Course({ title, price, img, userId: _id });

	try {
		await course.save();
		res.redirect('/courses');
	} catch (error) {
		s;
		console.log(error);
	}
});

module.exports = router;
