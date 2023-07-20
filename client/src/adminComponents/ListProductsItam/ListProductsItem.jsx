import React from 'react';
import styles from './ListProductsItem.module.css'; // Importa el archivo CSS
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import 'animate.css';
import logo from "../../assets/logo/LogoViandaExpress.jpeg"


const ListProductsItem = ({ name, final_price, status,id,localFoods, setLocalFoods }) => {

  const handleDelete = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Estas Seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      imageUrl: logo,
      showCancelButton: true,
      cancelButtonColor: '#d33', 
      confirmButtonText: 'Si, ¡Eliminar!',
      cancelButtonText: 'Cancelar',
      footer: 'Vianda Express',
      confirmButtonColor: 'var(--accentColor)',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
       },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
       }
    }).then((result)=>{
      if(result.isConfirmed){
        try {
          axios.delete(`/food/${id}`);
          Swal.fire({ 
            title: 'Eliminada!',
            text: `La Vianda ${name} fue Eliminada.`,
            icon:'success',
            confirmButtonColor: 'var(--accentColor)',
            footer: 'Vianda Express',
            imageUrl: logo,
            timer: 4000,
            timerProgressBar: true,
            
          });
          const updatedFoods = localFoods.filter(e => e.id !== id);
          setLocalFoods(updatedFoods);
        } catch (error) {        
          Swal.fire({ 
            title:'Error del sistema',
            text: `${error.message}`,
            icon: 'warning',
            imageUrl: logo,
            confirmButtonColor: 'var(--accentColor)',
            footer: 'Vianda Express',
          });
        }
      }else if(result.dismiss === Swal.DismissReason.cancel){
        Swal.fire({
          title:'Cancelado',
          text: 'Los cambios no se guardaron',
          icon: 'success',
          imageUrl: logo,
          confirmButtonColor: 'var(--accentColor)',
          footer: 'Vianda Express',
        });
      }
    })
  }


        const handleStatus = (e) => {
        const { value } = e.target;
      
        const confirmationMessage = `¿Desea ${
          value === "true" ? "habilitar" : "deshabilitar"
        } la vianda?`;
        
        Swal.fire({
          title: "Confirmación",
          text: confirmationMessage,
          icon: "success",
          showCancelButton: true,
          confirmButtonText: 'Entendido',
          cancelButtonText: 'Cancelar',
          dangerMode: true,
          confirmButtonColor: 'var(--accentColor)',
          footer: 'Vianda Express',
          imageUrl: logo,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
           }
        }).then((result) => {
          if (result.isConfirmed) {
          axios
            .put(`/food/${id}`, { status: value })
            .then(() => {
              const updatedFoods = localFoods.map((food) =>
                food.id === id ? { ...food, status: value } : food
              );
              setLocalFoods(updatedFoods);
            })
            .catch((error) => {
              Swal.fire("Error", error.mesage, "error");
            });
        }
      });
    }

      return (
        <tr className={styles.tds}> {/* Aplica la clase CSS utilizando la variable styles */}
            <td className={styles.tbodys}>{name}</td>
            <td className={styles.tbodys}>${final_price}</td>
            <td className={styles.tbodys}>
            < select className={styles.viewAllButton} onChange={handleStatus} value={status}>
                <option value={true}>Habilitado</option>
                <option value={false}>Deshabilitado</option>
              </select>
            </td>
            <td className={styles.tbodys}>
              <Link to={`/admin/edit/${id}`}>
                    <button><FontAwesomeIcon icon={faEdit} /></button>
              </Link>
            </td>
            <td className={styles.tbodys}>
            <button onClick={handleDelete}><FontAwesomeIcon icon={faTrashCan} /></button>
            </td>  
        </tr>
    );
};

export default ListProductsItem;
