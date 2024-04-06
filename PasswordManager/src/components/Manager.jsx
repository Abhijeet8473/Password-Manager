import React, { useEffect } from "react";
import { useRef, useState } from "react";

const Manager = () => {
  const ref = useRef();
  const passref = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passArray, setPassArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPassArray(JSON.parse(passwords));
    }
  }, []);

  const copyPassToClip = (val) => {
  window.navigator.clipboard.writeText(val)
  const name = passref.current.id
  alert(name)

};

  const savePassword = () => {
    setPassArray([...passArray, form]);
    localStorage.setItem("passwords", JSON.stringify([...passArray, form]));
    console.log(form);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showPassword = () => {};

  return (
    <>
      <div className="container mx-auto bg-slate-200 mycontainer">
        <h1 className="text-4xl text-green-800 text-center">
          Password Manager
        </h1>
        <p className="text-xl text-green-700 text-center">
          Your own password Manager
        </p>
        <div className=" flex flex-col p-4 text-black gap-5 items-center">
          <input
            onChange={handleChange}
            type="text"
            value={form.site}
            name="site"
            className=" rounded-full border border-black w-full p-4 py-1.5"
            placeholder="Enter website URL"
          />
          <div className="flex w-full justify-between gap-3">
            <input
              onChange={handleChange}
              type="text"
              value={form.username}
              name="username"
              className=" rounded-full border border-black w-full p-4 py-1.5"
              placeholder="Enter username"
            />
            <div className="relative">
              <input
                onChange={handleChange}
                type="password"
                value={form.password}
                name="password"
                className=" rounded-full border border-black w-full p-4 py-1.5"
                placeholder="Enter password"
              />
              <span className=" absolute right-0 m-2" onClick={showPassword}>
                <img className=" w-5 cursor-pointer" ref={ref}></img>
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-500 rounded-full px-2 py-1.5 
          w-fit hover:bg-green-600 border-2 border-green-900 "
          >
            <lord-icon
              src="https://cdn.lordicon.com/hqymfzvj.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>
        <div>
        <h1 className=" font-bold text-2xl py-4">The passwords are</h1>
        {passArray.length === 0 && <div>There are no passwords to show</div>}
        {passArray.length != 0 &&
        <table className="table-auto w-full overflow-hidden rounded-md">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="py-1 ">Site</th>
              <th className="py-1">Username</th>
              <th className="py-1">Password</th>
            </tr>
          </thead>
          <tbody className=" bg-green-50">
            {passArray.map((item, index)=>{
              return(
              <tr key={index}>
                <td><div className=" flex justify-center" id="site" ref={passref} value="">{item.site}<img  onClick={()=>copyPassToClip(item.site)} className="h-3.5 w-3 cursor-pointer mt-1 ml-3" src="/icons/copy.png"></img></div></td>
                <td className="w-36 " id="username" ref={passref}><div className="flex justify-center">{item.username}<img onClick={()=>copyPassToClip(item.username)} className="h-4 w-4 cursor-pointer mt-1 ml-3 flex" src="/icons/copy.png"></img> </div></td>
                <td className="text-center w-32" id="passowrd" ref={passref}><div className="flex justify-center">{item.password}<img onClick={()=>copyPassToClip(item.password)} className="h-4 w-4 cursor-pointer mt-1 ml-3" src="/icons/copy.png"></img></div></td>
              </tr>
              )
            })}
          </tbody>
        </table>
        }
      </div>
      </div>
      
    </>
  );
};

export default Manager;
