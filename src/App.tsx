import { useForm, Controller } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = object({
  name: string().required(),
  email: string().email().required(),
  login: string().required(),
  password: string().required(),
  confirmPassword: string().required(),
  test: string(),
});

function App() {
  const {
    register,
    control,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function teste() {
    console.log("submit");
  }

  return (
    <div className="p-4">
      <form
        onSubmit={handleSubmit(teste)}
        className="bg-zinc-200 max-w-[400px] p-4 rounded-md"
      >
        <h1 className="mb-4 flex justify-center font-bold">
          React Hook Form + Yup
        </h1>
        <div className="flex flex-col gap-6 p-6">
          <div className="w-full">
            <label className="text-gray-600">Name</label>
            <input
              className="w-full px-2 py-1 rounded-md"
              type="text"
              {...register("name")}
            />
          </div>
          <div className="w-full">
            <label className="text-gray-600">Email</label>
            <input
              className="w-full px-2 py-1 rounded-md"
              type="text"
              {...register("email")}
            />
          </div>
          <div className="w-full">
            <label className="text-gray-600">Login</label>
            <input
              className="w-full px-2 py-1 rounded-md"
              type="text"
              {...register("login")}
            />
          </div>
          <div className="w-full">
            <label className="text-gray-600">Password</label>
            <input
              className="w-full px-2 py-1 rounded-md"
              type="password"
              {...register("password")}
            />
          </div>
          <div className="w-full">
            <label className="text-gray-600">Confirm Password</label>
            <input
              className="w-full px-2 py-1 rounded-md"
              type="password"
              {...register("confirmPassword")}
            />
          </div>
          <Controller
            control={control}
            name="test"
            render={() => (
              <div>
                <label className="text-gray-600">Controller Test</label>
                <input
                  className="w-full px-2 py-1 rounded-md"
                  type="text"
                />
              </div>
            )}
          />
        </div>
        <div className="flex gap-2 justify-end px-6">
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded-md text-white"
            // disabled={true}
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
