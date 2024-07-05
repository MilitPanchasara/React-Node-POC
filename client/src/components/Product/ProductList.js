import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { render } from '@testing-library/react'

function ProductList() {

  const [productList, setProductList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getProductList();
  }, []);


  let getProductList = async () => {
    try {
      setLoading(true);
      const customerList = await axios.get("http://localhost:3333/Product");
      setProductList(customerList.data);
      setLoading(false);
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
    return `http://localhost:3333/uploads/Uploads/${imagePath}`;
  }

  let handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure do you want to delete the data?");
      if(confirmDelete){
        await axios.delete("http://localhost:3333/Product",{params:{id:id}});
        getProductList();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Product-List</h1>
        <Link to="/portal/product/create-product" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />
          Add Product
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
                <th>Procuct Name</th>
                <th>Product Details</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Available till</th>
                <th>Product Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product) => {
                return (
                  <tr>
                    <td>{product.ProductId}</td>
                    <td>{product.ProductName}</td>
                    <td>{product.ProductDetail}</td>
                    <td>{product.SKU}</td>
                    <td>{product.Price}</td>
                    <td>{product.Quantity}</td>
                    <td>{formatDate (product.AvailableTill)}</td>
                    <td>
                      <img src={imagePath(product.ProductImageName)} height={50} width={50}>
                      </img>
                    </td>
                    <th>
                      <Link to={`/portal/product/edit-product/${product.ProductId}`} className='btn btn-primary btn-sm mr-1'>View</Link>
                      <Link to={`/portal/product/edit-product/${product.ProductId}`} className='btn btn-info btn-sm mr-1'>Edit</Link>
                      <button onClick={() => handleDelete(product.ProductId)}  className='btn btn-danger btn-sm mr-1'>Delete</button>
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

export default ProductList;