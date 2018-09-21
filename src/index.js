import React, { PropTypes } from 'react';
import { monthByNumber, numberByMonth, daysInMonth, unit } from './helper';

import { DropdownDate } from './date';
export default DropdownDate;

export class YearPicker extends React.Component {
    constructor(props) {
        super(props);
        this.renderYearOptions = this.renderYearOptions.bind(this);
    }

    renderYearOptions() {
        const startYear = this.props.start || 1900;
        const endYear = this.props.end || new Date().getFullYear();
        const years = [];
        if (startYear <= endYear) {
            for (let i = startYear; i <= endYear; ++i) { years.push(i); }
        } else {
            for (let i = endYear; i >= startYear; --i) { years.push(i); }
        }
        if (this.props.reverse) {
            years.reverse();
        }
        const yearOptions = [];
        yearOptions.push(
            <option value="" key={-1} className={this.props.optionClasses ? this.props.optionClasses : null}>
                {this.props.defaultValue ? this.props.defaultValue : ''}
            </option>
        );
        years.forEach((year, index) => {
            yearOptions.push(
                <option value={year} key={index} className={this.props.optionClasses ? this.props.optionClasses : null}>
                    {year}
                </option>
            );
        });
        return yearOptions;
    }

    render() {
        return (
            <select
                id={this.props.id ? this.props.id : null}
                className={this.props.classes ? this.props.classes : null}
                name={this.props.name ? this.props.name : null}
                required={this.props.required === true}
                disabled={this.props.disabled === true}
                onChange={(e) => this.props.onChange(e.target.value)}
                value={this.props.value}
            >{this.renderYearOptions()}
            </select>
        );
    }
}

export class MonthPicker extends React.Component {
    constructor(props) {
        super(props);
        this.renderMonthOptions = this.renderMonthOptions.bind(this);
    }

    renderMonthOptions() {
        const today = new Date();
        let months = [];
        let month = 11;
        if (!this.props.endYearGiven) {
            if (this.props.year && parseInt(this.props.year) === today.getFullYear()) {
                month = today.getMonth();
            }
        }
        if (this.props.numeric) {
            for (let i = 0; i <= month; ++i) { months.push((i + 1).toString()); }
        } else {
            for (let i = 0; i <= month; ++i) { months.push(monthByNumber[i]); }
            if (this.props.caps) {
                months = months.map((month) => { return month.toUpperCase(); });
            }
            if (this.props.short) {
                months = months.map((month) => { return month.substring(0, 3); });
            }    
        }
        const monthOptions = [];
        monthOptions.push(
            <option value="" key={-1}
                className={this.props.optionClasses ? this.props.optionClasses : null}>
                {this.props.defaultValue ? this.props.defaultValue : ''}
            </option>
        );
        months.forEach((month, index) => {
            monthOptions.push(
                <option value={index} key={index}
                    className={this.props.optionClasses ? this.props.optionClasses : null}>
                    {month}
                </option>
            );
        });
        return monthOptions;
    }

    render() {
        return (
            <select
                id={this.props.id ? this.props.id : null}
                className={this.props.classes ? this.props.classes : null}
                name={this.props.name ? this.props.name : null}
                required={this.props.required === true}
                disabled={this.props.disabled === true}
                onChange={(e) => this.props.onChange(e.target.value)}
                value={this.props.value}
            >{this.renderMonthOptions()}
            </select>
        );
    }
}

export class DayPicker extends React.Component {
    constructor(props) {
        super(props);
        this.renderDayOptions = this.renderDayOptions.bind(this);
    }

    renderDayOptions() {
        const month = (this.props.month) ? parseInt(this.props.month) : null;
        const year = (this.props.year) ? parseInt(this.props.year) : null;
        let days;
        if (month) {
            if (year && year % 4 === 0 && month === 1) {
                days = 29;
            } else {
                days = daysInMonth[month];
            }
        } else {
            days = 31;
        }
        const today = new Date();
        if (!this.props.endYearGiven) {
            if (year === today.getFullYear() && month === today.getMonth()) {
                days = today.getDate();
            }
        }
        const dayOptions = [];
        dayOptions.push(
            <option value="" key={-1}
                className={this.props.optionClasses ? this.props.optionClasses : null}>
                {this.props.defaultValue ? this.props.defaultValue : ''}
            </option>
        );
        for (let i = 1; i <= days; ++i) {
            dayOptions.push(
                <option value={i} key={i}
                    className={this.props.optionClasses ? this.props.optionClasses : null}>
                    {i}
                </option>
            );
        };
        return dayOptions;
    }

    render() {
        return (
            <select
                id={this.props.id ? this.props.id : null}
                className={this.props.classes ? this.props.classes : null}
                name={this.props.name ? this.props.name : null}
                onChange={(e) => this.props.onChange(e.target.value)}
                required={this.props.required === true}
                disabled={this.props.disabled === true}
                value={this.props.value}
            >{this.renderDayOptions()}
            </select>
        );
    }
}
