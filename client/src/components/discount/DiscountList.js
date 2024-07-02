import React, { useState, useEffect } from 'react'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useFormik } from 'formik'

const DiscountList = () => {
    const [isLoading, setLoading] = useState(true);
    const [discounts, setDiscounts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [paginationObject, setPaginationObject] = useState({
        sortBy: 'discountName',
        sortByDescending: false,
        pageSize: 5,
        commonFilter: '',
        currentPage: 1
    });

    const discountFormikForm = useFormik(
        {
            initialValues: {
                discountFilter: '',
            },
            validate: (values) => {
                const errors = {};
                return errors;
            },
            onSubmit: async (values) => {
                try {
                    console.log(values)
                    setLoading(true);
                    setPaginationObject({
                        ...paginationObject,
                        commonFilter: values.discountFilter
                    });
                    const discounts = await axios.post("http://localhost:3333/discounts", { ...paginationObject, commonFilter: values.discountFilter });
                    setDiscounts(discounts.data.data);
                    setTotalCount(discounts.data.totalCount);
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                }
            }
        },
    );

    useEffect(() => {
        getDiscounts();
    }, []);

    const getDiscounts = async () => {
        try {
            const discounts = await axios.post("http://localhost:3333/discounts", paginationObject);
            setDiscounts(discounts.data.data);
            setTotalCount(discounts.data.totalCount);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Discount List</h1>
                <Link to="/portal/create-user" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                    <FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />
                    Add Discount
                </Link>
            </div>
            <div>
                <form onSubmit={discountFormikForm.handleSubmit}>
                    <input name='discountFilter' value={discountFormikForm.values.discountFilter} onChange={discountFormikForm.handleChange} type={"text"}
                        className={`form-control my-3 col-md-6 col-lg-4`} placeholder='Search here ...'/>
                </form>

            </div>
            {/* <!-- DataTables --> */}
            <div className="card shadow mb-4">
                <div className="card-header py-3 mx-0 row">
                    <h6 className="m-0 font-weight-bold text-primary col-sm-6">DataTables</h6>
                    <h6 className="m-0 font-weight-bold text-primary col-sm-6 text-sm-right">Total Records: {totalCount}</h6>
                </div>
                <div className="card-body">
                    {
                        isLoading ? <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' />
                            : <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>Discount Name</th>
                                            <th>Discount Description</th>
                                            <th>Discount Amount</th>
                                            <th>Require Coupon Code</th>
                                            <th>Coupon Code</th>
                                            <th>Valid Till</th>
                                            <th>Discount Banner</th>
                                            <th>Discount Category</th>
                                            <th>Is Active?</th>
                                            <th>Discount Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {discounts.map((discount) => {
                                            return (
                                                <tr key={discount.discountId}>
                                                    <td>{discount.discountName}</td>
                                                    <td>{discount.discountDescription}</td>
                                                    <td>{discount.discountAmount}</td>
                                                    <td>{discount.requireCouponCode}</td>
                                                    <td>{discount.couponCode}</td>
                                                    <td>{discount.validTillDate}</td>
                                                    <td>{discount.discountBannerPath}</td>
                                                    <td>{discount.discountCategoryId}</td>
                                                    <td>{discount.isActive}</td>
                                                    <td>{discount.discountTypeId}</td>
                                                    {/* <th>
                                                        <Link to={`/portal/discount-view/${discount.id}`} className='btn btn-primary btn-sm mr-1'>View</Link>
                                                        <Link to={`/portal/discount-edit/${discount.id}`} className='btn btn-info btn-sm mr-1'>Edit</Link>
                                                        <button onClick={() => handleDelete(discount.id)} className='btn btn-danger btn-sm mr-1'>Delete</button>
                                                    </th> */}
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                    }

                </div>
            </div>
        </>
    )
}

export default DiscountList