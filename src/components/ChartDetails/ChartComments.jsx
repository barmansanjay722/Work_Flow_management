import React, { useState, useEffect, useContext } from "react";
import { getChartAuditInfo, getChartDetails } from "../../services/chartService";
import { useParams,useLocation } from "react-router-dom";
import "./ChartForm.css";
import CommentContext from "../../Context/CommentContext/CommentContext";
import { imageIdGenerate } from "../../utils/custom";
import localStorageStore from "../../utils/localStorageStore";
import role from "../../utils/role";

function ChartComments({ data, enabled }) {
  const navigateStateGlobal = useLocation();
  const [comment, setComment] = useState([]);
  const [reply, setreply] = useState(false);
  const [textcomment, settextcomment] = useState(true);
  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);
  const { id } = useParams();
  const [isComment, setIsComment] = useState(false);
  const [inndex, setIndex] = useState();
  const [replyIndex, setReplyIndex] = useState();
  const [parentId, setParentId] = useState();
  const { commentInpval, setCommnetInpval, errorsFromAuditorToChart, errors, errorsForChat, setCommentedInCommentLog } = useContext(CommentContext);
  
  useEffect(() => {}, [inndex, errorsForChat, errors]);
  
  const submitReply = (e, indexForReplies, pid) => {
    e.preventDefault();
    setIndex(indexForReplies);
    if (pid == null) {
      setParentId(null);
    } else {
      setParentId(pid);
    }
    settextcomment(false);
    setreply(true);
    setAccept(false);
    setReject(false);
  };
  
  const showCommentBox = () => {
    setreply(false);
    setAccept(false);
    setReject(false);
    settextcomment(true);
    document.querySelector("#commentLabel button").classList.add("d-none");
    document.querySelector("#commentLabel span").innerHTML = "";
  };
  
  const bindReplyEvents = () => {
    document.querySelectorAll(".reply-quick-actions .menu-item").forEach((link) => {
      link.addEventListener("click", (event) => {
        const reply_action = event.target.getAttribute("data-action-type");
        const cmt_index = event.target.getAttribute("data-cmt-index");
        const reply_index = event.target.getAttribute("data-reply-index");
        const parent_id = event.target.getAttribute("data-el-parentid");
        let msg_author = "";
        let msg_body = "";
        if (reply_index) {
          msg_author = document.querySelector('span[data-msgid-author="' + cmt_index + "-" + reply_index + '"]').getAttribute("data-msg-author-name");
          msg_body = document.querySelector('span[data-msg-body="' + cmt_index + "-" + reply_index + '"]').innerHTML;
        } else {
          msg_author = document.querySelector('span[data-msgid-author="' + cmt_index + '-"]').getAttribute("data-msg-author-name");
          msg_body = document.querySelector('span[data-msg-body="' + cmt_index + '-"]').innerHTML;
        }
        const comment_quote = msg_author + ': "' + msg_body + '"';
        const comment_quote_italic = "<i>" + comment_quote.slice(0, 45).trim() + "...</i>";
        document.querySelector("#commentLabel button").classList.remove("d-none");
        if (reply_action === "accept") {
          document.querySelector("#commentLabel span").innerHTML = "Accepting Comment: " + comment_quote_italic;
          if (reply_index) {
            submitAccept(event, cmt_index, reply_index, parent_id);
          } else {
            submitAcceptText(event, cmt_index, parent_id);
          }
        } else if (reply_action === "reject") {
          document.querySelector("#commentLabel span").innerHTML = "Rejecting Comment: " + comment_quote_italic;
          if (reply_index) {
            submitReject(event, cmt_index, reply_index, parent_id);
          } else {
            submitRejectText(event, cmt_index, parent_id);
          }
        } else if (reply_action === "reply") {
          document.querySelector("#commentLabel span").innerHTML = "Reply to: " + comment_quote_italic;
          submitReply(event, cmt_index, parent_id);
        }
      });
    });
  };
  
  const submitAccept = (e, cmt_index, index, pid) => {
    e.preventDefault();
    setReplyIndex(index);
    setIndex(cmt_index);
    if (pid == null) {
      setParentId(null);
    } else {
      setParentId(pid);
    }
    settextcomment(false);
    setreply(false);
    setAccept(true);
    setReject(false);
  };
  
  const submitReject = (e, cmt_index, indexForReplies, pid) => {
    e.preventDefault();
    setReplyIndex(indexForReplies);
    setIndex(cmt_index);
    if (pid == null) {
      setParentId(null);
    } else {
      setParentId(pid);
    }
    settextcomment(false);
    setreply(false);
    setAccept(false);
    setReject(true);
  };
  
  const submitAcceptText = (e, indexForReplies, pid) => {
    e.preventDefault();
    setIndex(indexForReplies);
    if (pid == null) {
      setParentId(null);
    } else {
      setParentId(pid);
    }
    settextcomment(false);
    setreply(false);
    setAccept(true);
    setReject(false);
  };
  
  const submitRejectText = (e, indexForReplies, pid) => {
    e.preventDefault();
    setIndex(indexForReplies);
    if (pid == null) {
      setParentId(null);
    } else {
      setParentId(pid);
    }
    settextcomment(false);
    setreply(false);
    setAccept(false);
    setReject(true);
  };
  
  const callReply = (e) => {
    const { value, name } = e.target;
    setCommnetInpval(() => {
      if (parentId === null && comment[inndex]?.Replies.length === 0) {
        return {
          ...commentInpval,
          [name]: value,
          parent_id: comment[inndex]?.id,
          FlagId: "3",
          FlaggedCommentId: comment[inndex]?.id,
        };
      } else if (parentId === null && comment[inndex]?.Replies.length > 0) {
        return {
          ...commentInpval,
          [name]: value,
          parent_id: comment[inndex]?.id,
          FlagId: "3",
          FlaggedCommentId: comment[inndex]?.id,
        };
      } else if (parentId != null && comment[inndex]?.Replies.length > 0) {
        return {
          ...commentInpval,
          [name]: value,
          parent_id: comment[inndex]?.Replies[replyIndex]?.parent_id,
          FlagId: "3",
          FlaggedCommentId: comment[inndex]?.Replies[replyIndex]?.id,
        };
      } else {
        return {
        };
      }
    });
  };
  
  const callAccept = (e) => {
    const { value, name } = e.target;
    setCommnetInpval(() => {
      if (parentId == null && comment[inndex]?.Replies.length === 0) {
        return {
          ...commentInpval,
          [name]: value,
          parent_id: comment[inndex]?.id,
          FlagId: "1",
          FlaggedCommentId: comment[inndex]?.id,
        };
      } else if (parentId === null && comment[inndex]?.Replies.length > 0) {
        return {
          ...commentInpval,
          [name]: value,
          parent_id: comment[inndex]?.id,
          FlagId: "1",
          FlaggedCommentId: comment[inndex]?.id,
        };
      } else if (parentId != null && comment[inndex]?.Replies.length > 0) {
        return {
          ...commentInpval,
          [name]: value,
          parent_id: comment[inndex]?.Replies[replyIndex]?.parent_id,
          FlagId: "1",
          FlaggedCommentId: comment[inndex]?.Replies[replyIndex]?.id,
        };
      } else {
        return {
        };
      }
    });
  };

  const callReject = (e) => {
    const { value, name } = e.target;
    setCommnetInpval(() => {
      if (parentId === null && comment[inndex]?.Replies.length === 0) {
        return {
          ...commentInpval,
          [name]: value,
          parent_id: comment[inndex]?.id,
          FlagId: "2",
          FlaggedCommentId: comment[inndex]?.id,
        };
      } else if (parentId === null && comment[inndex]?.Replies.length > 0) {
        return {
          ...commentInpval,
          [name]: value,
          parent_id: comment[inndex]?.id,
          FlagId: "2",
          FlaggedCommentId: comment[inndex]?.id,
        };
      } else if (parentId != null && comment[inndex]?.Replies.length > 0) {
        return {
          ...commentInpval,
          [name]: value,
          parent_id: comment[inndex]?.Replies[replyIndex]?.parent_id,
          FlagId: "2",
          FlaggedCommentId: comment[inndex]?.Replies[replyIndex]?.id,
        };
      } else {
        return {
        };
      }
    });
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      setCommentedInCommentLog(true);
      settextcomment(true);
      setreply(false);
      setAccept(false);
      setReject(false);
      handleSubmit(e);
      document.querySelector("#commentLabel button").classList.add("d-none");
      document.querySelector("#commentLabel span").innerHTML = "";
    }
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_HOST}/charts/${id}/comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(commentInpval),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          setIsComment(true);
          getChartAuditInfo(id);
          getChartDetails(id);
          window.KTMenu.init();
        }
        else{
          window.toastr.error(data?.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    e.target.value = "";
  };
  
  const getdata = (e) => {
    const { value, name } = e.target;
    setCommnetInpval(() => {
      return {
        ...commentInpval,
        [name]: value,
        UserId: data?.UserId,
      };
    });
  };
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_HOST}/charts/${id}/comments`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        setComment(data.data);
        setIsComment(false);
        setTimeout(() => {
          window.KTMenu.init();
          bindReplyEvents();
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComment,navigateStateGlobal]);

  const decryptRole = localStorageStore.getRole();

  // const user = comment[0]?.user_first_name + " " + comment[0]?.user_last_name;
  
  return (
    <div className="p-0">
      <div className="col-12 mt-6">
        <div className="card card-flush pb-3 comment-card">
          <div className="card-header py-4 minimize">
            <p className="card-title align-items-start flex-column">
              <span className="w-bold h4">Comments</span>
              <span className="text-muted mt-1 fw-semibold fs-6">Internal comments within the team</span>
            </p>
            <div className="card-toolbar mt-0">
              <button className="btn btn-icon btn-sm btn-light-primary justify-content-center minimize">
                <i className="fas fa-plus" />
              </button>
            </div>
          </div>
          <div className="card-body py-2 collapse">
            <div className="mt-0">
              {data &&
                comment?.map((item, cmt_index) => {
                  return (
                    <div key={`${item.id}_${cmt_index}`}>
                      <div className="card d-flex flex-row p-5 mt-1 border border-dashed border-gray-300 rounded">
                        <div className="symbol symbol-45px symbol-circle">
                          <img alt="Pic" src={item.user_image_url ?? `../assets/media/avatars/300-${imageIdGenerate(item?.UserId ?? "4")}.jpg`} />
                        </div>
                        <div className="flex-fill ms-5">
                          <div className="d-flex flex-wrap justify-content-between">
                            <span className="mb-1 author fw-bold" data-msgid-author={cmt_index + "-"} data-msg-author-name={item?.user_first_name + " " + item?.user_last_name}>
                              {item?.user_first_name} {item?.user_last_name}
                              <br />
                              <small className="text-muted msg-time">{item?.comment_timestamp}</small>
                            </span>
                            <div className="card-toolbar">
                              <button className="btn btn-icon btn-color-gray-400 btn-active-color-primary justify-content-end align-items-baseline" disabled={(decryptRole === role.Manager || decryptRole === role.TeamLead) ? false : !enabled} data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-menu-overflow="true">
                                <span className="svg-icon svg-icon-1">
                                  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect opacity="0.3" x={2} y={2} width={20} height={20} rx={4} fill="currentColor" />
                                    <rect x={11} y={11} width="2.6" height="2.6" rx="1.3" fill="currentColor" />
                                    <rect x={15} y={11} width="2.6" height="2.6" rx="1.3" fill="currentColor" />
                                    <rect x={7} y={11} width="2.6" height="2.6" rx="1.3" fill="currentColor" />
                                  </svg>
                                </span>
                              </button>
                              <div className="reply-quick-actions menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px" data-kt-menu="true">
                                <div className="menu-item px-3">
                                  <div className="menu-content fs-6 text-dark fw-bold px-3 py-4">Quick Actions</div>
                                </div>
                                <div className="separator mb-3 opacity-75" />
                                <div className="menu-item px-3">
                                  <div className="menu-link px-3" data-action-type="accept" data-cmt-index={cmt_index} data-el-parentid={item?.parent_id}>
                                    Accept
                                  </div>
                                </div>
                                <div className="menu-item px-3">
                                  <div className="menu-link px-3" data-action-type="reject" data-cmt-index={cmt_index} data-el-parentid={item?.parent_id}>
                                    Reject
                                  </div>
                                </div>
                                <div className="menu-item px-3 pb-5">
                                  <div className="menu-link px-3" data-action-type="reply" data-cmt-index={cmt_index} data-el-parentid={item?.parent_id}>
                                    Reply
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <span className="text-gray-800 " data-msg-body={cmt_index + "-"}>
                            {item?.comment_msg}
                          </span>
                          <div className="d-flex flex-wrap justify-content-between">
                            <span className="mb-0 author" />
                            {comment[cmt_index]?.Flag === "Accepted" ? (
                              <small className="text-muted msg-time">
                                <span className="badge bg-light-success text-success">{comment[cmt_index]?.Flag}</span>
                              </small>
                            ) : (
                              ""
                            )}
                            {comment[cmt_index]?.Flag === "Rejected" ? (
                              <small className="text-muted msg-time">
                                <span className="badge bg-light-danger text-danger">{comment[cmt_index]?.Flag}</span>
                              </small>
                            ) : (
                              ""
                            )}
                            {comment[cmt_index]?.Flag === "Reply" ? "" : ""}
                          </div>
                        </div>
                      </div>
                      {item.Replies?.map((record, indexForReplies) => {
                        return (
                          <div className="card d-flex flex-row p-5 mt-1 border border-dashed border-gray-300 rounded chart-comments-reply" style={{ marginLeft: "22px" }} key={`${record.id}_${indexForReplies}`}>
                            <div className="symbol symbol-45px symbol-circle">
                              <img alt="Pic" src={record.user_image_url ?? `../assets/media/avatars/300-${imageIdGenerate(record?.UserId ?? "4")}.jpg`} />
                            </div>
                            <div className="flex-fill ms-5">
                              <div className="d-flex flex-wrap justify-content-between">
                                <span className="h6 mb-1 author" data-msgid-author={cmt_index + "-" + indexForReplies} data-msg-author-name={record?.user_first_name + " " + record?.user_last_name}>
                                  {record?.user_first_name} {record?.user_last_name}
                                  <br />
                                  <small className="text-muted msg-time">{record?.comment_timestamp}</small>
                                </span>
                                <div className="card-toolbar">
                                  <button className="btn btn-icon btn-color-gray-400 btn-active-color-primary justify-content-end" disabled={(decryptRole === role.Manager || decryptRole === role.TeamLead) ? false : !enabled} data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-menu-overflow="true">
                                    <span className="svg-icon svg-icon-1">
                                      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect opacity="0.3" x={2} y={2} width={20} height={20} rx={4} fill="currentColor" />
                                        <rect x={11} y={11} width="2.6" height="2.6" rx="1.3" fill="currentColor" />
                                        <rect x={15} y={11} width="2.6" height="2.6" rx="1.3" fill="currentColor" />
                                        <rect x={7} y={11} width="2.6" height="2.6" rx="1.3" fill="currentColor" />
                                      </svg>
                                    </span>
                                  </button>
                                  <div className="reply-quick-actions menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px" data-kt-menu="true">
                                    <div className="menu-item px-3">
                                      <div className="menu-content fs-6 text-dark fw-bold px-3 py-4">Quick Actions</div>
                                    </div>
                                    <div className="separator mb-3 opacity-75" />
                                    <div className="menu-item px-3">
                                      <div className="menu-link px-3" data-action-type="accept" data-cmt-index={cmt_index} data-reply-index={indexForReplies} data-el-parentid={record?.parent_id}>
                                        Accept
                                      </div>
                                    </div>
                                    <div className="menu-item px-3 pb-5">
                                      <div className="menu-link px-3" data-action-type="reject" data-cmt-index={cmt_index} data-reply-index={indexForReplies} data-el-parentid={record?.parent_id}>
                                        Reject
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <span className="text-muted" data-msg-body={cmt_index + "-" + indexForReplies}>
                                {record?.comment_msg}
                              </span>
                              <div className="d-flex flex-wrap justify-content-between">
                                <span className="h6 mb-1 author" />
                                {comment[cmt_index]?.Replies[indexForReplies]?.Flag === "Accepted" ? (
                                  <small className="text-muted msg-time">
                                    <span className="badge bg-light-success text-success">{comment[cmt_index]?.Replies[indexForReplies]?.Flag}</span>
                                  </small>
                                ) : (
                                  ""
                                )}
                                {comment[cmt_index]?.Replies[indexForReplies]?.Flag === "Rejected" ? (
                                  <small className="text-muted msg-time">
                                    <span className="badge bg-light-danger text-danger">{comment[cmt_index]?.Replies[indexForReplies]?.Flag}</span>
                                  </small>
                                ) : (
                                  ""
                                )}
                                {comment[cmt_index]?.Replies[indexForReplies]?.Flag === "Reply" ? "" : ""}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
            </div>
            <div className="mt-5">
              <label id="commentLabel" className="form-label">
                <span className="text-muted"></span>
                <button className="btn p-1 px-4 d-none" onClick={showCommentBox}>
                  <i className="fa fa-times"></i>
                </button>
              </label>
              {textcomment && <textarea className="form-control" name="comment_msg" onKeyDown={handleKeypress} onChange={getdata} placeholder="Comment for chart..." defaultValue={""}  disabled={(decryptRole === role.Manager || decryptRole === role.TeamLead) ? false : !enabled}/>}
              {reply && <textarea id="replyTextArea" className="form-control" name="comment_msg" onKeyDown={handleKeypress} onChange={callReply} placeholder="Reply on comment..." defaultValue={""} disabled={(decryptRole === role.Manager || decryptRole === role.TeamLead) ? false : !enabled} />}
              {accept && <textarea id="acceptTextArea" className="form-control" name="comment_msg" onKeyDown={handleKeypress} onChange={callAccept} placeholder="Acceptance message..." defaultValue={""} disabled={(decryptRole === role.Manager || decryptRole === role.TeamLead) ? false : !enabled} />}
              {reject && <textarea id="rejectTextArea" className="form-control" name="comment_msg" onKeyDown={handleKeypress} onChange={callReject} placeholder="Rejection message..." defaultValue={""} disabled={(decryptRole === role.Manager || decryptRole === role.TeamLead) ? false : !enabled} />}
              {(errors.comment_msg && (commentInpval?.comment_msg === undefined || commentInpval?.comment_msg?.trim() === "")) && <p className="help is-danger errorDanger">{errors.comment_msg}</p>}
              {(errorsForChat.comment_msg && (commentInpval?.comment_msg === undefined || commentInpval?.comment_msg?.trim() === "")) && <p className="help is-danger errorDanger">{errorsForChat.comment_msg}</p>}
              {(errorsFromAuditorToChart.comment_msg && (commentInpval?.comment_msg === undefined || commentInpval?.comment_msg?.trim() === "")) && <p className="help is-danger errorDanger">{errorsFromAuditorToChart.comment_msg}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChartComments;
