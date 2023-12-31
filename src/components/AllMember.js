import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

import { Button, Modal, Table } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { SweetAlert } from '../helper/SweetAlert';
import { removeSession } from '../helper/SessionHelper';






const AllMember = (props) => {

  
  const [members,Setmembers] = useState([])

 const [id,setId] = useState(null)
  const [show, setShow] = useState(false);

  let mealRef,balanceRef = useRef();
  

  const handleClose = () =>{

    setShow(false);

  } 
  const handleSubmit = () =>{


    const meal = mealRef.value;
    const balance = balanceRef.value;
    let URL="http://localhost:5000/api/v1/regularMeal";

    const postBody={
      memberId:id,
      meal:meal,
      balance:balance,
        
    }
   

    axios.post(URL,postBody).then((res)=>{      
              if(res.status===200){                         
              }
 
          })
   


    setShow(false);

  } 

const onDelete=(id)=>{
  SweetAlert(id).then((res)=>{

    
    if(res===true){
      
      getData();



    }
  })
}



  
  const handleShow = (id) => {

   
    

    setId(id)

   
  
    setShow(true);
  }
  
  
  


  
    useEffect(()=>{
    
     
      getData();
      
  
     
    },[])

    


     function getData() {
      let URL="http://localhost:5000/api/v1/allMember";

      axios.get(URL).then((res)=>{
            
          
            if(res.status===200){
              Setmembers(res.data.members)
                
            }

            
      
        })

     
      
    }

    
  
    return (
        <div>
            <h1>All the members</h1>
            
            <Table striped bordered hover>
            <thead>
    <tr>
    <th scope="col">serial</th>
      <th scope="col">name</th>
      <th scope="col">setMeal</th>
      <th scope="col">email</th>
      <th scope="col">mobile</th>
      <th className="text-danger" scope="col "> Action</th>
      
   
    </tr>
  </thead>

            {
                members.map((member,i)=>{

                     return(
                      
                        <tr>
                   
                        <th scope="row">{i}</th>
                        <td>{member.name}</td>
                        <td className='m-2'>
                        <Button className='text-dark btn btn-info' variant="primary" onClick={()=>handleShow(member._id)}>
                           set
                        </Button>
                       
                        </td>
                        <td>{member.email}</td>
                        <td>{member.mobile}</td>
                        <td><Button onClick= {()=>onDelete(member._id)} className="text-dark">Delete</Button></td>
                      </tr>                       
                      
                     )

                }
                
                
                )
            }

            </Table>

            <>

<Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Regular Basis Meal</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div className="container">
                <div className="row justify-content-center">                         
                                <br/>
                                <input ref={(input)=>mealRef=input} placeholder='Regular Meal' type='email' className='form-control animated fadeInUp'></input>
                                <br/>
                                <input ref={(input)=>balanceRef=input} placeholder='Balance' type='password' className='form-control animated fadeInUp'></input>
                                <br/>
                        
                </div>
            </div>


    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleSubmit}>
        submit
      </Button>
    </Modal.Footer>
  </Modal>
    </>
  

            
        </div>
    );
};

export default AllMember;