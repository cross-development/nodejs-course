const { Router } = require('express');
const Course = require('../models/courseModel');
const router = Router();

router.get('/', async (req, res) => {
	const courses = await Course.getAll();

	res.render('courses', {
		title: 'Courses',
		isCourses: true,
		courses,
	});
});

router.get('/:id', async (req, res) => {
	const course = await Course.getById(req.params.id);
	console.log(course)

	res.render('course', {
		layout: 'empty',
		title: `Course ${course.title}`,
		course,
	});
});

module.exports = router;
