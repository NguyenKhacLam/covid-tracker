import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function InforBox({ title, cases, total }) {
  return (
    <Card className="InforBox">
      <CardContent>
        <Typography color="secondary" className="inforBox__title">
          {title}
        </Typography>
        <h2 className="inforBox__cases">{cases}</h2>
        <Typography color="secondary" className="inforBox__total">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InforBox;
