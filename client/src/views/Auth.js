import React, { useState } from 'react'
import { UilAnchor } from '@iconscout/react-unicons'
import { useDispatch, useSelector } from 'react-redux'
//styles
import '../styles/Auth.css'
import { logIn, signUp } from '../actions/AuthAction'

export const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false)
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.authReducer.loading)
    console.log(loading)
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        confirmPassword: '',
    })
    const [confirmPass, setConfirmPass] = useState(true)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignUp) {
            formData.password === formData.confirmPassword ? dispatch(signUp(formData)) : setConfirmPass(false)
        } else {
            dispatch(logIn(formData))
        }
    }

    const resetForm = () => {
        setConfirmPass(true)
        setFormData({
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            confirmPassword: '',
        })
    }

    return (
        <div className="Auth">
            {/* Left Side*/}
            <div className="a-left">
                <UilAnchor size="40" />
                <div className="Webname">
                    <h1>Social Dojo</h1>
                    <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h6>
                </div>
            </div>
            {/* Right  Side*/}
            <div className="a-right">
                <form className="infoForm authForm" onSubmit={handleSubmit}>
                    <h3>{isSignUp ? 'Sign up' : 'Log In'}</h3>
                    {isSignUp && (
                        <div>
                            <input type="text" placeholder="First Name" className="infoInput" name="firstname" onChange={handleChange} value={formData.firstname} />
                            <input type="text" placeholder="Last Name" className="infoInput" name="lastname" onChange={handleChange} value={formData.lastname} />
                        </div>
                    )}
                    <div>
                        <input type="text" className="infoInput" name="username" placeholder="UserName" onChange={handleChange} value={formData.username} />
                    </div>
                    <div>
                        <input type="password" className="infoInput" name="password" placeholder="Password" onChange={handleChange} value={formData.password} />
                        {isSignUp && <input type="password" className="infoInput" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} value={formData.confirmPassword} />}
                    </div>
                    <span
                        style={{
                            color: 'red',
                            fontSize: '12px',
                            alignSelf: 'flex-end',
                            marginRight: '5px',
                            display: confirmPass ? 'none' : 'block',
                        }}
                    >
                        *Confirm password is not same
                    </span>
                    <div>
                        <span
                            style={{ fontSize: '10px', cursor: 'pointer' }}
                            onClick={() => {
                                setIsSignUp((prev) => !prev)
                                resetForm()
                            }}
                        >
                            {isSignUp ? 'Already have an account. Login' : "Don't have an account?"}
                        </span>
                    </div>
                    <button className="button infoButton" type="submit" disabled={loading}>
                        {loading ? 'Loading...' : isSignUp ? 'SignUp' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    )
}
