# dropdown-date
Highly customizable date picker. Select date from Day, Month and Year dropdown

## npm
```npm i dropdown-date```

https://www.npmjs.com/package/dropdown-date

## usage
```
import Date from 'dropdown-date';

<Date
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

