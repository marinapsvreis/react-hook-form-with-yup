import { useForm, Controller } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

const isPasswordLengthValid = (password: string | undefined) => !!password && password.length >= 8;
const isPasswordUppercaseValid = (password: string | undefined) => !!password && /[A-Z]/.test(password);
const isPasswordLowercaseValid = (password: string | undefined) => !!password && /[a-z]/.test(password);
const isPasswordSpecialCharacterValid = (password: string | undefined) => !!password && /[!@#$%^&*(),.?":{}|<>]/.test(password);
const isPasswordDigitValid = (password: string | undefined) => !!password && /\d/.test(password); 

const schema = object({
  name: string().required("Required"),
  email: string().email("Invalido email format").required("Required"),
  birthDate: string().required("Required"),
  mainRole: string().required("Required"),
  password: string()
    .test('is-length-valid', 'Password must be at least 8 characters', (value) =>  isPasswordLengthValid(value))
    .test('is-uppercase-valid', 'Password must contain at least one uppercase letter', (value) => isPasswordUppercaseValid(value))
    .test('is-lowercase-valid', 'Password must contain at least one lowercase letter', (value) => isPasswordLowercaseValid(value))
    .test('is-special-character-valid', 'Password must contain at least one special character', (value) => isPasswordSpecialCharacterValid(value))
    .test('is-digit-valid', 'Password must contain at least one digit', (value) => isPasswordDigitValid(value))
    .required("Required"),
  confirmPassword: string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Required"),
});

function App() {
  const [password, setPassword] = useState<string | undefined>("");
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>("");
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialCharacter: false,
    digit: false
  });
  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  

  const handlePasswordChange = (password: string | undefined) => {
    if (password) {
      setPassword(password);
      setPasswordValidation({
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        specialCharacter: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        digit: /\d/.test(password)
      });
    } else {
      setPasswordValidation({
        length: false,
        uppercase: false,
        lowercase: false,
        specialCharacter: false,
        digit: false
      });
    }   
  };

  const handleConfirmPasswordChange = (confirmPassword: string | undefined) => {
    if (confirmPassword) {
      setConfirmPassword(confirmPassword);
    }
  }

  function teste(data: any) {
    console.log(data);
  }

  return (
    <div className="p-4">
      <form
        onSubmit={handleSubmit(teste)}
        className="bg-zinc-200 max-w-[400px] p-4 rounded-md"
      >
        <h1 className="mb-4 flex justify-center font-bold">Freela register</h1>
        <div className="flex flex-col gap-6 p-6">
          <div className="w-full">
            <label
              className={`text-gray-600 ${errors?.name && "text-red-600"}`}
            >
              Name
            </label>
            <input
              className={`w-full px-2 py-1 rounded-md ${
                errors?.name && "border border-red-600"
              }`}
              type="text"
              {...register("name")}
            />
            {<p className="text-red-600">{errors?.name?.message}</p>}
          </div>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <div className="w-full">
                <label
                  className={`text-gray-600 ${errors?.email && "text-red-600"}`}
                >
                  Email
                </label>
                <input
                  className={`w-full px-2 py-1 rounded-md ${
                    errors?.email && "border border-red-600"
                  }`}
                  type="text"
                  {...field}
                />
                {<p className="text-red-600">{errors?.email?.message}</p>}
              </div>
            )}
          />
          <div className="w-full">
            <label
              className={`text-gray-600 ${errors?.birthDate && "text-red-600"}`}
            >
              Birth Date
            </label>
            <input
              className={`w-full px-2 py-1 rounded-md ${
                errors?.birthDate && "border border-red-600"
              }`}
              type="date"
              {...register("birthDate")}
            />
            {<p className="text-red-600">{errors?.email?.message}</p>}
          </div>
          <div className="w-full flex flex-col">
            <label
              className={`text-gray-600 ${errors?.mainRole && "text-red-600"}`}
            >
              Main Role
            </label>
            <select
              className={`w-full px-2 py-1 rounded-md ${
                errors?.mainRole && "border border-red-600"
              }`}
              {...register("mainRole")}
            >
              <option value="">Fullstack</option>
              <option value="">Frontend</option>
              <option value="">Backend</option>
              <option value="">QA</option>
              <option value="">UI/UX</option>
            </select>
            {<p className="text-red-600">{errors?.mainRole?.message}</p>}
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              <p className="flex justify-start items-center gap-2 text-sm">
                <span className={`w-[10px] h-[10px] ${passwordValidation.length ? 'bg-green-500' : 'bg-red-500'} inline-block rounded-full`}></span>
                8 caracteres ou mais
              </p>
              <p className="flex justify-start items-center gap-2 text-sm">
                <span className={`w-[10px] h-[10px] ${passwordValidation.specialCharacter ? 'bg-green-500' : 'bg-red-500'} inline-block rounded-full`}></span>
                1 caracter especial
              </p>
              <p className="flex justify-start items-center gap-2 text-sm">
                <span className={`w-[10px] h-[10px] ${passwordValidation.digit ? 'bg-green-500' : 'bg-red-500'} inline-block rounded-full`}></span>
                1 número
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="flex justify-start items-center gap-2 text-sm">
                <span className={`w-[10px] h-[10px] ${passwordValidation.lowercase ? 'bg-green-500' : 'bg-red-500'} inline-block rounded-full`}></span>
                1 letra minúscula
              </p>
              <p className="flex justify-start items-center gap-2 text-sm">
                <span className={`w-[10px] h-[10px] ${passwordValidation.uppercase ? 'bg-green-500' : 'bg-red-500'} inline-block rounded-full`}></span>
                1 letra maiúscula
              </p>
              <p className="flex justify-start items-center gap-2 text-sm">
                <span className={`w-[10px] h-[10px] ${password === confirmPassword ? 'bg-green-500' : 'bg-red-500'} inline-block rounded-full`}></span>
                A senhas conferem
              </p>
            </div>
          </div>
          <div className="w-full">
            <label
              className={`text-gray-600 ${errors?.password && "text-red-600"}`}
            >
              Password
            </label>
            <input
              className={`w-full px-2 py-1 rounded-md ${
                errors?.password && "border border-red-600"
              }`}
              type="password"
              {...register("password")}
              onChange={(e) => {
                handlePasswordChange(e.target.value);
              }}
            />
            {<p className="text-red-600">{errors?.password?.message}</p>}
          </div>
          <div className="w-full">
            <label
              className={`text-gray-600 ${
                errors?.confirmPassword && "text-red-600"
              }`}
            >
              Confirm Password
            </label>
            <input
              className={`w-full px-2 py-1 rounded-md ${
                errors?.confirmPassword && "border border-red-600"
              }`}
              type="password"
              {...register("confirmPassword")}
              onChange={(e) => { 
                handleConfirmPasswordChange(e.target.value);
              }}
            />
            {<p className="text-red-600">{errors?.confirmPassword?.message}</p>}
          </div>
        </div>
        <div className="flex gap-2 justify-end px-6">
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:bg-blue-700 transition"
            disabled={
              errors?.name ||
              errors?.email ||
              errors?.birthDate ||
              errors?.mainRole ||
              errors?.password ||
              errors?.confirmPassword
                ? true
                : false
            }
          >
            Save
          </button>
          <button className="bg-white px-4 py-2 rounded-md border border-blue-600 text-blue-600">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
