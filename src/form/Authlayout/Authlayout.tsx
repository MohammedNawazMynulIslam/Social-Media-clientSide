import { Outlet,Navigate } from "react-router-dom"

export const Authlayout = () => {
    const isAuthenticated = false;
  return (
   <>
   {isAuthenticated?(
    <Navigate to="/"/>
   ):(
    <>
    <section className="flex flex-1 justify-center items-center flex-col py-10">
        <Outlet></Outlet>
    </section>
    </>
   )}
   </>
  )
}
