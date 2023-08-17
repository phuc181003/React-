import React, { Fragment } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import App from './components/App'

export default function Router() {
    const navigate = useNavigate(); //hook
    return (
        <Fragment>
            <Routes>
                <Route path="/" element={<App navigate={navigate} />} />
                <Route path="/login" element={<Login navigate={navigate} />} />
                <Route path="/register" element={<Register navigate={navigate} />} />
            </Routes>
        </Fragment>
    )
}
