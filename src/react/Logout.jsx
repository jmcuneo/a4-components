import * as React from "react";

///images/f7--hammer.svg
function Logout(props) {
    const logout = () => {
        window.location.href = '/logout';
    }
    return (<button id="logout" value="Logout" onClick={() => logout()}>
        Logout
    </button>)
}

export default Logout