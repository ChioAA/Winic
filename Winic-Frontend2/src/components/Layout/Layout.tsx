import { useNavigate } from "react-router";
import { routesNames } from "../../routes/routes";

const Layout = () => {
  const navigate  = useNavigate()

  return (
    <div className="bg-globalWhite  flex flex-row w-full">
      <div className="min-w-xs w-90 h-20 max-w-xs flex flex-col h-48 rounded-md shadow-md cursor-pointer m-5 hover:shadow-2xl " onClick={()=>navigate(routesNames.upload)}  >
            <span className="bg-purple h-20 text-globalWhite text-center font-bold py-1 rounded-b-md w-full">Subir producto</span>
      </div>
      <div className="min-w-xs w-90 h-20 max-w-xs flex flex-col h-48 rounded-md shadow-md cursor-pointer m-5 hover:shadow-2xl"  >
            <span className="bg-purple text-globalWhite text-center font-bold py-1 rounded-b-md w-full">Ver productos</span>
      </div>
    </div>

  )
}

export default Layout; 