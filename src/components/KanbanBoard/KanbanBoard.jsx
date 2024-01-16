import { useState, useEffect } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "./helpers/StrictModeDroppable";
import { filterWithGetAllTasks, updateTaskMilestone, getProjectList } from "../../services/chartService";
import KanbanModal from "./KanbanModal";
import Select from "react-select";
import { imageIdGenerate } from "../../utils/custom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
const onDragEnd = async (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  const task = columns[source.droppableId].items[source.index];

  if (source.droppableId !== destination.droppableId) {
    const milestoneMap = {
      backlog: 1,
      dev_assigned: 2,
      dev_in_progress: 3,
      dev_complete: 4,
      qa: 5,
      client_review: 6,
      done: 7,
    };
    const updateData = {
      milestone_id: milestoneMap[destination.droppableId] || [],
    };
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
    const response = await updateTaskMilestone(task.id, updateData);
    if (response?.success === true) {
      window.toastr.success(response?.message);
    } else if (response?.success === false) {
      window.toastr.error(response?.message);
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  }
};

const KanbanBoard = () => {
  const [backlogTask, setBacklogTask] = useState();
  const [devAssignedTask, setDevAssignedTask] = useState();
  const [devInProgressTask, setDevInProgressTask] = useState();
  const [devCompleteTask, setDevCompleteTask] = useState();
  const [qaTask, setQaTask] = useState();
  const [clientReviewTask, setClientReviewTask] = useState();
  const [doneTask, setDoneTask] = useState();
  const [filterValue, setFilterValue] = useState("");
  const [filterList, setFilterList] = useState();

  const handleFilterList = (obj) => {
    setFilterList(obj);
  };

  const [currentBacklogTask, setCurrentBacklogTask] = useState();
  const [currentDevAssignedTask, setCurrentDevAssignedTask] = useState();
  const [currentDevInProgressTask, setCurrentDevInProgressTask] = useState();
  const [currentDevCompleteTask, setCurrentDevCompleteTask] = useState();
  const [currentQaTask, setCurrentQaTask] = useState();
  const [currentClientReviewTask, setCurrentClientReviewTask] = useState();
  const [currentDoneTask, setCurrentDoneTask] = useState();
  const [projectList, setProjectList] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedProjectMembers, setSelectedProjectMembers] = useState([]);
  useEffect(() => {
    const fetchAllProjectList = async () => {
      const fetchProjectList = await getProjectList();
      setProjectList(fetchProjectList?.data || []);
    };
    fetchAllProjectList();
    fetchAllTasks(filterList);
  }, [filterList]);

  useEffect(() => {
    setColumns((prevColumns) => ({
      ...prevColumns,
      backlog: {
        ...prevColumns.backlog,
        items: backlogTask,
      },
      dev_assigned: {
        ...prevColumns.dev_assigned,
        items: devAssignedTask,
      },
      dev_in_progress: {
        ...prevColumns.dev_in_progress,
        items: devInProgressTask,
      },
      dev_complete: {
        ...prevColumns.dev_complete,
        items: devCompleteTask,
      },
      qa: {
        ...prevColumns.qa,
        items: qaTask,
      },
      client_review: {
        ...prevColumns.client_review,
        items: clientReviewTask,
      },
      done: {
        ...prevColumns.done,
        items: doneTask,
      },
    }));
  }, [backlogTask, devAssignedTask, devInProgressTask, devCompleteTask, qaTask, clientReviewTask, doneTask]);

  useEffect(() => {
    if (projectList.length > 0 && selectedProject === null) {
      const defaultProject = {
        label: projectList[0].Project.name,
        value: projectList[0].Project.id,
        members: projectList[0].Members,
      };
      setSelectedProject([defaultProject]);
      setSelectedProjectMembers(defaultProject.members);
      // fetchAllTasks(defaultProject?.value);
      setFilterList({ worklist_id: defaultProject?.value });
    }
  }, [projectList, selectedProject]);

  const renderProjectOptions = () => {
    return projectList.map((project) => ({
      label: project.Project.name,
      value: project.Project.id,
      members: project.Members,
    }));
  };

  const handleProjectChange = (selectedOption) => {
    setSelectedProject(selectedOption);
    // selectedOption?.map((item) => console.log(item.value));
    const projectId = selectedOption?.map((item) => item.value);
    const uniqueMembersMap = {};
    // Iterate through selectedOption and add members to the uniqueMembersMap
    selectedOption?.forEach((item) => {
      item.members.forEach((member) => {
        if (!uniqueMembersMap[member.id]) {
          uniqueMembersMap[member.id] = member;
        }
      });
    });
    // Convert the uniqueMembersMap object back to an array
    const uniquemember = Object.values(uniqueMembersMap);
    setSelectedProjectMembers(uniquemember);
    setFilterList({ worklist_id: projectId });
  };

  const fetchAllTasks = async (filterList) => {
    filterWithGetAllTasks(filterList)
      .then((response) => {
        setBacklogTask(response?.data?.backlog);
        setDevAssignedTask(response?.data?.dev_assigned);
        setDevInProgressTask(response?.data?.dev_in_progress);
        setDevCompleteTask(response?.data?.dev_complete);
        setQaTask(response?.data?.qa);
        setClientReviewTask(response?.data?.client_review);
        setDoneTask(response?.data?.done);

        setCurrentBacklogTask(response?.data?.backlog);
        setCurrentDevAssignedTask(response?.data?.dev_assigned);
        setCurrentDevInProgressTask(response?.data?.dev_in_progress);
        setCurrentDevCompleteTask(response?.data?.dev_complete);
        setCurrentQaTask(response?.data?.qa);
        setCurrentClientReviewTask(response?.data?.client_review);
        setCurrentDoneTask(response?.data?.done);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const taskStatus = {
    backlog: {
      name: "Backlog",
      items: backlogTask,
      id: 1,
    },
    dev_assigned: {
      name: "Dev Assigned",
      items: devAssignedTask,
      id: 2,
    },
    dev_in_progress: {
      name: "Dev in Progress",
      items: devInProgressTask,
      id: 3,
    },
    dev_complete: {
      name: "Dev Complete",
      items: devCompleteTask,
      id: 4,
    },
    qa: {
      name: "QA",
      items: qaTask,
      id: 5,
    },
    client_review: {
      name: "Client Review",
      items: clientReviewTask,
      id: 6,
    },
    done: {
      name: "Done",
      items: doneTask,
      id: 7,
    },
  };
  const [columns, setColumns] = useState(taskStatus);

  const handleFilterChange = (e) => {
    const inputValue = e.target.value.toLowerCase(); // Convert input value to lowercase for case-insensitive matching
    // Filter tasks in each column based on the input value
    const filteredBacklog = currentBacklogTask.filter((task) => task?.name?.toLowerCase().includes(inputValue));
    const filteredDevAssigned = currentDevAssignedTask.filter((task) => task?.name?.toLowerCase().includes(inputValue));
    const filteredDevInProgress = currentDevInProgressTask.filter((task) => task?.name?.toLowerCase().includes(inputValue));
    const filteredDevComplete = currentDevCompleteTask.filter((task) => task?.name?.toLowerCase().includes(inputValue));
    const filteredQa = currentQaTask.filter((task) => task?.name?.toLowerCase().includes(inputValue));
    const filteredClientReview = currentClientReviewTask.filter((task) => task?.name?.toLowerCase().includes(inputValue));
    const filteredDone = currentDoneTask.filter((task) => task?.name?.toLowerCase().includes(inputValue));

    // Update the state for each column with the filtered tasks or reset to original when inputValue is empty
    setBacklogTask(inputValue === "" ? currentBacklogTask : filteredBacklog);
    setDevAssignedTask(inputValue === "" ? currentDevAssignedTask : filteredDevAssigned);
    setDevInProgressTask(inputValue === "" ? currentDevInProgressTask : filteredDevInProgress);
    setDevCompleteTask(inputValue === "" ? currentDevCompleteTask : filteredDevComplete);
    setQaTask(inputValue === "" ? currentQaTask : filteredQa);
    setClientReviewTask(inputValue === "" ? currentClientReviewTask : filteredClientReview);
    setDoneTask(inputValue === "" ? currentDoneTask : filteredDone);

    // Update the filterValue state with the current input value
    setFilterValue(inputValue);
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <div className="px-5 mt-8">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search by task name..." value={filterValue} onChange={handleFilterChange} />
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <div className="input-group me-3 flex-column">
            <label className="form-label">Select Project </label>
            <Select value={selectedProject} options={renderProjectOptions()} onChange={handleProjectChange} isMulti={true} />
          </div>
          <div>
            <KanbanModal handleFilterList={handleFilterList} selectedProjectMembers={selectedProjectMembers} filterList={filterList} />
          </div>
        </div>
      </div>

      <div className="kanban-container">
        <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
          <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  key={columnId}
                >
                  <span className="fw-bold text-gray-900 fs-2">{column?.name}</span>

                  <div className="px-5 py-5">
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            data-id="_fixed_height"
                            className="kanban-board custom_scroll"
                            style={{
                              width: "250px",
                              height: "620px",
                              padding: 16,
                            }}
                          >
                            {column.items?.map((item, index) => {
                              return (
                                <Draggable key={item.id} draggableId={item?.id.toString()} index={index}>
                                  {(provided, snapshot) => {
                                    return (
                                      <div className={`kanban-item ${snapshot.isDragging ? "dragging" : ""}`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <div className="d-flex align-items-center">
                                          <div className="d-flex flex-column align-items-start">
                                            <div className="d-flex mb-1 text-primary">
                                              {" "}
                                              <span className="fw-bold fs-3">#</span>
                                              <span className="fw-bold fs-4">{item?.unique_task_no}</span>
                                            </div>
                                            <span className="fw-normal text-gray-700 fs-4">{item?.name}</span>
                                          </div>
                                        </div>
                                        <hr className="text-gray-400 p-0 " />
                                        <div className="symbol-group symbol-hover flex-nowrap justify-content-end">
                                          <OverlayTrigger overlay={<Tooltip>{item?.assignee_id ? `${item?.assigneeFirstName} ${item?.assigneeLastName}` : 'Unassigned'}</Tooltip>} key={item?.id} placement={"left"}>
                                            <div className="symbol symbol-35px symbol-circle user-image" data-kt-initialized="1">
                                              <img alt="name" src={item?.assignee_id ? (item?.assignee_image_url ?? `${process.env.PUBLIC_URL}/assets/media/avatars/300-${imageIdGenerate(item?.assignee_id)}.jpg`) : `${process.env.PUBLIC_URL}/assets/media/avatars/blank.png`} />
                                            </div>
                                          </OverlayTrigger>
                                        </div>
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        </div>
      </div>
    </>
  );
};
export default KanbanBoard;
