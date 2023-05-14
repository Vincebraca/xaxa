import "../../../../css/User/Tabs/Components/Result.css"
import { Avatar, Badge, Box, LinearProgress, Zoom, FormControl, Select, MenuItem } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CameraIcon from '@mui/icons-material/CameraAltRounded';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import styled from "@emotion/styled";
export default function Profile() {

    const user = window.localStorage.getItem('USER_DATA')
    const [satresult, setsatresult] = React.useState([])
    const [overall, setoverall] = React.useState({})
    const [iaresult, setiaresult] = React.useState([])
    const [subscore, setsubscore] = React.useState([])
    const [timelimit, settimelimit] = React.useState([])
    const [total, settotal] = React.useState([])

    const sat = satresult.length === 0
    const ia = iaresult.length === 0
    const ti = timelimit.length === 0
    const to = total.length === 0

    const [overallsat, setoverallsat] = React.useState([])
    const subject = [
        {
            id: "Math",
            Subject: "Math",
            total: to ? 0 : total[0].TOTAL_ITEMS,
            Item: "",
            bg: "#0096c7",
            result: sat ? 0 : satresult[0].MATH_SCORE,
            minute: ti ? 0 : timelimit[0].MATH_MINUTE,
            second: ti ? 0 : timelimit[0].MATH_SECOND,
        },
        {
            id: "Science",
            Subject: "Science",
            total: to ? 0 : total[0].TOTAL_ITEMS,
            Item: "",
            bg: "#52b788",
            result: sat ? 0 : satresult[0].SCIENCE_SCORE,
            minute: ti ? 0 : timelimit[0].SCIENCE_MINUTE,
            second: ti ? 0 : timelimit[0].SCIENCE_SECOND,
        },
        {
            id: "English",
            Subject: "English",
            total: to ? 0 : total[0].TOTAL_ITEMS,
            Item: "",
            bg: "#f13030",
            result: sat ? 0 : satresult[0].ENGLISH_SCORE,
            minute: ti ? 0 : timelimit[0].ENGLISH_MINUTE,
            second: ti ? 0 : timelimit[0].ENGLISH_SECOND,
        },
        {
            id: "Reading_Comprehension",
            Subject: "Reading",
            total: to ? 0 : total[0].TOTAL_ITEMS,
            Item: "",
            bg: "#f4a261",
            result: sat ? 0 : satresult[0].READING_COMPREHENSION_SCORE,
            minute: ti ? 0 : timelimit[0].READING_COMPREHENSION_MINUTE,
            second: ti ? 0 : timelimit[0].READING_COMPREHENSION_SECOND,
        },
    ]

    const interest = [
        {
            Interest: "Realistic",
            Score: 0,
            Item: "",
            Color: "#ff4d6d",
            Bg: "#ff4d6d4b",
            result: ia ? 0 : iaresult[0].REALISTIC_SCORE
        },
        {
            Interest: "Investigative",
            Score: 10,
            Item: "",
            Color: "#fb8500",
            Bg: "#fb85004b",
            result: ia ? 0 : iaresult[0].INVESTIGATIVE_SCORE
        },
        {
            Interest: "Artistic",
            Score: 20,
            Item: "",
            Color: "#ffc300",
            Bg: "#ffc3004b",
            result: ia ? 0 : iaresult[0].ARTISTIC_SCORE
        },
        {
            Interest: "Social",
            Score: 30,
            Item: "",
            Color: "#52b788",
            Bg: "#52b7884d",
            result: ia ? 0 : iaresult[0].SOCIAL_SCORE
        },
        {
            Interest: "Enterprising",
            Score: 40,
            Item: "",
            Color: "#00b4d8",
            Bg: "#00b4d84d",
            result: ia ? 0 : iaresult[0].ENTERPRISING_SCORE
        },
        {
            Interest: "Conventional",
            Score: 50,
            Item: "",
            Color: "#858ae3",
            Bg: "858ae34d",
            result: ia ? 0 : iaresult[0].CONVENTIONAL_SCORE
        },
    ]

    useEffect(() => {
        axios.get(`http://localhost/recommendation_system/api/user/Result.php?LRN="${JSON.parse(user).LRN}"&&FETCH='EX'`).then(function (response) {
            setsatresult(response.data)

            const subject = {
                Math: response.data[0].MATH_SCORE,
                Science: response.data[0].SCIENCE_SCORE,
                English: response.data[0].ENGLISH_SCORE,
                Reading_Comprehension: response.data[0].READING_COMPREHENSION_SCORE,
            }

            axios.get(`http://localhost/recommendation_system/api/user/GetOverAll.php?LRN='${JSON.parse(user).LRN}'`).then(function (response) {
                const overallsub = {
                    Math: response.data.MATH_OVERALL,
                    Science: response.data.SCIENCE_OVERALL,
                    English: response.data.ENGLISH_OVERALL,
                    Reading_Comprehension: response.data.READING_COMPREHENSION_OVERALL
                }
                setoverall(overallsub)

                // const high = Object.keys(overallsub).reduce((a, b) => overallsub[a] > overallsub[b] ? a : b)
                const high = Object.keys(overallsub).sort(function (a, b) { return overallsub[b] - overallsub[a] })

                axios.get(`http://localhost/recommendation_system/api/user/Result.php?LRN="${JSON.parse(user).LRN}"&&FETCH='IA'`).then(function (response) {
                    setiaresult(response.data)
                    axios.get(`http://localhost/recommendation_system/api/user/Result.php?IA='${response.data[0].IA_RESULT}'&&FETCH='reco'&&SUBJECT=${high[0]}`).then(function (response) {

                        console.log(response.data.length)
                        if (response.data.length === 0) {
                            axios.get(`http://localhost/recommendation_system/api/user/Result.php?LRN="${JSON.parse(user).LRN}"&&FETCH='IA'`).then(function (response) {
                                axios.get(`http://localhost/recommendation_system/api/user/Result.php?IA='${response.data[0].IA_RESULT}'&&FETCH='reco'&&SUBJECT=${high[1]}`).then(function (response) {
                                    setsubscore(response.data)
                                })
                            })
                        } else {
                            setsubscore(response.data)
                        }
                    })
                })
            })
        })

        subject.map((sub, index) => {
            axios.get(`http://localhost/recommendation_system/api/user/AddTimelimit.php?LRN='${JSON.parse(user).LRN}'&&SUBJECT='${sub.id}'`).then(function (response) {
                settimelimit(response.data)
            });

            axios.get(`http://localhost/recommendation_system/api/user/Exam_Information.php?SUBJECT='${sub.id}'`).then(function (response) {
                settotal(prev => [
                    ...prev,
                    response.data[0]
                ])
            })
        })
    }, [])

    let i = 0
    function recommend(a, b) {

        if(b === "Failed"){
            return <p className="Result_Failed">Thank you for taking the examination, unfortunately you didn't got the passing score to get a recommended course please contact an admin to know how to retake the examination at a further notice</p>
        }else{
            if (a === "I AND S" || a === "S AND I") {
                return (
                    <div>
                        <p className="ul">Health Science</p>
                        <ul>
                            {
                                subscore.map((prev, index) => {
                                    if (prev.INTEREST === "Health Science") {
                                        return (
                                            <Link key={index} to={`../../Course_Directory/${prev.CID}`} className="Link">
                                                <li className="li">{prev.COURSE_NAME}</li>
                                            </Link>
                                        )
                                    }
                                })
    
                            }
                        </ul>
                        <p className="ul">Education & Training</p>
                        <ul>
                            {
                                subscore.map((prev, index) => {
                                    if (prev.INTEREST === "Education & Training") {
                                        return (
                                            <li key={index} className="li">{prev.COURSE_NAME}</li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>
                )
            }
            else if (a === "R AND S" || a === "S AND R") {
                return (
                    <div>
                        <p className="ul">Health Science</p>
                        <ul>
                            {
                                subscore.map((prev, index) => {
                                    if (prev.INTEREST === "Health Science") {
                                        return (
                                            <Link key={index} to={`../../Course_Directory/${prev.CID}`} className="Link">
                                                <li className="li">{prev.COURSE_NAME}</li>
                                            </Link>
                                        )
                                    }
                                })
    
                            }
                        </ul>
                        <p className="ul">Human Service</p>
                        <ul>
                            {
                                subscore.map((prev, index) => {
                                    if (prev.INTEREST === "Human Service") {
                                        return (
                                            <li key={index} className="li">{prev.COURSE_NAME}</li>
                                        )
                                    }
                                })
                            }
                        </ul>
                        <p className="ul">Law & Public Safety</p>
                        <ul>
                            {
                                subscore.map((prev, index) => {
                                    if (prev.INTEREST === "Law & Public Safety") {
                                        return (
                                            <li key={index} className="li">{prev.COURSE_NAME}</li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>
                )
            }
            else if (a === "R AND E" || a === "E AND R") {
                return (
                    <div>
                        <p className="ul">Arts & Communications</p>
                        <ul>
                            {
                                subscore.map((prev, index) => {
                                    if (prev.INTEREST === "Arts & Communications") {
                                        return (
                                            <Link key={index} to={`../../Course_Directory/${prev.CID}`} className="Link">
                                                <li className="li">{prev.COURSE_NAME}</li>
                                            </Link>
                                        )
                                    }
                                })
    
                            }
                        </ul>
                        <p className="ul">Hospitality & Tourism</p>
                        <ul>
                            {
                                subscore.map((prev, index) => {
                                    if (prev.INTEREST === "Hospitality & Tourism") {
                                        return (
                                            <li key={index} className="li">{prev.COURSE_NAME}</li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>
                )
            }
            else if (a === "I AND R" || a === "R AND I") {
                return (
                    <div>
                        <p className="ul">Agriculture</p>
                        <ul>
                            {
                                subscore.map((prev, index) => {
                                    if (prev.INTEREST === "Agriculture") {
                                        return (
                                            <Link key={index} to={`../../Course_Directory/${prev.CID}`} className="Link">
                                                <li className="li">{prev.COURSE_NAME}</li>
                                            </Link>
                                        )
                                    }
                                })
    
                            }
                        </ul>
                        <p className="ul">Health Science</p>
                        <ul>
                            {
                                subscore.map((prev, index) => {
                                    if (prev.INTEREST === "Health Science") {
                                        return (
                                            <li key={index} className="li">{prev.COURSE_NAME}</li>
                                        )
                                    }
                                })
                            }
                        </ul>
                        <p className="ul">Information Technology</p>
                        <ul>
                            {
                                subscore.map((prev, index) => {
                                    if (prev.INTEREST === "Information Technology") {
                                        return (
                                            <li key={index} className="li">{prev.COURSE_NAME}</li>
                                        )
                                    }
                                })
                            }
                        </ul>
                        <p className="ul">Science, Technology & Math</p>
                        <ul>
                            {
                                subscore.map((prev, index) => {
                                    if (prev.INTEREST === "Science, Technology & Math") {
                                        return (
                                            <li key={index} className="li">{prev.COURSE_NAME}</li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>
                )
            }
            else if (a === "A AND S" || a === "S AND A") {
                return (
                    <div>
                        <p className="ul">Education & Training</p>
                        <ul>
                            {
                                subscore.map((prev, index) => {
                                    if (prev.INTEREST === "Education & Training") {
                                        return (
                                            <Link key={index} to={`../../Course_Directory/${prev.CID}`} className="Link">
                                                <li className="li">{prev.COURSE_NAME}</li>
                                            </Link>
                                        )
                                    }
                                })
    
                            }
                        </ul>
                        <p className="ul">Arts & Communications</p>
                        <ul>
                            {
                                subscore.map((prev, index) => {
                                    if (prev.INTEREST === "Arts & Communications") {
                                        return (
                                            <li key={index} className="li">{prev.COURSE_NAME}</li>
                                        )
                                    }
                                })
                            }
                        </ul>
                        <p className="ul">Marketing & Sales</p>
                        <ul>
                            {
                                subscore.map((prev, index) => {
                                    if (prev.INTEREST === "Marketing & Sales") {
                                        return (
                                            <li key={index} className="li">{prev.COURSE_NAME}</li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>
                )
            }
            else if (a === "A AND R" || a === "R AND A") {
                return (
                    <div>
                        <p className="ul">Arts & Communications</p>
                        <ul>
                            {
                                subscore.map((prev, index) => {
                                    if (prev.INTEREST === "Arts & Communications") {
                                        return (
                                            <Link key={index} to={`../../Course_Directory/${prev.CID}`} className="Link">
                                                <li className="li">{prev.COURSE_NAME}</li>
                                            </Link>
                                        )
                                    }
                                })
    
                            }
                        </ul>
                        <p className="ul">Education & Training</p>
                        <ul>
                            {
                                subscore.map((prev, index) => {
                                    if (prev.INTEREST === "Education & Training") {
                                        return (
                                            <li key={index} className="li">{prev.COURSE_NAME}</li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>
                )
            }
            else if (a === "S AND E" || a === "E AND S") {
                return (
                    <div>
                        <p className="ul">Government</p>
                        <ul>
                            {
                                subscore.map((prev, index) => {
                                    if (prev.INTEREST === "Government") {
                                        return (
                                            <Link key={index} to={`../../Course_Directory/${prev.CID}`} className="Link">
                                                <li className="li">{prev.COURSE_NAME}</li>
                                            </Link>
                                        )
                                    }
                                })
    
                            }
                        </ul>
                        <p className="ul">Law & Public Safety</p>
                        <ul>
                            {
                                subscore.map((prev, index) => {
                                    if (prev.INTEREST === "Law & Public Safety") {
                                        return (
                                            <li key={index} className="li">{prev.COURSE_NAME}</li>
                                        )
                                    }
                                })
                            }
                        </ul>
                        <p className="ul">Marketing & Sales</p>
                        <ul>
                            {
                                subscore.map((prev, index) => {
                                    if (prev.INTEREST === "Marketing & Sales") {
                                        return (
                                            <li key={index} className="li">{prev.COURSE_NAME}</li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>
                )
            }
            else if (a === "E AND C" || a === "C AND E") {
                return (
                    <div>
                        <p className="ul">Business & Management</p>
                        <ul>
                            {
                                subscore.map((prev, index) => {
                                    if (prev.INTEREST === "Business & Management") {
                                        return (
                                            <Link key={index} to={`../../Course_Directory/${prev.CID}`} className="Link">
                                                <li className="li">{prev.COURSE_NAME}</li>
                                            </Link>
                                        )
                                    }
                                })
    
                            }
                        </ul>
                        <p className="ul">Finance</p>
                        <ul>
                            {
                                subscore.map((prev, index) => {
                                    if (prev.INTEREST === "Finance") {
                                        return (
                                            <li key={index} className="li">{prev.COURSE_NAME}</li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>
                )
            }
            else if (a === "E AND A" || a === "A AND E") {
                return (
                    <div>
                        <p className="ul">Arts & Communications</p>
                        <ul>
                            {
                                subscore.map((prev, index) => {
                                    if (prev.INTEREST === "Arts & Communications") {
                                        return (
                                            <Link key={index} to={`../../Course_Directory/${prev.CID}`} className="Link">
                                                <li className="li">{prev.COURSE_NAME}</li>
                                            </Link>
                                        )
                                    }
                                })
    
                            }
                        </ul>
                        <p className="ul">Marketing & Sales</p>
                        <ul>
                            {
                                subscore.map((prev, index) => {
                                    if (prev.INTEREST === "Marketing & Sales") {
                                        return (
                                            <li key={index} className="li">{prev.COURSE_NAME}</li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>
                )
            }
            else if (a === "C AND R" || a === "R AND C") {
                return (
                    <div>
                        <p className="ul">Architecture & Construction</p>
                        <ul>
                            {
                                subscore.map((prev, index) => {
                                    if (prev.INTEREST === "Architecture & Construction") {
                                        return (
                                            <Link key={index} to={`../../Course_Directory/${prev.CID}`} className="Link">
                                                <li className="li">{prev.COURSE_NAME}</li>
                                            </Link>
                                        )
                                    }
                                })
    
                            }
                        </ul>
                        <p className="ul">Manufacturing</p>
                        <ul>
                            {
                                subscore.map((prev, index) => {
                                    if (prev.INTEREST === "Manufacturing") {
                                        return (
                                            <li key={index} className="li">{prev.COURSE_NAME}</li>
                                        )
                                    }
                                })
                            }
                        </ul>
                        <p className="ul">Transportation</p>
                        <ul>
                            {
                                subscore.map((prev, index) => {
                                    if (prev.INTEREST === "Transportation") {
                                        return (
                                            <li key={index} className="li">{prev.COURSE_NAME}</li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>
                )
            }
        }
    }

    const column = [
        { id: "Subjects", },
        { id: "Time Finish", },
        { id: "Efficiancy + Accuracy", },

    ]
    
    const highsub = Object.keys(overall).sort(function (a, b) { return overall[b] - overall[a] })
    // console.log(highsub)
    return (
        <Zoom in={true} timeout={500}>
            <div className="Result">
                <div className="Result-box">
                    <p className="Result_p1">OverAll Results</p>
                    <div>
                        <p className="Result_p2">SAT OverAll Result: </p>
                        <div className="Result_Table_Column">
                            {
                                column.map((prev, index) => {
                                    return (
                                        <div key={index} className="Result_Table_Title">{prev.id}</div>
                                    )
                                })
                            }
                        </div>
                        <div>
                            {
                                subject.map((prev, index) => {
                                    return (
                                        <div key={index} className="Result_Table_Row">
                                            <div className="Result_Table_p1">{prev.Subject}</div>
                                            <div className="Result_Table_p1">{prev.minute}:{prev.second}</div>
                                            <div className="Result_Table_p1">{overall[prev.id]}</div>
                                            {/* {convert(prev)} */}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <p className="Result_p2" style={{marginTop: '20px'}}> Total Score: </p>
                        <p className="Result_p3">{satresult.length === 0 ? "" : satresult[0].TOTAL_SCORE}</p>
                    </div>

                    <div>
                        <p className="Result_p2"> Highest Subject: </p>
                        <p className="Result_p3">{highsub.length === 0 ? 0 : highsub[0]}</p>
                    </div>

                    <div>
                        <p className="Result_p2">Interest Assement Result: </p>
                        <p className="Result_p3">{iaresult.length === 0 ? "" : iaresult[0].IA_RESULT}</p>
                    </div>

                    <div>
                        <p className="Result_p2">Exam Result: </p>
                        <p className="Result_p3">{satresult.length === 0 ? "" : satresult[0].EXAM_RESULT}</p>
                    </div>

                    <div>
                        <p className="Result_p2">Recommeded Course: </p>
                        <div>{recommend(iaresult.length === 0 ?"" :iaresult[0].IA_RESULT, 
                        satresult.length === 0 ? "" :satresult[0].EXAM_RESULT)}</div>
                    </div>

                </div>
                <div className="Result-box2">
                    <div className="Profile-result-exam">
                        <div style={{ padding: "50px" }}>
                            <h1 className="result-title">Scholastic Assessment Test</h1>
                            <p className="result-p">Result:</p>
                            <div className="Profile-subjects">
                                {
                                    subject.map((sub) => (
                                        <div key={sub.Subject} className={`sub ${sub.Subject}`}>
                                            <h1>{sub.Subject}</h1>

                                            <Box sx={{ position: 'relative' }}>
                                                <CircularProgress
                                                    variant="determinate"
                                                    sx={{
                                                        color: "#e9ecef",
                                                    }}
                                                    size={90}
                                                    thickness={3}
                                                    value={100}
                                                />
                                                <CircularProgress
                                                    variant="determinate"

                                                    sx={{
                                                        color: `${sub.bg}`,
                                                        position: "absolute",
                                                        left: 0
                                                    }}
                                                    size={90}
                                                    thickness={3}
                                                    value={sub.result / sub.total * 100}
                                                />
                                            </Box>
                                            <div className="sub_score_box">
                                                <p className="sub_score">{sub.result}</p>
                                                <p className="sub_score_txt">Score</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="Profile-result-ia">
                        <div style={{ padding: "50px" }}>
                            <h1 className="result-title">Interest Assessment</h1>
                            <p className="result-p">Result:</p>
                            <div className="Profile-interest">
                                {
                                    interest.map((e) => (
                                        <div key={e.Interest} className="interest-div">
                                            <h1>{e.Interest}</h1>
                                            <Box sx={{ width: '100%' }}>
                                                <LinearProgress
                                                    sx={{
                                                        backgroundColor: `${e.Bg}`,
                                                        '& .MuiLinearProgress-bar': {
                                                            backgroundColor: `${e.Color}`
                                                        }
                                                    }}
                                                    variant="determinate"
                                                    value={e.result / 7 * 100}
                                                />
                                            </Box>
                                            <p>{e.result}</p>
                                        </div>
                                    ))
                                }

                                {/* <div><p>Realistic</p></div>
                            <div><p>Investigative</p></div>
                            <div><p>Artistic</p></div>
                            <div><p>Social</p></div>
                            <div><p>Enterprising</p></div>
                            <div><p>Conventional</p></div> */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </Zoom>
    )
}
