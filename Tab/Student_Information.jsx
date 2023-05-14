import Data_Table from "./Components/Table"
import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios"
import Button from "@mui/material/Button";
import { IconButton, Fade } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import DialogActions from '@mui/material/DialogActions';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const menuitem_sx = {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    fontSize: '14px',
    padding: '6px 20px',
    borderRadius: '5px',
    fontFamily: "Inter",
    fontWeight: '500',
    letterSpacing: '0.5px',

    '&:hover': {
        backgroundColor: '#f6f6f7'
    }
}

const icon_dialog_sx = {
    backgroundColor: 'rgb(202, 240, 248,0.6)',
    padding: '15px',
    borderRadius: '30px',
    color: 'rgb(30, 96, 145, 0.9)',
    border: '1px solid #F8F9FA'
}

const button_sx = {
    padding: '6px 35px',
    backgroundColor: '#0096c7',
    color: 'white',
    borderRadius: '5px',
    textTransform: "none",
    fontSize: '13px',
    fontFamily: "'QuickSand', sans-serif",
    fontWeight: 'bold',
    letterSpacing: '2px',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    "&:hover": {
        backgroundColor: '#0077b6',
    }
}

const dialog_sx = {
    style: {
        backgroundColor: 'white',
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        borderRadius: '15px',
        padding: '20px',
        width: '100%',
    },
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />;
});

export default function Student_Results() {

    // const parts = location.href.split('/').at(-1);
    const tab = useOutletContext()
    const [Dataform, setDataform] = useState([])
    const [open, setOpen] = useState(false);    //for Dialog in view

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openaction = Boolean(anchorEl);

    const handleClickAction = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseAction = () => {
        setAnchorEl(null);
    };

    const text = (
        <p className="titlepertable">Student Information</p>
    )

    const column = [
        { id: 'LRN', label: 'LRN', },
        { id: 'STUDENT_NAME', label: 'Student Name', minWidth: 150 },
        { id: 'EMAIL_ADDRESS', label: 'Email Address', },
        { id: 'EXAM_STATUS', label: 'Exam Status', },
        { id: 'ACCOUNT_STATUS', label: 'Account Status', align: 'center' },
        { id: 'ACCOUNT_CREATED', label: 'Date', align: 'center' },
        { id: 'ACTION1', label: 'Action', align: 'center' },
    ]

    const field = [          //Field in dialog
        { id: 'FirstName', label: 'First Name', value: 'Francis' },
        { id: 'LastName', label: 'Last Name', value: 'Antonio' },
        { id: 'Email', label: 'Email Address', value: 'francis.antonio@yahoo.com' },
        { id: 'Password', label: 'Password', value: 'password' },
        { id: 'ExamStatus', label: 'Exam Status', value: 'Passed' },
        { id: 'SHSTrack', label: 'SHS Track', value: 'ICT' },
    ]


    React.useEffect(() => {
        axios.get(`http://localhost/recommendation_system/api/admin/Student_information.php`).then(function (response) {
            setDataform(response.data)
        })
    }, [tab])

    const handleClickOpen = () => {
        setOpen(true);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const option = (    //Action in Table
        <div>
            <IconButton onClick={handleClickAction}>
                <MoreVertRoundedIcon sx={{ fontSize: "19px" }} />
            </IconButton>
            <Menu
                elevation={0}
                anchorEl={anchorEl}
                open={openaction}
                onClose={handleCloseAction}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    style: {
                        padding: '0px 5px',
                        borderRadius: "10px",
                        border: '1px solid #F8F9FA',
                        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                    }
                }}
            >
                <span style={{ color: '#252a35' }}>
                    <MenuItem sx={menuitem_sx} onClick={handleClickOpen}>
                        <EditRoundedIcon sx={{ fontSize: "19px" }} />
                        Edit
                    </MenuItem>
                </span>
                <span style={{ color: '#db514cff' }}>
                    <MenuItem sx={menuitem_sx} onClick={handleCloseAction}>
                        <DeleteRoundedIcon sx={{ fontSize: "19px"}} />
                        Inactive
                    </MenuItem>
                </span>
            </Menu>
        </div>
    )

    function dataperrow(columnid, index, val, row) {
        if (columnid === "STUDENT_NAME") {
            return (
                <p style={{ fontWeight: "600" }}>
                    {row.STUDENT_FIRSTNAME} {row.STUDENT_LASTNAME}
                </p>
            )
        
        } else if (columnid === "ACTION1") {
            return (option)
        }
        else if (columnid === "ACCOUNT_STATUS") {
            if (val === "ACTIVE") {
                return (columnid = val,
                    <p className="Account_Status_p1">Active</p>)
            } else {
                return (
                    <p className="Account_Status_p2">Inactive</p>
                )
            }
        }
        else {
            return val
        }
    }

    const dialog = (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            PaperProps={dialog_sx}
            sx={{
                '& .MuiBackdrop-root': { backgroundColor: 'rgb(52, 58, 64,0.25)' },
            }}
        >
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #E9ECEF' }}>
                <FolderSharedOutlinedIcon sx={icon_dialog_sx} />
                <div>
                    <p className="Dialog_title_p1">Student Information</p>
                    <p className="Dialog_title_p2">View all the records of Student Information</p>
                </div>
            </DialogTitle>
            <DialogContent>
                <div>
                    <div className="dialog_body_p1">
                        <div className="dialog_body_div">
                            <p>Date Created: </p>
                            LRN:
                            <span style={{ color: '#1e6091', marginLeft: '5px' }}>123456789012</span>
                        </div>
                        <div className="dialog_body_alert">
                            <p>Active</p>
                        </div>
                    </div>
                    <div className="dialog_body">
                        {
                            field.map((val) => (
                                <div key={val.id} className={val.id}>
                                    <p className="dialog_body_p2">{val.label}</p>
                                    <input type="text" value={val.value} placeholder={val.label} className="dialog_body_input" disabled />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <DialogActions>
                    <Button sx={button_sx} onClick={handleClose}>Close</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )

    return (
        <div>
            <Data_Table
                Name="Student Information"
                Title={text}
                Column={column}
                Row={Dataform}
                Function={dataperrow}
                Dialog={dialog}
            />
        </div>
    )
}
