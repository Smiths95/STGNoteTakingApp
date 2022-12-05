import React from 'react';
import Navbar from '../components/Navbar/Navbar.js';
import CreateNote from '../components/CreateNote/CreateNote.js';
import Footer from '../components/Footer/Footer.js';

function CreatePage() {
  return (
    <div>
      <Navbar />
      <CreateNote />
      <Footer />
    </div>
  )
};

export default CreatePage;