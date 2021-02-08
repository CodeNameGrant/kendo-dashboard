import React from 'react'

import { ToastContainer, toast, Slide } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

// Use below to change default color of error toast popup
import './custom.css'

export default function NotificationCentre() {
  const success = () => toast.success(`Item Saved Item Saved Item Saved Item Saved Item Saved Item Saved Item Saved Item Saved Item Saved Item Saved Item Saved Item Saved Item SavedItem Saved Item Saved Item Saved Item Saved Item Saved Item Saved Item Saved Item Saved Item Saved Item Saved Item Saved Item Saved Item Saved `);
  const warning = () => toast.warning(`Item Saved with a warning`);
  const info = () => toast.info(`Item Info`);

  const error = () => toast.error("Item not Saved, Cause Error.", {
    autoClose: false,
    closeOnClick: false
  });

  return (
    <div>
      <button onClick={success}>YAY !</button>
      <button onClick={error}>SHIT !</button>
      <button onClick={info}>Thanks</button>
      <button onClick={warning}>Ok</button>

      <ToastContainer
        transition={Slide}
        position="top-right"
        autoClose={4000}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </div>
  );
}
