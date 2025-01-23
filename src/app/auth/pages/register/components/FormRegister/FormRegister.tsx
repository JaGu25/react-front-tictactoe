import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/shadcn/card";
import { Input } from "@/shared/components/shadcn/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { formRegisterSchema } from "@/app/auth/pages/register/components/FormRegister/schema";
import { toast } from "@/shared/hooks/use-toast";
import { Button } from "@/shared/components/shadcn/button";
import { useNavigate } from "react-router";

type FormValues = z.infer<typeof formRegisterSchema>;

const FormRegister = () => {
  const { setError } = useError();
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const form = useForm<FormValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async ({ email, password, fullName }: FormValues) => {
    try {
      await register({ email, password, fullName });
      toast({
        title: "Registro Exitoso !",
      });
    } catch (error) {
      handleError(error as AxiosError, setError);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-0 text-center">
        <CardTitle>Registrate</CardTitle>
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
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="example" {...field} />
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
              Registrar
            </LoadingButton>
            <Button
              type="button"
              onClick={() => navigate("/auth/login")}
              variant={"link"}
              className="w-full"
            >
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FormRegister;
