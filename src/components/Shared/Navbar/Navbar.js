import React from 'react';

const Navbar = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link ms-5 active" aria-current="page" href="/home">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ms-5" href="/patient/appointments">Patient</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ms-5" href="/dashboard">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ms-5 text-white" href="/dashboard">Admin</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ms-5 text-white" href="/home">Blogs</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ms-5 me-5 text-white" href="/home">Contact us</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;