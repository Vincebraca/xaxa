import axios from "axios"
import React from "react"
import { FormControl, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../../../css/Admin/Form/IA_ADD.css"
export default function InterestForm() {
    const [Dataform, setDataform] = React.useState({})
    const nav = useNavigate()
    const field = [          //Field in dialog
        { id: 'IAQID', label: 'IAQID' },
        { id: 'QUESTION', label: 'Question' },
        { id: 'HIP', label: 'HIP' },
    ]

    React.useEffect(() => {
        axios.get(`http://localhost/recommendation_system/api/admin/Count.php?table=ia_questions`).then(function (response) {
            // setcount(response.data)
            setDataform(() => ({
                IAQID: `IAQID_${response.data + 1}`,
                QUESTION: "",
                HIP: "",
            }))
        })
    }, [])

    const handleSubmit = () => {
        axios.post(`http://localhost/recommendation_system/api/admin/IA_Questions.php`, Dataform).then(function (response) {
            // console.log(response.data)
        })
        nav("../")
    }

    const onChange = (event) => {
        const { name, value } = event.target

        setDataform((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    return (
        <div className="IAFormadd">
        <p>Add</p>
        <div>
            {
                field.map((val, index) => {
                    let value = Dataform[val.id] || ""
                    return (
                        <div key={index}>
                            {
                                val.id === "HIP" ?
                                    <FormControl sx={{ mt: "10px", width: "100%", border: "0px" }} size="small">
                                        <Select
                                            value={Dataform.HIP || ""}
                                            onChange={onChange}
                                            displayEmpty
                                            name="HIP"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="Realistic">Realistic</MenuItem>
                                            <MenuItem value="Investigative">Investigative</MenuItem>
                                            <MenuItem value="Artistic">Artistic</MenuItem>
                                            <MenuItem value="Social">Social</MenuItem>
                                            <MenuItem value="Enterprising">Enterprising</MenuItem>
                                            <MenuItem value="Conventional">Conventional</MenuItem>
                                        </Select>
                                    </FormControl>
                                    :

                                    <input disabled={index === 0 ? true : false} className="" name={val.id} placeholder={val.label} value={value} onChange={onChange} />
                            }
                        </div>
                    )
                })
            }
            <div>
                <button className="add" onClick={handleSubmit}>Add</button>
            </div>
        </div>
    </div>
    )
}