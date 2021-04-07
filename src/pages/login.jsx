import React, { useState } from "react";
import styled from "styled-components";
import { FaUser, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import curve from "../images/curve.svg";
import loginPic from "../images/login.svg";
import login2 from "../images/login2.svg";
import organise from "../images/organise.svg";
import profile from "../images/profile.svg";

function Login() {
  // const inputFocus = (e) => {
  //   //console.log("focus");
  //   //add class
  //   console.log(e.target.name);
  //   //console.log(document.getElementsByClassName("label"));
  // };
  // const inputBlur = (e) => {
  //   //console.log("blur");
  //   console.log(e.target.name);
  //   //remove class
  //   //console.log(document.getElementsByClassName("label"));
  // };

  const [usernameFocus, toggleUsername] = useState(false);
  const [passwordFocus, togglePassword] = useState(false);
  //const [inputBlur, toggleBlur] = useState(false);

  return (
    <StyledLogin>
      <img src={curve} alt="curve" id="curve" />
      {/* <img src={loginPic} alt="login" />
      <img src={login2} alt="login2" />
      <img src={profile} alt="profile" />
      <img src={organise} alt="organise" /> */}

      <div className="title">
        <h1>Portfolio Administration</h1>
      </div>
      <div className="container">
        <div className="img-container">
          <img id="mainImg" src={organise} alt="organise" />
        </div>
        <div className="login-container">
          <form className="form">
            <img id="profile" src={profile} alt="profile" />
            <h2>Please, log in</h2>
            <div className="input-div">
              <h5 className="prompt">Username</h5>
              <div className={usernameFocus ? "focus" : "label"}>
                <FaUser className="icon" />
                <input
                  name="username"
                  onFocus={() => toggleUsername(!usernameFocus)}
                  onBlur={() => toggleUsername(!usernameFocus)}
                  type="text"
                  //placeholder="Username"
                  size="20"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="input-div">
              <h5 className="prompt">Password</h5>
              <div className={passwordFocus ? "focus" : "label"}>
                <FaLock className="icon" />
                <input
                  name="password"
                  onFocus={() => togglePassword(!passwordFocus)}
                  onBlur={() => togglePassword(!passwordFocus)}
                  type="password"
                  //placeholder="Password"
                  size="20"
                  autoComplete="off"
                />
              </div>
            </div>
            <input type="submit" value="Login" className="btn" />
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
    font-size: 1.5rem;
    font-weight: bold;
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
        width: 7rem;
      }
      .form {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        h2 {
          //font-variant-caps: all-small-caps;
          color: #474747;
          font-size: 1.1rem;
        }

        //added by script
        .input-div.focus > .label > .icon {
          color: #689ed0;
        }
        .focus {
          width: 300px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          border-bottom: 2px solid #689ed0;
          color: #689ed0;
        }

        .input-div {
          display: flex;
          flex-direction: column;
          align-items: center;
          //justify-content: center;
          //gap: 0rem;
          .prompt {
            transform: translateY(40px) translateX(-40px);
            font-size: 1.2rem;
            color: #474747;
            font-weight: 200;
            font-family: "Poppins", sans-serif;
            transition: 0.3s ease;
            pointer-events: none;
            .prompt-active {
              color: #474747;
              transform: translateY(15px) translateX(-80px);
              font-variant-caps: all-small-caps;
              font-weight: bold;
            }
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
            border-bottom: 2px solid #cbcaca;
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

        .btn:hover {
        }
      }
    }
  }
`;

export default Login;

// .img{
// 	display: flex;
// 	justify-content: flex-end;
// 	align-items: center;
// }

// .login-content{
// 	display: flex;
// 	justify-content: flex-start;
// 	align-items: center;
// 	text-align: center;
// }

// .img img{
// 	width: 500px;
// }

// form{
// 	width: 360px;
// }

// .login-content img{
//     height: 100px;
// }

// .login-content h2{
// 	margin: 15px 0;
// 	color: #333;
// 	text-transform: uppercase;
// 	font-size: 2.9rem;
// }

// .login-content .input-div{
// 	position: relative;
//     display: grid;
//     grid-template-columns: 7% 93%;
//     margin: 25px 0;
//     padding: 5px 0;
//     border-bottom: 2px solid #d9d9d9;
// }

// .login-content .input-div.one{
// 	margin-top: 0;
// }

// .i{
// 	color: #d9d9d9;
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// }

// .i i{
// 	transition: .3s;
// }

// .input-div > div{
//     position: relative;
// 	height: 45px;
// }

// .input-div > div > h5{
// 	position: absolute;
// 	left: 10px;
// 	top: 50%;
// 	transform: translateY(-50%);
// 	color: #999;
// 	font-size: 18px;
// 	transition: .3s;
// }

// .input-div:before, .input-div:after{
// 	content: '';
// 	position: absolute;
// 	bottom: -2px;
// 	width: 0%;
// 	height: 2px;
// 	background-color: #38d39f;
// 	transition: .4s;
// }

// .input-div:before{
// 	right: 50%;
// }

// .input-div:after{
// 	left: 50%;
// }

// .input-div.focus:before, .input-div.focus:after{
// 	width: 50%;
// }

// .input-div.focus > div > h5{
// 	top: -5px;
// 	font-size: 15px;
// }

// .input-div.focus > .i > i{
// 	color: #38d39f;
// }

// .input-div > div > input{
// 	position: absolute;
// 	left: 0;
// 	top: 0;
// 	width: 100%;
// 	height: 100%;
// 	border: none;
// 	outline: none;
// 	background: none;
// 	padding: 0.5rem 0.7rem;
// 	font-size: 1.2rem;
// 	color: #555;
// 	font-family: 'poppins', sans-serif;
// }

// .input-div.pass{
// 	margin-bottom: 4px;
// }

// a{
// 	display: block;
// 	text-align: right;
// 	text-decoration: none;
// 	color: #999;
// 	font-size: 0.9rem;
// 	transition: .3s;
// }

// a:hover{
// 	color: #38d39f;
// }

// .btn{
// 	display: block;
// 	width: 100%;
// 	height: 50px;
// 	border-radius: 25px;
// 	outline: none;
// 	border: none;
// 	background-image: linear-gradient(to right, #32be8f, #38d39f, #32be8f);
// 	background-size: 200%;
// 	font-size: 1.2rem;
// 	color: #fff;
// 	font-family: 'Poppins', sans-serif;
// 	text-transform: uppercase;
// 	margin: 1rem 0;
// 	cursor: pointer;
// 	transition: .5s;
// }
// .btn:hover{
// 	background-position: right;
// }

// @media screen and (max-width: 1050px){
// 	.container{
// 		grid-gap: 5rem;
// 	}
// }

// @media screen and (max-width: 1000px){
// 	form{
// 		width: 290px;
// 	}

// 	.login-content h2{
//         font-size: 2.4rem;
//         margin: 8px 0;
// 	}

// 	.img img{
// 		width: 400px;
// 	}
// }

// @media screen and (max-width: 900px){
// 	.container{
// 		grid-template-columns: 1fr;
// 	}

// 	.img{
// 		display: none;
// 	}

// 	.wave{
// 		display: none;
// 	}

// 	.login-content{
// 		justify-content: center;
// 	}
// }
