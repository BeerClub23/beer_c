import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import { Button, Typography } from "@mui/material";
// import { useRouter } from "next/navigation";
import "aos/dist/aos.css";
import "./formLogin.scss";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { Controller } from "react-hook-form";
import { CustomTextField } from "../../components/inputs/CustomTextFields";
import Swal from "sweetalert2";
import ApiFormLogin from "@/app/services/login";

export default function FormLogin() {
  // const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    handleSubmit,
    control,
    setFocus,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const onSubmit = async (data) => {
    let respuesta = await ApiFormLogin(data);
    if (respuesta.token) {
      // router.push(`/home`)
      console.log(respuesta.token);
      console.log("Estas dentro");
    } else if (respuesta.response.request.status == 401) {
      Swal.fire({
        title: "Error!",
        text: "Usuario no registrado",
        imageUrl: "../../images/icons/no-beer.jpg",
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: "No puede ingresar",
        confirmButtonText: "OK",
        confirmButtonColor: "#ceb5a7",
        focusConfirm: false,
      });
      console.error(respuesta.response.data.message);
    } else if (respuesta.response.request.status == 500) {
      Swal.fire({
        title: "Ups!",
        text: "No se pudo ingresar, intentelo mas tarde",
        imageUrl: "../../images/icons/no-beer.jpg",
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: "No puede ingresar",
        confirmButtonText: "OK",
        confirmButtonColor: "#ceb5a7",
        focusConfirm: false,
      });
      console.error(respuesta.response.data.message);
    }
  };
  React.useEffect(() => {
    setFocus("email");
  }, [setFocus]);
  React.useEffect(() => {
    console.log(isSubmitting);
  }, [isSubmitting]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <FormControl component="fieldset">
        <Typography
          variant="h4"
          className="poppins"
          sx={{ mt: 3, textAlign: "center" }}
        >
          Bienvenido
        </Typography>

        <FormGroup aria-label="position" sx={{ mt: 3 }} className="loginBox">
          <CustomTextField
            name="email"
            label="Email"
            type="email"
            control={control}
            defaultValue=""
            variant="standard"
            aria_describedby="outlined-day-helper-text"
          />
          <Typography variant="caption" color="red">
            <ErrorMessage errors={errors} name="email" />
          </Typography>

          <Controller
            name="pass"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl sx={{ mt: 3 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Contraseña
                </InputLabel>
                <Input
                  {...field}
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            )}
          />
          <Typography variant="caption" color="red">
            <ErrorMessage errors={errors} name="pass" />
          </Typography>

          {isSubmitting ? (
            <Button
              variant="contained"
              size="large"
              sx={{ pt: "7px", mx: "auto", mt: 10, mb: 8, fontWeight: "bold" }}
              disabled
            >
              Procesando...
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              type="submit"
              sx={{ pt: "7px", mx: "auto", mt: 10, mb: 8, fontWeight: "bold" }}
            >
              Ingresar
            </Button>
          )}
        </FormGroup>
      </FormControl>
    </form>
  );
}