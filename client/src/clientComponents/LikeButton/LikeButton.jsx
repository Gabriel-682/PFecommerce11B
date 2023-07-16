import styles from "./LikeButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserFavoritesAction } from "../../redux/userSlice";
import axios from "axios";
import Swal from "sweetalert2";


export default function LikeButton({ foodId }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.usersReducer.userFavorites);

  const isFavorite = favorites.some((favorite) => favorite.id === foodId);

  const { user, isAuthenticated } = useAuth0();

  const handleLike = async () => {
    if (!isAuthenticated) {
      Swal.fire({
        title: "",
        text: "Por favor, loguéate para agregar viandas a tus favoritos.",
        icon: 'warning',
        confirmButtonText: 'Entendido!',
        confirmButtonColor: '#426b1f',
      })
      // window.alert("Por favor, loguéate para agregar viandas a tus favoritos.");
      return;
    }
    const email = user.email;

    if (isFavorite) {
      Swal.fire({
        title: "",
        text: "Estás seguro de querer eliminar esta vianda de tus favoritos?",
        icon: 'warning',
        showCancelButton: true, 
        confirmButtonText: 'Sí',
        confirmButtonColor: '#426b1f',
        cancelButtonText: 'No, fue un error',
        cancelButtonColor: '#FA8072',
      }).then( async (result) => {
        if(result.isConfirmed) {
          console.log(result)
          await axios.delete(`/favorite/${email}/${foodId}`);
          dispatch(getUserFavoritesAction(email));
          Swal.fire({
            title: 'Se ha eliminado la vianda de tus favoritos.',
            icon: 'success',
            confirmButtonColor: '#426b1f',
            confirmButtonText: 'Entendido!',
          })
        } 
      })
    } else {
      await axios.post("/favorite", { email, foodId });
      dispatch(getUserFavoritesAction(email));
      Swal.fire({
        title: 'Se ha agregado la vianda a tus favoritos.',
        text: "Accede a tus favoritos en Home.",
        icon: 'success',
        confirmButtonColor: '#426b1f',
        confirmButtonText: 'Entendido!',
      })
    }
  };

  return (
    <button title="Agregar o eliminar vianda de tus favoritos"
      className={`${styles.likeButton} ${isFavorite && styles.isFavoriteButton}`} 
      onClick={handleLike}
    >
      ♡
    </button>
  );
}