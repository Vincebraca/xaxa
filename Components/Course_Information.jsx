import "../../../../css/User/Tabs/Components/Course_Info.css"
import axios from "axios";
import React, { useEffect } from "react";
import { Grow } from "@mui/material";


export default function Course_Info() {

    const [coursedata, setcoursedata] = React.useState([{

    }])
    const [coursejob, setcoursejob] = React.useState([])
    const parts = location.href.split('/').at(-1);

    useEffect(() => {
        axios.get(`http://localhost/recommendation_system/api/user/Course_Information.php?CID="${parts}"&&FETCH=VDV`).then(function (response) {
            setcoursedata(response.data)
        })

        axios.get(`http://localhost/recommendation_system/api/user/Course_Information.php?CID="${parts}"&&FETCH=JOB`).then(function (response) {
            setcoursejob(response.data)
        })
    },[])

    return (
        <Grow in={true} timeout={1000}>
            <div className="Course_Info">
                <div className="Course_Info_header">
                    <div>
                        <img src={`/${coursedata[0].HEADER_PICTURE}`} className="Course_header_img"></img>
                    </div>
                    <div>
                        <p className="Course_header_p1">{coursedata[0].FIELD}</p>
                        <p className="Course_header_p2">{coursedata[0].COURSE_NAME} ({coursedata[0].ACRONYM})</p>
                        <p className="Course_header_p3">{coursedata[0].INFORMATION}</p>
                    </div>
                </div>
                <div className="Course_Info_career">
                    <p className="Course_I_p1">Top 3 best job for {coursedata[0].ACRONYM} graduate</p>
                    <div className="Course_Info_c_div">
                        {
                            coursejob.map((val, index) => {
                                return (
                                    <div key={index} className="Course_Info_c_box">
                                        <p className="Course_I_c_p1">{val.JOB_NAME}</p>
                                        <p>{val.INFORMATION}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Grow>
    )
}