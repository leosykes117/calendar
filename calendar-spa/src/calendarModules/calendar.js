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

	get date() {
		return this._date;
	}

	get month() {
		return this._month;
	}

	get year() {
		return this._year;
	}

	setDay(currentDay, pascuaDate) {
		let dateInfo = {};
		let nowDate = moment([this._year, this._month.index - 1, currentDay]);
		
		if (nowDate.format('D/M/YYYY') == moment(Date.now()).format('D/M/YYYY')) {

			dateInfo.style = 'active has-background-success has-text-white';

		} else if (pascuaDate != undefined && nowDate.date() == pascuaDate.date()) {

			dateInfo.style = 'active has-background-grey has-text-white';
			dateInfo.eventName = "Domingo de Pascua"

		} else {
			if (holidays.hasOwnProperty(`${this._month.index}`)) {
				for (let date of holidays[this._month.index].dates) {
					if (date.day == currentDay) {
						if (date.hasOwnProperty('each')) {
							if ((this._year - date.each.pivot) % date.each.year == 0) {
								dateInfo.style = 'active has-background-warning';
								dateInfo.eventName = date.name
							}
						} else {
							dateInfo.style = 'active has-background-warning';
							dateInfo.eventName = date.name
						}
						break;
					}
				}
			}
		}
		return dateInfo;
	}

	generateMonth() {
		let days = [];
		let startDayOfWeek = this.zeller();
		let pascuaDate = moment(this.pascua())
		this._month.days += (this._month.days == 28 && moment([this._year]).isLeapYear()) ? startDayOfWeek + 1 : startDayOfWeek;

		for (let i = 1; i <= this._month.days; i++) {
			let day = {};
			if (i > startDayOfWeek) {
				day.index = i - startDayOfWeek;
				let event = (pascuaDate.month() != this._month.index) ? this.setDay(day.index) : this.setDay(day.index, pascuaDate);
				day.useClass = event.style;
				day.eventName = event.eventName;
			}
			days.push(day);
		}
		return {
			"name": this._month.name,
			days
		};
	}

	zeller() {
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

	pascua() {
		let M, N;

		if (this._year > 1583 && this._year < 1699) {
			[M, N] = [22, 2];
		} else if (this._year > 1700 && this._year < 1799) {
			[M, N] = [23, 3];
		} else if (this._year > 1800 && this._year < 1899) {
			[M, N] = [23, 4];
		} else if (this._year > 1900 && this._year < 2099) {
			[M, N] = [24, 5];
		} else if (this._year > 2100 && this._year < 2199) {
			[M, N] = [24, 6];
		} else if (this._year > 2200 && this._year < 2299) {
			[M, N] = [25, 0];
		}

		let a = this._year % 19;
		let b = this._year % 4;
		let c = this._year % 7;
		let d = ((19 * a) + M) % 30;
		let e = ((2 * b) + (4 * c) + (6 * d) + N) % 7;
		let f = d + e;
		let day, month;

		if (f < 10) {
			day = f + 22;
			month = 3;
		} else {
			day = f - 9;
			month = 4;
		}

		if (day == 26 && month == 4) {
			day = 19;
		}

		if (day == 25 && month == 4 && d == 28 && e == 6 && a > 10) {
			day = 18;
		}

		return new Date(this._year, month, day);
	}
}

export default Calendar;