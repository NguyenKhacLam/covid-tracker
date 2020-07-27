import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./../styles/InfoBox.css";

function InforBox({ title, active, cases, total, ...props }) {
  return (
    <Card
      className={`InforBox ${active && `inforBox--selected`}`}
      onClick={props.onClick}
    >
      <CardContent>
        <Typography color="default" className="inforBox__title">
          {title}
        </Typography>
        <h2 className="inforBox__cases">{cases}</h2>
        <Typography color="default" className="inforBox__total">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InforBox;
