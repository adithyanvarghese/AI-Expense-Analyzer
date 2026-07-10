import { useState, useContext } from "react";
import {
    TextField,
    Button,
    Stack,
    Link
} from "@mui/material";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

export default function Login() {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [form, setForm] = useState({

        username: "",
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

            const tokens = await loginUser(form);

            login(tokens, form.username);

            navigate("/dashboard");

        }

        catch (err) {

            console.log(err);

            alert("Invalid username or password");

        }

    };

    return (

        <AuthLayout
            title="Welcome Back"
            subtitle="Login to continue"
        >

            <form onSubmit={handleSubmit}>

                <Stack spacing={3}>

                    <TextField

                        label="Username"

                        name="username"

                        value={form.username}

                        onChange={handleChange}

                        fullWidth

                    />

                    <TextField

                        label="Password"

                        name="password"

                        type="password"

                        value={form.password}

                        onChange={handleChange}

                        fullWidth

                    />

                    <Button

                        type="submit"

                        variant="contained"

                        size="large"

                    >

                        Login

                    </Button>

                    <Link

                        component={RouterLink}

                        to="/register"

                        underline="hover"

                    >

                        Don't have an account?

                    </Link>

                </Stack>

            </form>

        </AuthLayout>

    );

}