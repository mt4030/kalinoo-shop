import { useRef } from "react";

export default function HookTest() {
  const ref = useRef<HTMLDivElement>(null);

  return <div ref={ref}>React hook works</div>;
}