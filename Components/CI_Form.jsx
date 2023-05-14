import "../../../../css/Admin/Form/CI_Form.css"
import React from "react";
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Button, Fade } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const save_sx = {
    textTransform: "none",
    backgroundColor: "#8dbc6b",
    color: "white",
    fontFamily: "Poppins",
    letterSpacing: "1.5px",
    padding: "8px 25px",

    "&:hover": {
        backgroundColor: "#82ae62"
    }
}

const cancel_sx = {
    textTransform: "none",
    color: "#505161ff",
    fontFamily: "Poppins",
    padding: "8px 30px",
    border: "1px solid #DEE2E6",
    backgroundColor: "white",

    "&:hover": {
        backgroundColor: "#F8F9FA"
    }
}

export default function CI_Form() {

    const [Dataform, setDataform] = React.useState({})
    const [Coursejob, setCoursejob] = React.useState([])
    const [CoursePercentage, setCoursePercentage] = React.useState({})
    const [open, setOpen] = React.useState(false);
    const [count, setcount] = React.useState({
        course: 0,
        job: 0
    });
    const url = location.href.split('/').at(-1);
    let add = url === "Add"

    React.useEffect(() => {

        if (add) {
            axios.get(`http://localhost/recommendation_system/api/admin/Count.php?table=course_information`).then(function (response) {
                setcount(prev => ({
                    ...prev,
                    course: response.data
                }))
                // console.log(response.data)
                setDataform(prev => ({
                    ...prev,
                    CID: `CID_${response.data + 1}`
                }))
            })

            axios.get(`http://localhost/recommendation_system/api/admin/Count.php?table=course_information_job`).then(function (response) {
                setcount(prev => ({
                    ...prev,
                    job: response.data
                }))

                setCoursejob(prev => ([
                    { CIJID: `CIJID_${response.data + 1}`, JOB_NAME: '', INFORMATION: '', CID: '' },
                    { CIJID: `CIJID_${response.data + 2}`, JOB_NAME: '', INFORMATION: '', CID: '' },
                    { CIJID: `CIJID_${response.data + 3}`, JOB_NAME: '', INFORMATION: '', CID: '' },
                ]))
            })

            axios.get(`http://localhost/recommendation_system/api/admin/Count.php?table=course_percentage`).then(function (response) {
                setcount(prev => ({
                    ...prev,
                    percentage: response.data
                }))
                // console.log(response.data)
                setCoursePercentage(prev => ({
                    ...prev,
                    CPID: `CPID_${response.data + 1}`
                }))
            })
        } else {
            axios.get(`http://localhost/recommendation_system/api/admin/Course_Information.php?cid=${url}`).then(function (response) {
                setDataform(response.data)
            })

            axios.get(`http://localhost/recommendation_system/api/admin/Course_Job.php?cid="${url}"`).then(function (response) {
                setCoursejob(response.data)
            })

            axios.get(`http://localhost/recommendation_system/api/admin/Course_Percentage.php?cid="${url}"`).then(function (response) {
                setCoursePercentage(response.data)
            })
        }
    }, [])

    const field = [
        { id: "CID", label: "Course Information ID", text: "lorem ipsum", disabled: true },
        { id: "FIELD", label: "Field", text: "lorem ipsum" },
        { id: "ACRONYM", label: "Acronym", text: "lorem ipsum" },
        { id: "COURSE_NAME", label: "Course Name", text: "lorem ipsum" },
        { id: "INFORMATION", label: "Information", text: "lorem ipsum" },
        { id: "HEADER_PICTURE", label: "Header Picture", text: "lorem ipsum" },
        { id: "INTEREST", label: "Interest", text: "lorem ipsum" },
        { id: "JOB", label: "Job", text: "lorem ipsum" },
        { id: "COURSE_PERCENTAGE", label: "Course Percentage", text: "lorem ipsum" },
    ]

    const percentage = [
        { id: "MATH", label: "Math Percentage" },
        { id: "SCIENCE", label: "Science Percentage" },
        { id: "ENGLISH", label: "English Percentage" },
        { id: "READING_COMPREHENSION", label: "Reading Comprehension Percentage" },
    ]

    const tab = (val, job, cp) => {
        if (val.id === "INFORMATION") {
            return <textarea
                id="COURSE"
                name={val.id}
                className="CI_Form_input"
                style={{ height: "120px" }}
                placeholder={val.label}
                value={Dataform[`${val.id}`] || ''}
                onChange={onChange}
                required
            />
        } else if (val.id === "JOB") {
            return (
                job.map((course, index) => {
                    return (
                        <div key={index} className="Form_Job">
                            <input
                                className="CI_Form_input"
                                placeholder="Job Title"
                                id="JOB_NAME"
                                value={course.JOB_NAME || ""}
                                onChange={onChange}
                                // name={course.CIJID || `CIJID_${count.job + 1}`}
                                name={course.CIJID}
                                minLength={val.min}
                                maxLength={val.max}
                                pattern={val.pattern}
                                title={val.title}
                                required
                            />
                            <textarea
                                id="INFORMATION"
                                name={course.CIJID}
                                className="CI_Form_input"
                                style={{ height: "100px" }}
                                placeholder="Job Description"
                                value={course.INFORMATION || ""}
                                onChange={onChange}
                                // minLength={7}
                                // maxLength={16}
                                required
                            />
                        </div>
                    )
                })
            )
        } else if (val.id === "COURSE_PERCENTAGE") {
            return (
                percentage.map((sub, index) => {
                    return (
                        <div key={index} className="Form_Job">
                            <input
                                className="CI_Form_input"
                                placeholder={sub.label}
                                id="CP"
                                value={cp[sub.id] || ""}
                                onChange={onChange}
                                // name={course.CIJID || `CIJID_${count.job + 1}`}
                                name={sub.id}
                                minLength={val.min}
                                maxLength={val.max}
                                pattern={val.pattern}
                                title={val.title}
                                required
                            />
                        </div>
                    )
                })
            )
        } else {
            return <input
                name={val.id}
                type="text"
                className="CI_Form_input"
                placeholder={val.label}
                value={Dataform[`${val.id}`] || ""}
                onChange={onChange}
                id="COURSE"
                minLength={val.min}
                maxLength={val.max}
                pattern={val.pattern}
                title={val.title}
                disabled={val.disabled}
                required
            />
        }
    }

    const onChange = (event) => {
        const { name, value, id } = event.target

        if (id === "COURSE") {
            setDataform((prev) => ({
                ...prev,
                [name]: value
            }))
        } else if (id === "CP") {
            setCoursePercentage(prev => ({
                ...prev,
                [name]: value
            }))
        }
        else {
            setCoursejob(current =>
                current.map(obj => {
                    if (obj.CIJID === name) {
                        return { ...obj, [id]: value, CID: Dataform.CID };
                    }

                    return obj;
                }))
        }
    }

    const handleSubmit = () => {
        if (add) {
            axios.post(`http://localhost/recommendation_system/api/admin/Course_Information.php`, Dataform).then(function (response) {

                axios.post(`http://localhost/recommendation_system/api/admin/Course_Percentage.php?cid="${Dataform.CID}"`, CoursePercentage).then(function (response) {
                    Coursejob.map((prev) => {
                        axios.post(`http://localhost/recommendation_system/api/admin/Course_Job.php?cid="${Dataform.CID}"`, prev).then(function (response) {
                        })
                    })
                })

            })

        } else {
            axios.put(`http://localhost/recommendation_system/api/admin/Course_Information.php`, Dataform).then(function (response) {

                {
                    Coursejob.map((prev) => {
                        axios.put(`http://localhost/recommendation_system/api/admin/Course_Job.php?cid="${Dataform.CID}"`, prev).then(function (response) {
                        })
                    })
                }
            })
            axios.put(`http://localhost/recommendation_system/api/admin/Course_Percentage.php`, CoursePercentage).then(function (response) {
            })
        }

        setOpen(false)
    }

    // console.log(Dataform)
    return (
        <Fade in={true} timeout={1000}>
            <div className="CI_Form">
                <form onSubmit={(event) => { event.preventDefault(), setOpen(true) }}>
                    <div className="CI_Form_Title">
                        <div>
                            <p>{add ? "Add" : "Edit"} Course Information</p>
                            <p className="CI_Form_subTitle">Update the details and other information of a Course</p>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <div>
                                <input type="submit" value={add ? "Add" : "Save"} />
                            </div>
                            <Link to="../" style={{ textDecoration: 'none' }}>
                                <Button sx={cancel_sx}>Cancel</Button>
                            </Link>
                        </div>
                    </div>
                    {
                        field.map((val, index) => {
                            return (
                                <div className="CI_Form_container" key={index}>
                                    <div>
                                        <p className="CI_Form_p1">{val.label}</p>
                                        {/* <p className="CI_Form_p2">{val.text}</p> */}
                                    </div>
                                    <div>
                                        {tab(val, Coursejob, CoursePercentage)}
                                    </div>
                                </div>
                            )
                        })
                    }
                </form>
                <Dialog
                    open={open}
                // onClose={()=>setOpen(false)}
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Update a Record"}
                    </DialogTitle>
                    <DialogContent>
                        Are you sure you want to {add ? "Add" : "Update"} this?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={handleSubmit} autoFocus>
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Fade>
    )
}