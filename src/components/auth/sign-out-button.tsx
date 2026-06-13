import { Button } from "@/components/ui/button";

type SignOutButtonProps = {
  className?: string;
};

export function SignOutButton({ className }: SignOutButtonProps) {
  return (
    <form action="/auth/sign-out" className={className} method="post">
      <Button type="submit" variant="outline">
        Sign out
      </Button>
    </form>
  );
}
