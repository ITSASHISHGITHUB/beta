// import React from 'react'
// import Card from "../pages/card"
// import Landingpage from "../pages/landing"
// import Sidebar from "../pages/auth/login"
// const index = () => {
//   return (
//     <div>
//        {/* <Landingpage/>
//        <Card/> */}
//        <Sidebar/>
//     </div>
//   )
// }

// export default index

import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session, 
    },
  };
}

export default function HomePage({ session }) {
  return (
    <div>
     <h1>
     {/* {session.user.user.name} */}
      </h1>
    </div>
  );
}