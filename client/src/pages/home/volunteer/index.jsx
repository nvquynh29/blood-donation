import React from 'react'
import MiniDrawer from '../../../layouts/trial/MiniDrawer'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const renderDetailsButton = (params) => {
  return (
      <div>
          <Button
              variant="outlined"
              color="primary"
              size="small"
              style={{ marginLeft: 5 }}
              onClick={() => {
                  
              }}
          >
             Confirm 
          </Button>
          <Button
              variant="outlined"
              color="error"
              size="small"
              style={{ marginLeft: 5 }}
              onClick={() => {
                  
              }}
          >
             Reject 
          </Button>
      </div>
  )
}

const renderDetailsButton2 = (params) => {
  return (
      <div>
          <Button
              variant="outlined"
              color="error"
              size="small"
              style={{ marginLeft: 5 }}
              onClick={() => {
                  
              }}
          >
             Delete 
          </Button>
      </div>
  )
}

const columns = [
  { field: 'id', headerName: 'ID', flex: 1},
  { field: 'firstName', headerName: 'First name', flex: 1},
  { field: 'lastName', headerName: 'Last name', flex: 1},
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    flex: 1
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    flex: 1,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1
  },
  {
    field: 'action',
    headerName: 'Action',
    flex: 1,
    renderCell: renderDetailsButton
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, status: 'Pending' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 , status: 'Pending' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 , status: 'Pending' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 , status: 'Pending' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 26 , status: 'Pending' },
  { id: 6, lastName: 'Melisandre', firstName: 'Dai', age: 150 , status: 'Pending' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 , status: 'Pending' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 , status: 'Pending' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 , status: 'Pending' },
];



const columns2 = [
  { field: 'id', headerName: 'ID', flex: 1},
  { field: 'firstName', headerName: 'First name', flex: 1},
  { field: 'lastName', headerName: 'Last name', flex: 1},
  
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    flex: 1,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    flex: 1
  },
  {
    field: 'phonenumber',
    headerName: 'Phone number',
    flex: 1
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1
  },
  {
    field: 'action',
    headerName: 'Action',
    flex: 1,
    renderCell: renderDetailsButton2
  },
];

const rows2 = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, status: 'Active', phonenumber: '0987654321' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 , status: 'Active', phonenumber: '0987654321'  },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 , status: 'Active', phonenumber: '0987654321'  },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 , status: 'Active', phonenumber: '0987654321'  },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 26 , status: 'Active', phonenumber: '0987654321'  },
  { id: 6, lastName: 'Melisandre', firstName: 'Dai', age: 150 , status: 'Active', phonenumber: '0987654321'  },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 , status: 'Active', phonenumber: '0987654321'  },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 , status: 'Active', phonenumber: '0987654321'  },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 , status: 'Active', phonenumber: '0987654321'  },
];

function index() {
  return (
    <MiniDrawer>
      <div>
        <h3 style={{    marginTop: '2em',
    fontSize: '1.5em',
    marginBottom: '1em',
    fontWeight: 'bold'}}>
          Danh sách tình nguyện viên chờ duyệt
          </h3>
      <div style={{ height: 600}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
      </div>
      <div>
      <h3 style={{    marginTop: '2em',
    fontSize: '1.5em',
    marginBottom: '1em',
    fontWeight: 'bold'}}>
          Danh sách tình nguyện viên đang hoạt động
          </h3>
      <div style={{ height: 600}}>
      <DataGrid
        rows={rows2}
        columns={columns2}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
      </div>
    </MiniDrawer>
  )
}

export default index
