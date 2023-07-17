

const Login = () => {
  return (
    <>
      <div className="col-span-12 mr-8 md:mr-0 relative top-[50%] text-white">
        <div className="flex justify-center items-center">

          <form className="bg-slate-800 shadow-lg rounded px-8 pt-6 pb-8 mb-4">
            <h3 className="mb-3 text-center text-2xl">HR Lab</h3>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="email"/>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="password"/>
            </div>
            <div className="flex flex-col items-center justify-between">

                
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button">
                  Sign In
                </button>
              <a href="#" className="mt-2 hover:text-blue-700">
                Forgot Password
              </a>
            </div>
          </form>
        </div>
        </div>
    </>
  )
}

export default Login
