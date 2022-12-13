import React, { useState } from "react";
import { styled } from "@mui/system";
import { Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { List } from "@mui/material";
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";
import { InputLabel } from "@mui/material";
import { ListItemAvatar } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Tab } from "@mui/material";
import {
  Box,
  Grid,
  Stack,
  Chip,
  Divider,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Paper,
  MenuList,
  MenuItem,
  ListItemText,
  Icon,
  CardContent,
  Typography,
  Card,
} from "@mui/material";
import Alert from '@mui/material/Alert';

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Storemenu = () => {
  const [menuitems, setMenuitems] = useState([]);
  const [topping, setToppings] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const QuantityHandler = (event) => {
    setQuantity(event.target.value);
  };
  useEffect(() => {
    axios.get("http://localhost:5000/storemenu").then((response) => {
      setMenuitems(response.data);
    }, []);
  });

  const handleToppings = () => {
    axios.get("http://localhost:5000/topping").then((response) => {
      setToppings(response.data);
    }, []);
    handleOpen();
  };
  const handleChange = (event) => {
    //event.preventDefault();
    const {
      target: { value },
    } = event;
    console.log(value);
    setSelectedToppings(typeof value === "string" ? value.split(",") : value);
  };

  const addToCart = (name, price, quantity) => {
    var Topprice = 0;
    selectedToppings.map((item) => {
      Topprice = Topprice + item.price;
    });
    alert("Items added — check it out!")
    console.log(
      name +
        " ||  Quantity : " +
        quantity +
        " || " +
        "ToppingPrice : " +
        Topprice +
        " totalprice = " +
        (price + Topprice) * quantity
    );
  };

  const cart = ()=>{
    
  }
  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(0deg, rgba(0,198,255,1) 0%, rgba(255,214,0,1) 85%)",
        }}
      >
        <Container>
          <Card
            style={{
              textAlign: "center",
              width: 1300,
              height: 80,
              backgroundImage: `url("https://thumbs.dreamstime.com/b/abstract-autumn-background-beautiful-leaves-texture-34325133.jpg")`,
            }}
          >
            <div>
              <object align="right">
                <IconButton
                  sx={{ fontSize: 80 }}
                  color="disabled"
                  aria-label="add to shopping cart"
                  onClick={cart}
                >
                  <AddShoppingCartIcon />
                </IconButton>
              </object>
              <h1>WiWi Food Stores</h1>
            </div>
          </Card>
          <br></br>

          <Card
            style={{
              width: 650,
              height: 80,
              backgroundImage: `url("https://thumbs.dreamstime.com/b/abstract-autumn-background-beautiful-leaves-texture-34325133.jpg")`,
              margin: "30px 310px 20px 20px",
              marginLeft: "300px",
              padding: "10px 20px 10px 10px",
              textAlign: "center",
            }}
            textA
          >
            <Typography variant="h5" component="div" sx={{ color: "black" }}>
              Good Food, Great Time
            </Typography>
            <Typography component="div" sx={{ color: "black" }}>
              <h5>
                Our chefs at WiWi make delicious food selections every week -
                you pick, we cook and deliver.
              </h5>
            </Typography>
          </Card>

          {menuitems.map((i) => {
             // {console.log("test",menuitems)}
            return (
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 1000,
                  bgcolor: "background.paper",
                  padding: "10px 20px 10px 10px",
                  marginLeft: "130px",
                }}
              >
                <Grid container alignItems="center">
                  <Grid item xs>
                    <Typography variant="h5">{i.itemname}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">
                      Quantity {"  "}
                      <TextField
                        variant="outlined"
                        size="small"
                        sx={{ width: "100px" }}
                        type={"number"}
                        onChange={QuantityHandler}
                      />
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs>
                  <Typography color="text.secondary" variant="body2">
                    <i>{i.desc}</i>
                  </Typography>
                  <section
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h6">
                      ${i.price} {"  "}
                      <Button
                        variant="contained"
                        onClick={handleToppings}
                        size="small"
                        color="secondary"
                      >
                        <AddIcon></AddIcon>Toppings
                      </Button>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Add Toppings"}
                        </DialogTitle>
                        <DialogContent>
                          <List sx={{ pt: 0 }}>
                            <FormControl
                              variant="standard"
                              sx={{
                                m: 1,
                                minWidth: 120,
                              }}
                            >
                              <InputLabel>Select Here</InputLabel>
                              <Select
                                multiple
                                value={selectedToppings}
                                onChange={handleChange}
                                input={<OutlinedInput label="Tag" />}
                              >
                                {topping.map((m, i) => {
                                  return (
                                    <MenuItem
                                      key={i}
                                      value={{
                                        name: m.tname,
                                        price: parseFloat(m.tprice),
                                      }}
                                    >
                                      <Checkbox color="secondary" />
                                      <ListItemAvatar>
                                        <Avatar src={m.toppingimage}></Avatar>
                                      </ListItemAvatar>
                                      <ListItemText primary={m.tname} />
                                      <ListItemText primary={m.tprice} />
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>
                            <Tab />
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={handleClose}
                            >
                              Done
                            </Button>
                          </List>
                        </DialogContent>
                      </Dialog>
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      onClick={() => {
                        addToCart(i.itemname, i.price, quantity);
                      }}
                    >
                      <AddIcon></AddIcon>Add To Cart
                    </Button>
                  </section>
                </Grid>

                <br />
                <Divider variant="middle" />
              </Box>
            );
          })}
        </Container>
      </div>
    </>
  );
};

export default Storemenu;





