import React from "react";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: {
    margin: "16px",
  },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "16px",
    },
  },
}));

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }))
const Wiwistores = () => {
  const navigate = useNavigate();
  const [Wiwistores, setWiwistores] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/wiwistore").then((Response) => {
      setWiwistores(Response.data);
    }, []);
  });

  function handleClick() {
    navigate("/storemenu");
  }
  return (
    
    <div style={{background: "linear-gradient(0deg, rgba(0,198,255,1) 0%, rgba(255,214,0,1) 85%)"}}>
    
      <Container>
        <Card style={{textAlign:'center',width:1300,height: 80,backgroundImage:`url("https://thumbs.dreamstime.com/b/abstract-autumn-background-beautiful-leaves-texture-34325133.jpg")`}}>
          <div >
            <h1>Welcome to WiWi Stores</h1>
          </div>
        </Card>

        <br></br>
        <div style={{display: 'flex',margin: 50, backgroundImage:`url("https://thumbs.dreamstime.com/b/abstract-autumn-background-beautiful-leaves-texture-34325133.jpg")`}}>
        {Wiwistores.map((w) => {
          return (
            <div >
                
                {/* <Item> */}
                <Card style={{margin:50}}>
                    
                  <CardMedia
                    component="img"
                    height="200"
                    width="300"
                    image={w.storeimg}
                  />                  
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {w.storename}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {w.storeid}
                      <br></br>
                      {w.storelocation}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={handleClick}>
                      Order Now
                    </Button>
                  </CardActions>
                </Card>
                {/* </Item> */}
                </div>
          );
          
        })}
        </div>
      </Container>
      </div>
    
  );
};

export default Wiwistores;
