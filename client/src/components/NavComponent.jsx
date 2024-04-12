export const NavComponent = () => {
  return <>
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
  </>;
};
