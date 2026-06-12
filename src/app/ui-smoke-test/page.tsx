import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function UiSmokeTestPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-12">
      <div className="flex flex-col gap-3">
        <Badge className="w-fit" variant="secondary">
          Development
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight">UI Smoke Test</h1>
        <p className="text-muted-foreground">
          UI smoke test page for development only.
        </p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Base components</CardTitle>
          <CardDescription>
            Static examples for validating the shadcn/ui foundation.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-3">
            <Button>Default button</Button>
            <Button variant="outline">Outline button</Button>
            <Button variant="secondary">Secondary button</Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="smoke-email">Email</Label>
              <Input
                id="smoke-email"
                placeholder="candidate@example.com"
                type="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="smoke-role">Target role</Label>
              <Select>
                <SelectTrigger id="smoke-role" className="w-full">
                  <SelectValue placeholder="Choose a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="software-engineer">
                      Software Engineer
                    </SelectItem>
                    <SelectItem value="marketing-manager">
                      Marketing Manager
                    </SelectItem>
                    <SelectItem value="finance-analyst">
                      Finance Analyst
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="smoke-notes">Notes</Label>
            <Textarea
              id="smoke-notes"
              placeholder="Paste a short job-search note."
            />
          </div>

          <Tabs defaultValue="resume">
            <TabsList>
              <TabsTrigger value="resume">Resume</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
            </TabsList>
            <TabsContent value="resume">
              Resume builder components are ready for future screens.
            </TabsContent>
            <TabsContent value="applications">
              Application tracker components are ready for future screens.
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
}
