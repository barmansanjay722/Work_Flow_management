import React from 'react';
import crypto from "crypto-js";
// import moment from 'moment';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
// import BSModalComponent from './BSModal';
// import { Link } from 'react-router-dom';

const ManagerReportsTable = ({ reportsData, filtersData, fields }) => {

    let header = []
    // const [modalBody, setModalBody] = useState('')
    // const [modalHeader, setModalHeader] = useState('')
    // const [modalShow, setModalShow] = useState(false)

    if (reportsData && reportsData.length > 0) {
        for (let a in reportsData[0]) {
            if (filtersData[a]) {
                header.push(filtersData[a]?.label + (filtersData[a]?.label.endsWith('Processing Time') ? " (hh:mm:ss)":""))
            }
        }
    } else {
        fields.forEach((key) => {
            if (filtersData[key]) {
                header.push(filtersData[key]?.label + (filtersData[key]?.label.endsWith('Processing Time') ? " (hh:mm:ss)":""))
            }
        })
    }

    const getTableData = (item) => {
        let arr = []
        let index = 0
        for (let a in item) {
            let value = item[a];
            let tdKey = `${a}_${index}`;
            if(filtersData[a] !== undefined) {
                if (filtersData[a]['encrypted']) {
                    value = crypto.AES.decrypt(item[a] ?? '', process.env.REACT_APP_SECRET_PASS).toString(crypto.enc.Utf8);
                }
                if (!value) {
                    value = 'NA'
                }
                if((a === 'hold_reason') && value !== 'NA') {
                    let badges = []
                    value.split(", ").forEach((element, i) => {
                        badges.push(<span key={i} className="badge badge-light mx-1 text-gray-800">{element}</span>)
                    });
                    arr.push(<td key={tdKey}>{badges}</td>)
                } else if(a === 'milestone_name') {
                    switch(value){
                        case 'Backlog':
                            arr.push( <td key={tdKey}> <span className='badge badge-light-info fw-bold'>{value}</span> </td> );break;
                        case 'Dev Assigned':
                            arr.push( <td key={tdKey}> <span className='badge badge-light fw-bold'>{value}</span> </td> );break;
                        case 'Dev in Progress':
                            arr.push( <td key={tdKey}> <span className='badge bs-yellow-light text-yellow fw-bold'>{value}</span> </td> );break;
                        case 'Dev Complete':
                            arr.push( <td key={tdKey}> <span className='badge badge-light-danger fw-bold'>{value}</span> </td> );break;
                        case 'QA':
                            arr.push( <td key={tdKey}> <span className='badge badge-light-dark fw-bold'>{value}</span> </td> );break;
                        case 'Client Review':
                            arr.push( <td key={tdKey}> <span className='badge badge-light-warning fw-bold'>{value}</span> </td> );break;
                        case 'Done':
                            arr.push( <td key={tdKey}> <span className='badge badge-light-success fw-bold'>{value}</span> </td> );break;
                        default:
                    }
                } else if(a === 'description' && value !== 'NA') {
                    arr.push(
                        <td key={tdKey}>
                            <OverlayTrigger key={"right"} placement={"top"} overlay={<Tooltip id="tooltip-right">{value}</Tooltip>}>
                                <span className="comments-excerpt">{value}</span>
                            </OverlayTrigger>
                        </td>
                    )
                // } else if(a === 'comment_log' && value !== 'NA') {
                //     arr.push(
                //         <td key={tdKey}>
                //             <span className="comments-excerpt">{value}</span>
                //             <Link onClick={() => {setModalBody(value.replace(/\n/g, "<br/>")); setModalHeader("Comment Log" + (item['chart_no'] ? ' [Ch# '+item['chart_no']+']:' : ':')); setModalShow(true)}}>read more</Link>
                //         </td>
                //     )
                // } else if(a.endsWith('_processing_seconds') && value !== 'NA') {
                //     arr.push(
                //         <td key={tdKey}>{moment.utc(value*1000).format("HH:mm:ss")}</td>
                //     )
                } else if(a === 'worklist_no') {
                    arr.push(
                        <td key={tdKey}> <strong className='text-gray-900'>{value}</strong> </td>
                    )
                } else {
                    arr.push(
                        <td key={tdKey}>{value}</td>
                    )
                }
            }
            index++
        }
        return arr
    }
    
    return (
        <div className='card' style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
            <div className="card-header border-0 pt-6">
                <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bold text-gray-800">Timesheet</span>
                </h3>
            </div>
            <div className="card-body pt-0 pb-4">
                <div className="table-responsive">
                    <table className="table to-do-table align-middle table-row-dashed fs-6 gy-5 gs-7"
                        id="report-table">
                        <thead>
                            <tr className="text-start fw-bold fs-7 text-uppercase gs-0">
                                {header.map((item,i) => (<th key={i} className="min-w-80px">{item}</th>))}
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 fw-semibold">
                            {reportsData?.length>0?reportsData.map((item, i) => (
                                <tr key={i}>
                                    {getTableData(item)}
                                </tr>
                            )):null}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* <BSModalComponent modalBody={modalBody} show={modalShow} setShow={setModalShow} modalHeader={modalHeader}/> */}
        </div>
    );

};
export default ManagerReportsTable;