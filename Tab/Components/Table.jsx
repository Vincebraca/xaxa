import "../../../../css/Admin/Form/Table.css"
import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Fade, IconButton, Chip } from "@mui/material";
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import Tooltip from '@mui/material/Tooltip';
import Grow from '@mui/material/Grow';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import DialogActions from '@mui/material/DialogActions';
import Button from "@mui/material/Button";
import Menu from '@mui/material/Menu';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';

const search_sx = {
    position: "absolute",
    left: 10,
    top: 12,
    color: "#252a3578",
    fontSize: "24px"
}

const accordion_filter_sx = {
    padding: '5px 5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '5px',
    color: '#505161d3',
    margin: '2px 0px'
}

const select_sx = {
    borderRadius: "5px",
    margin: "3px 5px",
    border: "1px solid #E9ECEF",
    boxShadow: "none",
    width: '90%',
    '.MuiOutlinedInput-notchedOutline': { border: 0 },
}


export default function Data_Table(props) {

    const [page, setPage] = useState(0);    //page
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const [expanded, setExpanded] = useState(); //for the filter


    const [FilterData, setFilterData] = useState({
        Sortby: '',
        Column: '',
        LRN: '',
        Email: '',
        ExamStatus: '',
        Date: ''
    })

    const [chipData, setChipData] = useState([])

    const handleDeletechip = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.no !== chipToDelete.no));
    };

    const handlefilter = (event) => {
        setanchorsort(event.currentTarget);
    }

    const [anchorsort, setanchorsort] = useState(null);
    const sortmenu = Boolean(anchorsort)  //for sort menu

    useEffect(() => {
        setExpanded(prev => -1)
    }, [sortmenu])

    const sortmenuclose = () => {
        setanchorsort(null);
    };

    // const filtertabs = [
    //     {
    //         id: "Sortby", label: "Sort by", icon: <ImportExportRoundedIcon />,
    //         sub: [
    //             {
    //                 idlabel: "Column", sublabel: "Column", list: [
    //                     { item: "Student Name" },
    //                     { item: "LRN" },
    //                     { item: "Email Address" },
    //                 ]
    //             },
    //             { idlabel: "Sortby", sublabel: "Ascending", list: [{ item: "Descending" }] }
    //         ],
    //     },
    //     {
    //         id: "LRN", label: "LRN", icon: <ArticleOutlinedIcon />,
    //         sub: [
    //             {
    //                 idlabel: "LRN", sublabel: "LRN"
    //             }
    //         ],
    //     },
    //     {
    //         id: "EmailAddress", label: "Email Address", icon: <EmailOutlinedIcon />,
    //         sub: [
    //             {
    //                 idlabel: "Email", sublabel: "Email Address"
    //             }
    //         ],
    //     },
    //     {
    //         id: "ExamStatus", label: "Exam Status", icon: <DescriptionOutlinedIcon />,
    //         sub: [
    //             {
    //                 idlabel: "ExamTaken", sublabel: "Exam Taken"
    //             },
    //             {
    //                 idlabel: "ExamNotTaken", sublabel: "Exam Not Taken"
    //             }
    //         ],
    //     },
    //     {
    //         id: "Date", label: "Date", icon: <CalendarMonthOutlinedIcon />,
    //         sub: [
    //             {
    //                 idlabel: "Min", sublabel: "Date"
    //             },
    //             {
    //                 idlabel: "Max", sublabel: "Date"
    //             },
    //         ],
    //     }
    // ]

    const handleopentab = (i) => () => {
        setExpanded((prev) => prev === i ? -1 : i)
    };

    const onChangefilter = (event) => {
        const { name, value } = event.target
        setFilterData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const Filterrow = (sublabel, idlabel, list) => {
        if (sublabel == "Column" || sublabel == "Ascending") {
            return (
                <Select
                    name={idlabel}
                    value={sublabel == "Column" ? FilterData.Column : FilterData.Sortby}
                    displayEmpty
                    onChange={onChangefilter}
                    sx={select_sx}
                    size="small"
                >
                    <MenuItem value="">
                        <p style={{ color: "#697280" }}>{sublabel}</p>
                    </MenuItem>
                    {
                        list.map((lst, index) => (
                            <MenuItem key={index} value={lst.item}>{lst.item}</MenuItem>
                        ))
                    }
                </Select>
            )
        } else if (sublabel == "Exam Taken" || sublabel == "Exam Not Taken") {
            return (
                <>
                    <Checkbox sx={{ color: "#697280d3" }} name={idlabel} /><p className="filter_p3">{sublabel}</p>
                </>
            )
        } else {
            return (
                <><input name={idlabel} placeholder={sublabel} className="filter_input" /></>
            )
        }
    }

    // const menu = (
    //     <Menu
    //         elevation={0}
    //         anchorEl={anchorsort}
    //         open={sortmenu}
    //         onClose={sortmenuclose}
    //         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    //         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    //         PaperProps={{
    //             style: {
    //                 marginTop: "10px",
    //                 borderRadius: "10px",
    //                 border: '1px solid #F8F9FA',
    //                 boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
    //             }
    //         }}
    //     >
    //         <List
    //             sx={{ width: '250px', padding: "10px", bgcolor: 'background.paper' }}
    //             component="nav"
    //             subheader={
    //                 <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
    //                     <p className="Filter_header_p1">
    //                         Filters
    //                     </p>
    //                     <p className="Filter_header_p2">
    //                         Clear All
    //                     </p>
    //                 </div>
    //             }
    //         >
    //             {
    //                 filtertabs.map((tab, index) => {
    //                     const { id, icon, label, } = tab
    //                     return (
    //                         <div key={id}>
    //                             <ListItemButton onClick={handleopentab(index)} sx={accordion_filter_sx}>
    //                                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    //                                     {icon}
    //                                     <p className="filter_p2">{label}</p>
    //                                 </div>
    //                                 {expanded === index ? <ExpandLess /> : <ExpandMore />}
    //                             </ListItemButton>
    //                             <Collapse in={expanded === index} timeout="auto" unmountOnExit>
    //                                 {tab.sub.map((val, index) => {
    //                                     const { sublabel, idlabel, list } = val
    //                                     return (
    //                                         <List key={index} component="div" disablePadding sx={{ pl: 4, display: 'flex', alignItems: 'center' }}>

    //                                             {Filterrow(sublabel, idlabel, list)}
    //                                         </List>
    //                                     )
    //                                 })}
    //                             </Collapse>
    //                         </div>
    //                     )
    //                 })
    //             }
    //         </List>
    //     </Menu >
    // )

    return (
        <Grow in={true} timeout={600}>
            <div className="Student_Info">
                {props.Title}
                <div className="Student_Info_container">
                    <div className="S_Info_header">
                        <div style={{ position: "relative" }}>
                            <input className="Student_Info_Search" placeholder="Search"></input>
                            <SearchRoundedIcon sx={search_sx} />
                        </div>
                        {/* <IconButton onClick={handlefilter}>
                            <FilterListRoundedIcon/>
                        </IconButton> */}
                        {/* {menu} */}
                    </div>
                    <div className="chip-container">
                        {
                            chipData.map((data) => {
                                return (
                                    <Chip
                                        key={data.no}
                                        size="small"
                                        label={data.label}
                                        onDelete={handleDeletechip(data)}
                                    />

                                );
                            })
                        }
                    </div>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ boxShadow: "box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;" }}>
                                    {props.Column.map((column) => {
                                        const { id, label, align, minWidth } = column

                                        return (
                                            <TableCell
                                                key={id}
                                                align={align}
                                                style={{
                                                    minWidth: minWidth,
                                                    backgroundColor: "rgb(67, 160, 71,0.1)",
                                                }}
                                            >
                                                <div
                                                    className="table_p1"
                                                    style={{
                                                        justifyContent: align
                                                    }}
                                                >
                                                    {label}
                                                </div>

                                            </TableCell>
                                        )
                                    }
                                    )}

                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {props.Row.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                    return (
                                        <TableRow role="checkbox" tabIndex={-1} key={index}
                                            sx={{
                                                '& td, & th': { borderBottom: "1.5px solid rgb(233, 236, 239,0.6)" },
                                                "&:hover": {
                                                    backgroundColor: "rgb(67, 160, 71,0.026)"
                                                }
                                            }}>
                                            {props.Column.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <div
                                                            className="table_p2"
                                                            style={{
                                                                fontWeight: column.id === "Student_Name" ?
                                                                    "600" : "400",
                                                            }}
                                                        >{props.Function(column.id, index, value, row)}</div>
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={props.Row.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
                {/* <button tton onClick={() => window.scrollTo(0, 0)}>top</button> */}
                {props.Dialog}
            </div>
        </Grow >
    );
}
