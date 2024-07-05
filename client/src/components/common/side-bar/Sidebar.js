import { faFaceLaughWink, faTachographDigital, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../Auth/AuthProvider';
import { UserRole } from '../../../Enums/Roles.enum';
function Sidebar() {
    const { authState } = useAuth();
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            {/* <!-- Sidebar - Brand --> */}
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <FontAwesomeIcon icon={faFaceLaughWink} size={"2x"} />
                </div>
                <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
            </a>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />

            {/* <!-- Nav Item - Dashboard --> */}
            {(parseInt(authState.role, 10) === UserRole.SUPERADMIN || parseInt(authState.role, 10) === UserRole.INVENTROY_MANAGER || parseInt(authState.role, 10) === UserRole.VENDOR || parseInt(authState.role, 10) === UserRole.CUSTOMER ) && (
                <>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/portal/dashboard">
                            <FontAwesomeIcon icon={faTachographDigital} style={{ marginRight: "0.5rem" }} />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    {/* <!-- Divider --> */}
                    <hr className="sidebar-divider my-0" />
                </>
            )}

            {/* <!-- Nav Item - Users --> */}
            {(parseInt(authState.role, 10) === UserRole.SUPERADMIN) && (
                <>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/portal/user-list">
                            <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />
                            <span>Users</span>
                        </Link>
                    </li>
                    {/* <!-- Divider --> */}
                    <hr className="sidebar-divider my-0" />
                </>
            )}
            {/* <!-- Nav Item - Products --> */}

            {(parseInt(authState.role, 10) === UserRole.SUPERADMIN || parseInt(authState.role, 10) === UserRole.INVENTROY_MANAGER ) && (
                <>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/portal/product/product-list">
                            <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />
                            <span>Products</span>
                        </Link>
                    </li>
                    {/* <!-- Divider --> */}
                    <hr className="sidebar-divider my-0" />
                </>
            )}
            {/* <!-- Nav Item - Customers --> */}

            {(parseInt(authState.role, 10) === UserRole.SUPERADMIN || parseInt(authState.role, 10) === UserRole.VENDOR) && (
                <>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/portal/vendor-list">
                            <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />
                            <span>Vendor</span>
                        </Link>
                    </li>
                    {/* <!-- Divider --> */}
                    <hr className="sidebar-divider my-0" />
                </>
            )}

            {(parseInt(authState.role, 10) === UserRole.SUPERADMIN || parseInt(authState.role, 10) === UserRole.CUSTOMER) && (
                <>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/portal/customer-list">
                            <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />
                            <span>Customers</span>
                        </Link>
                    </li>
                    {/* <!-- Divider --> */}
                    <hr className="sidebar-divider my-0" />
                </>
            )}

            {(parseInt(authState.role, 10) === UserRole.SUPERADMIN) && (
                <>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/portal/discount-list">
                            <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />
                            <span>Discount</span>
                        </Link>
                    </li>
                    {/* <!-- Divider --> */}
                    <hr className="sidebar-divider my-0" />
                </>
            )}


        </ul>
    )
}

export default Sidebar