import * as z from "zod"

// import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"

import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { SignInValidation } from "@/lib/valibation"

import { Link, useNavigate } from "react-router-dom"

import { Loader } from "@/components/ui/shared/Loader"
import { useSignInAccount } from "@/lib/tanstack-query/query&Mutation"
import { useUserContext } from "@/context/AuthContext"

export const SignIn = () => {
  const {toast} = useToast()
  const{checkAuthUser, isLoading: isUserLoading} = useUserContext();
  const navigate = useNavigate();

const{mutateAsync: signInAccount}= useSignInAccount();
    // 1. Define your form.
    const form = useForm<z.infer<typeof SignInValidation>>({
      resolver: zodResolver(SignInValidation),
      defaultValues: {

        email :" ",
        password :" ",
      },
    })


    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof SignInValidation>) {


        const session = await signInAccount({
          email:values.email,
          password:values.password
        })
        if(!session){
          return toast({title:"Cannot sign in. Try again"})
        }
      const isLoggedIn =await checkAuthUser();
      console.log({isLoggedIn});
      if(isLoggedIn){
        form.reset();
        console.log('navigate');
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
          <h2 className="h3-bold md:h2-bold">Login to your account</h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">Welcome. Login </p>


      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">

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
          {isUserLoading?(<div className="flex-center gap-2">
            <Loader/>Loading......
          </div>):"Sign In"}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">Dont have an account
          <Link to="/signUp" className="text-primary-500 text-small-semibold ml-1">Sign Up</Link></p>
      </form>
      </div>
    </Form>
    </>
  )
}
