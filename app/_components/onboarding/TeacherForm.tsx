"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { convertInputDate } from "@/services/helpers";
import toast, { Toaster } from 'react-hot-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TeacherForm = () => {
  const TitleOptions = ["Mr", "Mrs", "Miss", "Dr", "Prof"];
  const formSchema = z.object({
    title: z.string().nonempty(),
    nin: z.string().min(9).max(9),
    lastName: z.string().min(1, "Last name is required."),
    firstName: z.string().min(1, "First name is required."),
    dateOfBirth: z.string().min(1, "Date of birth is required.").refine((dob) => {
      const today = new Date();
      const birthDate = new Date(dob);
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 21;
    }, { message: "You must be at least 21 years old." }),
    phoneNumber: z.string().min(11),
    salary: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      nin: "",
      lastName: "",
      firstName: "",
      dateOfBirth: "",
      phoneNumber: "",
      salary: "",
    },
  });

  const onSubmit = async (data:any) => {
    await fetch('http://localhost:3000/api/teacher',{
      method:"POST",
      body:JSON.stringify(data),
      headers:{
        "Content-Type":"application/json"
      }
    })

    form.reset();
    toast.success('Created Successfully...')
    console.log(data)
  };
  
  return (
    <TabsContent value="teacher" className="overflow">
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-900">Teacher Information</CardTitle>
          <CardDescription>
            Please fill in the required information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-x-3 gap-y-4 items-center mb-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                  <FormItem>
                   <label>Title</label>
                   <select {...field} className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400">
  <option value="" disabled selected hidden>Choose a title</option>
  {TitleOptions.map((option) => (
    <option key={option} value={option}>{option}</option>
  ))}
</select>
                  
                    
                 </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col mt-2">
                      <FormLabel>Date of birth</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="date"
                            value={convertInputDate(field.value)}
                            autoComplete="new-password"
                           />
                        </FormControl>
                           {form.formState.errors.dateOfBirth && (
                           <span className="text-red-500 text-[12px]">{form.formState.errors.dateOfBirth.message}</span>
                      )}
                      </FormItem>
                     )}
                    />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="123-456-7890" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        National Identification Number (NIN)
                      </FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="123456789" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="20000" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button className="w-full bg-blue-900 hover:bg-blue-800" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Toaster />
    </TabsContent>
  );
};

export default TeacherForm;
