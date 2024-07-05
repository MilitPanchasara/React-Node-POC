import React, { useState } from "react";
import { Formik, useFormik } from "formik";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProductCreate() {
  const [isLoading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setImageFile(event.currentTarget.files[0]);
  };

  const myFormik = useFormik(
    {
      initialValues: {
        productName: "",
        productDetail: "",
        price: "",
        quantity: "",
        productCategoryId: "",
        isOwnProduct: 0,
        availableTill: ""
      },
      // Validating Forms while entering the data
      validate: (values) => {
        let errors = {}           //Validating the form once the error returns empty else onsubmit won't work

        if (!values.productName) {
          errors.productName = "Please enter productName";
        } else if (values.productName.length < 4) {
          errors.productName = "productName shouldn't be less than 4 letters";
        } else if (values.productName.length > 50) {
          errors.productName = "productName shouldn't be more than 50 letters";
        }

        if (!values.productDetail) {
          errors.productDetail = "Please enter productDetail";
        } else if (values.productDetail.length < 50) {
          errors.productDetail = "productDetail shouldn't be less than 50 letters";
        } else if (values.productDetail.length > 200) {
          errors.productDetail = "productDetail shouldn't be more than 200 letters";
        }

        if (!values.price) {
          errors.price = "Please enter price";
        } else if (!/^\d+(\.\d+)?$/.test(values.price)) {
          errors.price = 'Invalid price format Please enter a valid decimal number.';
        }

        if (!values.availableTill) {
          errors.availableTill = "Please enter Date";
        }
        if (!values.productCategoryId) {
          errors.productCategoryId = "Please select productCategory";
        }
        if (!values.quantity) {
          errors.quantity = "Please enter quantity";
        }
        if (values.isOwnProduct == null) {
          errors.isOwnProduct = "Please enter isOwnProduct";
        }

        return errors;
      },
      //one can be able to submit once the validates returns empty value (validation successful) else can't be submitted
      onSubmit: async (values) => {
        console.log(values);
        try {
          setLoading(true);
          const formData = new FormData();
          if (imageFile) {
            formData.append('productImage', imageFile);
          }
          for (const key in values) {
            if (values.hasOwnProperty(key)) {
              formData.append(key, values[key])
            }
          }
          await axios.post("http://localhost:3333/Product", formData).then(() => {
            navigate("/portal/product/product-list");
          });
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
      <Formik></Formik>
      <form onSubmit={myFormik.handleSubmit}>
        <div className='row'>
          <div className="col-lg-6">
            <label>Product Name</label>
            <input name='productName' value={myFormik.values.productName} onChange={myFormik.handleChange} type={"text"}
              className={`form-control ${myFormik.touched.productName && myFormik.errors.productName ? "is-invalid" : ""} `} />
            <span style={{ color: "red" }}>{myFormik.touched.productName && myFormik.errors.productName}</span>
          </div>
          <div className="col-lg-6">
            <label>Product Details</label>
            <textarea name='productDetail' value={myFormik.values.productDetail} onChange={myFormik.handleChange} type={"text"}
              className={`form-control ${myFormik.touched.productDetail && myFormik.errors.productDetail ? "is-invalid" : ""} `} />
            <span style={{ color: "red" }}>{myFormik.touched.productDetail && myFormik.errors.productDetail}</span>
          </div>

          <div className="col-lg-6 mt-3">
            <label>Price</label>
            <input name='price' value={myFormik.values.price} onChange={myFormik.handleChange} type={"mail"}
              className={`form-control ${myFormik.touched.price && myFormik.errors.price ? "is-invalid" : ""} `} />
            <span style={{ color: "red" }}>{myFormik.touched.price && myFormik.errors.price}</span>
          </div>

          <div className='col-lg-4 mt-3'>
            <label>Available till</label>
            <input name='availableTill' value={myFormik.touched.availableTill && myFormik.values.availableTill} onChange={myFormik.handleChange} type={"date"}
              className={`form-control ${myFormik.touched.availableTill && myFormik.errors.availableTill ? "is-invalid" : ""} `} />
          </div>

          {/* <div className="col-lg-6">
                <label>Upload Customer Image</label>
                <input name='uploadImage' value={myFormik.values.} onChange={myFormik.handleChange} type={"file"}
                  className={`form-control ${myFormik.errors.email ? "is-invalid" : ""} `} />
                <span style={{ color: "red" }}>{myFormik.errors.email}</span>
                
              </div> */}

          <div className='col-lg-6 mt-3'>
            <label>Category</label>
            <select name='productCategoryId' value={myFormik.values.productCategoryId} onChange={myFormik.handleChange}
              className={`form-control ${myFormik.touched.productCategoryId && myFormik.errors.productCategoryId ? "is-invalid" : ""} `} >
              <option value="">----Select----</option>
              <option value="1">Computers</option>
              <option value="2">Electronics</option>
              <option value="3">Apparel</option>
            </select>
            <span style={{ color: "red" }}>{myFormik.touched.productCategoryId && myFormik.errors.productCategoryId}</span>
          </div>

          <div className='col-lg-6 form-check mt-3'>
            <label>Available Quantity</label>
            <input name='quantity' value={myFormik.values.quantity} onChange={myFormik.handleChange} type={"mail"}
              className={`form-control ${myFormik.touched.quantity && myFormik.errors.quantity ? "is-invalid" : ""} `} />
            <span style={{ color: "red" }}>{myFormik.touched.quantity && myFormik.errors.quantity}</span>
          </div>

          <div className="col-lg-6 form-check mt-3">
            <div className='row'>
              <input className="form-check-input" name='isOwnProduct' checked={myFormik.values.isOwnProduct} onChange={myFormik.handleChange} type="checkbox" id="flexCheckChecked" />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Is Own Product?
              </label>
              <span style={{ color: "red" }}>{myFormik.errors.isOwnProduct}</span>
            </div>
          </div>

          <div className='col-lg-6 mt-3'>
            <label>Upload Product Image</label>
            <input
              name='customerImage'
              type="file"
              onChange={handleFileChange}
              className='form-control'
            />
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