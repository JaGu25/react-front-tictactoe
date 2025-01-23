import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/shadcn/card";
import { Input } from "@/shared/components/shadcn/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formLoginSchema } from "@/app/auth/pages/login/components/FormLogin/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/shadcn/form";
import { z } from "zod";
import { useAuthStore } from "@/store/auth/auth.store";
import { LoadingButton } from "@/shared/components/ui/LoadingButton";
import { useError } from "@/shared/providers/ErrorProvider";
import { handleError } from "@/shared/utils/handle-error";
import { AxiosError } from "axios";
import { Button } from "@/shared/components/shadcn/button";
import { useNavigate } from "react-router";

type FormValues = z.infer<typeof formLoginSchema>;

const FormLogin = () => {
  const { setError } = useError();
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.loginUser);
  const form = useForm<FormValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async ({ email, password }: FormValues) => {
    try {
      await loginUser(email, password);
    } catch (error) {
      handleError(error as AxiosError, setError);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-0 text-center">
        <CardTitle>Administrador Base</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="*******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <LoadingButton
              type="submit"
              className="w-full"
              isLoading={isSubmitting}
            >
              Log In
            </LoadingButton>
            <Button
              onClick={() => navigate("/auth/register")}
              variant={"link"}
              className="w-full"
            >
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FormLogin;
