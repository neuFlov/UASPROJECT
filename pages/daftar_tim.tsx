import { useState,useEffect } from "react";
import axios from "axios";
import { stat } from "fs";
import Navbar from "./component/navbar"
// import Link from 'next/link'
const koneksiTurnamen = axios.create({
  
    baseURL: "http://127.0.0.1:5000/api/turnamen" 
  });
  
export default function FormTurnamen() {
    const [statenama_tim, setNama_tim] = useState("");
    const [statenoreg, setNoreg] = useState("");
    const [statetgl_pendaftaran, setTgl_Pendaftaran_Daftar] = useState("2018-07-22");
    const [statekapten, setKapten] = useState("");
    const [statelogo, setLogo] = useState("");
    const [turnamen, setTurnamen] =  useState(null);
   
     
    const [stateedit,setEdit]=useState("hide");

     
    
    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }
   

 const handleSubmitEdit =  (event) => {
    
  event.preventDefault();
  const text = "/"+event.target.noreg.value;
  alert('Pastikan form Sudah Benar');
  //const formData = new FormData(event.target);
  const formData = {
    noreg: event.target.noreg.value,
    nama_tim: event.target.nama_tim.value,
    kapten: event.target.kapten.value,
    tgl_pendaftaran: event.target.tgl_pendaftaran.value
}
  alert('Berhasil Di-Update');
  koneksiTurnamen
    .put( text,formData)
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
   
}


  const handleCancelEdit = (event) => {
    
   
    setEdit("hide");
    setNama_tim("");
    setNoreg("");
    setKapten("");
    setTgl_Pendaftaran_Daftar(formatDate("2018-07-22"));
    setLogo("");
     
 }
   const handleDelete = (event) => {
            event.preventDefault();
            var noreg = event.target.value;
            koneksiTurnamen.delete(`/${noreg}`)
              .then(response => {
                console.log('Data berhasil dihapus:', response.data);
                window.location.reload();
                setTurnamen(
                  turnamen.filter((turnamen) => {
                     return turnamen.noreg !== noreg;
                  }))
             
                // Lakukan langkah-langkah lain setelah penghapusan data
              })
              .catch(error => {
                console.error('Gagal menghapus data:', error);
              })
          }

      const handleEdit = (event) => {
            event.preventDefault();
            var noreg = event.target.value;
            
               const trmEdit =  turnamen.filter((turnamen) => {
                     return turnamen.noreg == noreg;
                  });
                  if(trmEdit!=null){

                    setNama_tim(trmEdit[0].nama_tim);
                    setNoreg(trmEdit[0].noreg);
                    setKapten(trmEdit[0].kapten);
                    setTgl_Pendaftaran_Daftar(formatDate(trmEdit[0].tgl_pendaftaran));
                    setLogo(trmEdit[0].logo);
                    setEdit("show box");

                  }
          }
  useEffect(() => {
      async function getTurnamen() {
        const response = await koneksiTurnamen.get("/").then(function (axiosResponse) {
            setTurnamen(axiosResponse.data.data); 
     
         })
         .catch(function (error) {   
          alert('error from turnamen in api turnamen: '+error);
         });;
          }
      getTurnamen();
    }, []);
  
   
if(turnamen==null){
return(
  <div>
    waiting...
  </div>
)
}else{

  return (
    <div><Navbar></Navbar>
    <center><div className="body-turnamen">
     
    
       
      <form id="formedit" className={stateedit} onSubmit={handleSubmitEdit}>
          <table border={4}>
            <tbody>
            <tr>
            <td> <label> No Reg:</label></td>
            <td><input type="text" id="noreg"  value={statenoreg} name="noreg"/>
              {/* onChange={handleOnchangenoreg}  /> */}
              </td>
        </tr>
        <tr>
            <td>  <label className="label"> Nama Tim:</label></td>
            <td><input type="text" id="nama_tim"  value={statenama_tim} name="nama_tim"
               onChange={(e) => setNama_tim(e.target.value)}
               /></td>
        </tr>
        <tr>
            <td>  <label className="label"> Logo Tim:</label></td>
            <td>  <img src={statelogo} width="80"/> </td>
        </tr>
        <tr>
            <td>  <label className="label"> Tanggal Pendaftaran:</label></td>
            <td>  <input type="date" value={statetgl_pendaftaran} name="tgl_pendaftaran"  onChange={(e) => setTgl_Pendaftaran_Daftar(e.target.value)}
           min="1970-01-01" max="2025-12-31"/>
     </td>
        </tr>
        <tr>
            <td>  <label className="label"> Kapten:</label></td>
            <td><textarea  id="text" style={{resize: "none"}} value={statekapten} name="kapten"  onChange={(e) => setKapten(e.target.value)}></textarea></td>
        </tr>
            </tbody>
          </table>
          <input type="submit" value="Konfirmasi"className="buttonsubmit"  />
          <input type="button" value="Batalkan" onClick={handleCancelEdit} className="button-cancel"  />
          </form>  
        <br/>
        <br/>
       <h1 className="active">Daftar Tim Turnamen</h1>
       <hr/>
        <div className="container">
          
          {turnamen.map((trm) => 
           
           <div className="card">
             <h2>{trm.noreg}</h2>  
             <h2>{trm.nama_tim}</h2>
             <div className="title title--epic">Kapten<div/>{trm.kapten}</div>
             <div className="desc">{formatDate(trm.tgl_pendaftaran)}</div>
            
             <div className="desc"><img src={trm.logo} width="80"/></div>
             
               <div className="actions">
               <button className="actions__like"  onClick={handleEdit} value={trm.noreg}>Edit &nbsp; <i className="fas fa-heart"></i> </button>
               <button className="actions__trade"  onClick={handleDelete} value={trm.noreg}>Delete &nbsp; <i className="fas fa-exchange-alt"></i> </button>
             
             </div>
           
          
           </div>

            
                )}
                     
          
          </div>
          </div>
          </center>
          <footer>
  <div className="footer">
    <p>&copy; 2023 Senang - Senang Cup. All rights reserved.</p>
  </div>
</footer>
          </div>
          
        )
}
  
  }
