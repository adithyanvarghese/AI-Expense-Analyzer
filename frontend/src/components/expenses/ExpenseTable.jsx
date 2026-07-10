import {
    Paper,
    IconButton,
    TextField,
    InputAdornment,
    Chip,
    Box
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

export default function ExpenseTable({

    expenses,

    onEdit,

    onDelete

}) {

    const [search, setSearch] = useState("");

    const filteredExpenses = expenses.filter((expense) =>

        expense.description
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        expense.category
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    const columns = [

        {

            field: "date",

            headerName: "Date",

            flex: 1

        },

        {

            field: "description",

            headerName: "Description",

            flex: 2

        },

        {

            field: "category",

            headerName: "Category",

            flex: 1,

            renderCell: (params) => (

                <Chip

                    label={params.value}

                    color="primary"

                    size="small"

                />

            )

        },

        {

            field: "amount",

            headerName: "Amount",

            flex: 1,

            renderCell: (params) => (

                <strong>

                    ₹ {params.value}

                </strong>

            )

        },

        {

            field: "actions",

            headerName: "Actions",

            sortable: false,

            flex: 1,

            renderCell: (params) => (

                <>

                    <IconButton

                        color="primary"

                        onClick={() => onEdit?.(params.row)}

                    >

                        <EditIcon />

                    </IconButton>

                    <IconButton

                        color="error"

                        onClick={() => onDelete?.(params.row)}

                    >

                        <DeleteIcon />

                    </IconButton>

                </>

            )

        }

    ];

    return (

        <Paper sx={{ p: 2 }}>

            <Box mb={2}>

                <TextField

                    fullWidth

                    placeholder="Search expenses..."

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                    InputProps={{

                        startAdornment: (

                            <InputAdornment position="start">

                                <SearchIcon />

                            </InputAdornment>

                        )

                    }}

                />

            </Box>

            <DataGrid

                rows={filteredExpenses}

                columns={columns}

                autoHeight

                pageSizeOptions={[5, 10, 20]}

                initialState={{

                    pagination: {

                        paginationModel: {

                            pageSize: 10

                        }

                    }

                }}

                disableRowSelectionOnClick

            />

        </Paper>

    );

}