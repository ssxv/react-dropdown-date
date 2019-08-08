# react-dropdown-date
Highly customizable react based date picker. Select date from Day, Month and Year dropdown

## npm
```npm i react-dropdown-date```

https://www.npmjs.com/package/react-dropdown-date

## `Date` component, with combined functionality
see further below for individual components
```
import React, { Component } from 'react';
import DropdownDate from 'react-dropdown-date';

const formatDate = (date) => {	// formats a JS date to 'yyyy-mm-dd'
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { date: null, selectedDate: '2012-11-15' };
    }

    render() {
        return (
            <div>

                <DropdownDate
                    startDate={                         // optional, if not provided 1900-01-01 is startDate
                        '2012-01-01'                    // 'yyyy-mm-dd' format only
                    }
                    endDate={                           // optional, if not provided current date is endDate
                        '2013-12-31'                    // 'yyyy-mm-dd' format only
                    }
                    selectedDate={                      // optional
                        this.state.selectedDate         // 'yyyy-mm-dd' format only
                    }
                    order={                             // optional
                        ['year', 'month', 'day']        // Order of the dropdowns
                    }
                    onMonthChange={(month) => {         // optional
                        console.log(month);
                    }}
                    onDayChange={(day) => {             // optional
                        console.log(day);
                    }}
                    onYearChange={(year) => {           // optional
                        console.log(year);
                    }}
                    onDateChange={(date) => {           // optional
                        console.log(date);
                        this.setState({ date: date, selectedDate: formatDate(date) });
                    }}
                    ids={                               // optional
                        {
                            year: 'select-year',
                            month: 'select-month',
                            day: 'select-day'
                        }
                    }
                    names={                             // optional
                        {
                            year: 'year',
                            month: 'month',
                            day: 'day'
                        }
                    }
                    classes={                           // optional
                        {
                            dateContainer: 'classes',
                            yearContainer: 'classes',
                            monthContainer: 'classes',
                            dayContainer: 'classes',
                            year: 'classes classes',
                            month: 'classes classes',
                            day: 'classes classes',
                            yearOptions: 'classes',
                            monthOptions: 'classes',
                            dayOptions: 'classes'
                        }
                    }
                    defaultValues={                     // optional
                        {
                            year: 'select year',
                            month: 'select month',
                            day: 'select day'
                        }
                    }
                    options={                           // optional
                        {
                            yearReverse: true,              // false by default
                            monthShort: true,               // false by default
                            monthCaps: true                 // false by default
                        }
                    }
                />
            </div>
        );
    }
}

export default App;
```
#### HTML Reference for classes
```
<!-- dateContainer -->
<div class="classes">

    <!-- yearContainer -->
   <div class="classes">

      <!-- year -->
      <select class="classes classes">
         <option value="" class="classes">select year</option>
      </select>
   </div>

   <!-- monthContainer -->
   <div class="classes">

      <!-- month -->
      <select class="classes classes">
         <option value="" class="classes">select month</option>
      </select>
   </div>

   <!-- dayContainer -->
   <div class="classes">

      <!-- day -->
      <select class="classes classes">
         <option value="" class="classes">select day</option>
      </select>
   </div>
</div>
```


## Individual Components: `YearPicker`, `MonthPicker`, `DayPicker`

```
import React, { Component } from 'react';

import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { year: null, month: null, day: null };
	}

	render() {
		return (
			<div>
				<YearPicker
					defaultValue={'select year'}
					// default is 1900
					start={2010}
					// default is current year
					end={2020}
					// default is ASCENDING
					reverse
					// default is false
					required={true}
					// default is false
					disabled={true}
					// mandatory
					value={this.state.year}
					// mandatory
					onChange={(year) => {
						this.setState({ year });
						console.log(year);
					}}
					id={'year'}
					name={'year'}
					classes={'classes'}
					optionClasses={'option classes'}
				/>
				<MonthPicker
					defaultValue={'select month'}
					// to get months as numbers
					numeric
					// default is full name
					short
					// default is Titlecase
					caps
					// mandatory if end={} is given in YearPicker
					endYearGiven
					// mandatory
					year={this.state.year}
					// default is false
					required={true}
					// default is false
					disabled={true}
					// mandatory
					value={this.state.month}
					// mandatory
					onChange={(month) => {
						this.setState({ month });
						console.log(month);
					}}
					id={'month'}
					name={'month'}
					classes={'classes'}
					optionClasses={'option classes'}
				/>
				<DayPicker
					defaultValue={'select day'}
					// mandatory
					year={this.state.year}
					// mandatory
					month={this.state.month}
					// mandatory if end={} is given in YearPicker
					endYearGiven
					// default is false
					required={true}
					// default is false
					disabled={true}
					// mandatory
					value={this.state.day}
					// mandatory
					onChange={(day) => {
						this.setState({ day });
						console.log(day);
					}}
					id={'day'}
					name={'day'}
					classes={'classes'}
					optionClasses={'option classes'}
				/>
			</div>
		);
	}
}

export default App;
```
