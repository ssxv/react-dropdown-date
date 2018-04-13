import React, { PropTypes } from 'react';
import { monthByNumber, numberByMonth, daysInMonth, unit } from './helper';


class DropdownDate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startYear: null,
            startMonth: null,
            startDay: null,
            endYear: null,
            endMonth: null,
            endDay: null,
            selectedYear: -1,
            selectedMonth: -1,
            selectedDay: -1
        };
        this.generateYearOptions = this.generateYearOptions.bind(this);
        this.generateMonthOptions = this.generateMonthOptions.bind(this);
        this.generateDayOptions = this.generateDayOptions.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleMonthChange = this.handleMonthChange.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentWillMount() {
        let startYear, startMonth, startDay, endYear, endMonth, endDay;
        if (this.props.startDate) {
            const date = new Date(this.props.startDate);
            startYear = date.getFullYear();
            startMonth = date.getMonth();
            startDay = date.getDate();
        } else {
            startYear = 1900;
            startMonth = 0;
            startDay = 1;
        }
        if (this.props.endDate) {
            const date = new Date(this.props.endDate);
            endYear = date.getFullYear();
            endMonth = date.getMonth();
            endDay = date.getDate();
        } else {
            const date = new Date();
            endYear = date.getFullYear();
            endMonth = date.getMonth();
            endDay = date.getDate();
        }
        this.setState({ startYear, startMonth, startDay, endYear, endMonth, endDay });
    }

    generateYearOptions() {
        const { startYear, endYear } = this.state;
        const yearOptions = [];
        yearOptions.push(
            <option key={-1} value=""
                className={(this.props.classes && this.props.classes.yearOptions) ? this.props.classes.yearOptions : null}
            >
                {(this.props.defaultValues && this.props.defaultValues.year) ? this.props.defaultValues.year : ''}
            </option>
        );
        if (this.props.options && this.props.options.yearReverse) {
            for (let i = endYear; i >= startYear; i--) {
                yearOptions.push(
                    <option key={i} value={i}
                        className={(this.props.classes && this.props.classes.yearOptions) ? this.props.classes.yearOptions : null}
                    >{i}</option>
                );
            }
        } else {
            for (let i = startYear; i <= endYear; i++) {
                yearOptions.push(
                    <option key={i} value={i}
                        className={(this.props.classes && this.props.classes.yearOptions) ? this.props.classes.yearOptions : null}
                    >{i}</option>
                );
            }
        }
        return yearOptions;
    }

    generateMonthOptions() {
        const { startMonth, endMonth, startYear, endYear, selectedYear } = this.state;
        let months = [];
        if (selectedYear === startYear) {
            for (let i = startMonth; i <= 11; i++) {
                months.push({
                    value: i,
                    month: monthByNumber[i]
                });
            }
        } else if (selectedYear === endYear) {
            for (let i = 0; i <= endMonth; i++) {
                months.push({
                    value: i,
                    month: monthByNumber[i]
                });
            }
        } else {
            for (let i = 0; i <= 11; i++) {
                months.push({
                    value: i,
                    month: monthByNumber[i]
                });
            }
        }

        if (this.props.options && this.props.options.monthShort) {
            months = months.map((elem) => {
                return {
                    value: elem.value,
                    month: elem.month.substring(0, 3)
                };
            });
        }

        if (this.props.options && this.props.options.monthCaps) {
            months = months.map((elem) => {
                return {
                    value: elem.value,
                    month: elem.month.toUpperCase()
                };
            });
        }

        const monthOptions = [];
        monthOptions.push(
            <option key={-1} value=""
                className={(this.props.classes && this.props.classes.monthOptions) ? this.props.classes.monthOptions : null}
            >{(this.props.defaultValues && this.props.defaultValues.month) ? this.props.defaultValues.month : ''}
            </option>
        );
        months.forEach((elem) => {
            monthOptions.push(
                <option key={elem.value} value={elem.value}
                    className={(this.props.classes && this.props.classes.monthOptions) ? this.props.classes.monthOptions : null}
                >{elem.month}</option>
            );
        });

        return monthOptions;
    }

    generateDayOptions() {
        const { startYear, startMonth, startDay, endYear, endMonth, endDay, selectedYear, selectedMonth } = this.state;
        const dayOptions = [];
        dayOptions.push(
            <option key={-1} value=""
                className={(this.props.classes && this.props.classes.dayOptions) ? this.props.classes.dayOptions : null}
            >
                {(this.props.defaultValues && this.props.defaultValues.day) ? this.props.defaultValues.day : ''}
            </option>
        );

        let monthDays;
        if (selectedYear === startYear) {
            if (selectedMonth === startMonth) {
                monthDays = (selectedYear % 4 === 0 && selectedMonth === 1) ? daysInMonth[selectedMonth] + 1 : daysInMonth[selectedMonth];
                for (let i = startDay; i <= monthDays; i++) {
                    dayOptions.push(
                        <option key={i} value={i}
                            className={(this.props.classes && this.props.classes.dayOptions) ? this.props.classes.dayOptions : null}
                        >{i}</option>
                    );
                }
            } else {
                monthDays = (selectedYear % 4 === 0 && selectedMonth === 1) ? daysInMonth[selectedMonth] + 1 : daysInMonth[selectedMonth];
                for (let i = 1; i <= monthDays; i++) {
                    dayOptions.push(
                        <option key={i} value={i}
                            className={(this.props.classes && this.props.classes.dayOptions) ? this.props.classes.dayOptions : null}
                        >{i}</option>
                    );
                }
            }
        } else if (selectedYear === endYear) {
            if (selectedMonth === endMonth) {
                for (let i = 1; i <= endDay; i++) {
                    dayOptions.push(
                        <option key={i} value={i}
                            className={(this.props.classes && this.props.classes.dayOptions) ? this.props.classes.dayOptions : null}
                        >{i}</option>
                    );
                }
            } else {
                monthDays = (selectedYear % 4 === 0 && selectedMonth === 1) ? daysInMonth[selectedMonth] + 1 : daysInMonth[selectedMonth];
                for (let i = 1; i <= monthDays; i++) {
                    dayOptions.push(
                        <option key={i} value={i}
                            className={(this.props.classes && this.props.classes.dayOptions) ? this.props.classes.dayOptions : null}
                        >{i}</option>
                    );
                }
            }
        } else {
            if (selectedMonth) {
                monthDays = (selectedYear % 4 === 0 && selectedMonth === 1) ? daysInMonth[selectedMonth] + 1 : daysInMonth[selectedMonth];
                for (let i = 1; i <= monthDays; i++) {
                    dayOptions.push(
                        <option key={i} value={i}
                            className={(this.props.classes && this.props.classes.dayOptions) ? this.props.classes.dayOptions : null}
                        >{i}</option>
                    );
                }
            } else {
                for (let i = 1; i <= 31; i++) {
                    dayOptions.push(
                        <option key={i} value={i}
                            className={(this.props.classes && this.props.classes.dayOptions) ? this.props.classes.dayOptions : null}
                        >{i}</option>
                    );
                }
            }
        }
        return dayOptions;
    }

    handleYearChange(year) {
        year = Number.parseInt(year);
        this.setState({ selectedYear: year });
        if (this.props.onYearChange) { this.props.onYearChange(year); }
        this.handleDateChange(unit.year, year);
    }

    handleMonthChange(month) {
        month = Number.parseInt(month);
        this.setState({ selectedMonth: month });
        if (this.props.onMonthChange) { this.props.onMonthChange(monthByNumber[month]); }
        this.handleDateChange(unit.month, month);
    }

    handleDayChange(day) {
        day = Number.parseInt(day);
        this.setState({ selectedDay: day });
        if (this.props.onDayChange) { this.props.onDayChange(day); }
        this.handleDateChange(unit.day, day);
    }

    handleDateChange(type, value) {
        if (this.props.onDateChange) {
            let { selectedYear, selectedMonth, selectedDay } = this.state;
            if (type === unit.year) {
                selectedYear = value;
            } else if (type === unit.month) {
                selectedMonth = value;
            } else if (type === unit.day) {
                selectedDay = value;
            }
            if (selectedYear !== -1 && selectedMonth !== -1 && selectedDay !== -1) {
                this.props.onDateChange(new Date(selectedYear, selectedMonth, selectedDay));
            }
        }
    }

    render() {
        return (
            <div id="dropdown-date" className={(this.props.classes && this.props.classes.dateContainer) ? this.props.classes.dateContainer : null}>
                <div id="dropdown-year" className={(this.props.classes && this.props.classes.yearContainer) ? this.props.classes.yearContainer : null}>
                    <select
                        id={(this.props.ids && this.props.ids.year) ? this.props.ids.year : null}
                        name={(this.props.names && this.props.names.year) ? this.props.names.year : null}
                        className={(this.props.classes && this.props.classes.year) ? this.props.classes.year : null}
                        onChange={(e) => this.handleYearChange(e.target.value)}
                    >
                        {this.generateYearOptions()}
                    </select>
                </div>
                <div id="dropdown-month" className={(this.props.classes && this.props.classes.monthContainer) ? this.props.classes.monthContainer : null}>
                    <select
                        id={(this.props.ids && this.props.ids.month) ? this.props.ids.month : null}
                        name={(this.props.names && this.props.names.month) ? this.props.names.month : null}
                        className={(this.props.classes && this.props.classes.month) ? this.props.classes.month : null}
                        onChange={(e) => this.handleMonthChange(e.target.value)}
                    >
                        {this.generateMonthOptions()}
                    </select>
                </div>
                <div id="dropdown-day" className={(this.props.classes && this.props.classes.dayContainer) ? this.props.classes.dayContainer : null}>
                    <select
                        id={(this.props.ids && this.props.ids.day) ? this.props.ids.day : null}
                        name={(this.props.names && this.props.names.day) ? this.props.names.day : null}
                        className={(this.props.classes && this.props.classes.day) ? this.props.classes.day : null}
                        onChange={(e) => this.handleDayChange(e.target.value)}
                    >
                        {this.generateDayOptions()}
                    </select>
                </div>
            </div>
        );
    }
}

export default DropdownDate;
