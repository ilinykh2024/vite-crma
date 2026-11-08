const cssBadges = {
	new: 'badge-danger',
	inwork: 'badge-warning',
	complete: 'badge-success',
	default: 'badge-secondary',
};

export const getStatusBadgeClass = (status) => {
	return cssBadges[status] ? cssBadges[status] : cssBadges['default'];
};

const statusText = {
	new: 'Новая',
	inwork: 'В работе',
	complete: 'Завершенный',
	default: 'Нет статуса',
};

export const getStatusText = (status) => {
	return statusText[status] ? statusText[status] : statusText['default'];
};

const productName = {
	'course-html': 'Курс по верстке',
	'course-js': 'Курс по JavaScript',
	'course-vue': 'Курс по VUE JS',
	'course-php': 'Курс по PHP',
	'course-wordpress': 'Курс по WordPress',
};

export const getProductName = (product) => {
	return productName[product]
		? productName[product]
		: productName['course-js'];
};
