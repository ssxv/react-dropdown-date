# react-dropdown-date
Highly customizable react based date picker. Select date from Day, Month and Year dropdown

## npm
```npm i react-dropdown-date```

https://www.npmjs.com/package/react-dropdown-date

## `Date` component, with combined functionality
see further below for individual components
```
import DropdownDate from 'react-dropdown-date';

<DropdownDate
  startDate={                         // optional, if not provided 1900-01-01 is startDate
    '2012-02-14'                      // 'yyyy-mm-dd' format only
  }
  endDate={                           // optional, if not provided current date is endDate
    '2013-02-14'                      // 'yyyy-mm-dd' format only
  }
  onMonthChange={this.onMonthChange}  // optional
  onDayChange={this.onDayChange}      // optional
  onYearChange={this.onYearChange}    // optional
  onDateChange={this.onDateChange}    // optional
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
