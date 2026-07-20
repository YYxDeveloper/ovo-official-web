"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <Card className="w-full max-w-sm border-zinc-800 bg-zinc-900">
        <CardHeader>
          <CardTitle className="text-center text-lg text-zinc-100">
            ovo Admin 登入
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-300">
                密碼
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoFocus
                className="border-zinc-700 bg-zinc-800 text-zinc-100"
              />
            </div>
            {state?.error && (
              <p className="text-sm text-red-400">{state.error}</p>
            )}
            <Button
              type="submit"
              disabled={pending}
              className="w-full"
            >
              {pending ? "登入中..." : "登入"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
