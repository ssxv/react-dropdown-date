import * as React from 'react';
import { monthByNumber } from './helper';

interface IProps {
    year: number;
    value: number;
    onChange: Function;
    defaultValue?: string
    numeric?: boolean;
    short?: boolean;
    caps?: boolean;
    endYearGiven?: boolean;
    required?: boolean;
    disabled?: boolean;
    id?: string;
    name?: string;
    classes?: string;
    optionClasses?: string;
    localizedMonths?: Object;
}

interface IState {

}

export class MonthPicker extends React.Component<IProps, IState> {

    renderMonthOptions = () => {
        const { endYearGiven, year, numeric, caps, short, optionClasses, defaultValue, localizedMonths } = this.props;
        const today = new Date();
        let months = [];
        let month = 11;
        let localizedMonthOptions = (localizedMonths && Object.entries(localizedMonths).length > 0) ? localizedMonths : monthByNumber;
        if (!endYearGiven) {
            if (year && parseInt(year.toString()) === today.getFullYear()) {
                month = today.getMonth();
            }
        }
        if (numeric) {
            for (let i = 0; i <= month; ++i) {
                months.push((i + 1).toString());
            }
        } else {
            for (let i = 0; i <= month; ++i) {
                months.push(localizedMonthOptions[i]);
            }
            if (caps) {
                months = months.map((month) => { return month.toUpperCase(); });
            }
            if (short) {
                months = months.map((month) => { return month.substring(0, 3); });
            }
        }
        const monthOptions = [];
        monthOptions.push(
            <option
                value=""
                key={-1}
                className={optionClasses}
            >
                {defaultValue ? defaultValue : ''}
            </option>
        );
        months.forEach((month, index) => {
            monthOptions.push(
                <option
                    value={index}
                    key={index}
                    className={optionClasses}
                >
                    {month}
                </option>
            );
        });
        return monthOptions;
    }

    handleSelectionChange = (e: any) => this.props.onChange(e.target.value);

    render = () => {
        const { id, name, classes, required, disabled, value } = this.props;
        return (
            <select
                id={id}
                name={name}
                className={classes}
                required={required === true}
                disabled={disabled === true}
                value={value}
                onChange={this.handleSelectionChange}
            >
                {this.renderMonthOptions()}
            </select>
        );
    }
}
