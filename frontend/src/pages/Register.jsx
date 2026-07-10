import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await registerUser(form);

            alert("Registration Successful");

            navigate("/login");

        }

        catch (err) {
            console.log(err);
            console.log(err.response);
            console.log(err.response?.data);

            alert(JSON.stringify(err.response?.data));
        }

    };

    return (

        <div>

            <h2>Register</h2>

            <form onSubmit={handleSubmit}>

                <input
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Register
                </button>

            </form>

        </div>

    );
}