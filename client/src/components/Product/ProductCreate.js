import React,{useState} from "react";
import { useFormik } from "formik";    
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProductCreate() {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const myFormik = useFormik(
      {
        initialValues: {
          productName: "",
          productDetail: "",
          Price: "",
          category: "",
          quantity: 1
        },
        // Validating Forms while entering the data
        validate: (values) => {
          let errors = {}           //Validating the form once the error returns empty else onsubmit won't work
  
          if (!values.username) {
            errors.username = "Please enter username";
          } else if (values.username.length < 5) {
            errors.username = "Name shouldn't be less than 3 letters";
          } else if (values.username.length > 20) {
            errors.username = "Name shouldn't be more than 20 letters";
          }
  
          if (!values.email) {
            errors.email = "Please enter email";
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }
  
          if (!values.city) {
            errors.city = "Please select any one city";
          }
  
          if (!values.state) {
            errors.state = "Please select any one state";
          }
  
          if (!values.country) {
            errors.country = "Please select any one state";
          }
  
          return errors;
        },
        //one can be able to submit once the validates returns empty value (validation successful) else can't be submitted
        onSubmit: async (values) => {
          try {
            setLoading(true);
            await axios.post("https://63a9bccb7d7edb3ae616b639.mockapi.io/users", values);
            navigate("/portal/product/product-list");
          } catch (error) {
            console.log(error);
            alert("Validation failed");
            setLoading(false);
          }
  
          console.log(values);
        }
  
      });
    return (
      <div className='container'>
  
        <form onSubmit={myFormik.handleSubmit}>
          <div className='row'>
            <div className="col-lg-6">
              <label>Product Name</label>
              <input name='productName' value={myFormik.values.username} onChange={myFormik.handleChange} type={"text"}
                className={`form-control ${myFormik.errors.username ? "is-invalid" : ""} `} />
              <span style={{ color: "red" }}>{myFormik.errors.username}</span>
            </div>
  
            <div className="col-lg-6">
              <label>Product Details</label>
              <input name='productDetail' value={myFormik.values.email} onChange={myFormik.handleChange} type={"text"}
                className={`form-control ${myFormik.errors.email ? "is-invalid" : ""} `} />
              <span style={{ color: "red" }}>{myFormik.errors.email}</span>
            </div>

            <div className="col-lg-6">
              <label>SKU</label>
              <input name='sku' readOnly={true} value={myFormik.values.email} onChange={myFormik.handleChange} type={"text"}
                className={'form-control'} />              
            </div>

            <div className="col-lg-6">
              <label>Price </label>
              <input name='price' value={myFormik.values.email} onChange={myFormik.handleChange} type={"text"}
                className={`form-control ${myFormik.errors.email ? "is-invalid" : ""} `} />
              <span style={{ color: "red" }}>{myFormik.errors.email}</span>
            </div>
  
            <div className="col-lg-6">
              <label>Product Upload Image  </label>
              <input name='uploadImage' value={myFormik.values.email} onChange={myFormik.handleChange} type={"file"}
                className={`form-control ${myFormik.errors.email ? "is-invalid" : ""} `} />
              <span style={{ color: "red" }}>{myFormik.errors.email}</span>
            </div>
            <div className="col-lg-6">
              <label>Available Quantity</label>
              <input name='quantity' value={myFormik.values.email} onChange={myFormik.handleChange} type="number"
                className={`form-control ${myFormik.errors.email ? "is-invalid" : ""} `} />
            </div>
  
            <div className="col-lg-6">
              <label>Category</label>
              <select name='category' value={myFormik.values.state} onChange={myFormik.handleChange}
                className={`form-control ${myFormik.errors.state ? "is-invalid" : ""} `} >
                <option value="">----Select----</option>
                <option value="TN">Computers</option>
                <option value="KL">Electronics</option>
                <option value="MH">Apparel</option>
              </select>
              <span style={{ color: "red" }}>{myFormik.errors.state}</span>
            </div>

            <div className="col-lg-6">
              <label >Is Own Product? </label>
              <input  name="isown" type={"checkbox"}></input>
            </div>

            <div className="col-lg-6">
              <label >Available till</label>
             <input className={'form-control'} type={"date"} name="availableaDate"  ></input>
            </div>            
  
            <div className='col-lg-4 mt-3'>
              <input disabled={isLoading} type="submit" value={isLoading ? "Submitting..." : "Create"} className=' btn btn-primary' />
            </div>
          </div>
        </form>
      </div>
    );
  }

export default ProductCreate;