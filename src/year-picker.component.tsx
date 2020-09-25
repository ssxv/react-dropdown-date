import * as React from 'react';

interface IProps {
    value: number;
    onChange: Function;
    id?: string;
    name?: string;
    defaultValue?: string;
    start?: number;
    end?: number;
    reverse?: boolean;
    required?: boolean;
    disabled?: boolean;
    classes?: string;
    optionClasses?: string;
}

interface IState {

}

export class YearPicker extends React.Component<IProps, IState> {

    renderYearOptions = () => {
        const { start, end, reverse, optionClasses, defaultValue } = this.props;
        const startYear = start || 1900;
        const endYear = end || new Date().getFullYear();

        const years = [];
        if (startYear <= endYear) {
            for (let i = startYear; i <= endYear; ++i) {
                years.push(i);
            }
        } else {
            for (let i = endYear; i >= startYear; --i) {
                years.push(i);
            }
        }
        if (reverse) {
            years.reverse();
        }
        const yearOptions = [];
        yearOptions.push(
            <option
                value=""
                key={-1}
                className={optionClasses}
            >
                {defaultValue ? defaultValue : ''}
            </option>
        );
        years.forEach((year, index) => {
            yearOptions.push(
                <option
                    value={year}
                    key={index}
                    className={optionClasses}
                >
                    {year}
                </option>
            );
        });
        return yearOptions;
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
                onChange={this.handleSelectionChange}
                value={value}
            >
                {this.renderYearOptions()}
            </select>
        );
    }
}
