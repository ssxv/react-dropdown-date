import * as React from 'react';
import { monthByNumber, daysInMonth } from './helper';

export enum DropdownComponent {
    year = 'year',
    month = 'month',
    day = 'day',
}

interface IProps {
    startDate?: string;
    endDate?: string;
    selectedDate?: string;
    order?: DropdownComponent[];
    onMonthChange?: Function;
    onDayChange?: Function;
    onYearChange?: Function;
    onDateChange?: Function;
    ids?: {
        year?: string;
        month?: string;
        day?: string;
    };
    names?: {
        year?: string;
        month?: string;
        day?: string;
    };
    classes?: {
        dateContainer?: string;
        yearContainer?: string;
        monthContainer?: string;
        dayContainer?: string;
        year?: string;
        month?: string;
        day?: string;
        yearOptions?: string;
        monthOptions?: string;
        dayOptions?: string;
    };
    defaultValues?: {
        year?: string;
        month?: string;
        day?: string;
    };
    options?: {
        yearReverse?: boolean;
        monthShort?: boolean;
        monthCaps?: boolean;
    };
}

interface IState {
    startYear: number;
    startMonth: number;
    startDay: number;
    endYear: number;
    endMonth: number;
    endDay: number;
    selectedYear: number;
    selectedMonth: number;
    selectedDay: number;
}

export class DropdownDate extends React.Component<IProps, IState> {

    renderParts: any;

    constructor(props: IProps) {
        super(props);
        this.state = {
            startYear: 1900,
            startMonth: 0,
            startDay: 1,
            endYear: new Date().getFullYear(),
            endMonth: new Date().getMonth(),
            endDay: new Date().getDate(),
            selectedYear: -1,
            selectedMonth: -1,
            selectedDay: -1
        };
        this.renderParts = {
            year: this.renderYear,
            month: this.renderMonth,
            day: this.renderDay,
        }
    }

    componentWillMount() {
        let startYear, startMonth, startDay, endYear, endMonth, endDay, selectedYear, selectedMonth, selectedDay;
        const { startDate, endDate, selectedDate } = this.props;
        if (startDate) {
            const date = new Date(startDate);
            startYear = date.getFullYear();
            startMonth = date.getMonth();
            startDay = date.getDate();
        } else {
            startYear = 1900;
            startMonth = 0;
            startDay = 1;
        }
        if (endDate) {
            const date = new Date(endDate);
            endYear = date.getFullYear();
            endMonth = date.getMonth();
            endDay = date.getDate();
        } else {
            const date = new Date();
            endYear = date.getFullYear();
            endMonth = date.getMonth();
            endDay = date.getDate();
        }
        if (selectedDate) {
            const date = new Date(selectedDate);
            selectedYear = date.getFullYear();
            selectedMonth = date.getMonth();
            selectedDay = date.getDate();
        } else {
            selectedYear = -1;
            selectedMonth = -1;
            selectedDay = -1;
        }
        this.setState({ startYear, startMonth, startDay, endYear, endMonth, endDay, selectedYear, selectedMonth, selectedDay });
    }

    componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.selectedDate && nextProps.selectedDate !== this.props.selectedDate) {
            const date = new Date(nextProps.selectedDate);
            let selectedYear = date.getFullYear();
            let selectedMonth = date.getMonth();
            let selectedDay = date.getDate();
            this.setState({ selectedYear, selectedMonth, selectedDay });
        }
    }

    generateYearOptions() {
        const { classes, options, defaultValues } = this.props;
        const { startYear, endYear } = this.state;
        const yearOptions = [];
        yearOptions.push(
            <option
                key={-1}
                value="-1"
                className={(classes && classes.yearOptions) ? classes.yearOptions : undefined}
            >
                {(defaultValues && defaultValues.year) ? defaultValues.year : ''}
            </option>
        );
        if (options && options.yearReverse) {
            for (let i = endYear; i >= startYear; i--) {
                yearOptions.push(
                    <option key={i} value={i}
                        className={(classes && classes.yearOptions) ? classes.yearOptions : undefined}
                    >{i}</option>
                );
            }
        } else {
            for (let i = startYear; i <= endYear; i++) {
                yearOptions.push(
                    <option key={i} value={i}
                        className={(classes && classes.yearOptions) ? classes.yearOptions : undefined}
                    >{i}</option>
                );
            }
        }
        return yearOptions;
    }

    generateMonthOptions() {
        const { classes, options, defaultValues } = this.props;
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

        if (options && options.monthShort) {
            months = months.map((elem) => {
                return {
                    value: elem.value,
                    month: elem.month.substring(0, 3)
                };
            });
        }

        if (options && options.monthCaps) {
            months = months.map((elem) => {
                return {
                    value: elem.value,
                    month: elem.month.toUpperCase()
                };
            });
        }

        const monthOptions = [];
        monthOptions.push(
            <option key={-1} value="-1"
                className={(classes && classes.monthOptions) ? classes.monthOptions : undefined}
            >{(defaultValues && defaultValues.month) ? defaultValues.month : ''}
            </option>
        );
        months.forEach((elem) => {
            monthOptions.push(
                <option key={elem.value} value={elem.value}
                    className={(classes && classes.monthOptions) ? classes.monthOptions : undefined}
                >{elem.month}</option>
            );
        });

        return monthOptions;
    }

    generateDayOptions() {
        const { classes, defaultValues } = this.props;
        const { startYear, startMonth, startDay, endYear, endMonth, endDay, selectedYear, selectedMonth } = this.state;
        const dayOptions = [];
        dayOptions.push(
            <option key={-1} value="-1"
                className={(classes && classes.dayOptions) ? classes.dayOptions : undefined}
            >
                {(defaultValues && defaultValues.day) ? defaultValues.day : ''}
            </option>
        );

        let monthDays;
        if (selectedYear === startYear) {
            if (selectedMonth === startMonth) {
                monthDays = (selectedYear % 4 === 0 && selectedMonth === 1) ? daysInMonth[selectedMonth] + 1 : daysInMonth[selectedMonth];
                for (let i = startDay; i <= monthDays; i++) {
                    dayOptions.push(
                        <option key={i} value={i}
                            className={(classes && classes.dayOptions) ? classes.dayOptions : undefined}
                        >{i}</option>
                    );
                }
            } else {
                monthDays = (selectedYear % 4 === 0 && selectedMonth === 1) ? daysInMonth[selectedMonth] + 1 : daysInMonth[selectedMonth];
                for (let i = 1; i <= monthDays; i++) {
                    dayOptions.push(
                        <option key={i} value={i}
                            className={(classes && classes.dayOptions) ? classes.dayOptions : undefined}
                        >{i}</option>
                    );
                }
            }
        } else if (selectedYear === endYear) {
            if (selectedMonth === endMonth) {
                for (let i = 1; i <= endDay; i++) {
                    dayOptions.push(
                        <option key={i} value={i}
                            className={(classes && classes.dayOptions) ? classes.dayOptions : undefined}
                        >{i}</option>
                    );
                }
            } else {
                monthDays = (selectedYear % 4 === 0 && selectedMonth === 1) ? daysInMonth[selectedMonth] + 1 : daysInMonth[selectedMonth];
                for (let i = 1; i <= monthDays; i++) {
                    dayOptions.push(
                        <option key={i} value={i}
                            className={(classes && classes.dayOptions) ? classes.dayOptions : undefined}
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
                            className={(classes && classes.dayOptions) ? classes.dayOptions : undefined}
                        >{i}</option>
                    );
                }
            } else {
                for (let i = 1; i <= 31; i++) {
                    dayOptions.push(
                        <option key={i} value={i}
                            className={(classes && classes.dayOptions) ? classes.dayOptions : undefined}
                        >{i}</option>
                    );
                }
            }
        }
        return dayOptions;
    }

    handleDateChange = (type: DropdownComponent, value: number) => {
        if (this.props.onDateChange) {
            let { selectedYear, selectedMonth, selectedDay } = this.state;
            if (type === DropdownComponent.year) {
                selectedYear = value;
            } else if (type === DropdownComponent.month) {
                selectedMonth = value;
            } else if (type === DropdownComponent.day) {
                selectedDay = value;
            }
            if (selectedYear !== -1 && selectedMonth !== -1 && selectedDay !== -1) {
                this.props.onDateChange(new Date(selectedYear, selectedMonth, selectedDay));
            }
        }
    }

    handleYearChange = (e: any) => {
        const year = parseInt(e.target.value);
        this.setState({ selectedYear: year });
        if (this.props.onYearChange) { this.props.onYearChange(year); }
        this.handleDateChange(DropdownComponent.year, year);
    }

    handleMonthChange = (e: any) => {
        const month = parseInt(e.target.value);
        this.setState({ selectedMonth: month });
        if (this.props.onMonthChange) { this.props.onMonthChange(monthByNumber[month]); }
        this.handleDateChange(DropdownComponent.month, month);
    }

    handleDayChange = (e: any) => {
        const day = parseInt(e.target.value);
        this.setState({ selectedDay: day });
        if (this.props.onDayChange) { this.props.onDayChange(day); }
        this.handleDateChange(DropdownComponent.day, day);
    }

    renderYear = () => {
        const { classes, ids, names } = this.props;
        return (
            <div
                key="year"
                id="dropdown-year"
                className={(classes && classes.yearContainer) ? classes.yearContainer : undefined}
            >
                <select
                    id={(ids && ids.year) ? ids.year : undefined}
                    name={(names && names.year) ? names.year : undefined}
                    className={(classes && classes.year) ? classes.year : undefined}
                    onChange={this.handleYearChange}
                    value={this.state.selectedYear}
                >
                    {this.generateYearOptions()}
                </select>
            </div>
        )
    }

    renderMonth = () => {
        const { classes, ids, names } = this.props;
        return (
            <div
                key="month"
                id="dropdown-month"
                className={(classes && classes.monthContainer) ? classes.monthContainer : undefined}
            >
                <select
                    id={(ids && ids.month) ? ids.month : undefined}
                    name={(names && names.month) ? names.month : undefined}
                    className={(classes && classes.month) ? classes.month : undefined}
                    onChange={this.handleMonthChange}
                    value={this.state.selectedMonth}
                >
                    {this.generateMonthOptions()}
                </select>
            </div>
        )
    }

    renderDay = () => {
        const { classes, ids, names } = this.props;
        return (
            <div
                key="day"
                id="dropdown-day"
                className={(classes && classes.dayContainer) ? classes.dayContainer : undefined}
            >
                <select
                    id={(ids && ids.day) ? ids.day : undefined}
                    name={(names && names.day) ? names.day : undefined}
                    className={(classes && classes.day) ? classes.day : undefined}
                    onChange={this.handleDayChange}
                    value={this.state.selectedDay}
                >
                    {this.generateDayOptions()}
                </select>
            </div>
        )
    }

    render = () => {
        const { classes } = this.props;
        let { order } = this.props;
        order = order || [DropdownComponent.year, DropdownComponent.month, DropdownComponent.day];
        return (
            <div
                id="dropdown-date"
                className={(classes && classes.dateContainer) ? classes.dateContainer : undefined}>
                {order.map(part => {
                    return this.renderParts[part]()
                })}
            </div>
        );
    }
}
