import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import DeleteNote from '../components/DeleteNote/DeleteNote';
import Footer from '../components/Footer/Footer';

function DeletePage() {
  return (
    <div>
      <Navbar />
      <DeleteNote />
      <Footer />
    </div>
  );
};

export default DeletePage;