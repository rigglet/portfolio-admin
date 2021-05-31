import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { FaUser, FaLock } from "react-icons/fa";
//message components
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//components
import Spinner from "../components/spinner";
//images
import curve2 from "../images/curve-lin-grad.svg";
//import loginPic from "../images/login.svg";
//import login2 from "../images/login2.svg";
import organise from "../images/organise.svg";
import profile from "../images/profile.svg";

//auth
import { signin } from "../api/api";

function Login({ setAuth }) {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocus, toggleEmail] = useState(false);
  const [passwordFocus, togglePassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const notify = (type) => {
    switch (type) {
      case "MISSING":
        toast.warn("Please enter a username and password", { color: "black" });
        break;
      case "INVALID":
        toast.error("Please check username and password are correct", {
          color: "black",
        });
        break;
      default:
        toast.dark("Nothing to report");
    }
  };
  const handleSubmit = async (e) => {
    //e.preventDefault();
    setLoading(true);
    toggleEmail(false);
    togglePassword(false);

    if (email.length > 0 && password.length > 0) {
      const data = { email, password };
      const res = await signin(data);

      if (res.status === 200) {
        setAuth({
          id: res.data.id,
          username: res.data.username,
          token: res.data.token,
          profileImageUrl: res.data.profileImageUrl,
          email: res.data.email,
        });

        setPassword("");
        setEmail("");
        history.push("/admin/projects");
      } else {
        //toast message - invalid credentials
        notify("INVALID", res.error);
        setLoading(false);
      }
    } else {
      //toast message - missing credentials
      notify("MISSING");
      setLoading(false);
    }
  };

  return (
    <StyledLogin>
      <ToastContainer
        closeButton={false}
        transition={Zoom}
        position="bottom-center"
        draggable={false}
        pauseOnHover
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
      />
      <img src={curve2} alt="curve" id="curve" />

      <h1 className="title">Portfolio Administration</h1>

      <div className="container">
        <div className="img-container">
          <img id="mainImg" src={organise} alt="organise" />
        </div>
        <div className="login-container">
          <form className="form">
            <img id="profile" src={profile} alt="profile" />
            <h2>Please, log in</h2>
            <div className="input-div">
              <h5
                className={
                  emailFocus || email.length > 0 ? "prompt-selected" : "prompt"
                }
              >
                Email
              </h5>
              <div className={emailFocus ? "focus" : "label"}>
                <FaUser className="icon" />
                <input
                  name="email"
                  onFocus={() => toggleEmail(!emailFocus)}
                  onBlur={() => toggleEmail(!emailFocus)}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="text"
                  size="20"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="input-div">
              <h5
                className={
                  passwordFocus || password.length > 0
                    ? "prompt-selected"
                    : "prompt"
                }
              >
                Password
              </h5>
              <div className={passwordFocus ? "focus" : "label"}>
                <FaLock className="icon" />
                <input
                  name="password"
                  onFocus={() => togglePassword(!passwordFocus)}
                  onBlur={() => togglePassword(!passwordFocus)}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  size="20"
                  autoComplete="off"
                />
              </div>
            </div>
            {!isLoading ? (
              <input
                onClick={(e) => handleSubmit(e)}
                type="button"
                value="Login"
                className="btn"
              />
            ) : (
              <Spinner />
            )}
          </form>
        </div>
      </div>
    </StyledLogin>
  );
}

const StyledLogin = styled(motion.div)`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  overflow-x: hidden;
  #curve {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
  .title {
    position: fixed;
    width: 100vw;
    display: flex;
    margin: 2rem;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: bold;
    font-family: "Lobster Two", cursive;
    color: #689ed0;
  }
  .container {
    width: 100vw;
    height: 100vh;
    display: flex;
    padding: 3rem;
    .img-container {
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      #mainImg {
        width: 600px;
      }
    }
    .login-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      #profile {
        width: 150px;
      }
      .form {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        h2 {
          color: #474747;
          font-size: 13pt;
        }
        .focus {
          width: 300px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          border-bottom: 3px solid #689ed0;
          color: #689ed0;
          //border: 1px solid red;
        }
        .input-div {
          display: flex;
          flex-direction: column;

          .prompt-selected {
            font-family: "Poppins", sans-serif;
            font-size: 14pt;
            font-weight: bold;
            color: #474747;
            font-variant-caps: all-small-caps;
            transform: translateY(10px) translateX(0px);
            transition: 0.5s ease;
          }
          //Initial position of "placeholder" text <H5 />
          .prompt {
            transform: translateY(42px) translateX(60px);
            font-size: 1.2rem;
            color: #474747;
            font-weight: 200;
            font-family: "Poppins", sans-serif;
            transition: 0.5s ease;
            pointer-events: none;
          }
          .icon {
            width: 20px;
            height: 20px;
          }
          input {
            margin: 0.2rem 0 0.5rem 0;
            border: none;
            outline: none;
            background: none;
            padding: 0.5rem 0.7rem;
            font-size: 1.2rem;
            font-weight: 200;
            font-family: "Poppins", sans-serif;
            color: #cbcaca;
            &:focus {
              color: #474747;
            }
          }
          .label {
            width: 300px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            border-bottom: 3px solid #cbcaca;
            color: #cbcaca;
            &:hover {
              color: #689ed0;
              border-color: #689ed0;
            }
          }
        }
        .btn {
          display: block;
          width: 50%;
          height: 50px;
          border-radius: 25px;
          margin: 1rem;
          font-size: 1.2rem;
          outline: none;
          border: none;
          cursor: pointer;
          color: white;
          font-family: "poppins", sans-serif;
          background-image: linear-gradient(to right, #689ed0, #8eafce);
          transition: 0.5s;
        }
      }
    }
  }
  @media screen and (max-width: 1050px) {
  }
  @media screen and (max-width: 1000px) {
  }
  @media screen and (max-width: 900px) {
    #curve {
      display: none;
    }
    #profile {
      width: 25%;
    }
    .title {
      position: relative;
      font-size: 1.5rem;
      width: auto;
    }
    .container {
      padding: 0;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .img-container {
        display: none;
      }
    }
  }
  @media screen and (max-width: 320px) {
    #curve {
      display: none;
    }
    #profile {
      width: 25%;
    }
    .title {
      position: relative;
      font-size: 1.2rem;
      width: auto;
    }
    .container {
      padding: 0;
      flex-direction: column;
      .img-container {
        display: none;
      }
    }
  }
`;

export default Login;
