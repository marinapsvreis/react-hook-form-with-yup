import { useForm, Controller } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = object({
  name: string().required('Required'),
  email: string().email('Invalido email format').required('Required'),
  login: string().required('Required'),
  password: string().required('Required'),
  confirmPassword: string().required('Required'),
  test: string().required('Required'),
});

function App() {
  const {
    register,
    control,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function teste(data: any) {
    console.log(data);
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
            <label className={`text-gray-600 ${errors?.name && 'text-red-600'}`}>Name</label>
            <input
              className={`w-full px-2 py-1 rounded-md ${errors?.name && 'border border-red-600'}`}
              type="text"
              {...register("name")}
            />
            {<p className="text-red-600">{errors?.name?.message}</p>}
          </div>
          <div className="w-full">
            <label className={`text-gray-600 ${errors?.email && 'text-red-600'}`}>Email</label>
            <input
              className={`w-full px-2 py-1 rounded-md ${errors?.email && 'border border-red-600'}`}
              type="text"
              {...register("email")}
            />
            {<p className="text-red-600">{errors?.email?.message}</p>}
          </div>
          <div className="w-full">
            <label className={`text-gray-600 ${errors?.login && 'text-red-600'}`}>Login</label>
            <input
              className={`w-full px-2 py-1 rounded-md ${errors?.login && 'border border-red-600'}`}
              type="text"
              {...register("login")}
            />
            {<p className="text-red-600">{errors?.login?.message}</p>}
          </div>
          <div className="w-full">
            <label className={`text-gray-600 ${errors?.password && 'text-red-600'}`}>Password</label>
            <input
              className={`w-full px-2 py-1 rounded-md ${errors?.password && 'border border-red-600'}`}
              type="password"
              {...register("password")}
            />
            {<p className="text-red-600">{errors?.password?.message}</p>}
          </div>
          <div className="w-full">
            <label className={`text-gray-600 ${errors?.confirmPassword && 'text-red-600'}`}>Confirm Password</label>
            <input
              className={`w-full px-2 py-1 rounded-md ${errors?.confirmPassword && 'border border-red-600'}`}
              type="password"
              {...register("confirmPassword")}
            />
            {<p className="text-red-600">{errors?.confirmPassword?.message}</p>}
          </div>
          <Controller
            control={control}
            name="test"
            render={({ field }) => (
              <div>
                <label className={`text-gray-600 ${errors?.test && 'text-red-600'}`}>Controller Test</label>
                <input
                  className={`w-full px-2 py-1 rounded-md ${errors?.test?.message && 'border border-red-600'}`} 
                  type="text"
                  {...field}
                />
                {<p className="text-red-600">{errors?.test?.message}</p>}
              </div>
            )}
          />
        </div>
        <div className="flex gap-2 justify-end px-6">
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:bg-blue-700 transition"
            disabled={(errors?.name || errors?.email || errors?.login || errors?.password || errors?.confirmPassword || errors?.test) ? true : false}
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
