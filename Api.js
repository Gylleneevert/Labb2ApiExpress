
const express = require("express")
const app = express()
const axios = require("axios")
const cors = require("cors")
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cors())



app.get("/cars", async (req,res) => {


    try{
    const display = await axios.get("https://minimalapi-webbutveckling-labb220240118154216.azurewebsites.net/car")

    

    res.json(display.data)
    } catch(error){
        console.error("$ett fel uppstod:", error.message);
        res.status(500).send("error 500")

    }
});

app.get("/car/:id", async (req,res) => {
    try{
        let carId = parseInt(req.params.id);

        let apiEndpoint = await axios.get(`https://minimalapi-webbutveckling-labb220240118154216.azurewebsites.net/car/${carId}`);


        res.json(apiEndpoint.data);
    }
    catch (error){
        console.error("$ett fel uppstod:", error.message);
        res.status(500).send("error 500")
    }
});

app.post("/car", async (req,res) => {
    
    try {
        

        const carMake = req.body.Make;
        const carModel = req.body.Model;
    
    let newCar = {
        
        Make: carMake,
        Model: carModel
    };

    const apiEndpoint = "https://minimalapi-webbutveckling-labb220240118154216.azurewebsites.net/car"

    let create = await axios.post(apiEndpoint, newCar)

    res.json(create.data)


    } catch (error){
        console.error("$ett fel uppstod:", error.message);
        res.status(500).send("error 500")
    }


});

app.put("car/:id", async (req,res) => {

    try{
        const carId = parseInt(req.params.id);
       

        let updateCar = req.body;
    

        const apiEndPoint = await axios.put(`https://minimalapi-webbutveckling-labb220240118154216.azurewebsites.net/car/${carId}`, updateCar);

        // let update = await axios.put(`${apiEndpoint}/${updateCar}`);

        res.json(apiEndPoint.data)

    }catch (error){
        console.error("$ett fel uppstod:", error.message);
        res.status(500).send("error 500")
    }

});

app.delete("/car/:id", async (req,res) => {

    try{
        let carId = parseInt(req.params.Id);

        const apiEndpoint = "https://minimalapi-webbutveckling-labb220240118154216.azurewebsites.net/car/${carId}"; 

        // let response = await axios.delete(`${apiEndpoint}/${carId}}`);

        res.json(apiEndpoint)

    }catch (error) {
        console.error("$ett fel uppstod:", error.message);
        res.status(500).send("error 500")

    }


});


app.listen(PORT, () => {
    console.log("using port" + PORT)
});