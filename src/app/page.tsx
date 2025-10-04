"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Eye, Briefcase, User, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import type { UserRole } from "@/lib/types";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (role: UserRole) => {
    login(role);
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/10 p-4 w-20 h-20">
            <Eye className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl">Welcome to ExpensEye</CardTitle>
          <CardDescription>
            Select a role to simulate login and explore the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => handleLogin("admin")}
            className="w-full"
            variant="outline"
            size="lg"
          >
            <Shield className="mr-2 h-5 w-5" />
            Login as Admin
          </Button>
          <Button
            onClick={() => handleLogin("manager")}
            className="w-full"
            variant="outline"
            size="lg"
          >
            <Briefcase className="mr-2 h-5 w-5" />
            Login as Manager
          </Button>
          <Button
            onClick={() => handleLogin("employee")}
            className="w-full"
            variant="outline"
            size="lg"
          >
            <User className="mr-2 h-5 w-5" />
            Login as Employee
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-center text-xs text-muted-foreground w-full">
            This is a simulated authentication for demonstration purposes.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
