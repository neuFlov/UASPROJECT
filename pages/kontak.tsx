import React from 'react';
import Navbar from './component/navbar';

function kontak() {
  return (
    <div>
      <Navbar></Navbar>
   <center><div className='kontak'>
      <h1>Informasi Kontak</h1>
      <p className='p'>Untuk mengetahui informasi lebih lanjut, Silakan hubungi kami melalui informasi kontak di bawah ini:</p>
      <ul>
        <li>
          <strong>Email:</strong> help@senangcup.com
        </li>
        <li>
          <strong>Telepon:</strong> 021-21212121
        </li>
        <li>
          <strong>Alamat:</strong> 
          <strong>Lapangan C Senayan</strong>
        </li>
      </ul>
    

    </div>
    <footer>
  <div className="footer">
    <p>&copy; 2023 Senang - Senang Cup. All rights reserved.</p>
  </div>
</footer>
    </center>
    </div>
    
  );
}

export default kontak;