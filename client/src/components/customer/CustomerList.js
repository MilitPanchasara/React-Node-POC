import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
//  import * from '../../../public/storage/UploadCustomerPhoto'

function CustomerList() {

  const [customerList, setCustomerList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getCustomerList();
  }, []);


  let getCustomerList = async () => {
    try {
      const customerList = await axios.get("http://localhost:3333/Customer");
      setCustomerList(customerList.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  let handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure do you want to delete the data?");
      if(confirmDelete){
        await axios.delete("http://localhost:3333/Customer",{params:{id:id}});
        getCustomerList();
      }
    } catch (error) {
      console.log(error);
    }
  }

  
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const imagePath = (imagePath) => {
  // return `/storage/UploadCustomerPhoto/${imagePath}`;
  return `http://localhost:3333/uploads/UploadCustomerPhoto/${imagePath}`;
}
  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Customer-List</h1>
        <Link to="create-customer" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
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
                    <td>{customer.customerId}</td>
                    <td>{customer.customerName}</td>
                    <td>{customer.customerDetails}</td>
                    <td>{customer.email}</td>
                    <td>{formatDate(customer.birthDate)}</td>
                    <td>{customer.CustomerType.Value}</td>
                    <td>{customer.CustomerRole.Value}</td>
                    <td>
                      <img src={imagePath(customer.customerPhotoPath)} height={50} width={50}>
                      </img>
                    </td>
                    <td>{customer.StatusId}</td>
                    <th>
                      <Link to={`/portal/customer-edit/${customer.customerId}`} className='btn btn-primary btn-sm mr-1'>View</Link>
                      <Link to={`/portal/customer-edit/${customer.customerId}`} className='btn btn-info btn-sm mr-1'>Edit</Link>
                      <button className='btn btn-danger btn-sm mr-1' onClick={() => handleDelete(customer.customerId)} >Delete</button>
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