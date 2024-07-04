import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { json, useNavigate, useParams } from 'react-router-dom'

function CustomerEdit() {
    const params = useParams();
    const [isLoading, setLoading] = useState(false);
    const [customerData, setCustomerData] = useState({});
    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getUserData()
    }, [])

    const handleFileChange = (event) => {
        setImageFile(event.currentTarget.files[0]);
    };

    let getUserData = async () => {
        try {
            const customerDetail = await axios.get(`http://localhost:3333/getCustomerById`, { params: { id: params.id } });
            const date = new Date(customerDetail.data.birthDate);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
            const year = date.getFullYear();
            customerDetail.data.birthDate = `${year}-${month}-${day}`;
            setCustomerData(customerDetail.data);
            const customerFormDetail = {
                customerName: customerDetail.data.customerName,
                customerDetails: customerDetail.data.customerDetails,
                contactNumber: customerDetail.data.contactNumber,
                email: customerDetail.data.email,
                birthDate: customerDetail.data.birthDate,
                customerTypeId: customerDetail.data.customerTypeId,
                customerRoleId: customerDetail.data.customerRoleId,
                isActive: customerDetail.data.isActive
            }
            myFormik.setValues(customerFormDetail);
            console.log(myFormik.values);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    const imagePath = (imagePath) => {
        // return `/storage/UploadCustomerPhoto/${imagePath}`;
        return `http://localhost:3333/uploads/UploadCustomerPhoto/${imagePath}`;
    }


    const myFormik = useFormik(
        {
            initialValues: {
                customerName: "",
                customerDetails: "",
                contactNumber: "",
                email: "",
                birthDate: "",
                customerTypeId: 0,
                customerRoleId: "",
                isActive: null
            },
            // Validating Forms while entering the data
            validate: (values) => {
                let errors = {}           //Validating the form once the error returns empty else onsubmit won't work

                if (!values.customerName) {
                    errors.customerName = "Please enter customerName";
                } else if (values.customerName.length < 4) {
                    errors.customerName = "customerName shouldn't be less than 4 letters";
                } else if (values.customerName.length > 50) {
                    errors.customerName = "customerName shouldn't be more than 50 letters";
                }

                if (!values.customerDetails) {
                    errors.customerDetails = "Please enter customerDetails";
                } else if (values.customerDetails.length < 50) {
                    errors.customerDetails = "customerDetails shouldn't be less than 50 letters";
                } else if (values.customerDetails.length > 200) {
                    errors.customerDetails = "customerDetails shouldn't be more than 200 letters";
                }

                if (!values.email) {
                    errors.email = "Please enter email";
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                }

                if (!values.birthDate) {
                    errors.birthDate = "Please enter birthDate";
                }
                if (!values.customerTypeId) {
                    errors.customerTypeId = "Please enter customerTypeId";
                }
                if (!values.customerRoleId) {
                    errors.customerRoleId = "Please enter customerRoleId";
                }
                if (values.isActive == null) {
                    errors.isActive = "Please enter Status";
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
                        formData.append('customerImage', imageFile);
                    }else{
                        formData.append('customerImage', null);
                    }
                    for (const key in values) {
                        if (values.hasOwnProperty(key)) {
                            formData.append(key, values[key])
                        }
                    }
                    console.log(formData);
                    await axios.put("http://localhost:3333/Customer", formData, { params: { id: params.id }, headers: { 'Content-Type': 'multipart/form-data' } }).then(() => {
                        navigate("/portal/customer-list");
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
        <>
            <h3>UserEdit - Id : {params.id} </h3>
            <div className='container'>
                <form onSubmit={myFormik.handleSubmit}>
                    <div className='row'>
                        <div className="col-lg-6">
                            <label>Customer Name</label>
                            <input name='customerName' value={myFormik.values.customerName} onChange={myFormik.handleChange} type={"text"}
                                className={`form-control ${myFormik.errors.customerName ? "is-invalid" : ""} `} />
                            <span style={{ color: "red" }}>{myFormik.errors.customerName}</span>
                        </div>
                        <div className="col-lg-6">
                            <label>Customer Details</label>
                            <textarea name='customerDetails' value={myFormik.values.customerDetails} onChange={myFormik.handleChange} type={"text"}
                                className={`form-control ${myFormik.errors.customerDetails ? "is-invalid" : ""} `} />
                            <span style={{ color: "red" }}>{myFormik.errors.customerDetails}</span>
                        </div>

                        <div className="col-lg-6 mt-3">
                            <label>E-Mail</label>
                            <input name='email' value={myFormik.values.email} onChange={myFormik.handleChange} type={"mail"}
                                className={`form-control ${myFormik.errors.email ? "is-invalid" : ""} `} />
                            <span style={{ color: "red" }}>{myFormik.errors.email}</span>
                        </div>

                        <div className='col-lg-4 mt-3'>
                            <label>birthDate</label>
                            <input name='birthDate' value={myFormik.values.birthDate} onChange={myFormik.handleChange} type={"date"}
                                className={`form-control ${myFormik.errors.birthDate ? "is-invalid" : ""} `} />
                        </div>

                        <div className='col-lg-6 mt-3'>
                            <label>Customer Role</label>
                            <select name='customerRoleId' value={myFormik.values.customerRoleId} onChange={myFormik.handleChange}
                                className={`form-control ${myFormik.errors.customerRoleId ? "is-invalid" : ""} `} >
                                <option value="">----Select----</option>
                                <option value="22">Admin</option>
                                <option value="23">Guest</option>
                                <option value="24">Registered</option>
                            </select>
                            <span style={{ color: "red" }}>{myFormik.errors.customerRoleId}</span>
                        </div>

                        <div className='col-lg-6 form-check mt-3'>
                            <label>Customer Type</label>
                            <div className='row'>
                                <div className='form-check'>
                                    <input className="form-check-input" type="radio" name="customerTypeId" value={20} checked={parseInt(myFormik.values.customerTypeId, 10) === 20} id="onlinecustomers" onChange={myFormik.handleChange}></input>
                                    <label className="form-check-label" htmlFor="onlinecustomers">
                                        online customer
                                    </label>
                                </div>
                                <div className='form-check'>
                                    <input className="form-check-input" type="radio" name="customerTypeId" value={21} checked={parseInt(myFormik.values.customerTypeId, 10) === 21} id="offlinecustomers" onChange={myFormik.handleChange}></input>
                                    <label className="form-check-label" htmlFor="offlinecustomers">
                                        Offline customer
                                    </label>
                                </div>
                                <span style={{ color: "red" }}>{myFormik.errors.customerTypeId}</span>
                            </div>
                        </div>

                        <div className="col-lg-6 form-check mt-3">
                            <label>Active Status</label>
                            <div className='row'>
                                <input className="form-check-input" name='isActive' checked={myFormik.values.isActive} onChange={myFormik.handleChange} type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    is Customer Active ?
                                </label>
                                <span style={{ color: "red" }}>{myFormik.errors.isActive}</span>
                            </div>
                        </div>

                        <div className='col-lg-6 mt-3'>
                            <label>Upload Customer Image</label>
                            <input
                                name='customerImage'
                                type="file"
                                onChange={handleFileChange}
                                className='form-control'
                            />
                            <img src={imagePath(customerData.customerPhotoPath)} height={50} width={50} className='mt-3'>
                            </img>
                        </div>


                        <div className='col-lg-4 mt-3'>
                            <input disabled={isLoading} type="submit" value={isLoading ? "Submitting..." : "Edit"} className=' btn btn-primary' />
                        </div>
                    </div>
                </form>
                {/* {JSON.stringify(myFormik.values)} */}
            </div>
        </>


    )
}

export default CustomerEdit