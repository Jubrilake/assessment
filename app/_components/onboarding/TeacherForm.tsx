'use client'
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
    NIN: z.string().min(9).max(9),
    lastName: z.string().nonempty(),
    firstName: z.string().nonempty(),
    dateOfBirth: z.date().refine((date) => {
      return date !== undefined && date !== null;
    }, { message: "A date of birth is required." }),
    phoneNumber: z.string().min(11),
    salary: z.string().min(1).max(9),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      NIN: "",
      lastName: "",
      firstName: "",
      dateOfBirth: null, // Provide null as default value for date fields
      phoneNumber: "",
      salary: "",
    },
  });

  const onSubmit = (data:any) => {
    // Retrieve existing data from localStorage
    const existingDataString = localStorage.getItem("teachers");
    const existingData = existingDataString ? JSON.parse(existingDataString) : [];
  
    // Push the new data into the existing array
    existingData.push(data);
  
    // Store the updated array back into localStorage
    localStorage.setItem("teachers", JSON.stringify(existingData));
  
    // Reset the form
    form.reset();
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
              <FormLabel>Title</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a title" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {TitleOptions.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
                </SelectContent>
              </Select>
              
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
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value!}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
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
                  name="NIN"
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
                    <FormItem className="col-span-2">
                      <FormLabel>Salary</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
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
    </TabsContent>
  );
};

export default TeacherForm;