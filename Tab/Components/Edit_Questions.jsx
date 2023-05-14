import "../../../../css/Admin/Form/Entrance_Exam.css"
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import React from "react";
import { Button } from "@mui/material"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';

const nextbutton_sx = {
    padding: '5px 30px',
    border: '1px solid #F8F9FA',
    color: 'white',
    textTransform: 'none',
    fontFamily: 'Poppins',
    letterSpacing: '1px',
    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 12px',
    transition: '0.5s',
    backgroundColor: '#69b96eff',
    '&:hover': {
        backgroundColor: 'rgb(92, 166, 97)'
    }
}

export default function Edit_Questions() {
    const url = location.href.split('/').at(-1);
    const nav = useNavigate()
    const [questioninfo, setquestioninfo] = React.useState({})
    const sub = location.href.split('/').at(-3);
    const subject = `eq_${sub.toLowerCase()}`
    const [answer, setanswer] = React.useState()

    React.useEffect(() => {
        axios.get(`http://localhost/recommendation_system/api/admin/SAT_Questions.php?FETCH='SUB'&&ID="${url}"&&SUB=${subject}`).then(function (response) {
            setquestioninfo(response.data)
            setanswer(response.data.Answer)
        })
    }, [])

    const onChangehandle = (event) => {
        const { name, value, id, checked } = event.target


        setquestioninfo(prev => ({
            ...prev,
            [name]: value
        }))

        if(name ==="Answer"){
            setanswer(value)
        }
    }

    const onSubmit = () => {
        axios.put(`http://localhost/recommendation_system/api/admin/SAT_Questions.php?SUB=${subject}`, questioninfo).then(function (response) {
            if (response.data) {
                alert("Record updated successfully")
                nav("..")
            }
        })
    }

    const choice = [
        { id: 'Choice_A', label: 'Choice A' },
        { id: 'Choice_B', label: 'Choice B' },
        { id: 'Choice_C', label: 'Choice C' },
        { id: 'Choice_D', label: 'Choice D' },
    ]

    // console.log(questioninfo)

    return (
        <div className="Add_Entrance_Exam">
            <div className="A_EE_BreadCrumbs">
                <p style={{ color: 'rgba(37, 42, 53, 0.6)' }}>Questions</p>
                <ArrowForwardIosRoundedIcon sx={{ fontSize: '14px' }} />
                <p style={{ fontWeight: '700' }}>{sub}</p>
            </div>
            <div className="A_EE_tab1">
                <div style={{ width: '100%' }}>
                    <p className="tab_p1">{sub} Question</p>
                    <p className="tab_p2">Update the questions, and choices</p>

                    <div className="tab3_form">
                        <div>
                            <p className="Tab_title">Question</p>
                            <textarea
                                id="text"
                                name="Question"
                                className="tab_input"
                                style={{ height: "100px" }}
                                placeholder={`${sub} Question`}
                                value={questioninfo.Question || ""}
                                onChange={onChangehandle}
                                // minLength={7}
                                // maxLength={10}
                                required
                            />
                        </div>
                        <div className="choices">
                            {
                                choice.map((val, index) => {
                                    return (
                                        <div key={index}>
                                            <p className="Tab_title"><Checkbox checked={questioninfo[val.id] === answer} name="Answer" value={questioninfo[val.id]} size="small" sx={{ padding: "0px" }} color="success" onClick={onChangehandle}/>{val.label}</p>
                                            <input type="text" name={val.id} className="tab_input" value={questioninfo[val.id] || ""} onChange={onChangehandle} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <Button sx={nextbutton_sx} onClick={onSubmit}>Update</Button>
                </div>


            </div>
        </div>
    )
}

// style={{color: '#5d616bff'}}

{/* {
                        subjects.map((val, index) => {
                            const { id, label, itemNo } = val
                            return (
                                <div key={id}>
                                    <ListItemButton onClick={handleopentab(index)}
                                        sx={{
                                            display: "flex",
                                            gap: "15px",
                                            alignItems: "center",
                                            justifyContent: 'space-between',
                                            backgroundColor: expanded === index ? "rgb(67, 160, 71,0.05)" : 'none',
                                            border: '1px solid #E9ECEF',
                                            borderBottom: index === 3 ? '1px solid #E9ECEF' : '0px',
                                            "&:hover": {
                                                backgroundColor: "rgb(67, 160, 71,0.05)"
                                            }
                                        }}
                                    >
                                        <div className="tabs_linear">
                                            <p className="tabs_p3">{label}</p>
                                        </div>
                                        <div className="tabs_linear">
                                            <div style={{ width: '100%' }}>
                                                <LinearProgress variant="determinate" value={0} sx={{ borderRadius: '20px' }} />
                                            </div>
                                            <p>0/{itemNo}</p>
                                            <ExpandLessRoundedIcon sx={{ transform: expanded ? 'rotate(0deg)' : 'rotate(-180deg)', transition: '0.3s' }} />
                                        </div>
                                    </ListItemButton>
                                    <Collapse in={expanded === index} timeout="auto" unmountOnExit sx={{ border: '1px solid #E9ECEF', borderBottom: '0px' }}>
                                        <div className="tabs_questions">
                                            <div className="CHOICEA">
                                                <p>Choice A <span style={{ color: '#db514cff' }}>*</span></p>
                                                <input className="tab_input" placeholder="Instruction I." />
                                            </div>
                                            <div className="CHOICEB">
                                                <p>Choice B <span style={{ color: '#db514cff' }}>*</span></p>
                                                <input className="tab_input" placeholder="Instruction I." />
                                            </div>
                                            <div className="CHOICEC">
                                                <p>Choice C <span style={{ color: '#db514cff' }}>*</span></p>
                                                <input className="tab_input" placeholder="Instruction I." />
                                            </div>
                                            <div className="CHOICED">
                                                <p>Choice D <span style={{ color: '#db514cff' }}>*</span></p>
                                                <input className="tab_input" placeholder="Instruction I." />
                                            </div>
                                            <div className="Question">
                                                <p>Question No. 1 <span style={{ color: '#db514cff' }}>*</span></p>
                                                <input className="tab_input" placeholder="Instruction I." />
                                            </div>
                                            <div className="questionstatus">
                                                <p>Question No.</p>
                                                {
                                                    // QuestionNo(itemNo)
                                                }
                                            </div>
                                            <div className="answer">
                                                Answer
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <button className="tabs_question_qbutton">
                                                <ExpandLessRoundedIcon sx={{ transform: 'rotate(-90deg)', fontSize: '20px' }} />
                                                Previous Question
                                            </button>
                                            <button className="tabs_question_nbutton">
                                                Next Question
                                                <ExpandLessRoundedIcon sx={{ transform: 'rotate(90deg)', fontSize: '20px' }} />
                                            </button>
                                        </div>
                                    </Collapse>
                                </div>
                            )
                        })
                    } */}