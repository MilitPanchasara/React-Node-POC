import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Userlist() {

  const [userList, setUserList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    //On Load
    getUsers();
    console.log("welcome");
  }, []);

  let getUsers = async () => {
    try {
      const users = await axios.get("http://localhost:3333/User");
      setUserList(users.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  let handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure do you want to delete the data?");
      if (confirmDelete) {
        await axios.delete(`https://63a9bccb7d7edb3ae616b639.mockapi.io/users/${id}`);
        getUsers();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">User-List</h1>
        <Link to="/portal/create-user" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />
          Create User
        </Link>
      </div>
      {/* <!-- DataTables --> */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">DataTables</h6>
        </div>
        <div className="card-body">
          {
            isLoading ? <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' />
              : <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Customer Details</th>
                      <th>Contact Details</th>
                      <th>Email</th>
                      <th>Birthdate</th>
                      <th>Customer Photo</th>
                      <th>Customer Type</th>
                      <th>Is Active?</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Customer Name</th>
                      <th>Customer Details</th>
                      <th>Contact Details</th>
                      <th>Email</th>
                      <th>Birthdate</th>
                      <th>Customer Photo</th>
                      <th>Customer Type</th>
                      <th>Is Active?</th>
                      <th>Role</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {userList.map((user) => {
                      return (
                        <tr>
                          <td>{user.UserId}</td>
                          <td>{user.FirstName +" "+ user.LastName}</td>
                          <td>{user.Email}</td>
                          <td>{user.Role.RoleName}</td>
                          <th>
                            <Link to={`/portal/user-view/${user.UserId}`} className='btn btn-primary btn-sm mr-1'>View</Link>
                            <Link to={`/portal/user-edit/${user.UserId}`} className='btn btn-info btn-sm mr-1'>Edit</Link>
                            <button onClick={() => handleDelete(user.UserId)} className='btn btn-danger btn-sm mr-1'>Delete</button>
                          </th>
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

export default Userlist