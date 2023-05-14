import Data_Table from "./Components/Table"
import React from "react";
import { useOutletContext } from "react-router-dom";
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
//For Dialog delete
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Link, Outlet } from "react-router-dom";
import "../../../css/Admin/Form/IA_DELETE.css"

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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Course_Information() {

    const tab = useOutletContext()
    const [Dataform, setDataform] = React.useState([])

    const [content, setcontent] = React.useState()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openaction = Boolean(anchorEl);

    const [opendelete, setOpendelete] = React.useState(false);

    const [id, setid] = React.useState()

    const handleClickAction = (id) => (event) => {
        setAnchorEl(event.currentTarget);
        setid(id)
    };
    const handleCloseAction = () => {
        setAnchorEl(null);
    };

    const handleClickdelete = () => {   //for Dialog in delete
        setOpendelete(true);
        setAnchorEl(null);
    };

    const handleClosedelete = () => {    //for Dialog in delete
        setOpendelete(false);
        setAnchorEl(null);
    };

    const deleterecord = () => {
        setOpendelete(false);

        axios.delete(`http://localhost/recommendation_system/api/admin/Course_Information.php?id="${id}"`).then(function (response) {
            // console.log(response.data)
            axios.delete(`http://localhost/recommendation_system/api/admin/Course_Job.php?id="${id}"`).then(function (response) {
                axios.delete(`http://localhost/recommendation_system/api/admin/Course_Percentage.php?id="${id}"`).then(function (response) {
                    // console.log(response.data)
                })
            })

            
        })
    }

    const column = [
        { id: 'CID', label: 'CID', align: 'center', minWidth: 50 },
        { id: 'FIELD', label: 'Field', minWidth: 100 },
        { id: 'ACRONYM', label: 'Acronym', minWidth: 100 },
        { id: 'COURSE_NAME', label: 'Course Name' },
        { id: 'DATE_CREATED', label: 'Date', align: 'center' },
        { id: 'ACTION', label: 'Actions', align: 'center', minWidth: 50 },
    ]

    const text = (
        <div style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p className="titlepertable">Course Information</p>
            <Link to="Add" style={{ textDecoration: "none" }}><button className="button_add"><AddIcon sx={{ fontSize: "22px" }} />Add Course</button></Link>
        </div>
    )

    const option = (a) => {
        return (
            //Action in Table
            <div>
                <IconButton onClick={handleClickAction(a)}>
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
                            border: '1px solid #e9ecef',
                            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
                        }
                    }}
                >
                    <Link to={`Edit/${id}`} style={{ textDecoration: "none" }}>
                        <span style={{ color: '#252a35' }}>
                            <MenuItem sx={menuitem_sx} onClick={handleCloseAction}>
                                <EditRoundedIcon sx={{ fontSize: "19px" }} />
                                Edit
                            </MenuItem>
                        </span>
                    </Link>
                    <span style={{ color: '#db514cff' }}>
                        <MenuItem sx={menuitem_sx} onClick={handleClickdelete}>
                            <DeleteRoundedIcon sx={{ fontSize: "19px" }} />
                            Delete
                        </MenuItem>
                    </span>
                </Menu>
            </div>
        )
    }


    function dataperrow(columnid, index, val, row) {
        if (columnid === "ACTION") {
            return (option(row.CID))
        } else {
            return val
        }
    }

    const dialogdelete = (
        <Dialog
            open={opendelete}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Delete this record?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Are you sure you want to delete this?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button className="cancel" onClick={handleClosedelete}>Cancel</Button>
                <Button className="agree" onClick={deleterecord}>Agree</Button>
            </DialogActions>
        </Dialog>
    )

    React.useEffect(() => {
        axios.get(`http://localhost/recommendation_system/api/admin/Course_Information.php`).then(function (response) {
            setDataform(response.data)
        })
    }, [tab])

    React.useEffect(() => {
        locationget()
    }, [content])

    function locationget() {
        const parts = location.href.split('/').at(-1);

        if (parts === "Delete" || parts === "Add" || parts === "Edit") {
            setcontent(false)
        } else {
            setcontent(true)
        }
    }

    return (
        <div>
            {content ?
                <Data_Table
                    Name="Course Information"
                    Title={text}
                    Column={column}
                    Row={Dataform}
                    Function={dataperrow}
                    Dialog={dialogdelete}
                />
                :
                <Outlet />
            }
        </div>
    )
}
