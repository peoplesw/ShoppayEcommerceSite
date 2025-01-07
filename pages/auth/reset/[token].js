import Header from "../../../components/header"
import Footer from "../../../components/footer"
import { useState } from "react"
import { BiLeftArrowAlt } from "react-icons/bi"
import Link from "next/link"
import { signIn, getSession } from "next-auth/react"
import Router from "next/router"
import CircledIconButton from "../../../components/buttons/circledIconButton"
import LoginInput from "../../../components/inputs/loginInputs";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios"
import DotLoaderSpinner from "../../../components/loaders/dotLoader"
import jwt from "jsonwebtoken"
import styles from "../../../styles/forgot.module.scss"

export default function reset({ user_id }) {
    console.log("user_id", user_id)
    const [password, setPassword] = useState("")
    const [conf_password, setConf_Password] = useState("")
    const [loading, setLoading] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const passwordValidation = Yup.object({
        password: Yup.string().required("Please enter your new password.")
            .min(6, "Password must be atleast 6 characters.")
            .max(36, "Password can't be more than 36 characters")
        ,conf_password: Yup.string()
            .required("Confirm your password.")
            .oneOf([Yup.ref("password")], "Passwords must match.")
        })

    const resetHandler = async () => {
        try {
            setLoading(true)
            const { data } = await axios.put("/api/auth/reset", {
                user_id,
                password,
            })
            let options = {
                redirect: false,
                email: data.email,
                password: password,
            }
            await signIn("credentials", options)
            // reloads the whole page, vanilla javascript
            window.location.reload(true)
        } catch(error) {
            setLoading(false)
            setSuccess("")
            setError(error.response.data?.message)
        }
    }
  
    return (
    <>
       {
       loading && <DotLoaderSpinner loading={loading}/>
        }
        <Header country=""/>
            <div className={styles.forgot}>
                <div>
                    <div className={styles.forgot__header}>
                       <div className={styles.back__svg}>
                           <BiLeftArrowAlt />
                       </div>
                       <span>
                           Reset your password <Link href="/">Login instead</Link>
                       </span>
                   </div>
                       <Formik
                       enableReinitialize
                       initialValues={{
                           password,
                           conf_password,
                       }}
                       validationSchema={passwordValidation}
                       onSubmit={() => {
                           resetHandler()
                       }}
                       >
                           {
                           (form) => (
                               <Form>

                                   <LoginInput
                                   type="password"
                                   name="password"
                                   icon="password"
                                   placeholder="Password"
                                   onChange={(e) => setPassword(e.target.value)}
                                   />

                                   <LoginInput
                                   type="password"
                                   name="conf_password"
                                   icon="password"
                                   placeholder="Confirm Password"
                                   onChange={(e) => setConf_Password(e.target.value)}
                                   />
                                  
                                   <CircledIconButton type="submit" text="Submit"/>
                                   
                                   <div style={{marginTop: "10px"}}>
                                        {error && (<span className={styles.error}>{error}</span>)}
                                   </div>

                               </Form>
                           )
                       }
                       </Formik>
                   </div>
                </div>

        <Footer country=""/>

    </>
  )
}

export async function getServerSideProps(context) {
    const { query, req } = context
    const session = await getSession({ req })
    if(session) {
        return {
            redirect: {
                destination: "/",
            },
        }
    }
    const token = query.token
    const user_id = jwt.verify(token, process.env.RESET_TOKEN_SECRET)
    return {
        props: {
            user_id: user_id.id 
        }
    }
}