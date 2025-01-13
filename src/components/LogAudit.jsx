

import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { CustomToolbar } from "../pages/dashboard/components/CustomToolbar";
import { getAllAuditLog } from "../store/action/authRegister";
import { Box, Modal, Typography } from "@mui/material";
import ShowTheImag from "./ShowTheImag";

const LogAudit = () => {
    const {
        users,
        successMessage,
        errorMessage,
        auditLog,
        userDetails,
        isAuthenticated,
        currentUser,
        loginSuccessMessage,
        loginErrorMessage,
        loading
    } = useSelector((state) => state.auth);
    const {
        reminderMetaData,
        calenderCredentials,
        calenderSuccessMessage,
        calenderErrorMessage,
    } = useSelector((state) => state.calender);

    // console.log(auditLog)
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalUser, setTotalUser] = useState(0);
    const [imageOpen, setImageOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllAuditLog())
    }, [])
    // const [rows, setRows] = useState([]);

    useEffect(() => {
        if (auditLog && auditLog.length) {
            const mappedRows = auditLog.map((al, index) => {
                const { userId, metaValue, createdAt } = al;

                // Safely parse metaValue to handle potential errors
                let newValue = {};
                let oldValue = {};

                newValue = JSON.parse(metaValue.newValue);
                oldValue = JSON.parse(metaValue.oldValue);

                // Format the createdAt timestamp
                const time = new Date(createdAt);
                const formattedTime = time.toString().split(' GMT')[0];

                return {
                    id: index,
                    ids: newValue._id,
                    oldName: oldValue.name || '',
                    newName: newValue.name || '',

                    oldEmail: oldValue.email || '',
                    newEmail: newValue.email || '',

                    oldDepartment: oldValue.department || '',
                    newDepartment: newValue.department || '',

                    oldIsActive: oldValue.status ? "Active" : "Inactive",
                    newIsActive: newValue.status ? "Active" : "Inactive",

                    oldImage: oldValue.image || '',
                    newImage: newValue.image || '',

                    modifieldby: userId?.name || 'Unknown',
                    timestamp: formattedTime,
                };
            });

            setRows(mappedRows);
            setTotalUser(mappedRows.length)
        }
    }, [auditLog]);

    const handleCloseImage = () => setImageOpen(false);

    const columns = [
        {
            field: "oldName",
            headerName: "Old Name",
            width: 150,
        },
        {
            field: "newName",
            headerName: "New Name",
            width: 150,
        },
        {
            field: "oldEmail",
            headerName: "Old Email",
            width: 200,
        },
        {
            field: "newEmail",
            headerName: "New Email",
            width: 200,
        },
        {
            field: "oldDepartment",
            headerName: "Old Department",
            width: 150,
        },
        {
            field: "newDepartment",
            headerName: "New Department",
            width: 150,
        },
        {
            field: "oldIsActive",
            headerName: "Old Status",
            width: 130,
            // renderCell: (params) => (
            //     <Typography component={'p'} color={params.row.oldIsActive === 'Active' ? 'green' : "red"} />
            // )
            renderCell: (params) => {
                return (
                    <span style={{ color: params.row.oldIsActive === 'Active' ? "green" : "red" }}>
                        {params.row.oldIsActive}
                    </span>
                )
            }
        },
        {
            field: "newIsActive",
            headerName: "New Status",   
            width: 130,
            renderCell: (params) => {
                return (
                    <span style={{ color: params.row.newIsActive === 'Active' ? "green" : "red" }}>
                        {params.row.newIsActive}
                    </span>
                )
            }
        },
        {
            field: "oldImage",
            headerName: "Old Image",
            width: 150,
            renderCell: (params) => (
                <Box component={'div'} sx={{ cursor: 'pointer' }} onClick={() => {
                    setImageOpen(true)
                    setPreviewImage(params.row.oldImage)
                }}>
                    <Box component={'img'} src={params.row.oldImage || 'image/no-image.png'} alt="not present" />
                </Box>
            ),
        },
        {
            field: "newImage",
            headerName: "New Image",
            width: 150,
            renderCell: (params) => (
                <Box component={'div'} sx={{ cursor: 'pointer' }} onClick={() => {
                    setImageOpen(true)
                    setPreviewImage(params.row.oldImage)
                }}>
                    <Box component={'img'} src={params.row.newImage || 'image/no-image.png'} alt="not present" />
                </Box>
            ),
        },
        {
            field: "ids",
            headerName: "User id",
            width: 250
        },
        {
            field: "modifieldby",
            headerName: "Modified By",
            width: 150
        },
        {
            field: "timestamp",
            headerName: "Timestamp",
            width: 250
        },
    ];

    const handlePageChange = newPaginationModel => {
        setPageSize(newPaginationModel.pageSize);
        setPage(newPaginationModel.page);
    };


    return (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                pageSizeOptions={[10, 20, 30]}
                pagination
                paginationMode="server"
                rowCount={totalUser}
                disableColumnSelector
                disableDensitySelector
                getRowId={(row) => row.id}
                disableSelectionOnClick
                page={page}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}

                slots={{ toolbar: CustomToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}

                onPaginationModelChange={(e) => handlePageChange(e)}
            />
            <Modal
                open={imageOpen}
                onClose={handleCloseImage}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ShowTheImag previewImage={previewImage} />
            </Modal>
        </div>
    );
};

export default LogAudit;
