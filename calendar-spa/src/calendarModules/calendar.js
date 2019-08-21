import moment from 'moment-timezone';
import holidays from '../configFiles/holidaysConfig.json'

let months = {
	"1": {
		index: 1,
		name: "Enero",
		days: 31
	},
	"2": {
		index: 2,
		name: "Febrero",
		days: 28
	},
	"3": {
		index: 3,
		name: "Marzo",
		days: 31
	},
	"4": {
		index: 4,
		name: "Abril",
		days: 30
	},
	"5": {
		index: 5,
		name: "Mayo",
		days: 31
	},
	"6": {
		index: 6,
		name: "Junio",
		days: 30
	},
	"7": {
		index: 7,
		name: "Julio",
		days: 31
	},
	"8": {
		index: 8,
		name: "Agosto",
		days: 31
	},
	"9": {
		index: 9,
		name: "Septiembre",
		days: 30
	},
	"10": {
		index: 10,
		name: "Octubre",
		days: 31
	},
	"11": {
		index: 11,
		name: "Noviembre",
		days: 30
	},
	"12": {
		index: 12,
		name: "Diciembre",
		days: 31
	}
}

class Calendar {
	constructor(date) {
		this._date = date.clone();
		this._month = JSON.parse(JSON.stringify(months[date.month() + 1]));
		this._year = date.year();
	}

	get date () {
		return this._date;
	}

	get month () {
		return this._month;
	}

	get year () {
		return this._year;
	}

	zeller () {
		let a = Math.trunc((14 - this._month.index + 1) / 12);
		let y = this._year - a;
		let m = this._month.index + 12 * a - 2;
		let day = 1;
		let h =
			(day +
				y +
				Math.trunc(y / 4) -
				Math.trunc(y / 100) +
				Math.trunc(y / 400) +
				Math.trunc((31 * m) / 12)) %
			7;
		return Math.trunc(h);
	}

	setDay (currentDay) {
		let style;
		if (`${currentDay}/${this._month.index}/${this._year}` == moment(Date.now()).format('D/M/YYYY')) {
			style = 'active has-background-success has-text-white'
		} else {
			if (holidays.hasOwnProperty(`${this._month.index}`)) {
				for (let date of holidays[this._month.index].dates) {
					if (date.day == currentDay) {
						style = 'active has-background-warning';
						break;
					}
				}
			}
		}
		return style;
	}

	generateMonth () {
		let days = [];
		let startDayOfWeek = this.zeller();
		this._month.days += (this._month.days == 28 && moment([this._year]).isLeapYear()) ? startDayOfWeek + 1 : startDayOfWeek;

		for (let i = 1; i <= this._month.days; i++) {
			let day = {};
			if (i > startDayOfWeek) {
				day.index = i - startDayOfWeek;
				day.useClass = this.setDay(day.index);
			}
			days.push(day);
		}
		return {
			"name": this._month.name,
			days
		};
	}
}

export default Calendar;