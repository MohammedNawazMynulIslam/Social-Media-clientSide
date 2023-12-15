import * as z from "zod"

// import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"

import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { SignUpValidation } from "@/lib/valibation"

import { Link, useNavigate } from "react-router-dom"

import { Loader } from "@/components/ui/shared/Loader"
import { useCreateUserAccount, useSignInAccount } from "@/lib/tanstack-query/query&Mutation"
import { useUserContext } from "@/context/AuthContext"




export const SignUp = () => {
  const {toast} = useToast()
  const{checkAuthUser, isLoading: isUserLoading} = useUserContext();
  const navigate = useNavigate();
const{mutateAsync:createUserAccount, isPending: isCreatingUser} = useCreateUserAccount();
const{mutateAsync: signInAccount, isPending: isSignIn}= useSignInAccount();
    // 1. Define your form.
    const form = useForm<z.infer<typeof SignUpValidation>>({
      resolver: zodResolver(SignUpValidation),
      defaultValues: {
        name :" ",
        username :" ",
        email :" ",
        password :" ",
      },
    })


    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof SignUpValidation>) {
      const newUser = await createUserAccount(values)
      if(!newUser){
        return toast({
          title: "Cannot sign up. something is wrong. Please try again ",
        })
      }
        const session = await signInAccount({
          email:values.email,
          password:values.password
        })
        if(!session){
          return toast({title:"Cannot sign in. Try again"})
        }
      const isLoggedIn =await checkAuthUser();
      if(isLoggedIn){
        form.reset();
        navigate('/')
      }else{
        return toast({title:'Sign up failed. Please try again'} )
      }
    }

  return (
    <>

      <Form {...form}>
        <div className="sm:w-400 flex-center flex-col">

          <img className="w-[500px] h-[500px]" src="../../../public/assets/logo.svg" alt="" />
          <h2 className="h3-bold md:h2-bold">Create a new account</h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">To use Snapgram, please enter your details</p>


      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
        {/* name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input"  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* user name */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input"  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* email */}
           <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input"  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input"  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="shad-button_primary">
          {isCreatingUser?(<div className="flex-center gap-2">
            <Loader/>Loading......
          </div>):"Sign Up"}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">Already have an account
          <Link to="/signIn" className="text-primary-500 text-small-semibold ml-1">Log in</Link></p>
      </form>
      </div>
    </Form>
    </>
  )
}
