# react-dropdown-date
Highly customizable react based date picker. Select date from Day, Month and Year dropdown

## npm
```npm i react-dropdown-date```

https://www.npmjs.com/package/react-dropdown-date

## [Demo Link](https://codesandbox.io/s/react-dropdown-date-demo-gbm2k)
https://codesandbox.io/s/react-dropdown-date-demo-gbm2k


## `Date` component, with combined functionality
see further below for individual components
```
import React, { Component } from 'react';
import { DropdownDate, DropdownComponent } from 'react-dropdown-date';

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
          startDate={                       // optional, if not provided 1900-01-01 is startDate
            '2012-01-01'                    // 'yyyy-mm-dd' format only
          }
          endDate={                         // optional, if not provided current date is endDate
            '2013-12-31'                    // 'yyyy-mm-dd' format only
          }
          selectedDate={                    // optional
            this.state.selectedDate         // 'yyyy-mm-dd' format only
          }
          order={[                          // optional
            DropdownComponent.year,         // Order of the dropdowns
            DropdownComponent.day,
            DropdownComponent.month
          ]}
          onMonthChange={(month) => {       // optional
            console.log(month);
          }}
          onDayChange={(day) => {           // optional
            console.log(day);
          }}
          onYearChange={(year) => {         // optional
            console.log(year);
          }}
          onDateChange={(date) => {         // optional
            console.log(date);
            this.setState({ date: date, selectedDate: formatDate(date) });
          }}
          ids={                             // optional
            {
              year: 'select-year',
              month: 'select-month',
              day: 'select-day'
            }
          }
          names={                           // optional
            {
              year: 'year',
              month: 'month',
              day: 'day'
            }
          }
          classes={                         // optional
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
          defaultValues={                   // optional
            {
              year: 'select year',
              month: 'select month',
              day: 'select day'
            }
          }
          options={                         // optional
            {
              yearReverse: true,            // false by default
              monthShort: true,             // false by default
              monthCaps: true               // false by default
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
          start={2010}                // default is 1900
          end={2020}                  // default is current year
          reverse                     // default is ASCENDING
          required={true}             // default is false
          disabled={true}             // default is false
          value={this.state.year}     // mandatory
          onChange={(year) => {       // mandatory
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
          numeric                   // to get months as numbers
          short                     // default is full name
          caps                      // default is Titlecase
          endYearGiven              // mandatory if end={} is given in YearPicker
          year={this.state.year}    // mandatory
          required={true}           // default is false
          disabled={true}           // default is false
          value={this.state.month}  // mandatory
          onChange={(month) => {    // mandatory
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
          year={this.state.year}    // mandatory
          month={this.state.month}  // mandatory
          endYearGiven              // mandatory if end={} is given in YearPicker
          required={true}           // default is false
          disabled={true}           // default is false
          value={this.state.day}    // mandatory
          onChange={(day) => {      // mandatory
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