import Data_Table from "./Components/Table"
import { useLocation } from "react-router-dom";
import React from "react";
import { useOutletContext } from "react-router-dom";
import { Grow } from "@mui/material";
import axios from "axios"
import Tooltip from '@mui/material/Tooltip';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { IconButton } from "@mui/material";

const iconbutton_sx = {
    borderRadius: "10px",
    margin: "5px 1px",
    transition: "0.3s",
    "&:hover": {
        backgroundColor: "rgb(67, 160, 71,0.1)",
        transform: 'scale(1.1)'
    }
}

export default function Student_Results() {

    const location = useLocation();
    const data = location.state;

    const [column, setcolumn] = React.useState([])
    const tab = useOutletContext()
    const [Dataform, setDataform] = React.useState([])

    const handleClickOpen = () => {
        setOpen(true);
    };

    
    const text = (
        <p className="titlepertable">{data.name}</p>
    )

    React.useEffect(() => {
        tab_table()
    }, [tab])

    const tab_table = () => {
        if (data.name === "Entrance Exam Results") {
            setcolumn([
                { id: 'ERID', label: 'ERID', align: 'center' },
                { id: 'LRN', label: 'LRN',},
                { id: 'MATH_SCORE', label: 'MATH', align: 'center', },
                { id: 'ENGLISH_SCORE', label: 'ENGLISH', align: 'center', },
                { id: 'SCIENCE_SCORE', label: 'SCIENCE', align: 'center', },
                { id: 'READING_COMPREHENSION_SCORE', label: 'READING COMPREHENSION', align: 'center'},
                { id: 'TOTAL_SCORE', label: 'Total Score', align: 'center', },
                { id: 'EXAM_RESULT', label: 'Exam Result', align: 'center', },
                { id: 'DATE', label: 'Date', align: 'center'  },
            ])
        } else if (data.name === "Interest Assessment Results") {
            setcolumn([
                { id: 'IARID', label: 'IARID', align: 'center' },
                { id: 'LRN', label: 'LRN', },
                { id: 'REALISTIC_SCORE', label: 'Realistic', align: 'center' },
                { id: 'INVESTIGATIVE_SCORE', label: 'Investigative', align: 'center' },
                { id: 'ARTISTIC_SCORE', label: 'Artistic', align: 'center' },
                { id: 'SOCIAL_SCORE', label: 'Social', align: 'center' },
                { id: 'ENTERPRISING_SCORE', label: 'Enterprising', align: 'center' },
                { id: 'CONVENTIONAL_SCORE', label: 'Conventional', align: 'center' },
                { id: 'IA_RESULT', label: 'Interest Assessment Result', align: 'center' },
                { id: 'DATE', label: 'Date', align: 'center' },
            ])
        } else {
            setcolumn([
                { id: 'RID', label: 'RID',  align: 'center'},
                { id: 'LRN', label: 'LRN', align: 'center'},
                { id: 'ERID', label: 'ERID', align: 'center'},
                { id: 'IRID', label: 'IRID', align: 'center'},
                { id: 'RECOMMENDED_COURSE', label: 'Recommendation Course',  align: 'center'},
                // { id: 'RESULT_STATUS', label: 'Result Status',  align: 'center'},
                { id: 'DATE', label: 'Date',  align: 'center'},
            ])
        }
    }

    const option = (    //Action in Table
        <div>
            <Tooltip title="View" arrow>
                <IconButton sx={iconbutton_sx} onClick={handleClickOpen}>
                    <OpenInNewRoundedIcon sx={{ fontSize: "19px",  color: "rgb(67, 160, 71)"}}  />
                </IconButton>
            </Tooltip>
        </div>
    )

    function dataperrow(columnid, index, val, row) {
        if (columnid === "ACTION") {
            return (option)
        } else if(columnid === "LRN"){
            return (<p style={{ fontWeight: "600" }}>{val}</p>)
        }else if (columnid === "EXAM_RESULT"|| columnid === "RESULT_STATUS") {
            if (val === "PASSED") {
                return (columnid = val,
                    <p className="Account_Status_p1">Passed</p>)
            } else {
                return (
                    <p className="Account_Status_p2">Failed</p>
                )
            }
        }
        else {
            return val
        }
        
    }


    React.useEffect(() => {
        axios.get(`http://localhost/recommendation_system/api/admin/Student_Results.php?result=${data.name}`).then(function (response) {
            setDataform(response.data)
            console.log(response.data)
        })
    }, [tab])

    return (
        <Grow in={true} timeout={600}>
            <div>
                <Data_Table
                    Name="Student Result"
                    Title={text}
                    Column={column}
                    Row={Dataform}
                    Function={dataperrow}
                />
            </div>
        </Grow>
    )
}
