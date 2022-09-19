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

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameFocus, toggleUsername] = useState(false);
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
    toggleUsername(false);
    togglePassword(false);

    if (username.length > 0 && password.length > 0) {
      const data = { username, password };
      const res = await signin(data);

      if (res.status === 200) {
        setAuth({
          id: res.data.id,
          username: res.data.username,
          token: res.data.token,
          profileImageUrl: res.data.profileImageUrl,
        });

        setPassword("");
        setUsername("");
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
          <img className="profile-image" src={profile} alt="profile" />
          <form className="form">
            <h2>Please, log in</h2>
            <div className="input-div">
              <h5
                className={
                  usernameFocus || username.length > 0
                    ? "prompt-selected"
                    : "prompt"
                }
              >
                Username
              </h5>
              <div className={usernameFocus ? "focus" : "label"}>
                <FaUser className="icon" />
                <input
                  name="username"
                  onFocus={() => toggleUsername(!usernameFocus)}
                  onBlur={() => toggleUsername(!usernameFocus)}
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  type="text"
                  //size="20"
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
                  //size="20"
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
              <Spinner size="30px" />
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
  height: 100vh;
  align-items: center;
  justify-content: space-around;

  #curve {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: -1;
    object-fit: scale-down;
    height: 100vh;
  }

  .title {
    width: 100vw;
    text-align: center;
    font-size: 3.5rem;
    font-weight: bold;
    font-family: "Lobster Two", cursive;
    color: #689ed0;
  }

  .container {
    width: 100vw;
    min-height: 80vh;
    display: flex;
    justify-content: space-evenly;

    .img-container {
      display: flex;
      align-items: center;
      justify-content: center;
      #mainImg {
        width: 80%;
      }
    }

    .login-container {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      .profile-image {
        width: min(60%, 150px);
      }

      .form {
        height: 60%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        width: 50%;

        h2 {
          color: #474747;
          font-size: 13pt;
        }
        .focus {
          display: flex;
          align-items: center;
          border-bottom: 3px solid #689ed0;
          color: #689ed0;
        }
        .input-div {
          width: 100%;
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
            width: 100%;
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
            display: flex;
            align-items: center;
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
          width: 100%;
          height: 50px;
          border-radius: 10px;
          margin: 1rem;
          font-size: 1.6rem;
          letter-spacing: 0.2rem;
          outline: none;
          border: none;
          cursor: pointer;
          color: white;
          font-variant-caps: all-small-caps;
          font-family: "poppins", sans-serif;
          background-image: linear-gradient(to right, #689ed0, #8eafce);
          transition: 0.5s;
        }
      }
    }
  }

  //#### RESPONSIVE SECTION ####
  //320px — 480px: Mobile devices
  @media screen and (max-width: 480px) and (orientation: portrait) {
    #curve {
      display: none;
    }

    .title {
      font-size: 1.4rem;
      margin: 1rem 0;
    }

    .container {
      min-height: 80vh;
      justify-content: space-evenly;

      .img-container {
        display: none;
      }
      .login-container {
        width: 100%;
        .profile-image {
          width: min(60%, 150px);
        }
        .form {
          width: 90%;
          height: 80vh;
          justify-content: space-evenly;
        }
      }
    }
  }

  //320px — 480px: Mobile devices
  @media screen and (max-width: 850px) and (orientation: landscape) {
    #curve {
      display: none;
    }

    .title {
      font-size: 1.8rem;
      margin: 1rem 0;
    }

    .container {
      min-height: 80vh;
      justify-content: space-evenly;

      .img-container {
        display: none;
      }
      .login-container {
        width: 100%;
        .profile-image {
          display: none;
          //width: min(60%, 150px);
        }
        .form {
          width: 90%;
          height: 80vh;
          justify-content: space-evenly;
        }
      }
    }
  }

  //481px — 768px: iPads, Tablets
  @media screen and (min-width: 481px) and (max-width: 769px) and (orientation: portrait) {
    #curve {
      display: none;
    }

    .title {
      font-size: 3rem;
      margin: 2rem 0;
    }

    .container {
      min-height: 80vh;
      justify-content: space-evenly;

      .img-container {
        display: none;
      }
      .login-container {
        width: 100%;

        .profile-image {
          width: min(60%, 250px);
        }
        .form {
          width: 50%;
          height: 80vh;
          justify-content: space-evenly;
        }
      }
    }
  }

  //481px — 768px: iPads, Tablets
  //@media screen and (min-width: 481px) and (max-width: 769px) and (orientation: landscape) {}

  //769px — 1024px: Small screens, laptops
  //@media screen and (min-width: 769px) and (max-width: 1024px) and (orientation: portrait) {}

  //769px — 1024px: Small screens, laptops
  //@media screen and (min-width: 769px) and (max-width: 1024px) and (orientation: landscape) {}

  //1025px — 1200px: Desktops, large screens
  @media screen and (min-width: 1024px) and (max-width: 1200px) and (orientation: portrait) {
    #curve {
      display: none;
    }

    .title {
      font-size: 3rem;
      margin: 2rem 0;
    }

    .container {
      min-height: 80vh;
      justify-content: space-evenly;

      .img-container {
        display: none;
      }
      .login-container {
        width: 100%;

        .profile-image {
          width: min(60%, 250px);
        }
        .form {
          width: 50%;
          height: 80vh;
          justify-content: space-evenly;
        }
      }
    }
  }

  //1025px — 1200px: Desktops, large screens
  //@media screen and (min-width: 1024px) and (max-width: 1200px) and (orientation: landscape) {}

  //1201px and more —  Extra large screens, TV
  //@media screen and (min-width: 1201px) and (max-width: 1500px) and (orientation: portrait) {}

  //1201px and more —  Extra large screens, TV
  //@media screen and (min-width: 1201px) and (max-width: 1500px) and (orientation: landscape) {}

  //1501px and more —  Extra large screens, TV
  //@media screen and (min-width: 1501px) and (orientation: portrait) {}

  //1501px and more —  Extra large screens, TV
  @media screen and (min-width: 1921px) and (orientation: landscape) {
    #curve {
      object-fit: fill;
    }

    .title {
      font-size: 10rem;
    }

    .container {
      width: 100vw;
      min-height: 80vh;
      display: flex;
      justify-content: space-evenly;

      .img-container {
        width: 50%;
        #mainImg {
          width: 80%;
        }
      }

      .login-container {
        .profile-image {
          width: min(60%, 450px);
        }

        .form {
          h2 {
            font-size: 40pt;
          }

          .input-div {
            .prompt-selected {
              font-size: 56pt;
              transform: translateY(30px) translateX(0px);
            }
            //Initial position of "placeholder" text <H5 />
            .prompt {
              transform: translateY(140px) translateX(80px);
              font-size: 4.8rem;
            }
            .icon {
              width: 60px;
              height: 60px;
            }
            input {
              font-size: 4.8rem;
              margin: 0.4rem 0 1rem 0;
              padding: 1rem 1.4rem;
            }
          }
          .btn {
            height: 100px;
            margin: 2rem;
            font-size: 3.2rem;
          }
        }
      }
    }
  }
`;

export default Login;
