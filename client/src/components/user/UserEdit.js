import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function UserEdit() {
    const params = useParams();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        getUserData()
    }, [])

    let getUserData = async () => {
        try {
            const user = await axios.get(`http://localhost:3333/getUserById`,{params:{id:params.id}});
            myFormik.setValues(user.data);
            console.log(myFormik.values);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const myFormik = useFormik({
        initialValues: {
            FirstName: "",
            LastName:"",
            Email: "",
            RoleName:""
        },
        // Validating Forms while entering the data
        validate: (values) => {
            let errors = {}           //Validating the form once the error returns empty else onsubmit won't work

            if (!values.username) {
                errors.username = "Please enter username";
            } else if (values.username.length < 5) {
                errors.username = "Name shouldn't be less than 3 letters";
            } else if (values.username.length > 25) {
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

        onSubmit: async (values) => {
            try {
                setLoading(true);
                await axios.put(`https://63a9bccb7d7edb3ae616b639.mockapi.io/users/${params.id}`, values);
                setLoading(false);
                navigate("/portal/user-list")
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    })
    return (
        <>
            <h3>UserEdit - Id : {params.id} </h3>
            <div className='container'>
                <form onSubmit={myFormik.handleSubmit}>
                    <div className='row'>
                        <div className="col-lg-6">
                            <label>First Name</label>
                            <input name='username' value={myFormik.values.FirstName} onChange={myFormik.handleChange} type={"text"}
                                className={`form-control ${myFormik.errors.FirstName ? "is-invalid" : ""} `} />
                            <span style={{ color: "red" }}>{myFormik.errors.FirstName}</span>
                        </div>
                        <div className="col-lg-6">
                            <label>Last Name</label>
                            <input name='username' value={myFormik.values.LastName} onChange={myFormik.handleChange} type={"text"}
                                className={`form-control ${myFormik.errors.LastName ? "is-invalid" : ""} `} />
                            <span style={{ color: "red" }}>{myFormik.errors.LastName}</span>
                        </div>
                        <div className="col-lg-6">
                            <label>E-Mail</label>
                            <input name='email' value={myFormik.values.Email} onChange={myFormik.handleChange} type={"mail"}
                                className={`form-control ${myFormik.errors.Email ? "is-invalid" : ""} `} />
                            <span style={{ color: "red" }}>{myFormik.errors.Email}</span>
                        </div>
                        <div className="col-lg-6">
                            <label>E-Mail</label>
                            <input name='email' value={myFormik.values.Email} onChange={myFormik.handleChange} type={"mail"}
                                className={`form-control ${myFormik.errors.Email ? "is-invalid" : ""} `} />
                            <span style={{ color: "red" }}>{myFormik.errors.Email}</span>
                        </div>

                        <div className='col-lg-4 mt-3'>
                            <input disabled={isLoading} type="submit" value={isLoading ? "Updating..." : "Update"} className=' btn btn-primary' />
                        </div>
                    </div>
                </form>
                {/* {JSON.stringify(myFormik.values)} */}
            </div>
        </>


    )
}

export default UserEdit