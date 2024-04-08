import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

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
    window.navigator.clipboard.writeText(val);
    
    // toast.success("Copied successfully");
    // alert("Hello")
    toast.success("Copied")
  };

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setPassArray([...passArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passArray, { ...form, id: uuidv4() }])
      );
      console.log(form);
      setForm({ site: "", username: "", password: "" });
      // toast("Password saved")
    } else {
      toast.error("Enter proper details");
    }
  };

  const delePassword = (id) => {
    let c = confirm("You want to delete the password?..")
    if(c){
      
      console.log("the id is ", id);
      setPassArray(passArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passArray.filter((item) => item.id !== id))
      );
      
    }
  };

  const editPassword = (id) => {
    setForm(passArray.filter((i) => i.id === id)[0]);
    setPassArray(passArray.filter((i) => i.id !== id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showPassword = () => {};

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="container mx-auto bg-slate-200 md:mycontainer">
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
          {passArray.length != 0 && (
            <table className="table-auto w-full overflow-hidden rounded-md">
              <thead className="bg-green-500 text-white">
                <tr>
                  <th className="py-1 ">Site</th>
                  <th className="py-1">Username</th>
                  <th className="py-1">Password</th>
                  <th className="py-1">Action</th>
                </tr>
              </thead>
              <tbody className=" bg-green-50">
                {passArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div
                          className=" flex justify-center"
                          id="site"
                          ref={passref}
                          value=""
                        >
                          {item.site}
                          <img
                            onClick={() => copyPassToClip(item.site)}
                            className="h-3.5 w-3 cursor-pointer mt-1.5 ml-3"
                            src="/icons/copy.png"
                          ></img>
                          <ToastContainer position="top-center" />
                        </div>
                      </td>
                      <td className="w-36 " id="username" ref={passref}>
                        <div className="flex justify-center">
                          {item.username}
                          <img
                            onClick={() => copyPassToClip(item.username)}
                            className="h-3.5 w-3 cursor-pointer mt-1.5 ml-3 flex"
                            src="/icons/copy.png"
                          ></img>{" "}
                        </div>
                      </td>
                      <td
                        className="text-center w-32"
                        id="passowrd"
                        ref={passref}
                      >
                        <div className="flex justify-center">
                          {item.password}
                          <img
                            onClick={() => copyPassToClip(item.password)}
                            className="h-3.5 w-3 cursor-pointer mt-1.5 ml-3"
                            src="/icons/copy.png"
                          ></img>
                        </div>
                      </td>
                      <td className=" text-center w-32 py-2 mx-1">
                        <div className=" flex justify-center gap-2">
                          <span onClick={() => editPassword(item.id)}>
                            <img
                              src="/icons/edit-text.png"
                              className="h-4 w-4 cursor-pointer mt-1 ml-3"
                            />
                          </span>
                          <span onClick={() => delePassword(item.id)}>
                            <img
                              src="/icons/bin.png"
                              className="h-4 w-4 cursor-pointer mt-1 ml-3"
                            />
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
