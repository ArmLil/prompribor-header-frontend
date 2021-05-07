import React from "react";
import { Nav } from "react-bootstrap";

export default function TopNavBar({ controllers }) {
  const classes = {
    root: {
      display: "flex",
    },
  };
  return (
    <div className={classes.root}>
      <Nav fill variant="tabs" defaultActiveKey="/main/monitoring">
        <Nav.Item>
          <Nav.Link href="/main/monitoring">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" href="/main/monitoring">
            Option 2
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}
