import React, { useState, useEffect } from 'react';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import { Customer } from './types';
import './App.css';

const generateFakeCustomers = (num: number): Customer[] => {
  return Array.from({ length: num }, (_, index) => ({
    id: index + 1,
    name: `Customer ${index + 1}`,
    email: `customer${index + 1}@example.com`,
    address: {
      suite:'',
      street: `123 Fake St ${index + 1}`,
      city: `City ${index + 1}`,
      zipcode: `12345-${index + 1}`
    },
    company: {
      name: `Company ${index + 1}`,
      catchPhrase: `CatchPhrase ${index + 1}`
    }
  }));
};

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchCustomers = () => {
      // Generate 1000 fake customers
      const fakeCustomers = generateFakeCustomers(1000);
      setCustomers(fakeCustomers);
    };

    fetchCustomers();
  }, []);

  return (
    <div className="app">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <CustomerList 
              customers={customers}
              onSelectCustomer={setSelectedCustomer}
              selectedCustomerId={selectedCustomer?.id}
            />
          </div>
          <div className="col-md-8">
            <CustomerDetails customer={selectedCustomer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
