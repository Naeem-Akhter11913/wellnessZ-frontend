import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box, Modal, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { GridToolbar } from '@mui/x-data-grid';
import { checkAuth, deleteUser, getAllUser } from "../../../store/action/authRegister";
import EditModal from "./EditModal";
import { RESET_AUTH_STATE } from "../../../store/type/type";
import { showAllertMessage } from "../../../utilities/toastifyAlert";
import { useLocation, useNavigate } from "react-router";
import { authCalender, getAllMetaData, getCalenderCrendentials } from "../../../store/action/calenderAction";
import EventForm from "./EventForm";
import { DD_MM_YYYY } from "../../../utilities/dateFormator";
import { downloadImage } from "../../../utilities/dowloadinImageUrl"
import EmployeeForm from "../../../components/EmployeeForm";
import { CustomToolbar } from "./CustomToolbar";
import ShowTheImag from '../../../components/ShowTheImag'

const HomeDashboard = () => {
    const {
        users,
        successMessage,
        errorMessage,
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

    // console.log(userDetails)
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalUser, setTotalUser] = useState(0);
    const [open, setOpen] = useState(false);
    const [eventOpen, setEventOpen] = useState(false);
    const [userEditDetails, setUserEditDetails] = useState({})
    const [calenderCredentialsDetails, setCalenderCredentialsDetails] = useState({});
    const [isObjectLoaded, setIsObjectLoaded] = useState(false);
    const [isEditEmployess, setIsEditEmployess] = useState(false);
    const [imageOpen, setImageOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [eventData, setEventData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const redirectFrom = queryParams.get('redirect-from');


    useEffect(() => {
        if (redirectFrom) {
            window.location.href = 'http://localhost:5173'
        }
    }, [redirectFrom]);

    useEffect(() => {
        dispatch(getAllUser({ page: page + 1, limit: pageSize }));
        dispatch({ type: RESET_AUTH_STATE });

    }, [dispatch, page, pageSize, successMessage]);


    useEffect(() => {
        if (users && Object.keys(users).length) {
            const { data, total } = users;
            if (userDetails.typeOfUser === 'manager') {
                const filterData = data.filter((t => userDetails.department === t.department))
                setTotalUser(total);
                setRows(filterData);
            } else {
                setTotalUser(total);
                setRows(data);
            }

        }
        if (calenderCredentials && Object.keys(calenderCredentials).length) {
            const { metaValue } = calenderCredentials
            const calender = JSON.parse(metaValue)
            setCalenderCredentialsDetails(calender);
            const isLoaded = Boolean(calender)
            setIsObjectLoaded(isLoaded)
        }
    }, [users, calenderCredentials, userDetails]);

    useEffect(() => {
        dispatch(checkAuth());
        dispatch(getAllMetaData());
    }, []);

    useEffect(() => {
        if (userDetails && Object.keys(userDetails).length) {
            dispatch(getCalenderCrendentials(userDetails._id))
        }
    }, [userDetails])

    useEffect(() => {
        if (errorMessage) {
            showAllertMessage('error', errorMessage);
            dispatch({ type: RESET_AUTH_STATE });
        }
        if (calenderErrorMessage) {
            showAllertMessage('error', calenderErrorMessage);
            dispatch({ type: RESET_AUTH_STATE });
        }
        if (successMessage) {
            showAllertMessage('success', successMessage);
            dispatch({ type: RESET_AUTH_STATE });
            // setUserEditDetails({});
            handleClose();
        }


    }, [errorMessage, successMessage, loginSuccessMessage, calenderErrorMessage, loginErrorMessage]);


    const handleDelete = deleteUserDetail => {
        if (userDetails.typeOfUser === "admin") {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(deleteUser(deleteUserDetail._id))
                }
            });
        } else {
            Swal.fire({
                title: "You can not delete the data",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
            })
        }


    };
    // for modal
    const handleEdite = deleteUserDetail => {
        if (userDetails.typeOfUser === "student") {
            Swal.fire({
                title: "You can not delete the data",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
            })
            return;
        }
        setOpen(true);
        setUserEditDetails(deleteUserDetail)
    };

    const handleClose = () => {
        setOpen(false);
        setUserEditDetails({})
    };
    const handleCloseEvent = () => setEventOpen(false);
    const handleCloseImage = () => setImageOpen(false);

    const columns = [
        {
            field: "name",
            headerName: "Name",
            width: 150,
        },
        {
            field: "email",
            headerName: "Email",
            width: 200,
        },
        {
            field: "department",
            headerName: "Department",
            width: 150,
        },
        {
            field: "isActive",
            headerName: "Status",
            width: 130,
            renderCell: (params) => (
                <span style={{ color: params.value ? "green" : "red" }}>
                    {params.value ? "Active" : "Inactive"}
                </span>
            ),
        },
        {
            field: "image",
            headerName: "image",
            width: 150,
            renderCell: (params) => (
                <Box component={'div'} onClick={() => {
                    if (userDetails.typeOfUser === 'admin') {
                        setImageOpen(true)
                        setPreviewImage(params.row.image)
                    }
                }
                } sx={{ cursor: 'pointer' }}>
                    <Box component={'img'} src={params.row.image || 'image/no-image.png'} alt="not present" />
                </Box>
            ),
        },
        {
            field: "download",
            headerName: "Download",
            width: 150,
            renderCell: (params) => (
                <Box component={'div'}>
                    {/* {userDetails.typeOfUser === 'admin'} */}
                    <Button
                        sx={{
                            color: 'green'
                        }}
                        onClick={() => {
                            if (userDetails.typeOfUser === 'admin') {
                                downloadImage(params.row.image)
                            }
                        }}
                    >
                        <FileDownloadIcon />
                    </Button>
                </Box>
            ),
        },
        {
            field: "reminder",
            headerName: "Calendar Reminder",
            width: 400,
            renderCell: (params) => {
                const objectId = params.row._id;
                const isEventPresent = reminderMetaData.find(rmd => rmd?.userId?.toString() === objectId.toString())
                if (Boolean(isEventPresent)) {
                    const { start, end } = JSON.parse(isEventPresent.metaValue);
                    const startDate = new Date(start.dateTime);
                    const endDate = new Date(end.dateTime);
                    return <Box component={'div'}>
                        <Typography component={'span'}>{DD_MM_YYYY(startDate)} to </Typography>
                        <Typography component={'span'}>{DD_MM_YYYY(endDate)}</Typography>
                    </Box>;
                } else {
                    return (
                        <Box component="div">
                            {calenderCredentialsDetails &&
                                isObjectLoaded &&
                                Object.keys(calenderCredentialsDetails).length ? (
                                <Button
                                    sx={{
                                        color: "green",
                                    }}
                                    onClick={() => {
                                        if (userDetails.typeOfUser === 'admin') {
                                            setEventOpen(true);
                                            setEventData(params.row);
                                        }
                                    }}
                                >
                                    <CalendarMonthIcon />
                                </Button>
                            ) : (
                                <Button
                                    sx={{
                                        color: "green",
                                        textTransform: "capitalize",
                                    }}
                                    onClick={() => { if (userDetails.typeOfUser === 'admin') dispatch(authCalender(userDetails._id)) }}
                                >
                                    Connect with calendar
                                </Button>
                            )}
                        </Box>
                    );
                }
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => (
                <Box component={'div'}>
                    <Button
                        sx={{
                            color: 'green'
                        }}
                        onClick={() => {
                            if (userDetails.typeOfUser === 'admin' || userDetails.typeOfUser === 'manager') {
                                handleEdite(params.row);
                                setIsEditEmployess(true)
                            }
                        }}
                    >
                        <EditIcon />
                    </Button>
                    <Button
                        sx={{
                            color: 'red'
                        }}
                        onClick={() => {
                            if (userDetails.typeOfUser === 'admin') {
                                handleDelete(params.row)
                            }
                        }}
                    >
                        <DeleteIcon />
                    </Button>
                </Box>
            ),
        },
    ];

    const handlePageChange = newPaginationModel => {
        setPageSize(newPaginationModel.pageSize);
        setPage(newPaginationModel.page);
    };


    return (
        <div style={{ height: 400, width: "100%" }}>
            <Button onClick={() => {
                if (userDetails.typeOfUser === 'admin') {
                    setOpen(true);
                    setIsEditEmployess(false);
                }
            }} type="button">
                Add Employess
            </Button>
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


                getRowId={(row) => row._id}
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
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {/* <EditModal userEditDetails={userEditDetails} handleClose={handleClose} setUserEditDetails={setUserEditDetails} /> */}
                <EmployeeForm loading={loading} userEditDetails={userEditDetails} isEditEmployess={isEditEmployess} setUserEditDetails={setUserEditDetails} />
            </Modal>
            <Modal
                open={eventOpen}
                onClose={handleCloseEvent}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <EventForm handleCloseEvent={handleCloseEvent} eventData={eventData} setEventData={setEventData} calenderCredentialsDetails={calenderCredentialsDetails} />
            </Modal>
            <Modal
                open={imageOpen}
                onClose={handleCloseImage}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ShowTheImag previewImage={previewImage}/>
            </Modal>
        </div>
    );
};

export default HomeDashboard;
