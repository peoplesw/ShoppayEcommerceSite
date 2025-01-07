import { useState } from "react"
import { getProviders, signIn, getCsrfToken, getSession, country } from "next-auth/react"
import Header from "../components/header"
import Footer from "../components/footer"
import LoginInput from "../components/inputs/loginInputs"
import CircledIconButton from "../components/buttons/circledIconButton"
import Link from "next/link"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import styles from "../styles/signin.module.scss"
import { BiLeftArrowAlt } from "react-icons/bi"
import axios from "axios"
import DotLoaderSpinner from "../components/loaders/dotLoader"
import Router from "next/router"




const initialValues = {
   login_email: "",
   login_password: "",
   name: "",
   email: "",
   password: "",
   conf_password: "",
   success: "",
   error: "",
   login_error: "",
}
export default function signin({ providers, csrfToken }) {
   const [loading, setLoading] = useState(false)
   const [user, setUser] = useState(initialValues)
   const { login_email, login_password, name, email, password, conf_password, success, error, login_error } = user
   
   const handleChange = (e) => {
       const { name, value } = e.target
       setUser({...user, [name]: value})
   }


   const loginValidation = Yup.object({
       login_email: Yup.string().required("Email address is required.").email("Please enter a valid email address."),
       login_password: Yup.string().required("Please enter a password.")
   })

   const registerValidation = Yup.object({
       name: Yup.string().required("What's your name?")
               .min(2, "First name must be between 2 and 16.")
               .max(16, "First name must be between 2 and 16.")
               .matches(/^[aA-zZ]/, "Numbers and special charters are not allowed.")
           ,email: Yup.string().required("You need this when you log in and if you ever need to reset your password.").email("Enter a valid email address.")
           ,password: Yup.string().required("Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &).")
               .min(6, "Password must be atleast 6 characters.")
               .max(36, "Password can't be more than 36 characters")
           ,conf_password: Yup.string()
               .required("Confirm your password.")
               .oneOf([Yup.ref("password")], "Passwords must match.")
   })
   const signUpHandler = async () => {
       try {
           setLoading(true)
           const { data } = await axios.post("http://localhost:3000/api/auth/signup", {
               name,
               email,
               password,
           })
           setUser({ ...user, error: "", success: data.message })
           setLoading(false)
           setTimeout(async () => {
               let options = {
                   redirect: false,
                   email: email,
                   password: password,
               }
               const res = await signIn("credentials", options) 
               Router.push("/")
           }, 1500)
       } catch (error) {
           setLoading(false)
           setUser({...user, success: "", error: error.response.data.message})
       }
   }
   const signInHandler = async () => {
       setLoading(true)
       let options = {
           redirect: false,
           email: login_email,
           password: login_password,
       }
       const res = await signIn("credentials", options)
       setUser({...user, success: "", error: ""})
       setLoading(false)
       if(res?.error) {
           setLoading(false)
           setUser({...user, login_error: res?.error})
       } else {
           return Router.push("/")
       }
   }
   return (
   <>
   {
       loading && <DotLoaderSpinner Loading={loading}/>
   }
       <Header />
           <div className={styles.login}>
               <div className={styles.login__container}>
                   <div className={styles.login__header}>
                       <div className={styles.back__svg}>
                           <BiLeftArrowAlt />
                       </div>
                       <span>
                           We'd be happy for you to join us! <Link href="/">Go Store</Link>
                       </span>
                   </div>
                   <div className={styles.login__form}>
                       <h1>Sign In</h1>
                       <p>Get access to one of the best E-shopping services in the world. </p>
                       <Formik
                       enableReinitialize
                       initialValues={{
                           login_email,
                           login_password,
                       }}
                       validationSchema={loginValidation}
                       onSubmit={() => {
                           signInHandler()
                       }}
                       >
                           {
                           (form) => (
                               <Form method="post" action="/api/auth/signin/email">
                                <input type="hidden" name="csrfToken" defaultValue={csrfToken}/>
                                   <LoginInput
                                   type="text"
                                   name="login_email"
                                   icon="email"
                                   onChange={handleChange}
                                   placeholder="Email Address"/>
                                  
                                   <LoginInput
                                   type="password"
                                   name="login_password"
                                   icon="password"
                                   onChange={handleChange}
                                   placeholder="Password"/>
                                  
                                   <CircledIconButton type="submit" text="Sign in"/>
                                   {
                                       login_error && (
                                       <span className={styles.error}>{login_error}</span>
                                   )}
                                   <div className={styles.forgot}>
                                       <Link href="/auth/forgot">Forgot Password?</Link>
                                   </div>
                               </Form>
                           )
                       }
                       </Formik>
                       <div className={styles.login__socials}>
                           <span className={styles.or}>Or continue with</span>
                           <div className={styles.login__socials__wrap}>
                           {
                           providers.map((provider) => {
                               if(provider.name == "Credentials") {
                                   return;
                               }
                               return (
                                   <div key={provider.name}>
                                       <button className={styles.social__button} onClick={() => signIn(provider.id)}>
                                           <img src={`../../icons/${provider.name}.png`} alt="" />
                                           Sign in with {provider.name}
                                       </button>
                                   </div>
                               )
                           })}
                           </div>
                       </div>
                   </div>
               </div>
               <div className={styles.login__container}>


                   <div className={styles.login__form}>
                       <h1>Sign up</h1>
                       <p>Get access to one of the best E-shopping services in the world. </p>
                       <Formik
                       enableReinitialize
                       initialValues={{
                           name,
                           email,
                           password,
                           conf_password,
                       }}
                       validationSchema={registerValidation}
                       onSubmit={() => {
                           signUpHandler()
                       }}
                       >
                           {
                           (form) => (
                               <Form>
                                   <LoginInput
                                   type="text"
                                   name="name"
                                   icon="user"
                                   onChange={handleChange}
                                   placeholder="Full Name"/>
                                  
                                   <LoginInput
                                   type="text"
                                   name="email"
                                   icon="email"
                                   onChange={handleChange}
                                   placeholder="Email Address"/>
                                  
                                   <LoginInput
                                   type="password"
                                   name="password"
                                   icon="password"
                                   onChange={handleChange}
                                   placeholder="Password"/>
                                  
                                   <LoginInput
                                   type="password"
                                   name="conf_password"
                                   icon="password"
                                   onChange={handleChange}
                                   placeholder="Re-Type Password "/>


                                   <CircledIconButton type="submit" text="Sign up"/>
                               </Form>
                           )
                       }</Formik>
                       <div>{success && <span className={styles.success}>{ success }</span>}</div>
                       <div>{error && <span className={styles.error}>{ error }</span>}</div>
                   </div>
               </div>
           </div>
       <Footer country="United States"/>
   </>
 )
}


export async function getServerSideProps(context) {
    const { req, query } = context
    
    const session = await getSession({ req })
    const { callbackUrl } = query
    const csrfToken = await getCsrfToken(context)
    const providers = Object.values(await getProviders())
    console.log(providers)

   return {
       props: { providers, csrfToken },
   }
}



