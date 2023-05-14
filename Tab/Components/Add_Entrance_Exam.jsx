import "../../../../css/Admin/Form/Entrance_Exam.css"
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import React from "react";
import { Button, Fade, Grow, Zoom, ListItemButton, Collapse } from "@mui/material"
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LinearProgress from '@mui/material/LinearProgress';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

export default function Add_Entrance_Exam() {
    const url = location.href.split('/').at(-1);
    const nav = useNavigate()
    const [subjectinfo, setsubjectinfo] = React.useState([])
    // const [sub, setsub] = React.useState("eq_math")

    // const buttons = (a) => {
    //     return (
    //         <div className="tabs_button">
    //             {a !== 0 ? <Button sx={prevbutton_sx} onClick={() => settab(prev => prev - 1)}>Previous</Button> : <span></span>}
    //             {a == '2' ? <Button sx={nextbutton_sx} onClick={{}}>Update</Button> :
    //                 <Button sx={nextbutton_sx} onClick={() => settab(prev => prev + 1)}>Next</Button>}
    //         </div>
    //     )
    // }

    React.useEffect(() => {
        axios.get(`http://localhost/recommendation_system/api/admin/SAT.php?FETCH='SUB'&&ID="${url}"`).then(function (response) {
            setsubjectinfo(response.data)
        })
    }, [])

    const onChangehandle = (event) => {
        const { name, value, id } = event.target

        // setsubjectinfo(current =>
        //     current.map(obj => {
        //         if (obj.EID === id) {
        //             return { ...obj, [name]: value };
        //         }

        //         return obj;
        //     }),
        // );

        if (value.length <= 2 && id=="number" || id=="text") {
            setsubjectinfo(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const onSubmit = () => {
        axios.put(`http://localhost/recommendation_system/api/admin/SAT.php`, subjectinfo).then(function (response) {
            // console.log(response.data)
            if(response.data){
                alert("Record updated successfully")
                nav("../")
            }
        })
    }
    // const tab1 = (
    //     <Zoom in={true} timeout={800}>
    //         <div style={{ width: '90%' }}>
    //             <p className="tab_p1">Subjects Information</p>
    //             <p className="tab_p2">Give your each subject a instructions so it gives clearifications to the students</p>

    //             <div className="tab1_form">
    //                 {
    //                     subjectinfo.map((sub, index) => {
    //                         return (
    //                             <div key={index}>
    //                                 <p className="Tab_title">{subjectinfo.SUBJECT} Instruction</p>
    //                                 <textarea
    //                                     id={subjectinfo.EID}
    //                                     name="INSTRUCTION"
    //                                     className="tab_input"
    //                                     style={{ height: "100px" }}
    //                                     placeholder={`${subjectinfo.SUBJECT} Description`}
    //                                     value={subjectinfo.INSTRUCTION}
    //                                     onChange={onChangehandle}
    //                                     // minLength={7}
    //                                     // maxLength={16}
    //                                     required
    //                                 />
    //                             </div>
    //                         )
    //                     })
    //                 }
    //             </div>
    //             <Button sx={nextbutton_sx} onClick={() => settab(prev => prev + 1)}>Next</Button>
    //         </div>
    //     </Zoom>
    // )

    // const tab2 = (
    //     <Grow in={true} timeout={800}>
    //         <div style={{ width: '50%' }}>
    //             <p className="tab_p1">Settings</p>
    //             <p className="tab_p2"></p>
    //             <div className="tab1_form">
    //                 {
    //                     subjectinfo.map((sub, index) => {
    //                         return (
    //                             <div key={index}>
    //                                 <p>{sub.SUBJECT} Settings</p>

    //                                 <div style={{ display: 'flex', gap: '10px' }}>
    //                                     <input type="number" name="TOTAL_ITEMS" id={sub.EID} className="tab_input" style={{ width: '30px' }} value={sub.TOTAL_ITEMS} onChange={onChangehandle} />
    //                                     <input type="number" name="TIMELIMIT_MINUTE" id={sub.EID} className="tab_input" style={{ width: '30px' }} value={sub.TIMELIMIT_MINUTE} onChange={onChangehandle} />
    //                                     <input type="number" name="TIMELIMIT_SECOND" id={sub.EID} className="tab_input" style={{ width: '30px' }} value={sub.TIMELIMIT_SECOND} onChange={onChangehandle} />
    //                                 </div>
    //                             </div>
    //                         )
    //                     })
    //                 }
    //             </div>
    //             {buttons(1)}
    //         </div>
    //     </Grow>
    // )
    // let no = question.length === 0
    // const tab3 = (
    //     <Zoom in={true} timeout={800}>
    //         <div style={{ width: '100%' }}>
    //             <p className="tab_p1">Questions</p>
    //             <div className="box_choices">
    //                 {
    //                     subjects.map((subject, index) => {
    //                         let a = subject.id === sub
    //                         return (
    //                             <div key={index} className="EE_subject" onClick={() => setsub(subject.id)}
    //                                 style={{
    //                                     border: a ? "1px solid #8dbc6bff" : "1px solid #e0e3e6",
    //                                 }}>{subject.label}</div>
    //                         )
    //                     })
    //                 }
    //             </div>
    //             <div className="tab3_form">
    //                 <p>{no ? "" : question[questionno].Question}</p>
    //                 <div>{no ? "" : question[questionno].Choice_A}</div>
    //                 <div>{no ? "" : question[questionno].Choice_B}</div>
    //                 <div>{no ? "" : question[questionno].Choice_C}</div>
    //                 <div>{no ? "" : question[questionno].Choice_D}</div>
    //                 <button onClick={() => setquestionno(prev => prev - 1)}>Back</button>
    //                 <button onClick={() => setquestionno(prev => prev + 1)}>Next</button>
    //             </div>
    //             {buttons(1)}
    //         </div>
    //     </Zoom>
    // )

    // console.log(subjectinfo)
    return (
        <div className="Add_Entrance_Exam">
            <div className="A_EE_BreadCrumbs">
                <p style={{ color: 'rgba(37, 42, 53, 0.6)' }}>Scholastic Aptitude Test </p>
                <ArrowForwardIosRoundedIcon sx={{ fontSize: '14px' }} />
                <p style={{ fontWeight: '700' }}>{subjectinfo.SUBJECT}</p>
            </div>
            <div className="A_EE_tab1">
                <div style={{ width: '100%' }}>
                    <p className="tab_p1">Subjects Information</p>
                    <p className="tab_p2">Give your each subject a instructions so it gives clearifications to the students</p>

                    <div className="tab1_form">
                        <div>
                            <p className="Tab_title">{subjectinfo.SUBJECT} Instruction</p>
                            <textarea
                                id="text"
                                name="INSTRUCTION"
                                className="tab_input"
                                style={{ height: "100px" }}
                                placeholder={`${subjectinfo.SUBJECT} Description`}
                                value={subjectinfo.INSTRUCTION || ""}
                                onChange={onChangehandle}
                                // minLength={7}
                                // maxLength={10}
                                required
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '50px' }}>
                            <div className="limit">
                                <p className="Tab_title">Total Items</p>
                                <input type="number" name="TOTAL_ITEMS" id="number" className="tab_input" style={{ width: '50px' }} value={subjectinfo.TOTAL_ITEMS || ""} onChange={onChangehandle} max={30} min={5} maxLength={2} disabled />
                            </div>
                            <div className="limit">
                                <p className="Tab_title">TimeLimit (Minute)</p>
                                <input type="number" name="TIMELIMIT_MINUTE" id="number" className="tab_input" style={{ width: '50px' }} value={subjectinfo.TIMELIMIT_MINUTE || ""} onChange={onChangehandle} max={50} min={0} />
                            </div>
                            <div className="limit">
                                <p className="Tab_title">TimeLimit (Second)</p>
                                <input type="number" name="TIMELIMIT_SECOND" id="number" className="tab_input" style={{ width: '50px' }} value={subjectinfo.TIMELIMIT_SECOND || ""} onChange={onChangehandle} max={59} min={0} />
                            </div>
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