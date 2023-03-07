const Announcement = () => {
  return (
    <div className="mt-5">
      <div className="col-md-12">
        <div className={`card `}>
          <div className="card-header p-2">
            <i className="fas fa-lightbulb"></i>&nbsp;BSDP Announcment
          </div>
          <div className="card-body text-dark">
            <span className="card-text">
              <b>Report an Issue Feature</b>
              <br />
              Report an issue provides a quick and easy way to submit a Support
              Case directly from the Help Icon within the application.
              <br />
              <br />
              How to Report an Issue:
              <br />
              <br />
              <ol>
                <li>
                  Click on the Help icon located in the top right corner of the
                  screen.
                </li>
                <li>Select Report an Issue.</li>
                <li>
                  Enter the Email, Phone, Subject and a detailed Description of
                  the problem or issue with examples.
                </li>
                <li>Click Submit.</li>
              </ol>
              To learn more about the Report an Issue feature visit our{" "}
              <a
                href="https://simplexmed.com/"
                target={"_blank"}
                rel="noreferrer"
              >
                Website
              </a>
              . To learn more about the Self-Service Portal visit our{" "}
              <a
                href="https://simplexmed.com/"
                target={"_blank"}
                rel="noreferrer"
              >
                Website
              </a>
              .
            </span>
          </div>
        </div>
        <div className="card mt-2">
          <div className="card-header">
            <i className="fas fa-bullhorn"></i> Announcment
          </div>
          <div className="card-body my-2 text-dark">
            <p className="card-text ">No Special Announcements</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
