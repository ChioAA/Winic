// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { GearApi, ProgramMetadata, GearKeyring } from "@gear-js/api";
// import { useAccount } from "@gear-js/react-hooks";
// import { Button } from "@gear-js/ui";
// import { useState } from "react";

// function App() {

// }

// export default App;


import { RouterProvider } from 'react-router-dom';
import router from './routes/index.tsx';

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
