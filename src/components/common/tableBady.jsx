import React from "react";
import _ from "lodash";

const TableBody = ({ data, columns }) => {
  return (
    <React.Fragment>
      {data.map((item) => (
        <tr>
          {columns.map((col) => (
            <td>{_.get(item, col.path)}</td>
          ))}
        </tr>
      ))}
    </React.Fragment>
  );
};

export default TableBody;
