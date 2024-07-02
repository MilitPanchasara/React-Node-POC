import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function CustomerList() {

  const [customerList, setCustomerList] = useState([]);
  const [isLoading, setLoading] = useState(false);

    return(
      <div>
<div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Customer-List</h1>
        <Link to="/portal/product/create-product" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />
          Add Customer
          </Link>      
      </div>

<div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">DataTables</h6>
        </div>      
      </div>
      <div className="card-body">
   
       <div className="table-responsive">
        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Customer Name</th>
              <th>Customer Details</th>
              <th>Email </th>
              <th>Birthdate</th>
              <th>Customer type</th>
              <th>Customer roles</th>
              <th>Customer Photo</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customerList.map((customer) => {
              return (
                <tr>
                  <td>{customer.id}</td>
                  <td>{customer.customerName}</td>
                  <td>{customer.customerDetail}</td>
                  <td>{customer.email}</td>
                  <td>{customer.birthdate}</td>
                  <td>{customer.role}</td>
                  <td>{customer.image}</td>
                  <td>{customer.status}</td>
                  <th>
                    <Link to={`/portal/user-view/${customer.id}`} className='btn btn-primary btn-sm mr-1'>View</Link>
                    <Link to={`/portal/user-edit/${customer.id}`} className='btn btn-info btn-sm mr-1'>Edit</Link>
                    <button  className='btn btn-danger btn-sm mr-1'>Delete</button>
                  </th>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
        </div>
      </div>


    )

}

export default CustomerList;