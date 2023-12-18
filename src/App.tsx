import React from 'react';
import './App.css';
import DateComponent from './components/DateComponent/DateComponent';
import CardsList from './components/ToDos/CardsList/CardsList';
import { DateProvider } from './context/Date/Date';

const App: React.FC = () => {
  return (
    <DateProvider>
      <div className="app">
        <div className='header'>ToDo List</div>
        <div className='content'>
          <DateComponent />
          <CardsList />
        </div>
      </div>
    </DateProvider>
  );
}

export default App;
