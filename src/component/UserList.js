import React, { useReducer, useEffect, useState } from "react";
import { list as userList } from "../services/user.service";
import { Link, useHistory } from "react-router-dom";
import userReducer from "../reducer/user";
// import {
//   DatatableWrapper,
//   Filter,
//   Pagination,
//   PaginationOpts,
//   TableBody,
//   TableHeader,
// } from "react-bs-datatable";
//import DataTable from "react-data-table-component";

//import { Col, Row, Table } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import DataTableBase from "./DataTableBasic";
import { nuLifeErrorToastr, nuLifeSuccessToastr } from "../utility/nulifeToastr";
import { Container,Row } from "reactstrap";

const initialState = {
  users: [],
  success: "",
  error: "",
  page: 1,
  totalResults: "",
};
const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);

function List() {
  const [userState, dispatch] = useReducer(userReducer, initialState);
  const [page, setPage] = useState(1);
  const history = useHistory();

 
  const handleEdit=(user)=>{
    
    history.push(`/user/${user._id}`)
    
  }

  useEffect(() => {
      userList({ page: page, limit: 5 }).then((result) => {
        
      dispatch({ type: "List", data: result });
      console.log(userState);
    });
  }, [page]);
  useEffect(() => {
    if(userState.success!==""){
      nuLifeSuccessToastr(userState.success)
    }
    if(userState.error!==""){
      console.log("todo state success", userState.success);
      
      nuLifeErrorToastr(userState.error)
    }
  
  
}, [userState.success,userState.error]);

  
  const columns = [
    { name: "UserName", selector: (row) => row.user_name, sortable: true, width: "550" },
    { name: "Email", selector: (row) => row.email },
    
    {
      name:"Action",
      cell: (row) => (
        <>
       <button className="btn btn-primary" onClick={() => handleEdit(row)}>Edit</button>
        </>
      ),
    },
    
  ];

  return (
    <Container>
      <Row>
      {/* <DataTable
      pagination
        columns={columns}
        data={todoState.todos}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        selectableRows
        dense
      /> */}
      <DataTableBase
        columns={columns}
        data={userState.users}
        striped={true}
        highlightOnHover={true}
        keyField="_id"
        defaultSortFieldId="user"
        sortServer={true}
        // persistTableHead={true}
        pagination
        paginationServer
        paginationTotalRows={userState.totalResults}
        paginationPerPage={5}
        paginationComponentOptions={{
          noRowsPerPage: true,
        }}
        onChangePage={(page) => setPage(page)}
        // subHeader
        onRowClicked={(row, event) => {
          console.log("Row ", row);
          console.log("Event", event);
        }}
      />
      </Row>
    </Container>
  );
}

export default List;
