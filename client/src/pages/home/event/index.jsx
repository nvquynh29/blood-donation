import React from 'react'
import MiniDrawer from '../../../layouts/trial/MiniDrawer'
import Button from '@mui/material/Button'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CardEvent from '../shared/CardEvent';
import Grid from '@mui/material/Grid';

function index() {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const organnizations = [
    {
      name: 'Su kien hien mau 1',
      date: '22/12/2021',
      img: `/images/process_3.jpg`, 
      content: 'utrum quia curae accumsan, penatibus! Deserunt hic condimentum fames? Occaecat proident irure temporibus labore vestibulum id? Quae facere sagittis tortor vestibulum vel! Voluptatibus!'
    },
    {
      name: 'Su kien hien mau 2',
      date: '22/12/2021',
      img: `/images/process_3.jpg`, 
      content: 'utrum quia curae accumsan, penatibus! Deserunt hic condimentum fames? Occaecat proident irure temporibus labore vestibulum id? Quae facere sagittis tortor vestibulum vel! Voluptatibus!'
    },
    {
      name: 'Su kien hien mau 3',
      date: '22/12/2021',
      img: `/images/process_3.jpg`, 
      content: 'utrum quia curae accumsan, penatibus! Deserunt hic condimentum fames? Occaecat proident irure temporibus labore vestibulum id? Quae facere sagittis tortor vestibulum vel! Voluptatibus!'
    },
    {
      name: 'Su kien hien mau 4',
      date: '22/12/2021',
      img: `/images/process_3.jpg`, 
      content: 'utrum quia curae accumsan, penatibus! Deserunt hic condimentum fames? Occaecat proident irure temporibus labore vestibulum id? Quae facere sagittis tortor vestibulum vel! Voluptatibus!'
    },
    {
      name: 'Su kien hien mau 5',
      date: '22/12/2021',
      img: `/images/process_3.jpg`, 
      content: 'utrum quia curae accumsan, penatibus! Deserunt hic condimentum fames? Occaecat proident irure temporibus labore vestibulum id? Quae facere sagittis tortor vestibulum vel! Voluptatibus!'
    },
    {
      name: 'Su kien hien mau 6',
      date: '22/12/2021',
      img: `/images/process_3.jpg`, 
      content: 'utrum quia curae accumsan, penatibus! Deserunt hic condimentum fames? Occaecat proident irure temporibus labore vestibulum id? Quae facere sagittis tortor vestibulum vel! Voluptatibus!'
    }
  ]

  return (
    <MiniDrawer>
      <div>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button variant="outlined" color='success' startIcon={<AddOutlinedIcon />} onClick={handleClickOpen}>
            Add new
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address here. We
                will send updates occasionally.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Create</Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
        <h3 style={{    marginTop: '2em',
    fontSize: '1.5em',
    marginBottom: '1em',
    fontWeight: 'bold'}}>
          Danh sách cấc sự kiện đang hoạt động
          </h3>
          <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
            {
              organnizations.map((item, index) => <Grid item xs={12} sm={6} md={3} key={index}> <CardEvent name={item.name} content={item.content} date={item.date} img={item.img} /> </Grid>)
            }
          </Grid>
        </div>
      </div>
    </MiniDrawer>
  )
}

export default index
