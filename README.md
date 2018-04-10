# dropdown-date
select date from Day, Month and Year dropdown

## npm
```npm i dropdown-date```
https://www.npmjs.com/package/dropdown-date

## usage
```
import Date from 'dropdown-date';

<Date
  startDate={'2012-02-14'}            // optional, if not provided 1900-01-01 is startDate
  endDate={'2013-02-14'}              // optional, if not provided current date is endDate
  onMonthChange={this.onMonthChange}  // optional
  onDayChange={this.onDayChange}      // optional
  onYearChange={this.onYearChange}    // optional
  onDateChange={this.onDateChange}    // optional
/>
```
startDate and endDate format is 'yyyy-mm-dd'

