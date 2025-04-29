import { cn } from "../../../lib/utils"; 
import { Button } from "../../../components/ui/button"; 
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input"; 

import CardItem from "./card-item";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuth from "../../../api/hook/useAuth";
import Spinner from "../../../components/page/spriner";
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { loading, login } = useAuth();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: any) {
    try {
      const error =await login(values);
      if(error){
        if(error?.email){
          form.setError('email',{
            message:error.email
          });
        }
        if(error?.password){
          form.setError('password',{
            message:error.password
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Đăng nhập vào tài khoản của bạn</CardTitle>
          <CardDescription>
            Nhập email để đăng nhập vào tài khoản của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <CardItem
                  label="Email"
                  error={form.formState.errors.email?.message as string}
                >
                  <Input
                    type="email"
                    placeholder="m@example.com"
                    {...form.register("email", {
                      required: "Email không thể trống",
                    })}
                  />
                </CardItem>
                <div className="grid gap-3">
                  <CardItem
                    label="Mật khẩu"
                    error={form.formState.errors.password?.message as string}
                  >
                    <Input
                      type="password"
                      placeholder="Mật khẩu"
                      {...form.register("password", {
                        required: "Mật khẩu không thể trống",
                      })}
                    />
                  </CardItem>
                  <div className="flex items-center">
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Quên mật khẩu
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {loading.login ? (
                    <Button type="button" className="w-full cursor-default">
                      <Spinner />
                    </Button>
                  ) : (
                    <Button type="submit" className="w-full cursor-pointer">
                      Đăng nhập
                    </Button>
                  )}
                </div>
              </div>
              
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
