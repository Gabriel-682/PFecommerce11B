import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button 
      /* onClick={() => logout( {returnTo: window.location.origin} )} */
      onClick={() => logout( {returnTo: "https://viandaexpress.vercel.app/"} )}
    >Cerrar sesión 
    </button>
  );
};

export default LogoutButton;