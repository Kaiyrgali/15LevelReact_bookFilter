import React from 'react';
import { connect } from 'react-redux';
import { getFilter } from '../../actions';
// import ItemStatusFilter from '../item-status-filter';

function FiltersPanel ({onFilter}) {
  // render() {
    const searchText = 'type to search';

    return (
      <div className="search-panel">
        <input
          type="text"
          className="form-control search-input"
          placeholder={searchText}
          onInput={(e) => {
            const newValue = String(e.target.value);
            console.log(newValue);
            onFilter(newValue);
          }}
        />
        {/* <ItemStatusFilter
          filter={this.props.filter}
          onFilterChange={this.props.onFilterChange}
        /> */}
      </div>
    );
  // }
}


const mapDispatchToProps = (dispatch, { bookstoreService }) => ({
  onFilter: (newValue) => {
    // console.log('onFilter', {bookstoreService});
    dispatch(getFilter(newValue));
  }
  // onDecrease: (id) => {
  //   console.log(`Decrease ${id}`);
  //   dispatch(bookRemovedFromCart(id));
  // },

  // onDelete: (id) => {
  //   console.log(`Delete ${id}`);
  //   dispatch(allBooksRemovedFromCart(id));
  // },
});

export default connect(null, mapDispatchToProps)(FiltersPanel);