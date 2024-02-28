"use client";

import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

function LoginButton(props: Props) {
  const { children, mode = "redirect", asChild } = props;
  const router = useRouter()

  const onClick = () => {
    console.log("Login");
    router.push('/auth/login')
  };

  if(mode === "modal") {
    return <span>TODO implement modal</span>
  }

  return <span onClick={onClick}>{children}</span>;
}

export default LoginButton;
