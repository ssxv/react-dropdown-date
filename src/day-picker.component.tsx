import * as React from 'react';
import { getDaysInMonth } from './helper';

interface IProps {
    year: number;
    month: number;
    value: number;
    onChange: Function;
    id?: string;
    name?: string;
    defaultValue?: string;
    endYearGiven?: boolean;
    required?: boolean;
    disabled?: boolean;
    classes?: string;
    optionClasses?: string;
}

interface IState {

}

export class DayPicker extends React.Component<IProps, IState> {

    renderDayOptions = () => {
        const { month, year, endYearGiven, optionClasses, defaultValue } = this.props;

        let days = month ? getDaysInMonth(year, month) : 31;

        const today = new Date();
        if (!endYearGiven) {
            if (year === today.getFullYear() && month === today.getMonth()) {
                days = today.getDate();
            }
        }
        const dayOptions = [];
        dayOptions.push(
            <option
                value=""
                key={-1}
                className={optionClasses}
            >
                {defaultValue ? defaultValue : ''}
            </option>
        );
        for (let i = 1; i <= days; ++i) {
            dayOptions.push(
                <option
                    value={i}
                    key={i}
                    className={optionClasses}
                >
                    {i}
                </option>
            );
        };
        return dayOptions;
    }

    handleSelectionChange = (e: any) => this.props.onChange(e.target.value);

    render = () => {
        const { id, name, classes, required, disabled, value } = this.props;
        return (
            <select
                id={id}
                name={name}
                className={classes}
                onChange={this.handleSelectionChange}
                required={required === true}
                disabled={disabled === true}
                value={value}
            >
                {this.renderDayOptions()}
            </select>
        );
    }
}
