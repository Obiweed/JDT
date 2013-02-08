model = {};


/**********************************
			USER
**********************************/

/*Testing commit with coda2*/

//include('model/UserClass.js');

model.User = {};

model.User.events = {};

model.User.methods = {};
model.User.entityMethods = {};
model.User.fullName = {};

model.User.fullName.onGet = function() {
	return this.firstName + ' ' + this.lastName;
};


/**
 * This method can get the week working duration in milliseconds.
 * It is use by other function to calculate some average
 *
 * Attributes :
 * @year : the year of the week
 * @month : the month of the week (1-12)
 * @day : the day of the week (1-31)
 */
model.User.entityMethods.getWeekDuration = function(year, month, day) {

	var today;
	var startWeek;
	var weekWorks;
	var weekDuration;

	weekDuration = 0;

	today = new Date(year, month - 1, day, 12);
	startWeek = new Date(year, month - 1, day, 12);
	
	if (today.getDay() === 0) {
		startWeek = new Date(startWeek - (6 * 24 * 60 * 60 * 1000));
		//startWeek.setDate(today.getDate() - 6);
	} else {
		startWeek = new Date(startWeek - ((today.getDay() - 1) * 24 * 60 * 60 * 1000) - (today.getHours() * 60 * 60 * 1000));
		//startWeek.setDate(today.getDate() - (today.getDay() - 1));
	}

	weekWorks = this.allWorks.query('start >= :1 AND end <= :2', startWeek, today);

	if (weekWorks.length == 0) {
		return {
			error: 106,
			errorMessage: 'There is no work for this period!'
		};
	} else {

		weekWorks.forEach(function(work) {
			weekDuration = weekDuration + work.workDuration;
		});

		return weekDuration;
	}

};

/**
 * This method calculate the hours per day for a week of work
 *
 * Attributes :
 * @year : the year of the week
 * @month : the month of the week
 * @day : the day of the week
 */
model.User.entityMethods.getWeekHoursPerDay = function(year, month, day) {
	var workPercent;
	var weekDuration;

	weekDuration = this.getWeekDuration(year, month, day);

	if (typeof weekDuration != 'number') {
		return {
			error: 106,
			errorMessage: 'There is no work for this period!'
		};
	} else {

		workPercent = 60;

		return (weekDuration / 3600000) / ((workPercent * 5) / 100);
	}
};

/**
 * This method calculate the entire hours for a week of work
 *
 * Attributes :
 * @year : the year of the week
 * @month : the month of the week
 * @day : the day of the week
 */
model.User.entityMethods.getWeekHours = function(year, month, day) {
	var weekDuration;

	weekDuration = this.getWeekDuration(year, month, day);

	if (typeof weekDuration != 'number') {
		return {
			error: 106,
			errorMessage: 'There is no work for this period!'
		};
	} else {


		return (weekDuration / 3600000);
	}
};


/**********************************
			CATEGORY
**********************************/

model.Category = {};
model.Category.events = {};
model.Category.events.onValidate = function() {

	var currentUserDir, currentUserClass;

	currentUserDir = currentUser();

	if (!(currentUserClass = ds.User.find('userUUID = :1', currentUserDir.ID))) {
		return {
			error: 103,
			errorMessage: "You must be logged! - Category"
		};
	}

	this.user = currentUserClass;
};



/**********************************
			WORK
**********************************/

model.Work = {};
model.Work.methods = {};
model.Work.events = {};

model.Work.events.onValidate = function() {

	if (this.pause !== null || this.pause !== 0) {
		this.pause = (this.pause * 60) * 1000;
	}

	if (this.category === null || this.start instanceof Date === false || this.end instanceof Date === false || this.description === '' || this.description === null || this.start >= this.end) {

		if (this.start >= this.end) {
			return {
				error: 105,
				errorMessage: "You must have a end date greather than the start date !"
			};
		}

		if (this.category === null) {
			return {
				error: 100,
				errorMessage: "Must have a Category!"
			};
		}
		if (this.start instanceof Date === false || this.end instanceof Date === false) {
			return {
				error: 101,
				errorMessage: "Your dates are not date type !"
			};
		}
		if (this.description === '' || this.description === null) {
			return {
				error: 102,
				errorMessage: "You must have a description for your work !"
			};
		}

	} else {
		var currentUserDir, currentUserClass;

		currentUserDir = currentUser();

		if (!(currentUserClass = ds.User.find('userUUID = :1', currentUserDir.ID))) {
			return {
				error: 104,
				errorMessage: "You must be logged or your account is not yet activate! - Work"
			};
		}

		this.user = currentUserClass;
	}

};


model.Work.startH = {};
model.Work.startM = {};
model.Work.endH = {};
model.Work.endM = {};
model.Work.workDuration = {};

model.Work.startH.onGet = function() {
	return this.start.getHours();
};
model.Work.startM.onGet = function() {
	return this.start.getMinutes();
};
model.Work.endH.onGet = function() {
	return this.end.getHours();
};
model.Work.endM.onGet = function() {
	return this.end.getMinutes();
};
model.Work.workDuration.onGet = function() {
	return (this.end - this.start) - this.pause;
}