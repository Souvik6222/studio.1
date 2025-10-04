import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { users as mockUsers } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function EmployeesPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-medium font-headline">Employees</h3>
                    <p className="text-sm text-muted-foreground">
                        Manage company employees and their roles.
                    </p>
                </div>
                <Button>Add Employee</Button>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {mockUsers.map(user => {
                    const manager = user.managerId ? mockUsers.find(u => u.id === user.managerId) : null;
                    return (
                        <Card key={user.id}>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle>{user.name}</CardTitle>
                                    <CardDescription>{user.email}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center">
                                    <Badge variant="secondary" className="capitalize">{user.role}</Badge>
                                    {manager && <p className="text-xs text-muted-foreground">Reports to: {manager.name}</p>}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full">Edit</Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    )
}
