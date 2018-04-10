import React from 'react';
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
            <option key={-1} value=""></option>
        );
        for (let i = startYear; i <= endYear; i++) {
            yearOptions.push(
                <option key={i} value={i}>{i}</option>
            );
        }
        return yearOptions;
    }

    generateMonthOptions() {
        const { startMonth, endMonth, startYear, endYear, selectedYear } = this.state;
        const monthOptions = [];
        monthOptions.push(
            <option key={-1} value=""></option>
        );
        if (selectedYear === startYear) {
            for (let i = startMonth; i <= 11; i++) {
                monthOptions.push(
                    <option key={i} value={i}>{monthByNumber[i]}</option>
                );
            }
        } else if (selectedYear === endYear) {
            for (let i = 0; i <= endMonth; i++) {
                monthOptions.push(
                    <option key={i} value={i}>{monthByNumber[i]}</option>
                );
            }
        } else {
            for (let i = 0; i <= 11; i++) {
                monthOptions.push(
                    <option key={i} value={i}>{monthByNumber[i]}</option>
                );
            }
        }
        return monthOptions;
    }

    generateDayOptions() {
        const { startYear, startMonth, startDay, endYear, endMonth, endDay, selectedYear, selectedMonth } = this.state;
        const dayOptions = [];
        dayOptions.push(
            <option key={-1} value=""></option>
        );
        if (selectedYear === startYear) {
            if (selectedMonth === startMonth) {
                for (let i = startDay; i <= daysInMonth[selectedMonth]; i++) {
                    dayOptions.push(
                        <option key={i} value={i}>{i}</option>
                    );
                }
            } else {
                for (let i = 1; i <= daysInMonth[selectedMonth]; i++) {
                    dayOptions.push(
                        <option key={i} value={i}>{i}</option>
                    );
                }
            }
        } else if (selectedYear === endYear) {
            if (selectedMonth === endMonth) {
                for (let i = 1; i <= endDay; i++) {
                    dayOptions.push(
                        <option key={i} value={i}>{i}</option>
                    );
                }
            } else {
                for (let i = 1; i <= daysInMonth[selectedMonth]; i++) {
                    dayOptions.push(
                        <option key={i} value={i}>{i}</option>
                    );
                }
            }
        } else {
            if (selectedMonth) {
                for (let i = 1; i <= daysInMonth[selectedMonth]; i++) {
                    dayOptions.push(
                        <option key={i} value={i}>{i}</option>
                    );
                }
            } else {
                for (let i = 1; i <= 31; i++) {
                    dayOptions.push(
                        <option key={i} value={i}>{i}</option>
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
            <div id="dropdown-date">
                <div id="dropdown-year">
                    <select id="select-year" onChange={(e) => this.handleYearChange(e.target.value)}>
                        {this.generateYearOptions()}
                    </select>
                </div>
                <div id="dropdown-month">
                    <select id="select-month" onChange={(e) => this.handleMonthChange(e.target.value)}>
                        {this.generateMonthOptions()}
                    </select>
                </div>
                <div id="dropdown-day">
                    <select id="select-day" onChange={(e) => this.handleDayChange(e.target.value)}>
                        {this.generateDayOptions()}
                    </select>
                </div>
            </div>
        );
    }
}

export default DropdownDate;
