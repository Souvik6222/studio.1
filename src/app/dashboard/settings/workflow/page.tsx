import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { approvalWorkflow as mockWorkflow, users as mockUsers } from "@/lib/data";
import { ArrowDown, ArrowUp } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function WorkflowPage() {
    
    return (
        <div className="space-y-6">
             <div>
                <h3 className="text-lg font-medium font-headline">Approval Workflow</h3>
                <p className="text-sm text-muted-foreground">
                    Define the sequence and conditions for expense approvals.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Approval Sequence</CardTitle>
                        <CardDescription>Drag to re-order the approval steps.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {mockWorkflow.steps.map((step, index) => {
                            const approver = mockUsers.find(u => u.id === step.approverId);
                            return (
                                <div key={step.level} className="flex items-center justify-between p-3 rounded-lg border">
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold text-lg text-primary">{step.level}</span>
                                        <div>
                                            <p className="font-medium">{approver?.name}</p>
                                            <p className="text-sm text-muted-foreground capitalize">{approver?.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <Button variant="ghost" size="icon" className="h-6 w-6" disabled={index === 0}><ArrowUp className="h-4 w-4" /></Button>
                                        <Button variant="ghost" size="icon" className="h-6 w-6" disabled={index === mockWorkflow.steps.length - 1}><ArrowDown className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                            )
                        })}
                        <Button variant="outline" className="w-full">Add Step</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Conditional Logic</CardTitle>
                        <CardDescription>Set rules for automatic approvals.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <RadioGroup defaultValue={mockWorkflow.condition.rule} className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="percentage" id="r1" />
                                <Label htmlFor="r1">Percentage Rule (e.g., ≥ 60% approve)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="specific_approver" id="r2" />
                                <Label htmlFor="r2">Specific Approver (e.g., CFO approves)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="hybrid" id="r3" />
                                <Label htmlFor="r3">Hybrid Rule (e.g., 60% OR CFO approval)</Label>
                            </div>
                        </RadioGroup>
                        <div className="space-y-2 pt-4">
                            <Label>Percentage</Label>
                            <Input type="number" defaultValue={mockWorkflow.condition.percentage} placeholder="60" />
                        </div>
                        <Button className="w-full">Save Conditions</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
