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

const columns = [
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
    field: 'requesttime',
    headerName: 'Request Time',
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
    renderCell: renderDetailsButton
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, status: 'Pending', requesttime: '03/07/2022' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 , status: 'Pending', requesttime: '03/07/2022' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 , status: 'Pending', requesttime: '03/07/2022' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 , status: 'Pending', requesttime: '03/07/2022' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 26 , status: 'Pending', requesttime: '03/07/2022' },
  { id: 6, lastName: 'Melisandre', firstName: 'Dai', age: 150 , status: 'Pending', requesttime: '03/07/2022' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 , status: 'Pending', requesttime: '03/07/2022' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 , status: 'Pending', requesttime: '03/07/2022' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 , status: 'Pending', requesttime: '03/07/2022' },
];

function index() {
  return (
    <MiniDrawer>
    <div>
      <h3 style={{    marginTop: '2em',
  fontSize: '1.5em',
  marginBottom: '1em',
  fontWeight: 'bold'}}>
        Danh sách đơn chờ duyệt
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
  </MiniDrawer>
  )
}

export default index
