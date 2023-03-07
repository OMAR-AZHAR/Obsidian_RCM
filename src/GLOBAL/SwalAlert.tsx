import Swal from "sweetalert2";
export const Alert = (
  position: any,
  icon: any,
  title: any,
  button: boolean,
  timer: number
) =>
  Swal.fire({
    position: position,
    icon: icon,
    title: title,
    showConfirmButton: button,
    timer: timer,
  });
export default Swal;
