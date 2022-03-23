import React from 'react';
import { connect } from 'react-redux';
import { getFilter, getRaiting, getPrice } from '../../actions';
// import ItemStatusFilter from '../item-status-filter';

function FiltersPanel ({onFilter, onRaiting, onPrice}) {
  // render() {
    const searchText = 'type to search';
    const searchPrice = 'maximum price';

    return (
      <div className="search-panel">
        <span> Фильтр по автору или описанию: </span>
        <input
          type="text"
          className="form-control search-input"
          placeholder={searchText}
          onInput={(e) => {
            // const newValue = String(e.target.value);
            // console.log(newValue);
            onFilter(e.target.value);
          }}
        />
        {/* <span> Фильтр по рейтингу: </span> */}
        <select onChange={(e)=>onRaiting(e.target.value)}>
          <option value = '1'>1 and more</option>
           {/* вывести в отдельные компоненты */}
          <option value = '2'>2 and more</option>
          <option value = '3'>3 and more</option>
          <option value = '4'>4 and more</option>
          <option value = '5'>only 5</option>
        </select>
        
        <input
          type="number"
          min="0"
          max="1000"
          step="10"
          className="form-control search-input"
          placeholder={searchPrice}
          onInput={(e) => onPrice(e.target.value)}
        />
        </div>
        
    );
  // }
}


const mapDispatchToProps = (dispatch, { bookstoreService }) => ({
  onFilter: (newValue) => dispatch(getFilter(newValue)),
  onRaiting: (newValue) => dispatch(getRaiting(newValue)),
  onPrice: (newValue) => dispatch(getPrice(newValue))
});

export default connect(null, mapDispatchToProps)(FiltersPanel);