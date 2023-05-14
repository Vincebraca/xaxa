import "../../../../css/User/Tabs/Components/IA.css"
import LinearProgress from '@mui/material/LinearProgress';
import ThumbDownOffAltRoundedIcon from '@mui/icons-material/ThumbDownOffAltRounded';
import React from "react";
import axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom";

export default function IA() {


    const user = window.localStorage.getItem('USER_DATA')
    const [iaresult, setiaresult] = React.useState([
        { Interest: "Realistic", Score: 0, sub: ["R AND I", "R AND A", "R AND S", "R AND E", "R AND C"] },
        { Interest: "Investigative", Score: 0, sub: ["R AND I", "I AND S"] },
        { Interest: "Artistic", Score: 0, sub: ["R AND A", "A AND S", "E AND A"] },
        { Interest: "Social", Score: 0, sub: ["R AND S", "I AND S", "A AND S", "S AND E"] },
        { Interest: "Enterprising", Score: 0, sub: ["R AND E", "E AND A", "S AND E", "E AND C"] },
        { Interest: "Conventional", Score: 0, sub: ["R AND C", "E AND C"] }
    ])

    const [questions, setquestions] = React.useState([])
    const [questionno, setquestionno] = React.useState(0)
    const [answer, setanswer] = React.useState(
        {
            lrn: JSON.parse(user).LRN,
            id: '',
            value: '',
            field: '',
            position: 0,
            interest: '',
        }
    )

    const navigate = useNavigate()

    var totalq = Object.keys(questions).length;

    const [timelimit, setlimit] = React.useState([])
    const [examinfo, setexaminfo] = React.useState([])
    const [examresult, setexamresult] = React.useState([])

    React.useEffect(() => {
        axios.get(`http://localhost/recommendation_system/api/user/IA_Questions.php`).then(function (response) {
            setquestions(response.data)
        })

        axios.get(`http://localhost/recommendation_system/api/user/AddTimelimit.php?LRN='${JSON.parse(user).LRN}'`).then(function (response) {
            setlimit(response.data)
        });

        axios.get(`http://localhost/recommendation_system/api/user/GetExam_Information.php`).then(function (response) {
            setexaminfo(response.data)
        });

        axios.get(`http://localhost/recommendation_system/api/user/Result.php?LRN="${JSON.parse(user).LRN}"&&FETCH='EX'`).then(function (response) {
            setexamresult(response.data)
        });
    }, [])

    const exam_algo = () => {

        let Maccuracy = examresult[0].MATH_SCORE / examinfo[0].TOTAL_ITEMS * 100
        let Maveragetime = timelimit[0].MATH_MINUTE * 60 + timelimit[0].MATH_SECOND / 1
        let Mefficiancy = Maccuracy * (1/Maveragetime)

        let Saccuracy = examresult[0].SCIENCE_SCORE / examinfo[1].TOTAL_ITEMS * 100
        let Saveragetime = timelimit[0].SCIENCE_MINUTE * 60 + timelimit[0].SCIENCE_SECOND / 1
        let Sefficiancy = Saccuracy * (1/Saveragetime)

        let Eaccuracy = examresult[0].ENGLISH_SCORE / examinfo[2].TOTAL_ITEMS * 100
        let Eaveragetime = timelimit[0].ENGLISH_MINUTE * 60 + timelimit[0].ENGLISH_SECOND / 1
        let Eefficiancy = Eaccuracy * (1/Eaveragetime)

        let Raccuracy = examresult[0].READING_COMPREHENSION_SCORE / examinfo[3].TOTAL_ITEMS * 100
        let Raveragetime = timelimit[0].READING_COMPREHENSION_MINUTE * 60 + timelimit[0].READING_COMPREHENSION_SECOND / 1
        let Refficiancy = Raccuracy * (1/Raveragetime)

        const saves = {
            Math: Mefficiancy.toFixed(4),
            Science: Sefficiancy.toFixed(4),
            English: Eefficiancy.toFixed(4),
            Reading: Refficiancy.toFixed(4),
            lrn : JSON.parse(user).LRN
        }
        axios.post(`http://localhost/recommendation_system/api/user/AddOverAll.php`, saves).then(function (response) {
            // console.log(response.data)
        })

        axios.put(`http://localhost/recommendation_system/api/user/updateexamtaken.php?LRN='${JSON.parse(user).LRN}'`).then(function (response) {
            // console.log(response.data)
        })

    }

    const nextquestion = (res) => (event) => {
        const { value } = event.target

        setanswer(prev => ({
            ...prev,
            [qn]: value
        }))

        setquestionno(prev => prev + 1)

        let qn = questionno + 1

        if (questionno === totalq - 2) {
            const ranking = iaresult.sort(function (a, b) {
                return b.Score - a.Score;
            });

            ia_algo(iaresult[0].sub, iaresult[1].sub, iaresult[2].sub)
            exam_algo()
            navigate("../Exam_Result")

        } else if (res != undefined) {
            setiaresult(prev => prev.map((val, index) => {
                if (val.Interest === res) {
                    return { ...val, Score: iaresult[index].Score + 1 }
                }

                return val
            }))
        }
    }

    const ia_algo = (a, b, c) => {

        let result

        const ar = a.filter(element => b.includes(element));
        if (ar.length === 0) {
            const ab = a.filter(element => c.includes(element));
            if (ab.length === 0) {
                const ar = b.filter(element => c.includes(element));
                result = ar
            } else {
                result = ab
            }
        } else {
            result = ar
        }

        const R = iaresult.find((e) => e.Interest === "Realistic")
        const I = iaresult.find((e) => e.Interest === "Investigative")
        const A = iaresult.find((e) => e.Interest === "Artistic")
        const S = iaresult.find((e) => e.Interest === "Social")
        const E = iaresult.find((e) => e.Interest === "Enterprising")
        const C = iaresult.find((e) => e.Interest === "Conventional")

        const saves = {
            r: R.Score,
            i: I.Score,
            a: A.Score,
            s: S.Score,
            e: E.Score,
            c: C.Score,
            result: result[0],
            lrn: JSON.parse(user).LRN,
        }

        axios.post(`http://localhost/recommendation_system/api/user/IA_Questions.php`, saves).then(function (response) {
            // console.log(response.data)
        })


    }
    return (
        <div className="IA">
            <p className="IA_p1">Interest Assessment </p>
            <p className="IA_p2">Directions: For the following exam please answer the exam as honestly as you can be because this will
                be the bearing of the recommended results that you would get. For each of the following statements, choose a one statement that describe or you are interest into.</p>
            <div style={{ width: '100%' }}>
                <LinearProgress color="success" value={-1} variant="determinate"
                    sx={{
                        height: '10px',
                        borderTopLeftRadius: '10px',
                        borderTopRightRadius: '10px'
                    }} />
            </div>
            <div className="IA_questions">
                <div className="IA_div0">
                    <p className="IA_q_p1">Question {questionno + 1} of {questions.length}</p>
                    <p className="IA_q_p2">I like to {questions.length === 0 ? "" : questions[questionno].QUESTION}</p>
                </div>
                <div className="IA_div">
                    <button className="IA_button1" onClick={nextquestion(totalq == 0 ? '' : questions[questionno].HIP)} value="YES">
                        <ThumbDownOffAltRoundedIcon
                            sx={{
                                transform: 'rotate(180deg)',
                                fontSize: '40px'
                            }} />
                        <p>YES</p>
                    </button>
                    <button className="IA_button2" onClick={nextquestion()} value="NO">
                        <ThumbDownOffAltRoundedIcon
                            sx={{
                                fontSize: '40px'
                            }} />
                        <p>NO</p>
                    </button>
                </div>
            </div>
        </div>
    )
}
