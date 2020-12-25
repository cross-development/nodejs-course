const { body } = require('express-validator');
const User = require('../models/user/user');

exports.registerValidators = [
	body('email')
		.isEmail()
		.withMessage('Введите корректный email')
		.custom(async (value, { req }) => {
			try {
				const user = await User.findOne({ email: value });

				if (user) {
					return Promise.reject('Такой email уже занят');
				}
			} catch (error) {
				console.log(error);
			}
		})
		.normalizeEmail(),

	body('password', 'Пароль должен быть минимум 6 символов')
		.isLength({ min: 6, max: 56 })
		.isAlphanumeric()
		.trim(),

	body('confirm')
		.custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error('Пароли должны совпадать');
			}

			return true;
		})
		.trim(),

	body('name')
		.isLength({ min: 3, max: 56 })
		.withMessage('Имя должно быть минимум 3 символа')
		.trim(),
];

exports.loginValidators = [
	body('email')
		.isEmail()
		.withMessage('Введите корректный email')
		.custom(async (value, { req }) => {
			try {
				const user = await User.findOne({ email: value });

				if (!user) {
					return Promise.reject(
						'Пользователя с таким email не существует',
					);
				}
			} catch (error) {
				console.log(error);
			}
		})
		.normalizeEmail(),

	body('password', 'Пароль должен быть минимум 6 символов')
		.isLength({ min: 6, max: 56 })
		.isAlphanumeric()
		.trim(),
];

exports.courseValidators = [
	body('title')
		.isLength({ min: 3 })
		.withMessage('Минимальная длинна названия курса 3 символа')
		.trim(),

	body('price').isNumeric().withMessage('Введите корректную цену'),

	body('img', 'Введите корректны URL картинки').isURL(),
];