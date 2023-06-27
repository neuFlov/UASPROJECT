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
    const [stateadd,setAdd]=useState("show");
    const [statebutonadd,setbtnAdd]=useState("show");
     
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
   
  const handleSubmitAdd =  (event) => {
    
    event.preventDefault();
    alert('Success Input Data');
    const formData = new FormData(event.target);
    koneksiTurnamen
      .post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
     
 }
 const handleSubmitEdit =  (event) => {
    
  event.preventDefault();
  const text = "/"+event.target.noreg.value;
  alert(text);
  //const formData = new FormData(event.target);
  const formData = {
    noreg: event.target.noreg.value,
    nama_tim: event.target.nama_tim.value,
    kapten: event.target.kapten.value,
    tgl_pendaftaran: event.target.tgl_pendaftaran.value
}
  alert(formData);
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
  // const handleAdd = (event) => {
    
  //    setAdd("show boxInput");
  //    setbtnAdd("hide");
  //    setEdit("hide");
 
      
  // }
  const handleCancelAdd = (event) => {
    
     setAdd("hide");
     setbtnAdd("show");
     setEdit("hide");
 
      
  }
  const handleCancelEdit = (event) => {
    
    setAdd("hide");
    setbtnAdd("show");
    setEdit("hide");
    setNama_tim("");
    setNoreg("");
    setKapten("");
    setTgl_Pendaftaran_Daftar(formatDate("2018-07-22"));
    setLogo("");
     
 }
  //  const handleDelete = (event) => {
  //           event.preventDefault();
  //           var noreg = event.target.value;
  //           koneksiTurnamen.delete(`/${noreg}`)
  //             .then(response => {
  //               console.log('Data berhasil dihapus:', response.data);
  //               setTurnamen(
  //                 turnamen.filter((turnamen) => {
  //                    return turnamen.noreg !== noreg;
  //                 }))
                    
                 
             
  //               // Lakukan langkah-langkah lain setelah penghapusan data
  //             })
  //             .catch(error => {
  //               console.error('Gagal menghapus data:', error);
  //             })
  //         }

      // const handleEdit = (event) => {
      //       event.preventDefault();
      //       var noreg = event.target.value;
            
      //          const trmEdit =  turnamen.filter((turnamen) => {
      //                return turnamen.noreg == noreg;
      //             });
      //             if(trmEdit!=null){

      //               setNama_tim(trmEdit[0].nama_tim);
      //               setNoreg(trmEdit[0].noreg);
      //               setKapten(trmEdit[0].kapten);
      //               setTgl_Pendaftaran_Daftar(formatDate(trmEdit[0].tgl_pendaftaran));
      //               setLogo(trmEdit[0].logo);
      //               setAdd("hide");
      //               setbtnAdd("show");
      //               setEdit("show box");

      //             }
      //     }
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
     
    
       <form id="formadd" className={stateadd} onSubmit={handleSubmitAdd} >
        <table border={4}>
            <tbody>
            <tr>
            <td> <label className="label"> No Registrasi :</label></td>
            <td><input type="text" id="noreg" name="noreg"  className="textarea"/>
              
              </td>
        </tr>
        <tr>
            <td>  <label className="label"> Nama Tim :</label></td>
            <td><input type="text" id="nama_tim"   name="nama_tim" className="textarea"
               /></td>
        </tr>
        <tr>
            <td>  <label className="label"> Logo Tim :</label></td>
            <td>   <input
                    type="file" name="logo"/>  </td>
        </tr>
        <tr>
            <td>  <label className="label"> Tanggal Pendaftaran :</label></td>
            <td>  <input type="date" name="tgl_pendaftaran"  className="textarea"
           min="1970-01-01" max="2025-12-31"/>
     </td>
        </tr>
        <tr>
            <td>  <label className="label"> Kapten :</label></td>
            <td><input type="text"  id="text" style={{resize: "none"}}  name="kapten"  className="textarea" /></td>
        </tr>
            </tbody>
          </table>
          {/* <tr> <button id="btnadd" onClick={handleAdd} className={statebutonadd}></button>  </tr> */}
          <input type="submit" className="buttonsubmit" value="Tambah Tim"/>
          <input type="button" value="Batalkan" onClick={handleCancelAdd} className="button-cancel" />
          </form>
      
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




// import { useState,useEffect } from "react";
// import axios from "axios";
// import { stat } from "fs";

 
//  const koneksiTurnamen = axios.create({
  
//   baseURL: "http://127.0.0.1:5000/api/turnamen" 
// });

// export default function Formturnamen() {
//     const [statenama_tim, setnama_tim] = useState("");
//     const [statenoreg, setNoreg] = useState("");
//     const [statetgl_pendaftaran, setTgl_Pendaftaran] = useState("2018-07-22");
//     const [statekapten, setKapten] = useState("");
//     const [statelogo, setLogo] = useState("");
//     const [turnamen, setturnamen] =  useState(null);
//     const [stateadd,setAdd]=useState("hide");
//     const [statebutonadd,setbtnAdd]=useState("show");
     
//     const [stateedit,setEdit]=useState("hide");

     
    
//     function formatDate(date) {
//       var d = new Date(date),
//           month = '' + (d.getMonth() + 1),
//           day = '' + d.getDate(),
//           year = d.getFullYear();
  
//       if (month.length < 2) 
//           month = '0' + month;
//       if (day.length < 2) 
//           day = '0' + day;
  
//       return [year, month, day].join('-');
//   }
   
//   const handleSubmitAdd =  (event) => {
    
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     koneksiTurnamen
//       .post("/", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((res) => {
//         console.log(res);
//         window.location.reload();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
     
//  }
//  const handleSubmitEdit =  (event) => {
    
//   event.preventDefault();
//   const address = "/"+event.target.noreg.value;
//   alert(address);
//   //const formData = new FormData(event.target);
//   const formData = {
//     noreg: event.target.noreg.value,
//     nama_tim: event.target.nama_tim.value,
//     kapten: event.target.kapten.value,
//     tgl_pendaftaran: event.target.tgl_pendaftaran.value
// }
//   alert(formData);
//   koneksiTurnamen
//     .put( address,formData)
//     .then((res) => {
//       console.log(res);
//       window.location.reload();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
   
// }
//   const handleAdd = (event) => {
    
//      setAdd("show");
//      setbtnAdd("hide");
//      setEdit("hide");
 
      
//   }
//   const handleCancelAdd = (event) => {
    
//      setAdd("hide");
//      setbtnAdd("show");
//      setEdit("hide");
 
      
//   }
//   const handleCancelEdit = (event) => {
    
//     setAdd("hide");
//     setbtnAdd("show");
//     setEdit("hide");
//     setnama_tim("");
//     setNoreg("");
//     setKapten("");
//     setTgl_Pendaftaran(formatDate("2018-07-22"));
//     setLogo("");
     
//  }
//    const handleDelete = (event) => {
//             event.preventDefault();
//             var noreg = event.target.value;
//             koneksiTurnamen.delete(`/${noreg}`)
//               .then(response => {
//                 console.log('Data berhasil dihapus:', response.data);
//                 setturnamen(
//                   turnamen.filter((turnamen) => {
//                      return turnamen.noreg !== noreg;
//                   }))
             
//                 // Lakukan langkah-langkah lain setelah penghapusan data
//               })
//               .catch(error => {
//                 console.error('Gagal menghapus data:', error);
//               })
//           }

//       const handleEdit = (event) => {
//             event.preventDefault();
//             var noreg = event.target.value;
            
//                const trmEdit =  turnamen.filter((turnamen) => {
//                      return turnamen.noreg == noreg;
//                   });
//                   if(trmEdit!=null){

//                     setnama_tim(trmEdit[0].nama_tim);
//                     setNoreg(trmEdit[0].noreg);
//                     setKapten(trmEdit[0].kapten);
//                     setTgl_Pendaftaran(formatDate(trmEdit[0].tgl_pendaftaran));
//                     setLogo(trmEdit[0].logo);
//                     setAdd("hide");
//                     setbtnAdd("show");
//                     setEdit("show");

//                   }
//           }
//   useEffect(() => {
//       async function getturnamen() {
//         const response = await koneksiTurnamen.get("/").then(function (axiosResponse) {
//             setturnamen(axiosResponse.data.data); 
     
//          })
//          .catch(function (error) {   
//           alert('error from turnamen in api turnamen: '+error);
//          });;
//           }
//       getturnamen();
//     }, []);
  
   
// if(turnamen==null){
// return(
//   <div>
//     waiting...
//   </div>
// )
// }else{

//   return (
//     <div>
//      <button id="btnadd" onClick={handleAdd} className={statebutonadd}>add</button>
    
//        <form id="formadd" className={stateadd} onSubmit={handleSubmitAdd} >
//         <table border={0}>
//             <tbody>
//             <tr>
//             <td> <label> noreg:</label></td>
//             <td><input type="text" id="noreg" name="noreg"/>
              
//               </td>
//         </tr>
//         <tr>
//             <td>  <label> nama_tim:</label></td>
//             <td><input type="text" id="nama_tim"   name="nama_tim" 
//                /></td>
//         </tr>
//         <tr>
//             <td>  <label> logo:</label></td>
//             <td>   <input
//                     type="file" name="image"/>  </td>
//         </tr>
//         <tr>
//             <td>  <label> Tanggal Lahir:</label></td>
//             <td>  <input type="date" name="tgl_pendaftaran"
//            min="1970-01-01" max="2025-12-31"/>
//      </td>
//         </tr>
//         <tr>
//             <td>  <label> kapten:</label></td>
//             <td><textarea  id="address" style={{resize: "none"}}  name="kapten" ></textarea></td>
//         </tr>
//             </tbody>
//           </table>
//           <input type="submit" />
//           <input type="button" value="cancel" onClick={handleCancelAdd} />
//           </form>  
//       <form id="formedit" className={stateedit} onSubmit={handleSubmitEdit}>
 
//           <table border={0}>
//             <tbody>
//             <tr>
//             <td> <label> noreg:</label></td>
//             <td><input type="text" id="noreg"  value={statenoreg} name="noreg"/>
//               {/* onChange={handleOnchangenoreg}  /> */}
//               </td>
//         </tr>
//         <tr>
//             <td>  <label> nama_tim:</label></td>
//             <td><input type="text" id="nama_tim"  value={statenama_tim} name="nama_tim"
//                onChange={(e) => setnama_tim(e.target.value)}
//                /></td>
//         </tr>
//         <tr>
//             <td>  <label> logo:</label></td>
//             <td>  <img src={statelogo} width="80"/> </td>
//         </tr>
//         <tr>
//             <td>  <label> Tanggal Lahir:</label></td>
//             <td>  <input type="date" value={statetgl_pendaftaran} name="tgl_pendaftaran"  onChange={(e) => setTgl_Pendaftaran(e.target.value)}
//            min="1970-01-01" max="2025-12-31"/>
//      </td>
//         </tr>
//         <tr>
//             <td>  <label> kapten:</label></td>
//             <td><textarea  id="address" style={{resize: "none"}} value={statekapten} name="kapten"  onChange={(e) => setKapten(e.target.value)}></textarea></td>
//         </tr>
//             </tbody>
//           </table>
//           <input type="submit" />
//           <input type="button" value="cancel" onClick={handleCancelEdit} />
//           </form>  
//         <br/>
//         <br/>
       
//     Tabel turnamen hasil get Local Nodejs
    
//         <table border={1}>
//             <thead>
//                 <tr>
//                   <td><b>noreg</b></td> 
//                 <td><b>nama_tim</b></td>
//                 <td><b>logo</b></td>
//                 <td><b>Tanggal Lahir</b></td>
//                 <td><b>kapten</b></td>
//                 <td colSpan={2}><b>Action</b></td>
//                 </tr>
//             </thead>
//             <tbody>
//             {turnamen.map((trm) => 
//                 <tr>
//                     <td>{trm.noreg}</td>
//                     <td>{trm.nama_tim}</td>
//                     <td><img src={trm.logo} width="80"/></td>
//                     <td>{trm.tgl_pendaftaran}</td>
//                     <td>{trm.kapten}</td>
//                    <td><button onClick={handleEdit} value={trm.noreg}>edit</button></td>
//                    <td><button onClick={handleDelete} value={trm.noreg}>delete</button></td>
//                 </tr>
//            )}     
//                    </tbody>
//           </table>
         
//           </div>
//         )
// }
//   
//   }