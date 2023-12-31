import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

const MealInformation = () => {


    const [MealInformation,setMealInformation] = useState([])

    useEffect(()=>{

        let urL="http://localhost:5000/api/v1/mealInformation";

        axios.get(urL).then((res)=>{
            
            setMealInformation(res.data.EachPersonMealInfo)
        })



    },[])

    console.log(MealInformation)





    return (
        <div>
            <h1>this is meal information</h1>
            

            <Table striped bordered hover size="sm" className='p-5'>
      <thead>
        <tr>
          <th>name</th>
          <th>Email</th>
          <th>Total Meal</th>
          <th>Total balance</th>
        </tr>
      </thead>
      <tbody>
        {
          MealInformation.map((data)=>{
            return(

                <tr>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data?.totalMeal}</td>
                <td>{data?.totalBalance}</td>
              </tr>

             
                

            )
          })  
        }
      
        
      </tbody>
    </Table>
        </div>
    );
};

export default MealInformation;