import { useForm } from "react-hook-form";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const mySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  company: z.string(),
  email: z.string().email(),
  dateOfBirth: z.object({
    month: z.string().optional(),
    day: z.string().optional(),
    year: z.string().optional()
  })
});

type FormData = z.infer<typeof mySchema>;

export function App() {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const { handleSubmit, register, formState } = useForm<FormData>({
    resolver: zodResolver(mySchema)
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <div className="flex items-center justify-center h-screen w-full bg-zinc-100">
      <div className="w-full max-w-2xl bg-white shadow rounded-md p-8">
        <h1 className="text-2xl font-bold text-center">Registration</h1>
        <form
          className="flex flex-col gap-6 mt-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              <Input type="text" {...register("firstName")} />
              {formState.errors.firstName?.message && <span className="text-red-500 text-xs">{formState.errors.firstName?.message}</span>}
            </div>
            <div>
              <Label>Last Name</Label>
              <Input type="text" {...register("lastName")} />
              {formState.errors.lastName?.message && <span className="text-red-500 text-xs">{formState.errors.lastName?.message}</span>}
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" {...register("email")} />
              {formState.errors.email?.message && <span className="text-red-500 text-xs">{formState.errors.email?.message}</span>}
            </div>
            <div>
              <Label>Company</Label>
              <Input type="text" {...register("company")} />
              {formState.errors.company?.message && <span className="text-red-500 text-xs">{formState.errors.company?.message}</span>}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 items-end">
            <div>
              <Label>Date of Birth</Label>
              <Select {...register("dateOfBirth.month")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formState.errors.dateOfBirth?.month?.message && <span className="text-red-500 text-xs">{formState.errors.dateOfBirth?.month?.message}</span>}

            </div>
            <div>
              <Select {...register("dateOfBirth.day")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  {Array(31)
                    .fill(1)
                    .map((_, index) => {
                      const value = String(index + 1).padStart(2, "0");
                      return (
                        <SelectItem key={String(index)} value={value}>
                          {value}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
              {formState.errors.dateOfBirth?.day?.message && <span className="text-red-500 text-xs">{formState.errors.dateOfBirth?.day?.message}</span>}
            </div>
            <div>
              <Select {...register("dateOfBirth.year")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {Array(200)
                    .fill(1)
                    .map((_, index) => {
                      const value = String(index + 1901).padStart(4, "0");
                      return (
                        <SelectItem key={String(index)} value={value}>
                          {value}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
              {formState.errors.dateOfBirth?.year?.message && <span className="text-red-500 text-xs">{formState.errors.dateOfBirth?.year?.message}</span>}
            </div>
          </div>
          <Button className="mt-6" type="submit">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
