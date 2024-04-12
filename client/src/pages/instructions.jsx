import React from "react";

export const InstructionsPage = () => {
    return (
        <>
            <nav className="navbar bg-body-tertiary fixed-top top-nav">
                <div className="container-fluid">
                    <div className="container" style={{textAlign: "center"}}>
                        <a className="navbar-brand title" style={{color: "#fff"}} href="#">Billing System</a>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar"
                         aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas"
                                    aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/dashboard">Dashboard</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/billingsystem">Billing System</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/instructions">Instructions</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/user_info">User Information</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/logout">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="apply-translation">
                <h1>Instructions</h1>
                <h2>Dashboard</h2>
                <hr/>
                <ol>
                    <li>When logged in, the user is redirected to the dashboard</li>
                    <li>The data and information is specific to the user</li>
                </ol>
                <h2>Adding Data</h2>
                <hr/>
                <ol>
                    <li>Fill the form with product information</li>
                    <li>Click on submit</li>
                </ol>
                <h2>Viewing Data</h2>
                <hr/>
                <ol>
                    <li>Look at the table below the form to see purchase data</li>
                    <li>The second column displays product information</li>
                    <li>The third column displays price information calculated based on price of single product and
                        quantity and price after applying discount
                    </li>
                    <li>The fourth column has buttons to update or delete specific purchase data</li>
                    <li>The last row of the table displays the total price of the entire purchase records</li>
                </ol>
                <h2>Deleting Data</h2>
                <hr/>
                <ol>
                    <li>Click on the delete button in the corresponding row of which the data should be deleted in the
                        database.
                    </li>
                </ol>
                <h2>Updating Data</h2>
                <hr/>
                <ol>
                    <li>Click on the update button in the corresponding row and a popup form opens with the existing row
                        data populated
                    </li>
                    <li>Make the required changes</li>
                    <li>Click update on the popup form to close and modify the data</li>
                    <li>The changes are made in the database and displayed in the table</li>
                </ol>
            </div>

        </>
    )
}