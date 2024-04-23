import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import TeacherForm from "./_components/onboarding/TeacherForm"
import StudentForm from "./_components/onboarding/StudentForm"
 
export default function Home() {
  return (
    <main className="flex flex-col min-h-screen justify-center items-center bg-blue-900">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold text-white"> Create an account</h1>
        <p className="text-white">Fill in your details...</p>
      </div>
      <Tabs defaultValue="teacher"  className="w-[700px] h-[600px] overflow-y-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="teacher" className="bg-blue-900 text-white">Register as a teacher</TabsTrigger>
        <TabsTrigger value="student" className="bg-blue-900 text-white">Register as a student</TabsTrigger>
      </TabsList>
       <TeacherForm />
      <StudentForm />
    </Tabs>
    </main>
  );
}
