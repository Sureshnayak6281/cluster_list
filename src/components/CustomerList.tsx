import React from 'react';
import { Customer } from '../types';

interface Props {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
  selectedCustomerId: number | undefined;
}

const CustomerList: React.FC<Props> = ({ customers, onSelectCustomer, selectedCustomerId }) => {
  return (
    <div className="customer-list">
      <h2 className="mb-4 d-flex justify-content-left mt-4">Customers</h2>
      <div className="list-group d-flex justify-content-center">
        {customers.map(customer => (
          <button
            key={customer.id}
            className={`list-group-item list-group-item-action ${customer.id === selectedCustomerId ? 'selected' : ''}`}
            onClick={() => onSelectCustomer(customer)}
          >
            <h5 className="mb-2">{customer.name}</h5>
            <small>{customer.company.catchPhrase}</small>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomerList;
