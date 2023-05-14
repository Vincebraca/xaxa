import Data_Table from "./Components/Table"
import React from "react"
import axios from "axios"
import { IconButton } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
//For Dialog delete
import { Link, Outlet } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';

export default function Entrance_Exam() {

    const [Dataform, setDataform] = React.useState([])

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClickAction = (id) => (event) => {
        setAnchorEl(event.currentTarget);
    };

    const text = (
        <div style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p className="titlepertable">Exam Information</p>
        </div>
    )

    const column2 = [
        { id: 'EID', label: 'EID', align: 'center', minWidth: 50 },
        { id: 'SUBJECT', label: 'Subject', minWidth: 100 },
        { id: 'INSTRUCTION', label: 'Instruction' },
        { id: 'TOTAL_ITEMS', label: 'Total Items', align: 'center', minWidth: 80 },
        { id: 'TIMELIMIT_MINUTE', label: 'Minute', align: 'center', minWidth: 80 },
        { id: 'TIMELIMIT_SECOND', label: 'Second', align: 'center', minWidth: 80 },
        { id: 'ACTION', label: 'Actions', align: 'center', minWidth: 50 },
    ]

    const option = (a) => {
        return (
            //Action in Table
            <div>
                <Link to={`Edit/${a}`} style={{ textDecoration: "none" }}>
                    <Tooltip title="Edit">
                        <IconButton onClick={handleClickAction(a)}>
                            <EditRoundedIcon sx={{ fontSize: "19px", color: '#69b96eff'}} />
                        </IconButton>
                    </Tooltip>
                </Link>
                {/* <Menu
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
                    <Link to={`Edit/${id}`} style={{ textDecoration: "none" }}>
                        <span style={{ color: '#252a35' }}>
                            <MenuItem sx={menuitem_sx} onClick={handleCloseAction}>
                                <EditRoundedIcon sx={{ fontSize: "19px" }} />
                                Edit
                            </MenuItem>
                        </span>
                    </Link>
                    <Link to="Delete" style={{ textDecoration: "none" }}>
                        <span style={{ color: '#db514cff' }}>
                            <MenuItem sx={menuitem_sx} onClick={handleClickdelete}>
                                <DeleteRoundedIcon sx={{ fontSize: "19px" }} />
                                Delete
                            </MenuItem>
                        </span>
                    </Link>
                </Menu> */}
            </div>
        )
    }


    function dataperrow(columnid, index, val, row) {
        if (columnid === "ACTION") {
            return (option(row.EID))
        } else {
            return val
        }
    }

    React.useEffect(() => {
        axios.get(`http://localhost/recommendation_system/api/admin/SAT.php?FETCH='SUBJECT'`).then(function (response) {
            setDataform(response.data)
        })
    }, [])

    return (
        <div>
            <Data_Table
                Name="Course Information"
                Title={text}
                Column={column2}
                Row={Dataform}
                Function={dataperrow}
            />
        </div>
    )
}