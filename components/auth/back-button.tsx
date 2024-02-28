"use client";

import Link from "next/link";
import { Button } from "../ui/button";

interface Props {
  href: string;
  label: string;
}

function BackButton(props: Props) {
  const { href, label } = props;
  return (
    <Button variant='link' className="font-normal w-full" asChild size="sm">
      <Link href={href}>{label}</Link>
    </Button>
  );
}

export default BackButton;
