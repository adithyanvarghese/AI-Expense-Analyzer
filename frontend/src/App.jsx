import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import Expenses from "./pages/Expenses";

import AIInsights from "./pages/AIInsights";
import StatementUpload from "./pages/StatementUpload";
import ReceiptScanner from "./pages/ReceiptScanner";
import Budgets from "./pages/Budgets";

// Temporary pages (we'll replace these later)







export default function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Redirect Home */}

                <Route
                    path="/"
                    element={<Navigate to="/login" />}
                />

                {/* Authentication */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Protected Routes */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/expenses"
                    element={
                        <ProtectedRoute>
                            <Expenses />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/budget"
                    element={
                        <ProtectedRoute>
                            <Budgets />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/ai"
                    element={
                        <ProtectedRoute>
                            <AIInsights />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/receipt"
                    element={
                        <ProtectedRoute>
                            <ReceiptScanner />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/statement"
                    element={
                        <ProtectedRoute>
                            <StatementUpload />
                        </ProtectedRoute>
                    }
                />

                

                <Route
                    path="/statement-upload"
                    element={
                        <ProtectedRoute>
                            <StatementUpload />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/receipt-scanner"
                    element={
                        <ProtectedRoute>
                            <ReceiptScanner />
                        </ProtectedRoute>
                    }
                />

                {/* Unknown Route */}

                <Route
                    path="*"
                    element={<Navigate to="/login" />}
                />

            </Routes>

        </BrowserRouter>

    );

}