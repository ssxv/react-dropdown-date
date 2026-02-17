import React, { Component } from 'react';
import { DropdownDate, DropdownComponent, YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Basic example states
      basicDate: null,
      basicSelectedDate: '2024-06-15',
      
      // Localized example states
      localizedDate: null,
      localizedSelectedDate: '2024-03-10',
      
      // Individual components states
      year: null,
      month: null,
      day: null,
      
      // Custom styled example states
      styledDate: null,
      styledSelectedDate: '2023-12-25',
      
      // Different order example states
      reorderedDate: null,
      reorderedSelectedDate: '2025-09-05',

      singleYearSelectedDate: '2024-09-05',
    };
  }

  formatDate = (date) => {
    if (!date) return '';
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  // Spanish month names
  spanishMonths = {
    0: 'Enero',
    1: 'Febrero',
    2: 'Marzo',
    3: 'Abril',
    4: 'Mayo',
    5: 'Junio',
    6: 'Julio',
    7: 'Agosto',
    8: 'Septiembre',
    9: 'Octubre',
    10: 'Noviembre',
    11: 'Diciembre'
  };

  // Portuguese month names
  portugueseMonths = {
    0: 'Janeiro',
    1: 'Fevereiro',
    2: 'Março',
    3: 'Abril',
    4: 'Maio',
    5: 'Junho',
    6: 'Julho',
    7: 'Agosto',
    8: 'Setembro',
    9: 'Outubro',
    10: 'Novembro',
    11: 'Dezembro'
  };

  render() {
    return (
      <div className="playground-container">
        <h1>React Dropdown Date - Playground</h1>
        <p>Testing React dropdown date component - Check console for detailed results</p>

        <div className="section">
          <h2>1. Basic Usage</h2>
          <DropdownDate
            startDate="2020-01-01"
            endDate="2030-12-31"
            selectedDate={this.state.basicSelectedDate}
            onDateChange={(date) => {
              console.log('Basic date changed:', date);
              this.setState({ 
                basicDate: date, 
                basicSelectedDate: this.formatDate(date) 
              });
            }}
            onYearChange={(year) => console.log('Year:', year)}
            onMonthChange={(month) => console.log('Month:', month)}
            onDayChange={(day) => console.log('Day:', day)}
          />
          <div className="result">Selected: {this.state.basicSelectedDate || 'None'}</div>
        </div>

        <div className="section">
          <h2>2. Spanish Localization</h2>
          <DropdownDate
            startDate="2023-01-01"
            endDate="2025-12-31"
            selectedDate={this.state.localizedSelectedDate}
            localizedMonths={this.spanishMonths}
            onDateChange={(date) => {
              console.log('Spanish date changed:', date);
              this.setState({ 
                localizedDate: date, 
                localizedSelectedDate: this.formatDate(date) 
              });
            }}
            onMonthChange={(month) => {
              console.log('✅ onMonthChange returns localized month:', month);
            }}
            onYearChange={(year) => console.log('Spanish year:', year)}
            onDayChange={(day) => console.log('Spanish day:', day)}
            options={{ yearReverse: true }}
          />
          <div className="result">Selected: {this.state.localizedSelectedDate || 'None'}</div>
        </div>

        <div className="section">
          <h2>3. Portuguese + Performance Test</h2>
          <DropdownDate
            startDate="2022-06-01"
            endDate="2024-08-31"
            selectedDate="2023-07-15"
            localizedMonths={this.portugueseMonths}
            options={{ monthShort: true, monthCaps: true }}
            onDateChange={(date) => console.log('Portuguese date:', date)}
            onMonthChange={(month) => {
              console.log('🚀 Performance optimized - Portuguese month:', month);
            }}
          />
        </div>

        <div className="section">
          <h2>4. Individual Components</h2>
          <div className="date-picker-container">
            <YearPicker
              defaultValue="Year"
              start={2020}
              end={2030}
              value={this.state.year}
              onChange={(year) => {
                this.setState({ year });
                console.log('Individual year:', year);
              }}
            />
            <MonthPicker
              defaultValue="Month"
              year={this.state.year}
              value={this.state.month}
              onChange={(month) => {
                this.setState({ month });
                console.log('Individual MonthPicker (Spanish):', month);
              }}
              localizedMonths={this.spanishMonths}
            />
            <DayPicker
              defaultValue="Day"
              year={this.state.year}
              month={this.state.month}
              value={this.state.day}
              onChange={(day) => {
                this.setState({ day });
                console.log('Individual day:', day);
              }}
            />
          </div>
          <div className="result">
            {this.state.year || 'Year'} | {this.state.month !== null ? this.state.month : 'Month'} | {this.state.day || 'Day'}
          </div>
        </div>

        <div className="section">
          <h2>5. Custom Styling</h2>
          <DropdownDate
            startDate="2023-01-01"
            endDate="2024-12-31"
            selectedDate={this.state.styledSelectedDate}
            classes={{
              dateContainer: 'custom-date-container',
              year: 'custom-select',
              month: 'custom-select',
              day: 'custom-select'
            }}
            onDateChange={(date) => {
              this.setState({ 
                styledDate: date, 
                styledSelectedDate: this.formatDate(date) 
              });
            }}
          />
          <div className="result">Styled: {this.state.styledSelectedDate || 'None'}</div>
        </div>

        <div className="section">
          <h2>6. Reordered Layout</h2>
          <DropdownDate
            startDate="2024-01-01"
            endDate="2026-12-31"
            selectedDate={this.state.reorderedSelectedDate}
            order={[DropdownComponent.day, DropdownComponent.month, DropdownComponent.year]}
            onDateChange={(date) => {
              this.setState({ 
                reorderedDate: date, 
                reorderedSelectedDate: this.formatDate(date) 
              });
            }}
            defaultValues={{ day: 'Day', month: 'Month', year: 'Year' }}
          />
          <div className="result">Reordered: {this.state.reorderedSelectedDate || 'None'}</div>
        </div>

        <div className="section">
          <h2>7. 🐛 Critical Bug Fix - Single Year Range</h2>
          <DropdownDate
            startDate="2024-06-15"
            endDate="2024-09-30"
            selectedDate={this.state.singleYearSelectedDate}
            localizedMonths={this.portugueseMonths}
            onDateChange={(date) => {
              console.log('Bug fix test date:', date);
              this.setState({ 
                singleYearSelectedDate: this.formatDate(date)
              });
            }}
            onMonthChange={(month) => {
              console.log('🎯 CRITICAL FIX: Single-year range with localization:', month);
              console.log('   Should be Portuguese: Junho, Julho, Agosto, Setembro');
            }}
          />
          <div className="result">
            Bug fix: Single year range (2024) with Portuguese months
          </div>
        </div>
      </div>
    );
  }
}

export default App;
