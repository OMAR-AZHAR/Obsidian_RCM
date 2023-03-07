import Swal from "sweetalert2";
export const Alert = (
  position: any,
  icon: any,
  title: any,
  text: any,
  button: boolean
) =>
  Swal.fire({
    position: position,
    icon: icon,
    title: title,
    text: text,
    showConfirmButton: button,
    confirmButtonColor: "#428efd",
  });

export default Swal;
