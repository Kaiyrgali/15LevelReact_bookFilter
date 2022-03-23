import React from 'react';
import { Link } from 'react-router-dom';
import FiltersPanel from '../filters-panel/filters-panel';
import './shop-header.css';

function ShopHeader() {
  return (
    <header className="shop-header row">
      <Link to="/">
        <div className="logo text-dark">BookStore</div>
      </Link>
      <FiltersPanel />
    </header>
  );
}

export default ShopHeader;
