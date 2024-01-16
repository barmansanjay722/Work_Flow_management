const StatusCard = ({ title, colorChange, picContainerDivClass, picture1, picture2, pic1WidthChange, pic2WidthChange, data }) => {
  return (
    <>
      <div className="card h-lg-60 milestone_border">
        <div className="card-body d-flex flex-column flex-center py-2 px-2">
          <div className="mb-0 text-center">
            <h1 className={colorChange}>
              {data}
              <span className="fw-bolder fs-6 "> {title}</span>
            </h1>
            <div className={picContainerDivClass}>
              <img src={picture1} className={pic1WidthChange} alt="" />
              <img src={picture2} className={pic2WidthChange} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default StatusCard;
